//FORMATING NUM TO M; B; K
export const amountReducer = function (num) {
  let d = ["B", "M", "k"];
  for (let i = 0; i < 3; i++) {
    if (num / (1000000000 / 1000 ** i) >= 1) {
      return `${round(num / (1000000000 / 1000 ** i))}${d[i]}`;
    }
  }
  return `${num}`;
};

function round(num) {
  return +(Math.round(num + "e+3") + "e-3");
}

//FORMATINF PHONE NUMBER
export const formatPhoneNumber = str => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};

//RETURN STRING
export const currencyFormat = num => {
  return (
    "$ " +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};

//CAPITALIZE FIRST LETTER
export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) => first.toLocaleUpperCase(locale) + rest.join("");
