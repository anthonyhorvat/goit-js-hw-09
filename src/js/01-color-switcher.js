function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.getElementsByTagName("body");
const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
startButton.addEventListener("click", onStart);
stopButton.addEventListener("click", onStop);

function disableStartButton() {
  startButton.disabled = true;
}
function enableStartButton() {
  startButton.disabled = false;
}

function onStart() {
  disableStartButton();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop() {
  enableStartButton();
  clearInterval(timerId);
}
