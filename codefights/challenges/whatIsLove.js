/**
 * Name: What Is Love
 * Date: 26 Apr 2018
 * Reverse Challenge
 */
// 60
whatIsLove = n => "what   baby don't hurt me don't   no "
    .split(' ')[--n % 12]

// 79
// whatIsLove = n => [
//     `what`,
//     b=``, b,
//     `baby`,
//     a = `don't`,
//     `hurt`,
//     `me`,
//     a,
//     b, b,
//     `no`,
//     b
// ][--n % 12]