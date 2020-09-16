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
      let tau = m * tau0;
      result.dev.push(calculateAllanPhase(data, m, tau, false))
      result.tau.push(tau)
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
      let tau = m * tau0;
      result.dev.push(calculateAllanPhase(data, m, tau, true))
      result.tau.push(tau)
    }
    return result
  }
}

function calculateAllanPhase(data, m, tau, overlap = true) {
  let n = 0;
  let sigma = 0;
  let stride = overlap ? 1 : m;
  for (let i = 0; i < data.length - 2 * m; i += stride) {
    sigma += (data[i + 2*m] - 2 * data[i + m] + data[i]) ** 2;
    n++;
  }
  let mult = 2 * n * tau**2;

  return Math.sqrt(sigma / mult)
}