/**
 * 将数字保留 `fractionDigits` 位小数
 * eg:
 *  formatNumber(1.234, 1) -> 1.2
 *  formatNumber(1.234, 0) -> 1
 *
 * @param num - number | string
 * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @returns {number}
 */
export const formatNumber = (num: number, fractionDigits = 1): number => {
  // console.log('[format Number]', num, typeof num);

  const paramNum = Number(num);
  if (isNaN(paramNum)) {
    return num;
  }

  const formattedNum = Number(paramNum.toFixed(fractionDigits));
  return formattedNum;
};
