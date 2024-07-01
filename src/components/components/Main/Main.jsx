import { useRef, useState, useContext, useEffect } from 'react';
import { WordDataCtx, ErrorCtx } from '../../App.jsx';
import Error from './components/Error/Error.jsx';
import Meaning from './components/Meaning/Meaning.jsx';
import PlayIcon from './components/PlayIcon/PlayIcon.jsx';
import useSound from './hooks/useSound.jsx';
import './css/Main.css';

function Main() {
    const [wordData, setWordData] = useContext(WordDataCtx);
    const [error, setError] = useContext(ErrorCtx);
    const audioUrl = useSound(wordData);
    const audioEl = useRef();
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    const preventAnimation = useRef(true);

    function playAudio() {
        preventAnimation.current = false;
        audioEl.current.play();
        setAudioIsPlaying(true);
    }

    function handleEnded() {
        setAudioIsPlaying(false);
    }

    useEffect(() => {
        setAudioIsPlaying(false);
    }, [wordData]);

    if(error.exist) return <Error />;
    return wordData && (
        <main className='Main'>
            <div>
                <section>
                    <div>
                        <h1>{wordData[0].word}</h1>
                        {wordData[0].phonetic && <span>{wordData[0].phonetic}</span>}
                    </div>
                    {audioUrl && (<>
                                    <button onClick={playAudio}>
                                        <PlayIcon audioIsPlaying={audioIsPlaying} preventAnimation={preventAnimation} />
                                    </button>
                                    <audio ref={audioEl} src={audioUrl} onEnded={handleEnded}>
                                        Your browser does not support audio element!
                                    </audio>
                                </>)}
                </section>
                {wordData[0].meanings.map(
                    (meaning, i) => <Meaning key={i} meaning={meaning} />
                )}
            </div>
        </main>
    );
}

export default Main;