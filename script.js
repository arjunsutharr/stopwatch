const startBtn = document.getElementById("start-button");
const stopBtn = document.getElementById("stop-button");
const resetBtn = document.getElementById("reset-button");
const lapBtn = document.getElementById("lap-button");
const displayTimerEl = document.getElementById("display-timer");

let timer;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let lapCount = 1;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function startTimer() {
  timer = setInterval(updateStopWatch, 10);
  startBtn.style.display = "none";
  lapBtn.classList.remove("d-none");
  stopBtn.classList.remove("d-none");
  resetBtn.classList.remove("d-none");
}

function updateStopWatch() {
  miliseconds++;
  if (miliseconds === 100) {
    miliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }

  updateDisplay();
}

function stopTimer() {
  clearInterval(timer);
  stopBtn.classList.add("d-none");
  startBtn.style.display = "inline-block";
}

function resetTimer() {
  clearInterval(timer);
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  lapCount = 1;

  updateDisplay();
  lapBtn.classList.add("d-none");
  stopBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
  startBtn.style.display = "inline-block";
  clearLapList();
}

function updateDisplay() {
  displayTimerEl.textContent =
    formatTime(minutes) +
    ":" +
    formatTime(seconds) +
    ":" +
    formatMiliseconds(miliseconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function formatMiliseconds(time) {
  return time < 10 ? "0" + time : time;
}

function recordLap() {
  const lapTime = displayTimerEl.textContent;
  const lapList = document.getElementById("lap-list");
  const lapItem = document.createElement("li");

  lapItem.textContent = lapCount + ".  " + lapTime;
  lapList.appendChild(lapItem);
  lapCount++;
}

function clearLapList() {
  const lapList = document.getElementById("lap-list");
  lapList.innerHTML = "";
}
