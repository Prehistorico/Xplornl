const appError = require('../utils/appError');

module.exports = (req, res, next) => {
  const body = req.body || {};

  const {
    username,
    name,
    birthdate,
    email,
    password,
    confirmPassword
  } = body;

  if (username !== undefined) {
    if (username === '') {
      return next(new appError('El username no puede estar vacío', 400));
    }

    if (!/^[A-Za-z0-9._\-]+$/.test(username)) {
      return next(new appError('Username inválido', 400));
    }

    if (username.length < 3 || username.length > 20) {
      return next(new appError('Username inválido', 400));
    }
  }

  if (name !== undefined) {
    if (name === '') {
      return next(new appError('El nombre no puede estar vacío', 400));
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(name)) {
      return next(new appError('Nombre inválido', 400));
    }

    if (name.length < 3 || name.length > 25) {
      return next(new appError('Nombre inválido', 400));
    }
  }

  if (birthdate !== undefined) {
    const birthDateObj = new Date(birthdate);

    if (isNaN(birthDateObj.getTime())) {
      return next(new appError('Fecha inválida', 400));
    }

    const today = new Date();
    if (birthDateObj > today) {
      return next(new appError('Fecha en el futuro no válida', 400));
    }
  }

  if (email !== undefined) {
    if (email === '') {
      return next(new appError('El email no puede estar vacío', 400));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return next(new appError('Email inválido', 400));
    }
  }

  if (password !== undefined) {
    const passwordErrors = [];

    if (password.length < 8) passwordErrors.push('Min 8 caracteres');
    if (!/[a-z]/.test(password)) passwordErrors.push('Minúscula');
    if (!/[A-Z]/.test(password)) passwordErrors.push('Mayúscula');
    if (!/\d/.test(password)) passwordErrors.push('Número');
    if (!/[^A-Za-z0-9]/.test(password)) passwordErrors.push('Símbolo');

    if (passwordErrors.length > 0) {
      return next(new appError('Password inválida', 400, passwordErrors));
    }

    if (password !== confirmPassword) {
      return next(new appError('Passwords no coinciden', 400));
    }
  }

  next();
};
