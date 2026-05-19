const containsBannedWords = require('../utils/containsBannedWords');
const AppError = require('../utils/appError');

exports.validateCleanText = (...texts) => {
  const hasBannedWords =
    texts.some(text =>
      text &&
      containsBannedWords(text)
    );

  if (hasBannedWords) {
    throw new AppError('El contenido contiene lenguaje prohibido', 400);
  }
};