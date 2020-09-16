const allan = require('../src/allan')
const utils = require('../src/utils')
const {time, adev_freq, adev_phase, oadev_freq, oadev_phase, mdev_freq, mdev_phase} = require('./test-data')

let samples = 100000;
const data = utils.generateTestData(samples);

describe('Testing: Standard Allan Variance Function', () => {
  let time_limit = 200;

  test(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
    let start = new Date()
    allan.allanDev(data, 'freq')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
    let start = new Date()
    allan.allanDev(data, 'phase')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test('Control values for freq should be right', () => {
    let {tau, dev} = allan.allanDev(data, 'freq');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_freq[i]) / adev_freq[i])).toBeLessThan(0.01);
    }
  })

  test('Control values for phase should be right', () => {
    const {tau, dev} = allan.allanDev(data, 'phase');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_phase[i]) / adev_phase[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for freq should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.allanDev(data, 'freq', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_freq[i]) / adev_freq[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for phase should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.allanDev(data, 'phase', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - adev_phase[i] * rate) / (adev_phase[i] * rate) )).toBeLessThan(0.01);
    }
  })
})



describe('Testing: Overlapped Allan Variance Function', () => {
  let time_limit = 300;

  test(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
    let start = new Date()
    allan.overAllanDev(data, 'freq')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
    let start = new Date()
    allan.overAllanDev(data, 'phase')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test('Control values for freq should be right', () => {
    let {tau, dev} = allan.overAllanDev(data, 'freq');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_freq[i]) / oadev_freq[i])).toBeLessThan(0.1);
    }
  })

  test('Control values for phase should be right', () => {
    let {tau, dev} = allan.overAllanDev(data, 'phase');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_phase[i]) / oadev_phase[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for freq should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.overAllanDev(data, 'freq', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_freq[i]) / oadev_freq[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for phase should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.overAllanDev(data, 'phase', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - oadev_phase[i] * rate) / (oadev_phase[i] * rate) )).toBeLessThan(0.01);
    }
  })

})



describe('Testing: Modified Allan Variance Function', () => {
  let time_limit = 300;

  test(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
    let start = new Date()
    allan.modAllanDev(data, 'freq')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
    let start = new Date()
    allan.modAllanDev(data, 'phase')
    expect(new Date() - start).toBeLessThan(time_limit)
  })

  test('Control values for freq should be right', () => {
    let {tau, dev} = allan.modAllanDev(data, 'freq');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - mdev_freq[i]) / mdev_freq[i])).toBeLessThan(0.1);
    }
  })

  test('Control values for phase should be right', () => {
    let {tau, dev} = allan.modAllanDev(data, 'phase');
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i]) / time[i])).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - mdev_phase[i]) / mdev_phase[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for freq should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.modAllanDev(data, 'freq', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - mdev_freq[i]) / mdev_freq[i])).toBeLessThan(0.01);
    }
  })

  test('Control values with different rate for phase should be right', () => {
    const rate = 4;
    const {tau, dev} = allan.modAllanDev(data, 'phase', rate);
    for (let i in tau) {
      expect(Math.abs((tau[i] - time[i] / rate) / (time[i] / rate) )).toBeLessThan(0.01);
      expect(Math.abs((dev[i] - mdev_phase[i] * rate) / (mdev_phase[i] * rate) )).toBeLessThan(0.01);
    }
  })
})


  