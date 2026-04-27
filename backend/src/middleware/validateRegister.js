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
    return res.status(400).json({
      message: 'Faltan campos obligatorios',
      missingFields
    });
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/.test(name)) {
    return res.status(400).json({ message: 'Nombre inválido' });
  }

  if (name.length < 3 || name.length > 25) {
    return res.status(400).json({ message: 'Nombre inválido' });
  }

  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    return res.status(400).json({ message: 'Username inválido' });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({ message: 'Username inválido' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  next();
};