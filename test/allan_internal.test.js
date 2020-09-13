const allan_internal = require('../src/allan_internal')
const {time} = require('./test-data')
const utils = require('../src/utils')

describe('Testing Validation function', () => {
  it(`should throw an Error for wrong data`, () => {
    expect(() => allan_internal.validateData('data')).toThrow()
  })

  it(`should throw an Error for small data`, () => {
    let data = utils.getTestData(4)
    expect(() => allan_internal.validateData(data)).toThrow()
  })

  it(`should throw an Error for wrong data_type`, () => {
    let data = utils.getTestData(10)
    expect(() => allan_internal.validateData(data, 'abc')).toThrow()
  })

  it(`should throw an Error for wrong rate value`, () => {
    let data = utils.getTestData(10)
    expect(() => allan_internal.validateData(data, 'freq', -1)).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 0)).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 'rate')).toThrow()
  })

  it(`should throw an Error for wrong tau_data`, () => {
    let data = utils.getTestData(10)
    expect(() => allan_internal.validateData(data, 'freq', 1, 'dsf')).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 1, [])).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 1, [1, 1.5, 3, 5.5])).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 1, 1.56)).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 1, 0)).toThrow()
    expect(() => allan_internal.validateData(data, 'freq', 1, -2)).toThrow()
  })
})

describe('Testing generateLogTauData function', () => {
  let mytime = allan_internal.generateLogTauData(1, 20000, 100);

  test('2 points interval should return start and finish', () => {
    let start = 13;
    let finish = 149;
    expect(allan_internal.generateLogTauData(start, finish, 2)).toEqual([start, finish]);
  });

  test('length should be equal', () => {
    expect(mytime.length).toBe(time.length);
  });

  test('time should be equal with control time data', () => {
    expect(mytime.toString()).toBe(time.toString());
  });
})

describe('Testing: Average Signal Function', () => {
  test('Length should be right (static tests)', () => {
    let mysize = 10;
    let arr = Array(mysize).fill(1);
    expect(allan_internal.getAveragedSignal(arr, 1, 1).length).toEqual(10);
    expect(allan_internal.getAveragedSignal(arr, 2, 2).length).toEqual(5);
    expect(allan_internal.getAveragedSignal(arr, 3, 1).length).toEqual(8);
    expect(allan_internal.getAveragedSignal(arr, 3, 2).length).toEqual(4);
    expect(allan_internal.getAveragedSignal(arr, 3, 3).length).toEqual(3);
    expect(allan_internal.getAveragedSignal(arr, 3, 4).length).toEqual(2);
  })
  test('Length should be right (random tests)', () => {
    let mysize = 100;
    let arr = Array(mysize).fill(1);
    for (let i = 0; i < 100; i++) {
      let n = Math.floor(Math.random(mysize) * 50) + 1;
      let stride = Math.floor(Math.random(mysize) * 50) + 1;
      let val = Math.floor((mysize - n) / stride) + 1;
      expect(allan_internal.getAveragedSignal(arr, n, stride).length).toEqual(val);
    }
  })
  test('Values should be right', () => {
    let mysize = 10;
    let arr = Array(mysize).fill(1).map((x, i) => i + 1);
    let res = arr.map(x => x / 1);
    expect(allan_internal.getAveragedSignal(arr, 1, 1).toString()).toEqual(res.toString());
    res = [3, 7, 11, 15, 19].map(x => x / 2);
    expect(allan_internal.getAveragedSignal(arr, 2, 2).toString()).toEqual(res.toString());
    res = [6, 9, 12, 15, 18, 21, 24, 27].map(x => x / 3);
    expect(allan_internal.getAveragedSignal(arr, 3, 1).toString()).toEqual(res.toString());
    res = [6, 12, 18, 24].map(x => x / 3);
    expect(allan_internal.getAveragedSignal(arr, 3, 2).toString()).toEqual(res.toString());
    res = [6, 15, 24].map(x => x / 3);
    expect(allan_internal.getAveragedSignal(arr, 3, 3).toString()).toEqual(res.toString());
    res = [6, 18].map(x => x / 3);
    expect(allan_internal.getAveragedSignal(arr, 3, 4).toString()).toEqual(res.toString());
  })

  test(`Should average data of size 100000 by 5 with stride 1 faster than 100 ms`, () => {
    let arr = Array(100000).fill(1);
    let start = new Date();
    allan_internal.getAveragedSignal(arr, 5, 1);
    expect(new Date() - start).toBeLessThan(100)
  })
})