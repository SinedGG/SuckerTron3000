const forms = [
  ["єБал", "єБали", "єБалів"],
  ["день", "дні", "днів"],
];

module.exports = (number, noun_index) => {
  const absNumber = Math.abs(number);
  const lastDigit = absNumber % 10;
  const lastTwoDigits = absNumber % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${number} ${forms[noun_index][2]}`;
  }

  if (lastDigit === 1) {
    return `${number} ${forms[noun_index][0]}`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} ${forms[noun_index][1]}`;
  } else {
    return `${number} ${forms[noun_index][2]}`;
  }
};
