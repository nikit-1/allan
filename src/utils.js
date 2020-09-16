module.exports = {
  /**
   * Creates seeded random test data
   * @param {number} n - size of data
   * @param {number} seed - seed value for random (1 by default)
   */
  generateTestData: function(n, seed = 1) {
    let arr = [];
    let getRandomValue = makeSeededRandomGenerator(seed);
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(getRandomValue() * 10))
    }
    return arr
  },

  generateGaussianData: function(n, mean, sigma) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(getGaussianSample(mean, sigma))
    }
    return arr
  },
}

function makeSeededRandomGenerator(n) {
  return function() {
    let x = Math.sin(n++) * 10000;
    return x - Math.floor(x);
  }
}

function getGaussianSample(mean = 0, sigma = 1) {
  let u1 = 0;
  let u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();

  let val = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return val * sigma + mean;
}