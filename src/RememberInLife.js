import React, { useState } from 'react';

// todo: add this to one of the header widgets..
//todo: rename headerButtons to header widgets? header blocks?
export default function RememberInLife() {

    const list = [
        "Be present",
        "Give freely",
        "Don't get too high, don't get too low",
        "Bet on yourself",
        "Live honestly",
        "Keep learning, grinding, growing",
        "Read more",
        "Be genuine",
        "be kind to people",
        "Find out who you are and do it on purpose",
        "Life is not fair; get used to it",
        "Be consistent with your work ethic",
        "Empower team members",
        "Pray",
        "Be Grateful",
        "Listen to what’s not being said.",
        "disconnect and breathe"
    ];


    let [GuideList, setGuideList] = useState(list);

    // const audioTimerRef = useRef(null);

    return (
        <div>
           
        </div>
    )
}
