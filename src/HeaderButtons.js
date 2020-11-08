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
            <div className="hundred-days-widget headerBtn w-1/5">
                <TwitterButton />
            </div>

            <div className="headerBtn text-center w-1/5">❔</div>
            <div className="headerBtn text-center w-1/5">❔</div>
            <div className="headerBtn text-center w-1/5">❔</div>
            <div className="headerBtn text-center w-1/5">❔</div>


        </div>

    )
}
