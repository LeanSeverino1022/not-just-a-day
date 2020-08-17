import React from 'react'

export default function HeaderButtons() {

    function tweetHundredDays() {
        
    }

    return (
        <div>
            <div className="flex bg-gray-200">
                <div class="tweet100 py-5 px-5 w-auto bg-blue-500 text-gray-200" onClick={tweetHundredDays}>
                    Tweet 100
                </div>
            </div>
        </div>
    )
}
