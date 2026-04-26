const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const appError = require('../utils/appError');

exports.register = async (req, res, next) => {
  try {
    const { username, name, birthdate, email, password, confirmPassword } = req.body;

    const missingFields = [];

    if (!username) missingFields.push('username');
    if (!name) missingFields.push('name');
    if (!birthdate) missingFields.push('birthdate');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!confirmPassword) missingFields.push('confirmPassword');

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
        missingFields
      });
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/.test(name)) {
      return res.status(400).json({
        message: 'El nombre solo puede contener letras y un espacio simple entre palabras.'
      });
    }
    
    if (name.length < 3 || name.length > 25) {
      return res.status(400).json({
        message: 'El nombre debe tener entre 3 y 25 caracteres.'
      });
    }

    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      return res.status(400).json({
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos, sin espacios.'
      });
    }
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.'
      });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
    }

    const birthDateObj = new Date(birthdate);

    if (isNaN(birthDateObj.getTime())) {
      return res.status(400).json({
        message: 'La fecha de nacimiento no es válida. Debe incluir año, mes y día correctos.'
      });
    }

    const [year, month, day] = birthdate.split('-').map(Number);

    if (
      birthDateObj.getUTCFullYear() !== year ||
      birthDateObj.getUTCMonth() + 1 !== month ||
      birthDateObj.getUTCDate() !== day
    ) {
      return res.status(400).json({
        message: 'La fecha de nacimiento no existe en el calendario.'
      });
    }

    const today = new Date();
     if (birthDateObj > today) {
      return res.status(400).json({ message: 'La fecha de nacimiento no puede ser en el futuro.' });
    }
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    if (age < 18) {
      return res.status(400).json({
        message: 'Debes ser mayor de 18 años para registrarte.'
      });
    }

    if (age > 117) {
      return res.status(400).json({
        message: 'La edad ingresada excede el límite permitido.'
      });
    }

    const passwordErrors = [];

    if (password.length < 8) {passwordErrors.push('Debe tener al menos 8 caracteres');}
    if (!/[a-z]/.test(password)) {passwordErrors.push('Debe contener al menos una letra minúscula');}
    if (!/[A-Z]/.test(password)) {passwordErrors.push('Debe contener al menos una letra mayúscula');}
    if (!/\d/.test(password)) {passwordErrors.push('Debe contener al menos un número');}
    if (!/[^A-Za-z0-9]/.test(password)) {passwordErrors.push('Debe contener al menos un carácter especial');}

    if (passwordErrors.length > 0) {
      return res.status(400).json({
        message: 'La contraseña no cumple con los requisitos',
        errors: passwordErrors
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Las contraseñas no coinciden'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      username,
      name,
      birthdate,
      email,
      password,
      verificationToken
    });

    await newUser.save();

    const verifyURL = `http://localhost:5000/api/verify/${verificationToken}`;

    console.log("📩 Intentando enviar correo a:", email);

    await sendEmail(
      email,
      'Verifica tu cuenta',
      `<h1>Verificación</h1>
      <p>Haz click:</p>
      <a href="${verifyURL}">${verifyURL}</a>`
    );

    console.log("----------------------CORREO ENVIADO----------------------");

    res.status(201).json({
      message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta'
    });

  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Usuario inválido.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña inválida' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    next(error);
  }
};
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.json({ message: 'Cuenta verificada correctamente' });

  } catch (error) {
    next(error);
  }
};
