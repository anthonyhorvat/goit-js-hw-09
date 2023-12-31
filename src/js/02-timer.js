import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

//-----------------Getting elements-----------------------//
const timePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

//----------------Functions----------------------//
function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//-------------Notify settings-----------------//
Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  timeout: 1500,
});

let targetDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    targetDate = selectedDates[0];

    if (currentDate > targetDate) {
      Notiflix.Notify.info('Please choose a date in the future');
      startButton.disabled = true;
      return;
    } else {
      Notiflix.Notify.success('Please press the Start button');
      startButton.disabled = false;
    }
  },
};

flatpickr(timePicker, options);

startButton.addEventListener('click', onStart);
function onStart() {
  const timeLeft = targetDate - new Date();
  const dateCounter = convertMs(timeLeft);
  let intervalId;
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    startButton.disabled = true;
    dateCounter.seconds--;
    if (dateCounter.seconds < 0) {
      dateCounter.seconds = 59;
      dateCounter.minutes--;
    }
    if (dateCounter.minutes < 0) {
      dateCounter.minutes = 59;
      dateCounter.hours--;
    }
    if (dateCounter.hours < 0) {
      dateCounter.hours = 23;
      dateCounter.days--;
    }

    days.textContent = addLeadingZero(dateCounter.days);
    hours.textContent = addLeadingZero(dateCounter.hours);
    minutes.textContent = addLeadingZero(dateCounter.minutes);
    seconds.textContent = addLeadingZero(dateCounter.seconds);
    if (
      dateCounter.days === 0 &&
      dateCounter.hours === 0 &&
      dateCounter.minutes === 0 &&
      dateCounter.seconds === 0
    ) {
      clearInterval(intervalId);
      startButton.disabled = false;
    }
  }, 1000);
}
