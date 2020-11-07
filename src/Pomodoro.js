import React, { useState, useEffect } from 'react'

export default function Pomodoro() {

    const startingMinutes = .15;

    let [totalSeconds, setTotalSeconds] = useState(startingMinutes * 60);
    let [timerUi, setTimerUI] = useState(null);
    let [isTimerRunning, setIsTimerRunning] = useState(false);


    function startTimer() {

        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }
    }

    function resetTimer() {
        stopTimer();
        setTotalSeconds(startingMinutes * 60);
        alert('reset')
    }

    function stopTimer() {
        setIsTimerRunning(false);
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

    function continueCountdown() {

        if (totalSeconds < 1) {
            alert("TIMES UP");
            resetTimer();
            return;
        }

        setTotalSeconds(--totalSeconds);
    }


    useEffect(_ => {
        const interval = isTimerRunning && setInterval(continueCountdown, 1000);
        return () => clearInterval(interval);
    }, [isTimerRunning])


    useEffect(_ => {
        const time = convertSecondsToMinutesSecondsText(totalSeconds)
        setTimerUI(time);
    }, [totalSeconds])


    return (
        <div>
            <div className="flex text-center flex-wrap">
                <div className="flex-grow flex flex-col w-full">
                    <p className="py-2">Time to work!</p>
                    <p className="text-6xl">{timerUi}</p>
                    {isTimerRunning ? (
                        <button onClick={resetTimer} className="bg-white hover:bg-gray-100 text-black inline-block mx-auto mb-2 py-1 px-2">Reset</button>
                    ) : (
                            <button onClick={startTimer} className="bg-white hover:bg-gray-100 text-black inline-block mx-auto mb-2 py-1 px-2" >Start</button>
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
