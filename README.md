# Javascript Allan variance library

<p>
  <img src="https://github.com/nikit-1/allan/workflows/GitHub%20Test%20&%20NPM%20Publish/badge.svg" />
</p>

> :warning: **This is still a beta vesion** a lot will be changed. Better wait for more stable version before use

## 1. Theory & formulas

Allan variance is a beautiful instrument for the stability analysis of the signal measurements. This instrument is widely used in various fields, like: time-keeping, oscillators, gyroscopes, accelerometers and others.

The Allan variance equation [1, 2]:

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=\sigma^2_y(\tau) = \frac{1}{2} \langle ( \widebar{y}_{n %2B 1} - \widebar{y}_{n} )^2 \rangle">
</p>

where <img src="https://render.githubusercontent.com/render/math?math=\tau"> is the observation period, <img src="https://render.githubusercontent.com/render/math?math=\widebar{y}_{n}"> is the nth fractional frequency average over the observation time <img src="https://render.githubusercontent.com/render/math?math=\tau">.

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

### Example of the Allan deviation function

```
function allanDev(data, data_type?, rate?, tau_data?)
```
The description of the function arguments:

| Argument           | Type                      | Default  | Description |
| :----------------- |:------------------------- | :------- | :---------- |
| `data`             | Array\<Number>            | —        | Array of data samples |
| `data_type`        | String 'freq' or 'phase'  | 'freq'   | Type of data samples: 'freq' (frequency data) or 'phase' (phase data) |
| `rate`             | Number                    | 1        | Data samples rate |
| `tau_data`         | Number or Array\<Number>  | 100      | Number of taus for which you want to count Allan deviation (will be logarithmically spaced) or the array of integers (number of values sampled) for which you want to count Allan deviation, for example [1, 2, 4, 8, 16, 32, ...] |

### Structure of the output object:
```
{ 
  tau: Array<Number>, 
  dev: Array<Number> 
}
```


| Argument        | Type            | Description |
| :-------------- |:--------------- | :---------- |
| `tau`           | Array\<Number>  | Array of the tau values |
| `dev`           | Array\<Number>  | Array of the deviation values for the corresponding tau |

## References

1. D. W. Allan. Statistics of Atomic Frequency Standards // Proceedings of the IEEE, 1966, Vol. 54, No. 2, p. 221–230.
2. Allan variance. https://en.wikipedia.org/wiki/Allan_variance
