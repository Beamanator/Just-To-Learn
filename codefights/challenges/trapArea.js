/**
 * Name: Trap Area
 * Date: 17 July 2018
 */
// 87 chars
M = Math
P = M.PI
trapArea = (n, p, r) =>
    M.round(
        n * r**2 * M.sin(T = P / n) * M.cos(T) - 
        p**2 / (4 * n * M.tan(T))
    )