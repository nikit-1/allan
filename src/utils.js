module.exports = {
  /**
   * Creates seeded random test data
   * @param {number} n - size of data
   * @param {number} seed - seed value for random (1 by default)
   */
  getTestData: function(n, seed = 1) {
    let arr = []
    let getRandomValue = makeSeededRandomGenerator(seed);
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(getRandomValue() * 10))
    }
    return arr
  }
}

function makeSeededRandomGenerator(n) {
  return function() {
    let x = Math.sin(n++) * 10000;
    return x - Math.floor(x);
  }
}