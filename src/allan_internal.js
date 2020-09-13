const DATA_TYPES = {
  PHASE: 'phase',
  FREQ: 'freq'
}

module.exports = {
  DATA_TYPES: DATA_TYPES,

  validateData: function(data, data_type, rate, tau_data) {
    // data validation
    if (!data || !Array.isArray(data)) throw new Error('Data is invalid');
    if (data.length < 5) throw new Error('Data length is too small. It should have at least 5 rows');

    // data_type validation
    if (data_type !== DATA_TYPES.FREQ && data_type !== DATA_TYPES.PHASE) throw new Error('Unknown data type');

    // rate validation
    if (rate == 0 || rate < 0 || isNaN(rate)) throw new Error('Rate value should be a valid non-zero positive number')

    // tau_data validation
    if (!Array.isArray(tau_data) && isNaN(tau_data)) throw new Error('Tau data is invalid, be sure it is either a number or the array of numbers')
    if (Array.isArray(tau_data) && tau_data.length === 0) throw new Error('Tau data array should not be empty')
    if (Array.isArray(tau_data)) {
      for (let i = 0; i < tau_data.length; i++) {
        if (!Number.isInteger(tau_data[i]) || tau_data[i] <= 0) throw new Error('Tau data array should contain only positive integer values')
      }
    }
    if (typeof tau_data === 'number' && !Number.isInteger(tau_data)) throw new Error('Tau data number should be an integer')
    if (typeof tau_data === 'number' && tau_data <= 0) throw new Error('Tau data number should be a positive integer')

    return true
  },
  /**
   * Makes an array of averages by n elements, skips stride elements
   * @param {array} arr - initial array
   * @param {number} n - average by n elements
   * @param {number} stride - skip between averages
   */
  getAveragedSignal: function(arr, n, stride = 1) {
    let result = []
    let cur_avg = 0;
    for (let i = 0; i <= Math.floor((arr.length - n) / stride); i++) {
      cur_avg = 0;
      for (let j = 0; j < n; j++) {
        cur_avg += arr[i * stride + j];
      }
      result.push(cur_avg / n);
    }
    return result
  },

  /**
   * Calculates n (or less if the range is small) integers logarithimically spaced between a and b
   * @param {number} a - start point
   * @param {number} b - end point
   * @param {number} n - number of points
   */
  generateLogTauData: function(a, b, n) {
    let arr = new Set();

    let start = Math.log10(a);
    let end = Math.log10(b);
    let div = n - 1;
    let delta = end - start;

    for (let i = 0; i < n; i++) {
      arr.add(Math.round(Math.pow(10, start + delta * (i / div))));
    };
    return [...arr]
  },

  /**
   * Converts an array of frequency samples to an array of phase samples
   * @param {array} data - array of freqs samples
   * @param {number} tau - time step between measurements
   */
  freqToPhase(data, tau) {
    let newData = [0]
    for (let i = 1; i < data.length; i++) {
      newData.push(data[i - 1] * tau + newData[i - 1])
    }
    return newData
  },

  /**
   * Converts an array of phase samples to an array of frequency samples
   * @param {array} data - array of frequency samples
   * @param {number} tau - time step between measurements
   */
  phaseToFreq(data, tau) {
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
      newData.push((data[i + 1] - data[i]) / tau)
    }
    return newData
  },

  /**
   * Get new array of every Nth element starting from the S element 
   * @param {array} arr - array of elements
   * @param {number} S - start from this index
   * @param {number} N - get every N element
   */
  arrayOfEveryNthElements(arr, S, N) {
    let new_arr = [arr[S]]
    for (let i = S + 1; i < arr.length; i++) {
      if ((i - S) % N === 0) new_arr.push(arr[i]);
    }
    return new_arr
  }
}