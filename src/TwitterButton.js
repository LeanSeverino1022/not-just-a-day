import React from 'react'

import twitterLogo from './assets/images/twitter.webp';

export default function TwitterButton() {


    return (
        /* I just used the twitter-share-button to easily generate the url I need then I manually create my own tweet button */

        <div className="block text-center">
          
            <a href="https://twitter.com/intent/tweet?hashtags=dayatatime&original_referer=http%3A%2F%2Flocalhost%3A3003%2Fnot-just-a-day&ref_src=twsrc%5Etfw&text=Day%20of%20%23100DaysOfCode%2C%20%0A%20Today&tw_p=tweetbutton&url=https%3A%2F%2Fleanseverino1022.github.io%2Fnot-just-a-day%2F">  <img class="twitter-logo"src={twitterLogo}/>Tweet #100DaysOfCode</a></div>
    //      <a className="twitter-share-button"
    //         href="https://twitter.com/intent/tweet"
    //         data-size="large"
    //         data-text={`Day of #100DaysOfCode, \n Today`}
    //         data-url="https://leanseverino1022.github.io/not-just-a-day/"
    //         data-hashtags="dayatatime">
    //     </a>
    )
}
