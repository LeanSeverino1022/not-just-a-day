import React, {useRef, useState} from 'react'

export default function Pomodoro() {


    let refCountdown = useRef(null);
    const [countdown, setCount] = useState(0);

    let staringtMinutes = .5;
    let totalSeconds = staringtMinutes * 60;

    let interval = null;

    function startTimer() {
        interval = setInterval(updateCountdown, 1000, totalSeconds);
    }

   

    // const countdownEl = document.getElementById('countdown');

    function updateCountdown(numSeconds) {

        if (numSeconds < 0) {
            alert("TIMES UP");
            clearInterval(interval);
            return;
        }

        //seconds to MM-SS format
        const minutes = Math.floor(numSeconds / 60);
        let seconds = numSeconds % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        refCountdown.current.innerHTML = `${numSeconds} - ${minutes}:${seconds}`;
        console.log(numSeconds);

        numSeconds--;
    }

    function renderCountdownUI() {

    }


    return (
        <div>
            <div className="flex text-center border flex-wrap">
                <div className="flex-grow flex flex-col w-full">
                    <p>Work</p>
                    <p ref={refCountdown} className="text-6xl">{countdown}</p>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white inline-block mx-auto mb-2 py-1 px-2">Start</button>
                </div>

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
            </div>
        </div>
    )
}
