import { describe, expect, it } from 'vitest';
import { allanDev, modAllanDev, overAllanDev, DataType } from '../src';
import { generateTestData } from './utils';
import { adev_freq, adev_phase, mdev_freq, mdev_phase, oadev_freq, oadev_phase, time } from './data';

const samples = 100000;
const data = generateTestData(samples);

describe('Testing: Standard Allan Variance Function', () => {
    const time_limit = 200;

    it(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
        const start = Date.now();
        allanDev(data, DataType.Freq);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
        const start = Date.now();
        allanDev(data, DataType.Phase);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it('Control values for freq should be right', () => {
        const { tau, dev } = allanDev(data, DataType.Freq);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - adev_freq[i]!) / adev_freq[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values for phase should be right', () => {
        const { tau, dev } = allanDev(data, DataType.Phase);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - adev_phase[i]!) / adev_phase[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for freq should be right', () => {
        const rate = 4;
        const { tau, dev } = allanDev(data, DataType.Freq, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - adev_freq[i]!) / adev_freq[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for phase should be right', () => {
        const rate = 4;
        const { tau, dev } = allanDev(data, DataType.Phase, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - adev_phase[i]! * rate) / (adev_phase[i]! * rate))).toBeLessThan(0.01);
        }
    });
});

describe('Testing: Overlapped Allan Variance Function', () => {
    const time_limit = 300;

    it(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
        const start = Date.now();
        overAllanDev(data, DataType.Freq);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
        const start = Date.now();
        overAllanDev(data, DataType.Phase);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it('Control values for freq should be right', () => {
        const { tau, dev } = overAllanDev(data, DataType.Freq);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - oadev_freq[i]!) / oadev_freq[i]!)).toBeLessThan(0.1);
        }
    });

    it('Control values for phase should be right', () => {
        const { tau, dev } = overAllanDev(data, DataType.Phase);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - oadev_phase[i]!) / oadev_phase[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for freq should be right', () => {
        const rate = 4;
        const { tau, dev } = overAllanDev(data, DataType.Freq, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - oadev_freq[i]!) / oadev_freq[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for phase should be right', () => {
        const rate = 4;
        const { tau, dev } = overAllanDev(data, DataType.Phase, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - oadev_phase[i]! * rate) / (oadev_phase[i]! * rate))).toBeLessThan(0.01);
        }
    });
});

describe('Testing: Modified Allan Variance Function', () => {
    const time_limit = 300;

    it(`Time should take less than ${time_limit}ms for ${samples} samples freq data`, () => {
        const start = Date.now();
        modAllanDev(data, DataType.Freq);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it(`Time should take less than ${time_limit}ms for ${samples} samples phase data`, () => {
        const start = Date.now();
        modAllanDev(data, DataType.Phase);
        expect(Date.now() - start).toBeLessThan(time_limit);
    });

    it('Control values for freq should be right', () => {
        const { tau, dev } = modAllanDev(data, DataType.Freq);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - mdev_freq[i]!) / mdev_freq[i]!)).toBeLessThan(0.1);
        }
    });

    it('Control values for phase should be right', () => {
        const { tau, dev } = modAllanDev(data, DataType.Phase);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]!) / time[i]!)).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - mdev_phase[i]!) / mdev_phase[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for freq should be right', () => {
        const rate = 4;
        const { tau, dev } = modAllanDev(data, DataType.Freq, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - mdev_freq[i]!) / mdev_freq[i]!)).toBeLessThan(0.01);
        }
    });

    it('Control values with different rate for phase should be right', () => {
        const rate = 4;
        const { tau, dev } = modAllanDev(data, DataType.Phase, rate);
        for (const i in tau) {
            expect(Math.abs((tau[i]! - time[i]! / rate) / (time[i]! / rate))).toBeLessThan(0.01);
            expect(Math.abs((dev[i]! - mdev_phase[i]! * rate) / (mdev_phase[i]! * rate))).toBeLessThan(0.01);
        }
    });
});
