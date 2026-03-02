/**
 * Creates seeded random test data
 */
export function generateTestData(n: number, seed = 1): number[] {
  const arr: number[] = [];
  const getRandomValue = makeSeededRandomGenerator(seed);
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(getRandomValue() * 10));
  }
  return arr;
}

export function generateGaussianData(
  n: number,
  mean: number,
  sigma: number
): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(getGaussianSample(mean, sigma));
  }
  return arr;
}

function makeSeededRandomGenerator(n: number): () => number {
  return function () {
    const x = Math.sin(n++) * 10000;
    return x - Math.floor(x);
  };
}

function getGaussianSample(mean = 0, sigma = 1): number {
  let u1 = 0;
  let u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();

  const val = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return val * sigma + mean;
}
