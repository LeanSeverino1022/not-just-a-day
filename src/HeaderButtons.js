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
        <div className="flex p-2">
            {/* buttons */}
            <div className="header-btns-container">
                <TwitterButton />
            </div>

            <div className="headerBtn bg-red-500">Test 1</div>
            <div className="headerBtn bg-yellow-500">Test 2</div>
            <div className="headerBtn bg-blue-500">Test 3</div>

        </div>

    )
}
