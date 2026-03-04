//render the track
//start the race with a button click
//trigger the move every second (setInterval)
//move the tortoise randomly (Math.random())
//move the hare randomly
//fix position if they go beyond the range (0-70)
//render the track witht the new positinos
//when one of the animals reach 70+, show result message

const TRACK_LENGTH = 70; //sometimes constant variables are all CAPS

const START_BUTTON = document.getElementById("startBtn"); //BUTTON
const MESSAGE = document.getElementById("message");
const TRACK = document.getElementById("track");
const LOG = document.getElementById("log");

const HARD_BUTTON = document.getElementById("hardBtn");
const EASY_BUTTON = document.getElementById("easyBtn");

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let stepCount = 0;
let hardModevar = false;
let easyModevar = false;

START_BUTTON.addEventListener("click", startRace); //startRace is a callback function for the function startRace
HARD_BUTTON.addEventListener("click", () => {
  hardModevar = true;
});
EASY_BUTTON.addEventListener("click", () => {
  easyModevar = true;
});

//Backend Functions
function startRace() {
  //start the race
  MESSAGE.textContent = "BANG!!! and they are off!";

  START_BUTTON.disabled = true; //disable the button by setting it to true after it has been clicked

  //Avoid double tracks
  if (raceIntervalId !== null) {
    clearInterval(raceIntervalId);
  }
  raceIntervalId = setInterval(raceStep, 1000); //raceStep is a callback function for the function raceStep
}

function raceStep() {
  stepCount++; //same as stepCount += 1

  //move tortoise randomly
  //move hare randomly
  if (hardModevar === true) {
    hardMode();
  } else if (easyModevar === true) {
    easyMode();
  } else {
    reset();
  }

  //fix position if they go below the range (0)
  fixPosition();

  //when one of the animals reach 70+, show result message
  if (tortoisePosition === TRACK_LENGTH || harePosition === TRACK_LENGTH) {
    clearInterval(raceIntervalId);
    raceIntervalId = null;
    showResult();
    START_BUTTON.disabled = false;
  }

  //render the track
  renderTrack();
}

function reset() {
  moveTortoise();
  moveHare();
  function moveTortoise() {
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
      //1 to 5 fast plod
      tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
      //6 to 7 slip
      tortoisePosition -= 5;
    } else {
      //8 to 10 slow plod (plod means moving slowly forward)
      tortoisePosition += 1;
    }
  }

  // create the moveHare function here

  function moveHare() {
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 3) {
      //1 to 3 fast plod
      harePosition += 6;
    } else if (roll >= 4 && roll <= 6) {
      //4 to 6 slip
      harePosition -= 9;
    } else {
      //7 to 10 nothing happens
      harePosition += 4;
    }
  }
}

function fixPosition() {
  tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition)); //the Math.min and Math.max functions are used to limit the position to the range of 1 to 70. Math.max returns the maximum value between the two arguments, and Math.min returns the minimum value between the two arguments
  harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition));
}

function renderTrack() {
  TRACK.innerHTML = "";

  for (let i = 1; i <= TRACK_LENGTH; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    let isTortoiseHere = i === tortoisePosition;
    let isHareHere = i === harePosition;

    if (isTortoiseHere && isHareHere) {
      cell.classList.add("both");
      cell.textContent = "💥";
    } else if (isTortoiseHere) {
      cell.classList.add("tortoise");
      cell.textContent = "🐢";
    } else if (isHareHere) {
      cell.classList.add("hare");
      cell.textContent = "🐇";
    }

    TRACK.appendChild(cell);
  }
}

function showResult() {
  if (tortoisePosition === TRACK_LENGTH && harePosition === TRACK_LENGTH) {
    MESSAGE.textContent = "Draw!";
  } else if (tortoisePosition === TRACK_LENGTH) {
    MESSAGE.textContent = "🐢 Wins!";
  } else if (harePosition === TRACK_LENGTH) {
    MESSAGE.textContent = "🐇 Wins!";
  } else {
    MESSAGE.textContent = "something went wrong";
  }
}

//initial render of the empty track
renderTrack();
