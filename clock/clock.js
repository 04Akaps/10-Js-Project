const oursTime = "14 Aug 2022";
const year = "1 Jan 2022";

const dayEl = document.querySelector("#days");
const hourEl = document.querySelector("#hours");
const minEl = document.querySelector("#minute");
const secEl = document.querySelector("#second");

function countdown() {
  const currentDate = new Date();
  const ourstimeDate = new Date(oursTime);

  const std = (ourstimeDate - currentDate) / 1000;
  const days = Math.floor(std / 3600 / 24);
  const hours = Math.floor(std / 3600) % 24;
  const minutes = Math.floor(std / 60) % 60;
  const seconds = Math.floor(std) % 60;

  dayEl.textContent = addZero(days);
  hourEl.textContent = addZero(hours);
  minEl.textContent = addZero(minutes);
  secEl.textContent = addZero(seconds);
}

function addZero(time) {
  return time < 10 ? `0${time}` : time;
}
setInterval(countdown, 1000);
