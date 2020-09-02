import React, {useRef, useState, useEffect} from 'react'

export default function Pomodoro() {

    let startingMinutes = .15;

    let [totalSeconds, setTotalSeconds] = useState(startingMinutes * 60);
    let [timerUi, setTimerUI] = useState(null);
    let [isTimerRunning, setIsTimerRunning]  = useState(false);
    let [countdownInterval, setCountdownInterval] = useState(null);


    function startTimer() {

        if (!isTimerRunning) {
            // interval = setInterval(continueCountdown, 1000);
            // setCountdownInterval(setInterval(continueCountdown, 1000));
            console.log("setCountdownInterval")
            setIsTimerRunning(true);
        }
    }

    function resetTimer() {
        stopTimer();
        setTotalSeconds(startingMinutes * 60);
        alert('reset')
    }

    function stopTimer() {
        clearInterval(countdownInterval);
        // setIsTimerRunning(false);
    }

    /**
     * convert seconds(num) to minutes:seconds(string)
     */
    function convertSecondsToMinutesSecondsText(numSeconds) {
         //seconds to MM-SS format
        const minutesDisplay = Math.floor(numSeconds / 60);
        numSeconds = (numSeconds % 60);
        const secondsDisplay = numSeconds < 10 ? '0' + numSeconds : numSeconds;

        return `${minutesDisplay}:${secondsDisplay}`;
    }

    // const countdownEl = document.getElementById('countdown');

    function continueCountdown() {

        if (totalSeconds < 1 ) {
            alert("TIMES UP");
            stopTimer();
            return;
        }

        setTotalSeconds(--totalSeconds);

        const time = convertSecondsToMinutesSecondsText(totalSeconds)

        setTimerUI(time);
    }

    //do once, when our component loads
    useEffect(_ => {
        const time = convertSecondsToMinutesSecondsText(totalSeconds)

        setTimerUI(time);

    }, [])

    useEffect(_ => {
        const interval = setInterval(continueCountdown, 1000);
          return () => clearInterval(interval);
    },['isTimerRunning'])


    return (
        <div>
            <div className="flex text-center border flex-wrap">
                <div className="flex-grow flex flex-col w-full">
                    <p className="py-2">Pomodoro Timer</p>
                    <p className="text-6xl">{timerUi}</p>
                    {isTimerRunning ? (
                        <button onClick={resetTimer} className="bg-gray-700 hover:bg-gray-600 text-white inline-block mx-auto mb-2 py-1 px-2">Reset</button>
                    ) : (
                        <button onClick={startTimer} className="bg-green-500 hover:bg-green-700 text-white inline-block mx-auto mb-2 py-1 px-2" >Start</button>
                    )}
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
