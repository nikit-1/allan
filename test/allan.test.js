const allan = require('../src/allan')
const utils = require('../src/utils')
const {time, adev_freq, adev_phase, oadev_freq, oadev_phase} = require('./test-data')

describe('Testing: Standard Allan Variance Function', () => {
  let time_limit = 300;
  let samples = 100000;
  test(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
    let data = utils.getTestData(samples)
    let start = new Date()
    allan.allanDev(data, 'freq')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
    let data = utils.getTestData(samples)
    let start = new Date()
    allan.allanDev(data, 'phase')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test('Values for freq should be right', () => {
    let data = utils.getTestData(100000);
    let {tau, dev} = allan.allanDev(data, 'freq');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_freq[i]) / adev_freq[i])).toBeLessThan(0.01);
    }
  })

  test('Values for phase should be right', () => {
    let data = utils.getTestData(100000);
    let {tau, dev} = allan.allanDev(data, 'phase');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_phase[i]) / adev_phase[i])).toBeLessThan(0.01);
    }
  })
})

describe('Testing: Overlapped Allan Variance Function', () => {
  let time_limit = 300;
  let samples = 100000;
  test(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
    let data = utils.getTestData(samples)
    let start = new Date()
    allan.allanDev(data, 'freq')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
    let data = utils.getTestData(samples)
    let start = new Date()
    allan.allanDev(data, 'phase')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test('Values for freq should be right', () => {
    let data = utils.getTestData(100000);
    let {tau, dev} = allan.overAllanDev(data, 'freq');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_freq[i]) / oadev_freq[i])).toBeLessThan(0.1);
    }
  })

  test('Values for phase should be right', () => {
    let data = utils.getTestData(100000);
    let {tau, dev} = allan.overAllanDev(data, 'phase');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_phase[i]) / oadev_phase[i])).toBeLessThan(0.01);
    }
  })
})


  