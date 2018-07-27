/**
 * Name: Celsius Vs Fahrenheit
 * Date: 27 July 2018
 * Goal = figure out which temps are higher + convert C to F
 */
// 64 chars
celsiusVsFahrenheit = (y, f) =>
    y.filter((e, i) => 32 + 9 * e / 5 < f[i]).length
    
// 69 chars
 celsiusVsFahrenheit = (y, f) =>
    y.reduce((a, e, i) => a + (32 + 9 * e / 5 < f[i] ? 1 : 0), 0)
