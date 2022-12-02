const container = document.getElementById('timer-container');

const timerSong = document.getElementById('timer-song');

const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');

const startBtn = document.getElementById('start-timer');

const stopBtn = document.getElementById('stop-timer');
stopBtn.disabled = true;

const resetBtn = document.getElementById('reset-timer');;
resetBtn.disabled = true;


const hourContainer = document.createElement('span');
hourContainer.classList.add('hours');

const minuteContainer = document.createElement('span');
minuteContainer.classList.add('minutes');
minuteContainer.innerHTML = '00:'

const secondContainer = document.createElement('span');
secondContainer.classList.add('seconds');
secondContainer.innerHTML = '00';

container.appendChild(hourContainer);
container.appendChild(minuteContainer);
container.appendChild(secondContainer);

let hours = 0;
let minutes = 0;
let seconds = 0;

let timerInterval;

function timer(){
    timerInterval = setInterval(function(){
        seconds--;

        if(seconds === 0 && minutes === 0 && hours === 0){
            timerSong.play();
            stop();
            reset();
        }

        if(seconds < 0){
            seconds= 59;
            minutes--;
        }
        if(minutes < 0){
            minutes = 59;
            hours--;
        }

        if(hours > 0){
            hourContainer.innerHTML = (hours < 10 ? '0' + hours : hours) + ":";
        }
        minuteContainer.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ":";
        secondContainer.innerHTML = (seconds < 10 ? '0' + seconds : seconds);
    },1000);
}

function checkSetTime(){
    let h = parseInt(hoursInput.value);
    let m = parseInt(minutesInput.value);
    let s = parseInt(secondsInput.value);

    if(isNaN(h)){
        hoursInput.value = 0;
    }else if(h < 0){
        hoursInput.value = 0;
    }else if(h > 9999){
        hoursInput.value = 9999;
    }

    if(isNaN(m)){
        minutesInput.value = 0;
    }else if(m < 0){
        minutesInput.value = 0;
    }else if(m > 59){
        minutesInput.value = 59;
    }

    if(isNaN(s)){
        secondsInput.value= 0;
    }else if(s < 0){
        secondsInput.value = 0;
    }else if(s > 59){
        secondsInput.value = 59;
    }
    
}

function set(){
    checkSetTime();

    hours = parseInt(hoursInput.value);
    minutes = parseInt(minutesInput.value);
    seconds = parseInt(secondsInput.value);

    if(hours > 0){
        hourContainer.innerHTML = (hours < 10 ? '0' + hours : hours) + ":";
    }
    minuteContainer.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ":";
    secondContainer.innerHTML = (seconds < 10 ? '0' + seconds : seconds);
}

function start(){
    if(timerInterval){
        clearInterval(timerInterval)
    }

    if(seconds <= 0 && minutes <= 0 && hours <= 0){
        $('#set-time').modal('show');
        return;
    }


    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;

    startBtn.classList.add('hidden-btn');
    stopBtn.classList.remove('hidden-btn');
    resetBtn.classList.add('hidden-btn');
    


    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;

    if(hours > 0){
        hourContainer.innerHTML = (hours < 10 ? '0' + hours : hours) + ":";
    }
    minuteContainer.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ":";
    secondContainer.innerHTML = (seconds < 10 ? '0' + seconds : seconds);

    timer();
}

function stop(){
    clearInterval(timerInterval);

    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;

    startBtn.classList.remove('hidden-btn');
    stopBtn.classList.add('hidden-btn');
    resetBtn.classList.remove('hidden-btn');
}

function reset(){
    clearInterval(timerInterval);

    hours = 0;
    minutes = 0;
    seconds = 0;

    hourContainer.innerHTML = '';
    minuteContainer.innerHTML = '00:'
    secondContainer.innerHTML = '00';

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;

    startBtn.classList.remove('hidden-btn');
    stopBtn.classList.add('hidden-btn');
    resetBtn.classList.add('hidden-btn');
}

