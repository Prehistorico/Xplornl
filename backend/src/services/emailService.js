const sendEmail = require('./sendEmail');

exports.sendVerificationEmail = async (email, rawToken) => {

  const verifyURL = `http://localhost:5000/api/verify/${rawToken}`;

  await sendEmail(
    email,
    'Verifica tu cuenta',
    `
    <h1>Verificación</h1>
    <p>Haz click:</p>
    <a href="${verifyURL}">
      ${verifyURL}
    </a>
    `
  );
};