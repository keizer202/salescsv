export const txtCamel = (str) => {
  const newStr = new String(str);
  const splits = newStr.toLowerCase().split('_');
  const newString = splits.map((data, index) => {
    if (index > 0) {
      return data.substring(0, 1).toUpperCase() + data.substring(1);
    }
    return data;
  });
  return newString.join('');
};
