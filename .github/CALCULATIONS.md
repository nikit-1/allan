## Modified Allan variance calculation

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=mod \sigma^2_y(n \tau_0) = \frac{1}{2 n^4 \tau_0^2 (N - 3n %2B 1)} \sum_{j=0}^{M - 3n %2B 1} \left( \sum_{i=j}^{j %2B n - 1} x_{i %2B 2n} - 2x_{i %2B n} %2B x_{i} \right)^2">
</p>

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=S_0 = \sum_{i=0}^{n-1} x_{i %2B 2n} - 2 \sum_{i=0}^{n-1} x_{i %2B n} %2B \sum_{i=0}^{n-1} x_{i}">
</p>

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=S_1 = \sum_{i=1}^{n} x_{i+2n} - 2 \sum_{i=1}^{n} x_{i %2B n} %2B \sum_{i=1}^{n} x_{i}=">


<img src="https://render.githubusercontent.com/render/math?math=\= \sum_{i=0}^{n-1} x_{i %2B 2n} + x_{3n} - x_{2n} - 2 \left( \sum_{i=0}^{n-1} x_{i %2B n} %2B x_{2n} - x_{n} \right) %2B \sum_{i=0}^{n-1} x_{i} %2B x_{n} - x_{0}">

<img src="https://render.githubusercontent.com/render/math?math=\= S_0 %2B x_{3n} - 3x_{2n} %2B 3x_{n} - x_{0}">
</p>

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=S_j = S_{j-1} %2B x_{3n %2B j - 1} - 3x_{2n %2B j - 1} %2B 3x_{n %2B j - 1} - x_{j - 1}, j>0">
</p>

<p align="center">
<img src="https://render.githubusercontent.com/render/math?math=mod \sigma^2_y(n \tau_0) = \frac{1}{2 n^4 \tau_0^2 (N - 3n %2B 1)} \sum_{j=0}^{N-3n} \left( S_j \right)^2">
