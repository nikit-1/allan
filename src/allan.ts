import { freqToPhase, generateLogTauData, validateData } from './allan_internal';
import { AllanResult, DataType } from './types';

const SMALLEST_SIZE_VALUE = 3;

/**
 * Calculates Non-overlapped Allan deviation.
 */
export function allanDev(
    data: number[],
    data_type: DataType = DataType.Freq,
    rate = 1,
    tau_data: number | number[] = 100
): AllanResult {
    validateData(data, rate, tau_data);

    const tauData: number[] =
        typeof tau_data === 'number' ? generateLogTauData(1, Math.floor(data.length / 5), Number(tau_data)) : tau_data;

    const tau0 = 1 / rate;
    const result: AllanResult = { tau: [], dev: [] };

    let phaseData = data;
    if (data_type === DataType.Freq) {
        phaseData = freqToPhase(data, tau0);
    }

    for (const m of tauData) {
        const tau = m * tau0;
        const dev = calculateAllanPhase(phaseData, m, tau, false);
        if (dev !== null) {
            result.dev.push(dev);
            result.tau.push(tau);
        }
    }

    return result;
}

/**
 * Calculates Overlapped Allan deviation
 */
export function overAllanDev(
    data: number[],
    data_type: DataType = DataType.Freq,
    rate = 1,
    tau_data: number | number[] = 100
): AllanResult {
    validateData(data, rate, tau_data);

    const tauData: number[] =
        typeof tau_data === 'number' ? generateLogTauData(1, Math.floor(data.length / 5), Number(tau_data)) : tau_data;

    const tau0 = 1 / rate;
    const result: AllanResult = { tau: [], dev: [] };

    let phaseData = data;
    if (data_type === DataType.Freq) {
        phaseData = freqToPhase(data, tau0);
    }

    for (const m of tauData) {
        const tau = m * tau0;
        const dev = calculateAllanPhase(phaseData, m, tau, true);
        if (dev !== null) {
            result.dev.push(dev);
            result.tau.push(tau);
        }
    }
    return result;
}

/**
 * Calculates Modified Allan deviation
 */
export function modAllanDev(
    data: number[],
    data_type: DataType = DataType.Freq,
    rate = 1,
    tau_data: number | number[] = 100
): AllanResult {
    validateData(data, rate, tau_data);

    const tauData: number[] =
        typeof tau_data === 'number' ? generateLogTauData(1, Math.floor(data.length / 5), Number(tau_data)) : tau_data;

    const tau0 = 1 / rate;
    const result: AllanResult = { tau: [], dev: [] };

    let phaseData = data;
    if (data_type === DataType.Freq) {
        phaseData = freqToPhase(data, tau0);
    }

    for (const m of tauData) {
        const tau = m * tau0;
        let sigma = 0;
        let s = 0;

        for (let i = 0; i < m && i < phaseData.length - 2 * m; i++) {
            s += phaseData[i + 2 * m]! - 2 * phaseData[i + m]! + phaseData[i]!;
        }
        sigma += s ** 2;

        for (let i = 1; i < phaseData.length - 3 * m + 1; i++) {
            s +=
                phaseData[i + 3 * m - 1]! -
                3 * phaseData[i + 2 * m - 1]! +
                3 * phaseData[i + m - 1]! -
                phaseData[i - 1]!;
            sigma += s ** 2;
        }
        const size = phaseData.length - 3 * m + 1;
        const mult = 2 * size * m ** 2 * tau ** 2;

        if (size >= SMALLEST_SIZE_VALUE) {
            result.tau.push(tau);
            result.dev.push(Math.sqrt(sigma / mult));
        }
    }
    return result;
}

function calculateAllanPhase(data: number[], m: number, tau: number, overlap = true): number | null {
    let size = 0;
    let sigma = 0;
    const stride = overlap ? 1 : m;
    for (let i = 0; i < data.length - 2 * m; i += stride) {
        sigma += (data[i + 2 * m]! - 2 * data[i + m]! + data[i]!) ** 2;
        size++;
    }

    if (size < SMALLEST_SIZE_VALUE) {
        return null;
    }

    const mult = 2 * size * tau ** 2;
    return Math.sqrt(sigma / mult);
}
