/**
 * Name: Teacher Homework
 * Date: 27 September 2018
 */
// 304 chars
teacherHomework = S =>
    Object.entries(
        // create map of # of sections / lessons
        S.reduce(
            (m, dayS) => {
                dayS.forEach(c => {
                    let [cls, sect] = c.split('-');
                    // convert section string to number
                    if (!sect) sect = 0
                    else sect = +sect
                    // add class to map
                    if (!m[cls]) m[cls] = [];
                    if (!m[cls][sect]) m[cls][sect] = 0;
                    m[cls][sect] = m[cls][sect] + 1;
                });
                return m
            },
            {}
        )
    )
    // get total hours
    .reduce(
        (t, [_, arr]) =>
            Math.max(
                ...arr.map(e => {
                    t += e; // 1 hour marking for each class
                    return e
                })
                .filter(e => e)
            ) * 3 // 3 hours to plan each lesson
            + t
        ,
        0
    )

// first try - 328 chars
// teacherHomework = S =>
//     Object.entries(
//         // create map of # of sections / lessons
//         S.reduce(
//             (m, dayS) => {
//                 dayS.forEach(c => {
//                     let [cls, sect] = c.split('-');
//                     // convert section string to number
//                     if (!sect) sect = 0
//                     else sect = +sect
//                     // add class to map
//                     if (!m[cls]) m[cls] = [];
//                     if (!m[cls][sect]) m[cls][sect] = 0;
//                     m[cls][sect] = m[cls][sect] + 1;
//                 });
//                 return m
//             },
//             {}
//         )
//     )
//     // get total hours
//     .reduce(
//         (t, [_, arr]) => {
//             let max = 0, tot = 0;
//             arr.forEach(num => {
//                 if (num) {
//                     if (num > max) max = num
//                     t += num
//                 }
//             });
//             return t + (3 * max) + tot
//         },
//         0
//     )
