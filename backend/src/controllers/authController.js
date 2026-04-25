const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { username, name, birthdate, email, password, confirmPassword } = req.body;

    if (!username || !name || !birthdate || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo'
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
    
    console.log("✅ Correo enviado");

    res.status(201).json({
        message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta'
    });
    

  } catch (error) {
  console.error('REGISTER ERROR:', error);
  return res.status(500).json({
    message: error.message,
    name: error.name
  });
}
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const user = await User.findOne({ email }).select('+password');

        if(!user){
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user._id },
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

    } 

        catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

exports.verifyEmail = async (req, res) => {
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
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

console.log("✅ Correo enviado");