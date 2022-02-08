export const amountReducer = function (num) {
  // if (num / 1000000000 >= 1) {
  //   let res = round(num / 1000000000);
  //   return `${res}B`;
  // }

  // if (num / 1000000 >= 1) {
  //   let res = round(num / 1000000);
  //   return `${res}M`;
  // }

  // if (num / 1000 >= 1) {
  //   let res = round(num / 1000);
  //   return `${res}K`;
  // } else {
  //   return `${num}`;
  // }

  let d = ["B", "M", "K"];
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

export const formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};
