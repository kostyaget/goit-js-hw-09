const body = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let bgColorChangeInterval = null;

btnStart.addEventListener('click', onStartBtnClick);
btnStop.addEventListener('click', onStopBtnClick);

btnStop.setAttribute('disabled', true);

function onStartBtnClick() {
    bgColorChangeInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');
}

function onStopBtnClick() {
    clearInterval(bgColorChangeInterval);
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
}
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }


