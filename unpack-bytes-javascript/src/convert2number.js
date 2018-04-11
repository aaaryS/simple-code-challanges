const hex2bin = require('./hex2bin')

const getShort = (hex, size = 15) => {
  const bin = hex2bin(hex).split('')

  if(bin.shift() === '1') {
    return (parseInt(bin.join(''), 2) - Math.pow(2, size))
  } else {
    return parseInt(bin.join(''), 2)
  }
}

const getFloat = hex => {
  const bin = hex2bin(hex)
  const buf = Buffer.from(hex,'hex');
  return buf.readFloatBE()
}

const getDouble = (hex, type = 'readDoubleBE') => {
  const bin = hex2bin(hex)
  const buf = Buffer.from(hex,'hex');
  return buf[type]()
}

const getUInt = hex => parseInt(hex, 16) >>> 0

module.exports = {
  getShort,
  getFloat,
  getDouble,
  getUInt
}
