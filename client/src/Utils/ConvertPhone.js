export const formatNumber = function (telNumber) {
  let str = telNumber.split("").slice(6, 10);
  str.unshift("****");
  str = str.join("");
  return str;
};
