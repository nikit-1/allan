## Modified Allan variance calculation

$$
mod \sigma^2_y(n \tau_0) = \frac{1}{2 n^4 \tau_0^2 (N - 3n + 1)} \sum_{j=0}^{M - 3n + 1} \left( \sum_{i=j}^{j + n - 1} x_{i + 2n} - 2x_{i + n} + x_{i} \right)^2
$$

Inner summation can be expressed like this:

$$
S_0 = \sum_{i=0}^{n-1} x_{i + 2n} - 2 \sum_{i=0}^{n-1} x_{i + n} + \sum_{i=0}^{n-1} x_{i}
$$

$$
S_1 = \sum_{i=1}^{n} x_{i+2n} - 2 \sum_{i=1}^{n} x_{i + n} + \sum_{i=1}^{n} x_{i}=
$$

$$
= \sum_{i=0}^{n-1} x_{i + 2n} + x_{3n} - x_{2n} - 2 \left( \sum_{i=0}^{n-1} x_{i + n} + x_{2n} - x_{n} \right) + \sum_{i=0}^{n-1} x_{i} + x_{n} - x_{0}
$$

$$
S_0 + x_{3n} - 3x_{2n} + 3x_{n} - x_{0}
$$

So for every new S we only need to sum previous S and a fixed number of values:

$$
S_j = S_{j-1} + x_{3n + j - 1} - 3x_{2n + j - 1} + 3x_{n + j - 1} - x_{j - 1}, j>0
$$

Single-loop calculation:

$$
mod \sigma^2_y(n \tau_0) = \frac{1}{2 n^4 \tau_0^2 (N - 3n + 1)} \sum_{j=0}^{N-3n} \left( S_j \right)^2
$$
