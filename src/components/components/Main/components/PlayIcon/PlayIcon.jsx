import { useState, useRef, useEffect } from 'react';
import './css/PlayIcon.css';

function PlayIcon({audioIsPlaying, preventAnimation}) {
    const polygon1 = useRef({
        played: '35 27, 35 48, 29 48, 29 27',
        paused: '38 31.5, 38 43.5, 29 48, 29 27'
    });
    const polygon2 = useRef({
        played: '40 27, 46 27, 46 48, 40 48',
        paused: '38 31.5, 50 37.5, 50 37.5, 38 43.5'
    });
    const animation1 = useRef(null);
    const animation2 = useRef(null);

    function startAnimation() {
        if(preventAnimation.current) return;
        animation1.current.setAttribute('from', `${audioIsPlaying ? polygon1.current.paused : polygon1.current.played}`);
        animation1.current.setAttribute('to', `${audioIsPlaying ? polygon1.current.played : polygon1.current.paused}`);
        animation2.current.setAttribute('from', `${audioIsPlaying ? polygon2.current.paused : polygon2.current.played}`);
        animation2.current.setAttribute('to', `${audioIsPlaying ? polygon2.current.played : polygon2.current.paused}`);
        animation1.current.beginElement();
        animation2.current.beginElement();
    }

    useEffect(() => {
        startAnimation();
    }, [audioIsPlaying]);

    useEffect(() => {
        return () => preventAnimation.current = true;
    }, []);

    return (
        <svg className="PlayIcon" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
            <g fill="#A445ED" fillRule="evenodd">
                <circle cx="37.5" cy="37.5" r="37.5" />
                <polygon points={polygon1.current.paused}>
                <animate
                    ref={animation1}
                    attributeName="points"
                    begin="indefinite"
                    dur=".1s"
                    to={polygon1.current.paused}
                    repeatCount="1"
                    fill="freeze" />
                </polygon>
                <polygon points={polygon2.current.paused}>
                <animate
                    ref={animation2}
                    attributeName="points"
                    begin="indefinite"
                    dur=".1s"
                    to={polygon2.current.paused}
                    repeatCount="1"
                    fill="freeze" />
                </polygon>
            </g>
        </svg>
    );
}
export default PlayIcon;