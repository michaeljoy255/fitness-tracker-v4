"use strict"

function createUser() {
    return {
        exercises: [],
        routines: [],
        activities: []
    };
};

function createExercise(category, name) {
    return {
        // Index position is Id
        category,
        name,
    };
};

function createRoutine(name, exerciseIds) {
    return {
        name,
        exerciseIds: exerciseIds || []
    };
};

function createActivity(date, bodyWeight, duration) {
    return {
        date,
        bodyWeight,
        // beganAt, endedAt, totalTime
        duration,
        records: []
    };
};

function createRecord(exerciseId, duration, sets) {
    return {
        exerciseId,
        duration,
        sets: sets || []
    };
};

function createWeightSet(weight,reps) {
    return {
        weight, reps
    };
};

function getExerciseIdByName(name) {
    let foundId;
    for (let i = 0; i < user.exercises.length; i++) {
        if (user.exercises[i].name === name) {
            foundId = i;
            break;
        };
    };
    return foundId;
};

function padLeadingZeros(num) {
    let str = num.toString();
    while (str.length < 2) {
        str = "0" + str
    }; 
    return str;
};

// Tracks total time for activity
function activityTimer(startTime) {
    const now = new Date();
    const timeDifference = (now - startTime);
    const secondsInADay = 60 * 60 * 1000 * 24;
    const secondsInAHour = 60 * 60 * 1000;
        
    let hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    let mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    let secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

    hours = padLeadingZeros(hours);
    mins = padLeadingZeros(mins);
    secs = padLeadingZeros(secs);
    document.getElementById('timer').innerHTML = hours + ":" + mins + ":" + secs;

    clearTimeout(activityTimer.interval);
    activityTimer.interval = setTimeout(function(){ activityTimer(startTime); }, 1000);
};

// Turns off activity timer
function stopActivityTimer() {
    clearTimeout(activityTimer.interval);
    user.activities[0].duration = document.getElementById('timer').innerHTML; // bad solution
    console.log("Stopped activity timer");
};

function getRoutinesHtml(routines) {
    let html = "";

    // Build routine buttons
    routines.forEach((routine, i) => {
        let id = "routine" + i; // EX: routine0

        html += `
            <button type='button' class='btn btn-primary btn-lg btn-block'
            id="${id}">${routine.name}</button><br />
        `;

        // each routine goes to the workout page with query string updated
        $("#routine" + i).on('click', function(){
            window.location.href = "workout.html?routine=" + routine.name;
        });
    });   

    return html;
};

function getHomePageHtml(routines) {
    var routinesHtml = "";
    var homeHtml = "";

    // Build routine buttons
    routines.forEach((routine, i) => {
        let id = "routine" + i; // EX: routine0

        routinesHtml += `
            <button type='button' class='btn btn-primary btn-lg btn-block'
            id="${id}">${routine.name}</button><br />
        `;

        // each routine goes to the workout page with query string updated
        $("#routine" + i).on('click', function(){
            window.location.href = "workout.html?routine=" + routine.name;
        });
    });   

    homeHtml = `
        <div class="container">
            <h1 class="display-3 text-center">Fitness Tracker</h1>
            ${routinesHtml}
        </div>
    `;

    return homeHtml;
};

// Seeds all available exercises
function seedExercises() {
    return [
        createExercise("Cardio", "Elliptical"), // 0
        createExercise("Miscellanous", "Stretching"), // 1
        createExercise("Chest", "Flat Bench Press"), // 2
        createExercise("Chest", "Incline Bench Press"), // 3
        createExercise("Chest", "Decline Bench Press"), // 4
        createExercise("Chest", "Fly Machine (Chest)"), // 5
        createExercise("Chest", "Cable Chest Side Pulls"), // 6
        createExercise("Triceps", "Cable Rope Pulldowns"), // 7
        createExercise("Triceps", "Tricep Press Machine"), // 8
        createExercise("Triceps", "Laying Tricep Extensions"), // 9
        createExercise("Back", "Bent Over Rows"), // 10
        createExercise("Back", "Shrugs"), // 11
        createExercise("Back", "Stiff-Legged Deadlifts"), // 12
        createExercise("Back", "Assisted Pull-up Machine (3 versions)"), // 13
        createExercise("Back", "Fly Machine (Back)"), // 14
        createExercise("Biceps", "Underhand Curls"), // 15
        createExercise("Biceps", "Hammer Curls"), // 16
        createExercise("Biceps", "Overhand Curls"), // 17
        createExercise("Shoulders", "Side Raises"), // 18
        createExercise("Shoulders", "Front Raises"), // 19
        createExercise("Shoulders", "Shoulder Press Machine"), // 20
        createExercise("Legs", "Leg Press Machine"), // 21
        createExercise("Legs", "Leg Extension Machine"), // 22
        createExercise("Legs", "Leg Curl Machine"), // 23
        createExercise("Legs", "Calf Extension Machine"), // 24
        createExercise("Legs", "Hip Abduction (Out) Machine"), // 25
        createExercise("Legs", "Hip Adduction (In) Machine"), // 26
        createExercise("Legs", "Standing Glute Machine"), // 27
        createExercise("Core", "Abdominal Crunch Machine"), // 28
        createExercise("Core", "Oblique Side Bend") // 29
    ];
};

// Seeds available workout routines
function seedRoutines() {
    return [
        createRoutine("Chest and Triceps", [
                getExerciseIdByName("Elliptical"),
                getExerciseIdByName("Flat Bench Press"),
                getExerciseIdByName("Incline Bench Press"),
                getExerciseIdByName("Decline Bench Press"),
                getExerciseIdByName("Fly Machine (Chest)"),
                getExerciseIdByName("Cable Chest Side Pulls"),
                getExerciseIdByName("Cable Rope Pulldowns"),
                getExerciseIdByName("Tricep Press Machine"),
                getExerciseIdByName("Laying Tricep Extensions"),
                getExerciseIdByName("Stretching")
            ]
        ),
        createRoutine("Back and Biceps", [
                getExerciseIdByName("Elliptical"),
                getExerciseIdByName("Bent Over Rows"),
                getExerciseIdByName("Shrugs"),
                getExerciseIdByName("Stiff-Legged Deadlifts"),
                getExerciseIdByName("Assisted Pull-up Machine (3 versions)"),
                getExerciseIdByName("Fly Machine (Back)"),
                getExerciseIdByName("Underhand Curls"),
                getExerciseIdByName("Hammer Curls"),
                getExerciseIdByName("Overhand Curls"),
                getExerciseIdByName("Stretching")
            ]
        ),
        createRoutine("Legs, Shoulders, and Core", [
                getExerciseIdByName("Elliptical"),
                getExerciseIdByName("Side Raises"),
                getExerciseIdByName("Front Raises"),
                getExerciseIdByName("Shoulder Press Machine"),
                getExerciseIdByName("Leg Press Machine"),
                getExerciseIdByName("Leg Extension Machine"),
                getExerciseIdByName("Leg Curl Machine"),
                getExerciseIdByName("Calf Extension Machine"),
                getExerciseIdByName("Hip Abduction (Out) Machine"),
                getExerciseIdByName("Hip Adduction (In) Machine"),
                getExerciseIdByName("Standing Glute Machine"),
                getExerciseIdByName("Abdominal Crunch Machine"),
                getExerciseIdByName("Oblique Side Bend"),
                getExerciseIdByName("Stretching")
            ]
        ),
        createRoutine("Cardio", [
                getExerciseIdByName("Elliptical"),
                getExerciseIdByName("Stretching")
            ]
        )
    ];
};

// Seeds previous exercise performances
function seedPerformanceData() {
    return [
        {
            name: "Chest and Triceps",
            records: [
                createRecord(getExerciseIdByName("Elliptical"), 7),
                createRecord(getExerciseIdByName("Flat Bench Press"), null, [
                    createWeightSet(70, 8),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10)
                ]),
                createRecord(getExerciseIdByName("Incline Bench Press"), null, [
                    createWeightSet(40, 8),
                    createWeightSet(70, 10),
                    createWeightSet(70, 10),
                    createWeightSet(70, 10),
                    createWeightSet(70, 10)
                ]),
                createRecord(getExerciseIdByName("Decline Bench Press"), null, [
                    createWeightSet(70, 8),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10)
                ]),
                createRecord(getExerciseIdByName("Fly Machine (Chest)"), null, [
                    createWeightSet(110, 10),
                    createWeightSet(110, 10),
                    createWeightSet(110, 10)
                ]),
                createRecord(getExerciseIdByName("Cable Chest Side Pulls"), null, [
                    createWeightSet(17.5, 10),
                    createWeightSet(17.5, 10),
                    createWeightSet(17.5, 10)
                ]),
                createRecord(getExerciseIdByName("Cable Rope Pulldowns"), null, [
                    createWeightSet(34, 10),
                    createWeightSet(34, 10),
                    createWeightSet(34, 10)
                ]),
                createRecord(getExerciseIdByName("Tricep Press Machine"), null, [
                    createWeightSet(160, 10),
                    createWeightSet(160, 10),
                    createWeightSet(160, 10)
                ]),
                createRecord(getExerciseIdByName("Laying Tricep Extensions"), null, [
                    createWeightSet(40, 10),
                    createWeightSet(40, 10),
                    createWeightSet(40, 10)
                ]),
                createRecord(getExerciseIdByName("Stretching"), 10)
            ]
        },
        {
            name: "Back and Biceps",
            records: [
                createRecord(getExerciseIdByName("Elliptical"), 7),
                createRecord(getExerciseIdByName("Bent Over Rows"), null, [
                    createWeightSet(70, 8),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10),
                    createWeightSet(112.5, 10)
                ]),
                createRecord(getExerciseIdByName("Shrugs"), null, [
                    createWeightSet(110, 8),
                    createWeightSet(180, 10),
                    createWeightSet(180, 10),
                    createWeightSet(180, 10),
                    createWeightSet(180, 10)
                ]),
                createRecord(getExerciseIdByName("Stiff-Legged Deadlifts"), null, [
                    createWeightSet(70, 10),
                    createWeightSet(95, 10),
                    createWeightSet(95, 10),
                    createWeightSet(95, 10),
                    createWeightSet(95, 10)
                ]),
                createRecord(getExerciseIdByName("Assisted Pull-up Machine (3 versions)"), null, [
                    createWeightSet(40, 10),
                    createWeightSet(40, 10),
                    createWeightSet(40, 10)
                ]),
                createRecord(getExerciseIdByName("Fly Machine (Back)"), null, [
                    createWeightSet(80, 10),
                    createWeightSet(80, 10),
                    createWeightSet(80, 10)
                ]),
                createRecord(getExerciseIdByName("Underhand Curls"), null, [
                    createWeightSet(50, 10),
                    createWeightSet(50, 10),
                    createWeightSet(50, 10)
                ]),
                createRecord(getExerciseIdByName("Hammer Curls"), null, [
                    createWeightSet(25, 10),
                    createWeightSet(25, 10),
                    createWeightSet(25, 10)
                ]),
                createRecord(getExerciseIdByName("Overhand Curls"), null, [
                    createWeightSet(30, 10),
                    createWeightSet(30, 10),
                    createWeightSet(30, 10)
                ]),
                createRecord(getExerciseIdByName("Stretching"), 10)
            ]
        },
        {
            name: "Legs, Shoulders, and Core",
            records: [
                createRecord(getExerciseIdByName("Elliptical"), 7),
                createRecord(getExerciseIdByName("Side Raises"), null, [
                    createWeightSet(10, 10),
                    createWeightSet(10, 10),
                    createWeightSet(10, 10)
                ]),
                createRecord(getExerciseIdByName("Front Raises"), null, [
                    createWeightSet(10, 10),
                    createWeightSet(10, 10),
                    createWeightSet(10, 10)
                ]),
                createRecord(getExerciseIdByName("Shoulder Press Machine"), null, [
                    createWeightSet(50, 10),
                    createWeightSet(50, 10),
                    createWeightSet(50, 10)
                ]),
                createRecord(getExerciseIdByName("Leg Press Machine"), null, [
                    createWeightSet(165, 10),
                    createWeightSet(165, 10),
                    createWeightSet(165, 10)
                ]),
                createRecord(getExerciseIdByName("Leg Extension Machine"), null, [
                    createWeightSet(80, 10),
                    createWeightSet(80, 10),
                    createWeightSet(80, 10)
                ]),
                createRecord(getExerciseIdByName("Leg Curl Machine"), null, [
                    createWeightSet(75, 10),
                    createWeightSet(75, 10),
                    createWeightSet(75, 10)
                ]),
                createRecord(getExerciseIdByName("Calf Extension Machine"), null, [
                    createWeightSet(165, 10),
                    createWeightSet(165, 10),
                    createWeightSet(165, 10)
                ]),
                createRecord(getExerciseIdByName("Hip Abduction (Out) Machine"), null, [
                    createWeightSet(190, 10),
                    createWeightSet(190, 10),
                    createWeightSet(190, 10)
                ]),
                createRecord(getExerciseIdByName("Hip Adduction (In) Machine"), null, [
                    createWeightSet(155, 10),
                    createWeightSet(155, 10),
                    createWeightSet(155, 10)
                ]),
                createRecord(getExerciseIdByName("Standing Glute Machine"), null, [
                    createWeightSet(115, 10),
                    createWeightSet(115, 10),
                    createWeightSet(115, 10)
                ]),
                createRecord(getExerciseIdByName("Abdominal Crunch Machine"), null, [
                    createWeightSet(35, 25),
                    createWeightSet(35, 25),
                    createWeightSet(35, 25),
                    createWeightSet(35, 25)
                ]),
                createRecord(getExerciseIdByName("Oblique Side Bend"), null, [
                    createWeightSet(45, 25),
                    createWeightSet(45, 25),
                    createWeightSet(45, 25),
                    createWeightSet(45, 25)
                ]),
                createRecord(getExerciseIdByName("Stretching"), 10)
            ]
        },
        {
            name: "Cardio",
            records: [
                createRecord(getExerciseIdByName("Elliptical"), 30),
                createRecord(getExerciseIdByName("Stretching"), 10)
            ]
        }
    ];
};

// -----BEGIN DATA-----
var user = createUser();
user.exercises = seedExercises();
user.routines = seedRoutines();

console.log(user);

// -----BEGIN HTML-----
$(document).ready(function(){
    // Build Home page
    var homeHtml = getHomePageHtml(user.routines);
    $("#home").append(homeHtml);

    // Start new activity now
    user.activities.push( createActivity(new Date(), null, null) );
    activityTimer(new Date());
});