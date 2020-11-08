import React, { useState, useEffect, useRef } from 'react'


export default function Pomodoro() {

    const startingMinutes = 30; //50 minutes

    let [totalSeconds, setTotalSeconds] = useState(startingMinutes * 60);
    let [timerUi, setTimerUI] = useState(null);
    let [runTimer, setRunTimer] = useState(false); // value determines whether to run or stop time
    let [isTimerPaused, setIsTimerPaused] = useState(false); //just a status
    const audioTimerRef = useRef(null);


    function startTimer() {

        if (!runTimer) {
            setRunTimer(true);
        }
    }

    function resetTimer() {
        setTotalSeconds(startingMinutes * 60);
        setIsTimerPaused(false);
        setRunTimer(false);

    }

    function pauseTimer() {
        setIsTimerPaused(true);
        setRunTimer(false);
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
            playTimeHasEnded();

            resetTimer();
            return;
        }

        setTotalSeconds(--totalSeconds);
    }

    function playTimeHasEnded(){
        audioTimerRef.current.play();
    }

    function showTimesUpMsg() {
        alert("times up");
    }

    useEffect(() => {
        const interval = runTimer && setInterval(continueCountdown, 1000);
        return () => clearInterval(interval);
    }, [runTimer])


    useEffect(() => {
        const time = convertSecondsToMinutesSecondsText(totalSeconds)
        setTimerUI(time);
    }, [totalSeconds])


    // add eventlistener to audio element... not sure about implementation yet re add and remove eventlistener but this seems to work
    // kept the code just because its more of a keep for reference reason
    useEffect(() => {

        if(audioTimerRef) {
            audioTimerRef.current.addEventListener("ended", showTimesUpMsg);
        }
      

        return () => {
            if(audioTimerRef)
            audioTimerRef.current.removeEventListener("ended", showTimesUpMsg);
        }
    }, [])

    return (
        <div>
            <div className="flex text-center flex-wrap">
                <div className="flex-grow flex flex-col w-full test-white">
                    <p className="py-2 text-red-500">Time to work!</p>
                    <p className="text-6xl">{timerUi}</p>

                        {runTimer ? (
                            <div className="mb-2">
                                <button onClick={pauseTimer} className="bg-green-700 hover:bg-green-500 inline-block py-1 px-2">Pause</button>
                                <button onClick={resetTimer} className="bg-red-700 hover:bg-red-500 inline-block mx-auto mb-2 py-1 px-2 ml-2" >restart</button>
                               
                            </div>

                        ) : (
                            <div className="mb-2">
                                <button onClick={startTimer} className="bg-green-700 hover:bg-green-500 inline-block mx-auto mb-2 py-1 px-2" > {isTimerPaused ? 'Resume' : 'Start'}</button>
                               

                            </div>
                            )}


                        {/* <button className="inline-block ml-2" onClick={pauseTimer}>Pause</button> */}
                </div>

                {/* Todo: display when functionality is  already good */}
                {/* <div className="flex-grow flex flex-col">
                    <p>Cycles</p>
                    <p>0</p>
                    <button>Reset</button>
                </div>

                <div className="flex-grow flex flex-col">
                    <p>Break</p>
                    <p>5:00</p>
                    <button>Start</button>
                </div> */}
                <audio ref={audioTimerRef} className="audio-timer-done">
                    {/* <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source> */}
                    <source src="https://www.online-timer.net/audio/dingding.wav"></source>
                </audio>
            </div>
        </div>
    )
}
