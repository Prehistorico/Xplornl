const appError = require('../utils/appError');

module.exports = (req, res, next) => {
  const { username, name, birthdate, email, password, confirmPassword } = req.body;

  const missingFields = [];

  if (!username) missingFields.push('username');
  if (!name) missingFields.push('name');
  if (!birthdate) missingFields.push('birthdate');
  if (!email) missingFields.push('email');
  if (!password) missingFields.push('password');
  if (!confirmPassword) missingFields.push('confirmPassword');

  if (missingFields.length > 0) {
    return next(new appError('Faltan campos obligatorios', 400, missingFields));
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/.test(name)) {
    return next(new appError('Nombre inválido', 400));
  }

  if (name.length < 3 || name.length > 25) {
    return next(new appError('Nombre inválido', 400));
  }

  if (!/^[A-Za-z0-9._\<>\-]+$/.test(username)) {
    return next(new appError('Username inválido', 400));
  }

  if (username.length < 3 || username.length > 20) {
    return next(new appError('Username inválido', 400));
  }

  if (password !== confirmPassword) {
    return next(new appError('Las contraseñas no coinciden', 400));
  }
  
  
  const birthDateObj = new Date(birthdate); 
  if (isNaN(birthDateObj.getTime())) { 
      return res.status(400).json({ 
          message: 'La fecha de nacimiento no es válida. Debe incluir año, mes y día correctos.' }); 
  } 
  const [year, month, day] = birthdate.split('-').map(Number); 
  if ( birthDateObj.getUTCFullYear() !== year || birthDateObj.getUTCMonth() + 1 !== month || birthDateObj.getUTCDate() !== day ) { 
      return res.status(400).json(
          { message: 'La fecha de nacimiento no existe en el calendario.' }); 
      }
  const today = new Date(); if (birthDateObj > today) { 
      return res.status(400).json(
          { message: 'La fecha de nacimiento no puede ser en el futuro.' }); 
      }
  let age = today.getFullYear() - birthDateObj.getFullYear(); 
  const m = today.getMonth() - birthDateObj.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) { age--; }
  if (age < 18) { return next(new appError('Debes ser mayor de 18 años para registrarte.', 400)); }

  if (age > 117) { return next(new appError('La edad ingresada excede el límite permitido.', 400)); }
  const passwordErrors = [];
  if (password.length < 8) {passwordErrors.push('Debe tener al menos 8 caracteres');}
  if (!/[a-z]/.test(password)) {passwordErrors.push('Debe contener al menos una letra minúscula');}
  if (!/[A-Z]/.test(password)) {passwordErrors.push('Debe contener al menos una letra mayúscula');}
  if (!/\d/.test(password)) {passwordErrors.push('Debe contener al menos un número');}
  if (!/[^A-Za-z0-9]/.test(password)) {passwordErrors.push('Debe contener al menos un carácter especial');}

  if (passwordErrors.length > 0) { return next(new appError('La contraseña no cumple con los requisitos', 400, passwordErrors)); }
  if (password !== confirmPassword) { return next(new appError('Las contraseñas no coinciden', 400)); }

  next();
};