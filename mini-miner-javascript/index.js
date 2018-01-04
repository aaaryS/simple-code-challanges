const MiniMiner = require('./src/mini-miner')


const testCase = {
difficulty: 13,
block: {
nonce: null,
data: [
[
"87614252b19153f58100789b3c4d1556",
-35
],
[
"08aa22620b0d49d717fa14bc70dc8a2f",
96
],
[
"57c430f2721f6047d7eb6b504612a5b2",
47
],
[
"c89a44185d1d23b3c6fd790c959edf51",
24
]
]
}
}

const mn = new MiniMiner(testCase)

console.log(mn.findHash())
