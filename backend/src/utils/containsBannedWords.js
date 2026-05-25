const bannedWords = require('./bannedWords');

const containsBannedWords = (text) => {

  if (!text || typeof text !== 'string') {
    return false;
  }

  const normalizedText = text.toLowerCase();

  return bannedWords.some(word =>
    normalizedText.includes(word)
  );
};

module.exports = containsBannedWords;