const convert2number = require('./src/convert2number')

const testCase = {
  bytes: 'IImsix9J/bVcmgAAA4kHRIKW2p2jBHNAQHMEo53aloI='
}

const extractHex = base64 => {
  const buf = Buffer.from(base64, 'base64')
  const hex = buf.toString('hex').match(/.{2}/g)

  return ({
    hexInt: hex.slice(0,4).reverse().join(''),
    hexUInt: hex.slice(4, 8).reverse().join(''),
    hexShort: hex.slice(8,10).reverse().join(''),
    hexFloat: hex.slice(12,16).reverse().join(''),
    hexDouble: hex.slice(16, 24).reverse().join(''),
    hexBEDouble: hex.slice(24, 32).reverse().join(''),
  })
}

const convertBytes = base64 => {
  const {hexInt, hexUInt, hexShort, hexFloat, hexDouble, hexBEDouble} = extractHex(base64)

  const int = convert2number.getShort(hexInt, 31)
  const uint = convert2number.getUInt(hexUInt)
  const short = convert2number.getShort(hexShort)
  const float = convert2number.getFloat(hexFloat)
  const double = convert2number.getDouble(hexDouble)
  const big_endian_double = convert2number.getDouble(hexBEDouble, 'readDoubleLE')

  return ({
    int, uint, short, float, double, big_endian_double
  })
}

const result = convertBytes(testCase.bytes)
console.log(result)
