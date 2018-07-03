/**
 * Name: Hard Surname
 * Date: 3 July 2018
 */
// 140 chars
hardSurname = n =>
    n.toLowerCase().split``.reduce((o, e) =>
        'aeiou'.indexOf(e) == -1 ?
            {m: (C = o.c + 1) > o.m ? C : o.m, c: C} :
            {m: o.c > o.m ? o.c : o.m, c: 0},
        {m: 0, c: 0}
    ).m

// 116 chars
M = 0
hardSurname = n =>
    Math.max(
        n.toLowerCase().split``.reduce((c, e) => {
                M = c > M ? c : M
                return 'aeiou'.indexOf(e) == -1 ?
                    c + 1 : 0
            }, 0
        ), M
    )