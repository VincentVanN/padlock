/* eslint-disable no-lone-blocks */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const generator = () => {
  const charArray = [];
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!#$%&()*+-./)*+-./';

  for (let i = 0; i < 4; i++) {
    {
      charArray.push(uppercase.charAt(Math.floor(Math.random() * uppercase.length)));
      charArray.push(lowercase.charAt(Math.floor(Math.random() * lowercase.length)));
      charArray.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
      charArray.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
    }
  }

  function shuffle(array) {
    const newArray = [...array];
    const { length } = newArray;

    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random());
      const randomItem = newArray.splice(randomPosition, 1);
      newArray.push(...randomItem);
    }

    return newArray;
  }
  return shuffle(charArray).toString().replaceAll(',', '');
};
