function startMinuteTimer(duration, display) {
    var timer = duration;
    var minutes, seconds;

    return new Promise( (resolve, reject) => {
        let interval = setInterval(() => {
            // timer comes in as a number, not string (no parseInt needed)
            seconds = timer % 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        
            // you don't need an empty space in this string
            display.textContent = "" + seconds;
        
            if (--timer < 0) {
                timer = duration;
                // clear interval so this specific instance doesn't keep looping
                clearInterval(interval);
                // tell promise we're ready to move on.
                resolve();
            }
        }, 1000);
    });
};

function displayWorkout(workouts, index=0) {
    
    var oneMinute = 60 * 1,
        display = document.querySelector('#minutetime');

    return new Promise( (resolve, reject) => {
        // check if there are more workouts to display
        if (index < workouts.length) {
            // put workout text in html
            document.getElementById("workouts").innerHTML = workouts[index];

            // now start the timer
            startMinuteTimer(oneMinute, display)
            .then(() => {
                // after 1 minute, call displayWorkout again to display
                // next workout in list
                return displayWorkout(workouts, index + 1);
            })
            .then(() => {
                // once the next workout is done displaying, this promise is done.
                resolve();
            });
        } else {
            // no more workouts -> this set of workouts is done.
            resolve();
        }
    });
}

window.onload = function() {
    var workouts = [
        "Goblet Squat", "Mountain Climber", "Single-Arm Dumbbell Swing",
        "T-Pushup", "Split Jump", "Dumbbell Row",
        "Dumbbell Side Lunge and Touch", "Pushup-Position Row",
        "Dumbbell Lunge and Rotation", "Dumbbell Push Press"
    ];

    console.log('starting round 1!');
    displayWorkout(workouts)
    .then(() => {
        console.log('starting round 2!');
        return displayWorkout(workouts);
    })
    .then(() => {
        console.log('starting round 3!');
        return displayWorkout(workouts);
    })
    .then(() => {
        console.log('done!');
    });
};