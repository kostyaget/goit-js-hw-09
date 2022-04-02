import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_red.css');
import Notiflix from 'notiflix';

const dateSelector = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysNum = document.querySelector('span[data-days]');
const hoursNum = document.querySelector('span[data-hours]');
const minutesNum = document.querySelector('span[data-minutes]');
const secondsNum = document.querySelector('span[data-seconds]');

let currentTime = new Date().getTime();
let selectedTime = 0;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    checkDate();
  },
};

const fp = flatpickr(dateSelector, options);
btnStart.addEventListener('click', onStartClick);

function checkDate() {
  if (currentTime >= selectedTime) {
    Notiflix.Notify.failure('Please choose a date in the future!');
  } else {
    btnStart.disabled = false;
    Notiflix.Notify.success('Correct date was set. Click START to begin countdown.');
  }
}

function onStartClick() {
  const timer = setInterval(() => {
    btnStart.disabled = true;
    dateSelector.disabled = true;
    let remainingTime = convertMs(selectedTime - Date.now());
    if (remainingTime.seconds < 0) {
      clearInterval(timer);
      Notiflix.Report.success('Out of time!', 'Timer reached end.', 'OK');
      dateSelector.disabled = false;
    } else {
      renderTimer(remainingTime);
    }
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function renderTimer({ days, hours, minutes, seconds }) {
  daysNum.textContent = addLeadingZero(`${days}`);
  hoursNum.textContent = addLeadingZero(`${hours}`);
  minutesNum.textContent = addLeadingZero(`${minutes}`);
  secondsNum.textContent = addLeadingZero(`${seconds}`);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
} 