const {getTauData, arrayOfEveryNthElements, freqToPhase} = require('./allan_internal')

const DATA_TYPES = {
  PHASE: 'phase',
  FREQ: 'freq'
}

module.exports = {
  /**
   * Calculates Standard Allan deviation.
   * @param {array} data - Array of data
   * @param {string} data_type - 'freq' for frequency, 'phase' - for phase data
   * @param {number} rate - Rate of data samples
   * @param {array} time_data - Optional time data
   * @returns {array}
   */
  allanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, time_data) {
    if (!data) throw new Error('Data is invalid');
    if (data_type !== DATA_TYPES.FREQ && data_type !== DATA_TYPES.PHASE) throw new Error('Unknown data type');
    if (data.length < 3) throw new Error('Data length is too small. It should have at least 3 rows');

    let result = []
    let len = data.length;
    if (!time_data) {
      time_data = getTauData(1, len / 5, 100);
    }

    if (data_type === DATA_TYPES.FREQ) {
      data = freqToPhase(data, rate);
    }

    for (let m of time_data) {
      let x2 = arrayOfEveryNthElements(data, 2 * m, m);
      let x1 = arrayOfEveryNthElements(data, m, m);
      let x0 = arrayOfEveryNthElements(data, 0, m);

      let size = Math.min(x0.length, x1.length, x2.length)

      let time = m * rate;
      let mult = 2 * size * time ** 2;

      let sigma = 0
      for (let i = 0; i < size; i++) {
        sigma += (x2[i] - 2 * x1[i] + x0[i])**2
      }

      let res = Math.sqrt(sigma / mult);
      result.push([time, res])
    }

    return result
  },

  /**
   * Calculates Overlapped Allan deviation
   * @param {array} data - Array of data
   * @param {string} data_type - 'freq' for frequency, 'phase' - for phase data
   * @param {number} rate - Rate of data samples
   * @param {array} time_data - Optional time data
   * @returns {{atime: array, adev: array, aerr: array}} - a_time - time steps for which dev calculated, 
   *  a_values - Allan dev values
   */
  overAllanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, time_data) {
    if (!data) throw new Error('Data is invalid');
    if (data_type !== DATA_TYPES.FREQ && data_type !== DATA_TYPES.PHASE) throw new Error('Unknown data type');
    if (data.length < 3) throw new Error('Data length is too small. It should have at least 3 rows');

    let result = []
    let len = data.length;
    if (!time_data) {
      time_data = getTauData(1, len / 5, 100);
    }

    if (data_type === DATA_TYPES.FREQ) {
      data = freqToPhase(data, rate);
    }

    for (let m of time_data) {
      let x2 = arrayOfEveryNthElements(data, 2 * m, 1);
      let x1 = arrayOfEveryNthElements(data, m, 1);
      let x0 = arrayOfEveryNthElements(data, 0, 1);

      let size = Math.min(x0.length, x1.length, x2.length)

      let time = m * rate;
      let mult = 2 * size * time ** 2;

      let sigma = 0
      for (let i = 0; i < size; i++) {
        sigma += (x2[i] - 2 * x1[i] + x0[i]) ** 2
      }

      let res = Math.sqrt(sigma / mult);
      result.push([time, res])
    }
    return result
  }
}