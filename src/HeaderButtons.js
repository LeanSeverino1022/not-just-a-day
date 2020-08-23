import React from 'react';
import TwitterButton from './TwitterButton';

export default function HeaderButtons() {
    // eval("debugger;")

    const hiddenTwitterBtnRef = React.useRef(null);

    React.useEffect(_=>{

        //wait for external script  widget.js to load
        document.addEventListener("load", () => {
            window.twttr.events.bind(
                'loaded',
                function (event) {
                  // Do something there
                  document.getElementById('l').textContent = "tt";
                }
              );
        })

    }, [])

    function handleTweetBtnClick() {
        document.querySelector('.twitter-share-button').click();
        // alert('x')
    }

    return (
        <div className="flex">
            {/* buttons */}
            <div className="headerBtn bg-green-700 w-1/5">
                <TwitterButton />
            </div>

            <div className="headerBtn bg-red-500 w-1/5">Test 1</div>
            <div className="headerBtn bg-yellow-500 w-1/5">Test 2</div>
            <div className="headerBtn bg-blue-500 w-1/5">Test 3</div>
            <div className="headerBtn bg-yellow-500 w-1/5">Test 2</div>
           

        </div>

    )
}
