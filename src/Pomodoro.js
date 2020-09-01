import React, {useRef, useState, useEffect} from 'react'

export default function Pomodoro() {

    let startingMinutes = .5;
    let timerIsRunning = false;
    let [totalSeconds, setTotalSeconds] = useState(startingMinutes * 60);
    let [timerUi, setTimerUI] = useState(null);
    // let [timerIsRunning, toggleTimerIsRunning]  = false;


    let interval = null;

    function startTimer() {
        interval = setInterval(continueCountdown, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
        timerIsRunning = false;
    }

    // const countdownEl = document.getElementById('countdown');

    function continueCountdown() {

        if (totalSeconds < 0 ) {
            alert("TIMES UP");
            stopTimer();
            return;
        }

        //seconds to MM-SS format
        const minutes = Math.floor(totalSeconds / 60);

        let seconds = (totalSeconds % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        // seconds = (seconds => seconds < 10 ? '0' + seconds : seconds)(totalSeconds % 60);

        setTimerUI(`${minutes}:${seconds}`);

        console.log(totalSeconds);

        setTotalSeconds(totalSeconds--);
    }

    //do once, when our component loads
    useEffect(_ => {

        const minutes = Math.floor(totalSeconds / 60);

        let seconds = (totalSeconds % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        setTimerUI(`${minutes}:${seconds}`);

    }, [])



    return (
        <div>
            <div className="flex text-center border flex-wrap">
                <div className="flex-grow flex flex-col w-full">
                    <p className="py-2">Pomodoro Timer</p>
                    <p className="text-6xl">{timerUi}</p>
                    <button onClick={startTimer} className="bg-gray-700 hover:bg-gray-600 text-white inline-block mx-auto mb-2 py-1 px-2">{timerIsRunning ? 'Reset' : 'Start'}</button>
                </div>

                <div className="flex-grow flex flex-col">
                    <p>Cycles</p>
                    <p>0</p>
                    <button>Reset</button>
                </div>

                <div className="flex-grow flex flex-col">
                    <p>Break</p>
                    <p>5:00</p>
                    <button>Start</button>
                </div>
            </div>
        </div>
    )
}
