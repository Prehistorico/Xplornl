const appError = require('../utils/appError');

module.exports = (req, res, next) => {
  const { username, name, birthdate, email, password, confirmPassword } = req.body;

  if (username === null || username === '') {
    return next(new appError('El username no puede ser nulo o vacío', 400));
  }
  if (name === null || name === '') {
    return next(new appError('El nombre no puede ser nulo o vacío', 400));
  }
  if (birthdate === null || birthdate === '') {
    return next(new appError('La fecha de nacimiento no puede ser nula o vacía', 400));
  }
  if (email === null || email === '') {
    return next(new appError('El email no puede ser nulo o vacío', 400));
  }
  if (password === null || password === '') {
    return next(new appError('La contraseña no puede ser nula o vacía', 400));
  }

  if (name) {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/.test(name)) {
      return next(new appError('Nombre inválido', 400));
    }
    if (name.length < 3 || name.length > 25) {
      return next(new appError('Nombre inválido', 400));
    }
  }

  if (username) {
    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      return next(new appError('Username inválido', 400));
    }
    if (username.length < 3 || username.length > 20) {
      return next(new appError('Username inválido', 400));
    }
  }

  if (birthdate) {
    const birthDateObj = new Date(birthdate);
    if (isNaN(birthDateObj.getTime())) {
      return next(new appError('La fecha de nacimiento no es válida', 400));
    }
    const [year, month, day] = birthdate.split('-').map(Number);
    if (
      birthDateObj.getUTCFullYear() !== year ||
      birthDateObj.getUTCMonth() + 1 !== month ||
      birthDateObj.getUTCDate() !== day
    ) {
      return next(new appError('La fecha de nacimiento no existe en el calendario', 400));
    }
    const today = new Date();
    if (birthDateObj > today) {
      return next(new appError('La fecha de nacimiento no puede ser en el futuro', 400));
    }
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) age--;
    if (age < 18) return next(new appError('Debes ser mayor de 18 años', 400));
    if (age > 117) return next(new appError('La edad ingresada excede el límite permitido', 400));
  }

  if (password) {
    const passwordErrors = [];
    if (password.length < 8) passwordErrors.push('Debe tener al menos 8 caracteres');
    if (!/[a-z]/.test(password)) passwordErrors.push('Debe contener al menos una letra minúscula');
    if (!/[A-Z]/.test(password)) passwordErrors.push('Debe contener al menos una letra mayúscula');
    if (!/\d/.test(password)) passwordErrors.push('Debe contener al menos un número');
    if (!/[^A-Za-z0-9]/.test(password)) passwordErrors.push('Debe contener al menos un carácter especial');

    if (passwordErrors.length > 0) {
      return next(new appError('La contraseña no cumple con los requisitos', 400, passwordErrors));
    }

    if (password !== confirmPassword) {
      return next(new appError('Las contraseñas no coinciden', 400));
    }
  }

  next();
};

