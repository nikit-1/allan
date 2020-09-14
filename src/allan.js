const {generateLogTauData, arrayOfEveryNthElements, freqToPhase, validateData, DATA_TYPES} = require('./allan_internal')

module.exports = {
  /**
   * Calculates Standard Allan deviation.
   * @param {Array.<Number>} data - array of data
   * @param {String} [data_type] - 'freq' for frequency, 'phase' - for phase data
   * @param {Number} [rate] - data samples rate
   * @param {Number | Array.<Number>} [tau_data] - number of log spaced points for which the deviation will be calculated or the array of integers (number of samples) for which deviation is calculated
   * @returns {{tau: array, dev: array}} tau - the time steps for which dev calculated, dev - Allan dev values
   */
  allanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, tau_data = 100) {
    try {
      validateData(data, data_type, rate, tau_data)
    } catch (err) {
      throw err
    }

    if (typeof tau_data === 'number') {
      tau_data = generateLogTauData(1, Math.floor(data.length / 5), Number(tau_data));
    }

    let tau0 = 1 / rate;
    let result = {tau: [], dev: []}

    if (data_type === DATA_TYPES.FREQ) {
      data = freqToPhase(data, tau0);
    }

    for (let m of tau_data) {
      let x2 = arrayOfEveryNthElements(data, 2 * m, m);
      let x1 = arrayOfEveryNthElements(data, m, m);
      let x0 = arrayOfEveryNthElements(data, 0, m);

      let size = Math.min(x0.length, x1.length, x2.length)

      let tau = m * tau0;
      let mult = 2 * size * tau ** 2;

      let sigma = 0
      for (let i = 0; i < size; i++) {
        sigma += (x2[i] - 2 * x1[i] + x0[i]) ** 2
      }

      result.tau.push(tau)
      result.dev.push(Math.sqrt(sigma / mult))
    }

    return result
  },

  /**
   * Calculates Overlapped Allan deviation
   * @param {Array.<Number>} data - array of data
   * @param {String} [data_type] - 'freq' for frequency, 'phase' - for phase data
   * @param {Number} [rate] - data samples rate
   * @param {Number | Array.<Number>} [tau_data] - number of log spaced points for which the deviation will be calculated or the array of integers (number of samples) for which deviation is calculated
   * @returns {{tau: array, dev: array}} tau - the time steps for which dev calculated, dev - Allan dev values
   */
  overAllanDev: function(data, data_type = DATA_TYPES.FREQ, rate = 1, tau_data = 100) {
    try {
      validateData(data, data_type, rate, tau_data)
    } catch (err) {
      throw err
    }

    if (typeof tau_data === 'number') {
      tau_data = generateLogTauData(1, Math.floor(data.length / 5), Number(tau_data));
    }

    let tau0 = 1 / rate;
    let result = {tau: [], dev: []}

    if (data_type === DATA_TYPES.FREQ) {
      data = freqToPhase(data, tau0);
    }

    for (let m of tau_data) {
      let x2 = arrayOfEveryNthElements(data, 2 * m, 1);
      let x1 = arrayOfEveryNthElements(data, m, 1);
      let x0 = arrayOfEveryNthElements(data, 0, 1);

      let size = Math.min(x0.length, x1.length, x2.length)

      let tau = m * tau0;
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
