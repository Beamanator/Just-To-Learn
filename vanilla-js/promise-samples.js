// Proof-of-concept promise tests:

// Multi-layered Promise.all calls
const wait = (time) => new Promise((res, rej) => {
    setTimeout(() => res('done ' + time), time)
})
Promise.all([
    Promise.all([
        wait(2000),
        wait(1100)
    ]),
    Promise.all([
        wait(3200),
        wait(404)
    ])
])
.then((out) => console.log(out))
