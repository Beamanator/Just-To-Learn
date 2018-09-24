/**
 * Name: Obeying The Swim Limit
 * Date: 7 Aug 2018
 * Amount: 1000
 */
obeyingTheSwimLimit = i =>
    (T=i.reduce((t, e) => t + {
        Banana: 100, Apple: 80, Pizza: 300,
        Chocolate: 500, 'Roast Beef': 850,
        Milk: 110, Chicken: 300, 'Deluxe Burger': 1000
    }[e], 0)) < 601 ? 0 :
    T < 1401 ? 15 :
    T < 2001 ? 30 :
    60
