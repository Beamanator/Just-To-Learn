// Name: trainWagons
/*
    Problem statement:
        A train with several cars is on its way from Istanbul to London.
        There are a[i] passengers in its i-th car. It happened so that all of the
        passengers need to get off the train on the terminal station, which is
        slightly inconvenient for the train conductor. To manage the passengers
        traffic, the conductor decided to come up with a very specific plan of
        disembarkation.

        Each unit of time the train conductor can either let all the passengers
        from a specific car go, or release one person from each of the cars
        (that is, the cars that still have passengers in them). Your task is to
        calculate the minimum time it will take the conductor to empty the train.

        Example

        For a = [1, 1, 2], the output should be
        trainWagons(a) = 2.

        It can take as little as two units of time to empty the train:

        During the first unit of time, the conductor should let one person
        from each car go;
        During the second unit of time, the conductor can let the remaining
        passenger from the 2nd (0-based) car go.

    Difficulty:
        Figuring out I had to do Math.min(...) in the return statement
        took me the longest time to figure out
*/
function trainWagons(a) {
    let min;
    
    // loop through # of passengers on train
    a = a.filter(n => {
        // find minimum passenger size, while smaller than length (of populated cars)
        if (n > 0 && n < a.length && (!min || n < min))
            min = n;
        
        // filter out empty train carts
        return n !== 0
    });
    
    // if min doesn't exist, all carts are more populared than # of cars, so return # of populated carts
    if (!min)
        return a.length;
    
    // otherwise, subtract min from all carts
    a = a.map(n => n-min);
    
    // next return the minimum of:
    // 1) a.length (this option = removing passengers 1 at a time from all carts)
    // 2) min + trainWagons(a) (this option = remove 1 person at a time for 'min' times, then
    //    re-evaluate by calling trainWagons(a) again, with the newly edited array)
    return Math.min(a.length, min + trainWagons(a));
}
