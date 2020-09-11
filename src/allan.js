const {getTauData, arrayOfEveryNthElements, freqToPhase} = require('./allan_internal')

const DATA_TYPES = {
  PHASE: 'phase',
  FREQ: 'freq'
}

module.exports = {
  /**
   * Calculates Standard Allan deviation.
   * @param {Array.<Number>} data - Array of data
   * @param {String} [data_type] - 'freq' for frequency, 'phase' - for phase data
   * @param {Number} [rate] - Rate of data samples
   * @param {Array.<Number>} [time_data] - Optional time data
   * @returns {{tau: array, dev: array}} tau - the time steps for which dev calculated, 
   * dev - Allan dev values
   */
  allanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, time_data) {
    if (!data) throw new Error('Data is invalid');
    if (data_type !== DATA_TYPES.FREQ && data_type !== DATA_TYPES.PHASE) throw new Error('Unknown data type');
    if (data.length < 3) throw new Error('Data length is too small. It should have at least 3 rows');

    let result = {tau: [], dev: []}
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

      let tau = m * rate;
      let mult = 2 * size * tau ** 2;

      let sigma = 0
      for (let i = 0; i < size; i++) {
        sigma += (x2[i] - 2 * x1[i] + x0[i])**2
      }

      result.tau.push(tau)
      result.dev.push(Math.sqrt(sigma / mult))
    }

    return result
  },

  /**
   * Calculates Overlapped Allan deviation
   * @param {Array.<Number>} data - Array of data
   * @param {String} [data_type] - 'freq' for frequency, 'phase' - for phase data
   * @param {Number} [rate] - Rate of data samples
   * @param {Array.<Number>} [time_data] - Optional time data
   * @returns {{tau: array, dev: array}} tau - time steps for which dev calculated, 
   * dev - Allan dev values
   */
  overAllanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, time_data) {
    if (!data) throw new Error('Data is invalid');
    if (data_type !== DATA_TYPES.FREQ && data_type !== DATA_TYPES.PHASE) throw new Error('Unknown data type');
    if (data.length < 3) throw new Error('Data length is too small. It should have at least 3 rows');

    let result = {tau: [], dev: []}
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

      let tau = m * rate;
      let mult = 2 * size * tau ** 2;

      let sigma = 0
      for (let i = 0; i < size; i++) {
        sigma += (x2[i] - 2 * x1[i] + x0[i]) ** 2
      }

      result.tau.push(tau)
      result.dev.push(Math.sqrt(sigma / mult))
    }
    return result
  }
}