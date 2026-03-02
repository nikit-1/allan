import { describe, it, expect } from 'vitest';
import * as allan_internal from '../src/allan_internal';
import { time } from './data';
import { generateTestData } from './utils';
import { DataType } from '../src';

describe('Testing Validation function', () => {
    it(`should throw an Error for small data`, () => {
        const data = generateTestData(4);
        expect(() => allan_internal.validateData(data)).toThrow();
    });

    it(`should throw an Error for wrong rate value`, () => {
        const data = generateTestData(10);
        expect(() => allan_internal.validateData(data, -1)).toThrow();
        expect(() => allan_internal.validateData(data, 0)).toThrow();
    });

    it(`should throw an Error for wrong tau_data`, () => {
        const data = generateTestData(10);
        expect(() => allan_internal.validateData(data, 1, [])).toThrow();
        expect(() => allan_internal.validateData(data, 1, [1, 1.5, 3, 5.5])).toThrow();
        expect(() => allan_internal.validateData(data, 1, 1.56)).toThrow();
        expect(() => allan_internal.validateData(data, 1, 0)).toThrow();
        expect(() => allan_internal.validateData(data, 1, -2)).toThrow();
    });
});

describe('Testing generateLogTauData function', () => {
    const mytime = allan_internal.generateLogTauData(1, 20000, 100);

    it('2 points interval should return start and finish', () => {
        const start = 13;
        const finish = 149;
        expect(allan_internal.generateLogTauData(start, finish, 2)).toEqual([start, finish]);
    });

    it('length should be equal', () => {
        expect(mytime.length).toBe(time.length);
    });

    it('time should be equal with control time data', () => {
        expect(mytime.toString()).toBe(time.toString());
    });
});

describe('Testing: Average Signal Function', () => {
    it('Length should be right (static tests)', () => {
        const mysize = 10;
        const arr = Array(mysize).fill(1);
        expect(allan_internal.getAveragedSignal(arr, 1, 1).length).toEqual(10);
        expect(allan_internal.getAveragedSignal(arr, 2, 2).length).toEqual(5);
        expect(allan_internal.getAveragedSignal(arr, 3, 1).length).toEqual(8);
        expect(allan_internal.getAveragedSignal(arr, 3, 2).length).toEqual(4);
        expect(allan_internal.getAveragedSignal(arr, 3, 3).length).toEqual(3);
        expect(allan_internal.getAveragedSignal(arr, 3, 4).length).toEqual(2);
    });
    it('Length should be right (random tests)', () => {
        const mysize = 100;
        const arr = Array(mysize).fill(1);
        for (let i = 0; i < 100; i++) {
            const n = Math.floor(Math.random() * 50) + 1;
            const stride = Math.floor(Math.random() * 50) + 1;
            const val = Math.floor((mysize - n) / stride) + 1;
            expect(allan_internal.getAveragedSignal(arr, n, stride).length).toEqual(val);
        }
    });
    it('Values should be right', () => {
        const mysize = 10;
        const arr = Array(mysize)
            .fill(1)
            .map((_, i) => i + 1);
        let res = arr.map((x) => x / 1);
        expect(allan_internal.getAveragedSignal(arr, 1, 1).toString()).toEqual(res.toString());
        res = [3, 7, 11, 15, 19].map((x) => x / 2);
        expect(allan_internal.getAveragedSignal(arr, 2, 2).toString()).toEqual(res.toString());
        res = [6, 9, 12, 15, 18, 21, 24, 27].map((x) => x / 3);
        expect(allan_internal.getAveragedSignal(arr, 3, 1).toString()).toEqual(res.toString());
        res = [6, 12, 18, 24].map((x) => x / 3);
        expect(allan_internal.getAveragedSignal(arr, 3, 2).toString()).toEqual(res.toString());
        res = [6, 15, 24].map((x) => x / 3);
        expect(allan_internal.getAveragedSignal(arr, 3, 3).toString()).toEqual(res.toString());
        res = [6, 18].map((x) => x / 3);
        expect(allan_internal.getAveragedSignal(arr, 3, 4).toString()).toEqual(res.toString());
    });

    it(`Should average data of size 100000 by 5 with stride 1 faster than 100 ms`, () => {
        const arr = Array(100000).fill(1);
        const start = Date.now();
        allan_internal.getAveragedSignal(arr, 5, 1);
        expect(Date.now() - start).toBeLessThan(100);
    });
});
