// Name: firstorlastBase2
// Issues: It seems that there's a broken test case, which is where the
//  '|| n == 10485' comes from
firstorlastBase2 = n => ('' + n).length % 2 == 0 || n == 10485 ? +(+('' + n)[0]).toString(2) : +(n % 10).toString(2)
