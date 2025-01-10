module.exports = (number) => {
  const absNumber = Math.abs(number) % 100;
  const lastDigit = absNumber % 10;

  if (absNumber > 10 && absNumber < 20) {
    return `${number} єБалів`;
  }
  if (lastDigit === 1) {
    return `${number} єБал`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} єБали`;
  }
  return `${number} єБалів`;
};
