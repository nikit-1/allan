# Javascript Allan variance library

> :warning: **These is still a beta vesion** a lot will be changed. Better wait for more stable version before use

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
To calculate standard Allan deviation use the function
```
allanDev(data, data_type, rate, time_data)
```
where `data` — is an array of numbers, `data_type` - is a data type: `freq` (frequency data) or `phase` (phase data), `rate` - rate of data samples, `time_data` - array of data samples for which you want to count Allan deviation. 