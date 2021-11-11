const titleCase = (str) => {
  const newStr = str?.toLowerCase().split(" ");
  for (let i = 0; i < newStr.length; i += 1) {
    newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
  }
  return newStr.join(" ");
};

export default titleCase;
