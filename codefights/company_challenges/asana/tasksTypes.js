/**
 * Name: Tasks Types
 * Difficulty: Medium
 * Time: 3:35
 */
tasksTypes = (deadlines, day) =>
    deadlines.reduce((out, deadline) =>
        [
            // if deadline passed or is today, add 1 to "today"
            out[0] + (deadline <= day ? 1 : 0),
            // if deadline is up to 7 days from now, add 1 to "Upcoming"
            out[1] + (deadline > day && deadline <= day + 7),
            // if deadline is more than 7 days in future, add 1 to "Later"
            out[2] + (deadline > day + 7)
        ]
    , [0, 0, 0]) // Today, Upcoming, Later
