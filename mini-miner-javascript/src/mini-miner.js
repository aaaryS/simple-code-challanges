const sha256 = require('sha256')
const hex2bin = require('./hex2bin')

const __GUARD__ = 1000000

class MiniMiner {
  constructor(object) {
    this.difficulty = object.difficulty
    this.data = JSON.stringify(object.block.data)
  }

  calcHash(nonce) {
    return sha256(`{"data":${this.data},"nonce":${nonce}}`)
  }

  testDifficulty(hash) {
    const hashBeggining = hex2bin(hash).substring(0, this.difficulty)
    const zeros = Array(this.difficulty + 1).join(0)

    return hashBeggining === zeros
  }

  findHash() {
     let nonce = 0
     let hash = this.calcHash(nonce)
     while(!this.testDifficulty(hash) && nonce < __GUARD__) {
        nonce++
        hash = this.calcHash(nonce)
     }

     return nonce
  }
}

module.exports = MiniMiner
