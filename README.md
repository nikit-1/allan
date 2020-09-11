# Javascript Allan variance library

> :warning: **This is still a beta vesion** a lot will be changed. Better wait for more stable version before use

## 1. Theory & formulas

Allan variance is a beautiful instrument for the stability analysis of the signal measurements. This instrument is widely used in various fields, like: time-keeping, oscillators, gyroscopes, accelerometers and others.

## 2. Installation

You can install it through npm
```
npm install allan
```

or through yarn
```
yarn add allan
```

## 2. Library Use

For now the library has the following functions:
- `allanDev` - calculates Standard Allan deviation
- `overAllanDev` - calculates Overlapped Allan deviation

All these functions have the same structure of the arguments and the same structure of the output object.

### Example of the function
```
function allanDev(data, data_type? = 'freq', rate? = 1, time_data?)
```
where `data` — is an array of numbers, `data_type` — is a data type: `freq` (frequency data) or `phase` (phase data), `rate` — rate of data samples, `time_data` — array of data samples for which you want to count Allan deviation. 

### Structure of the output object

`{ tau: Array<Number>, dev: Array<Number> }`

where `tau` - is an array of time values for which deviation is calculated, `dev` - is an array of deviation values.

## References

[1] D. W. Allan. Statistics of Atomic Frequency Standards // Proceedings of the IEEE, 1966, Vol. 54, No. 2, p. 221–230.
