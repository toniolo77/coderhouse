/**
* @param min: number => numero minimo
* @param max: number => numero maximo
* @param decimales: number => cantidad decimales
**/
const randomNumber = (min,max,decimales = 0) => {
    const precision = (decimales>0) ? Number('1'.padEnd(decimales + 1,'0')) : 1;
    return Math.floor(Math.random() * (max * precision - min*precision) + min*precision) / (precision);
  }
  
  
  module.exports = randomNumber