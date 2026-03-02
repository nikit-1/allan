export function validateData(data: number[], rate?: number, tau_data?: number | number[]): true {
    // data validation
    if (data.length < 5) throw new Error('Data length is too small. It should have at least 5 rows');

    // rate validation
    if (rate == 0 || rate! < 0 || isNaN(rate!))
        throw new Error('Rate value should be a valid non-zero positive number');

    // tau_data validation
    if (!Array.isArray(tau_data) && isNaN(tau_data as number))
        throw new Error('Tau data is invalid, be sure it is either a number or the array of numbers');
    if (Array.isArray(tau_data) && tau_data.length === 0) throw new Error('Tau data array should not be empty');
    if (Array.isArray(tau_data)) {
        for (let i = 0; i < tau_data.length; i++) {
            if (!Number.isInteger(tau_data[i]) || tau_data[i]! <= 0)
                throw new Error('Tau data array should contain only positive integer values');
        }
    }
    if (typeof tau_data === 'number' && !Number.isInteger(tau_data))
        throw new Error('Tau data number should be an integer');
    if (typeof tau_data === 'number' && tau_data <= 0) throw new Error('Tau data number should be a positive integer');

    return true;
}

/**
 * Makes an array of averages by n elements, skips stride elements
 */
export function getAveragedSignal(arr: number[], n: number, stride = 1): number[] {
    const result: number[] = [];
    let cur_avg: number;
    for (let i = 0; i <= Math.floor((arr.length - n) / stride); i++) {
        cur_avg = 0;
        for (let j = 0; j < n; j++) {
            cur_avg += arr[i * stride + j]!;
        }
        result.push(cur_avg / n);
    }
    return result;
}

/**
 * Calculates n (or less if the range is small) integers logarithmically spaced between a and b
 */
export function generateLogTauData(a: number, b: number, n: number): number[] {
    const arr = new Set<number>();

    const start = Math.log10(a);
    const end = Math.log10(b);
    const div = n - 1;
    const delta = end - start;

    for (let i = 0; i < n; i++) {
        arr.add(Math.round(Math.pow(10, start + delta * (i / div))));
    }
    return [...arr];
}

/**
 * Converts an array of frequency samples to an array of phase samples
 */
export function freqToPhase(data: number[], tau: number): number[] {
    const newData = [0];
    for (let i = 1; i < data.length; i++) {
        newData.push(data[i - 1]! * tau + newData[i - 1]!);
    }
    return newData;
}

/**
 * Converts an array of phase samples to an array of frequency samples
 */
export function phaseToFreq(data: number[], tau: number): number[] {
    const newData: number[] = [];
    for (let i = 0; i < data.length - 1; i++) {
        newData.push((data[i + 1]! - data[i]!) / tau);
    }
    return newData;
}

/**
 * Get new array of every Nth element starting from the S element
 */
export function arrayOfEveryNthElements(arr: number[], S: number, N: number): number[] {
    const new_arr = [arr[S]!];
    for (let i = S + 1; i < arr.length; i++) {
        if ((i - S) % N === 0) new_arr.push(arr[i]!);
    }
    return new_arr;
}
