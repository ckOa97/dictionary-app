import { useContext } from 'react';
import { WordDataCtx, ErrorCtx } from '../../App.jsx';
import './css/Footer.css';
import iconNewWindow from '../../../assets/icon-new-window.svg';

function Footer() {
    const [wordData, setWordData] = useContext(WordDataCtx);
    const [error, setError] = useContext(ErrorCtx);

    if(error.exist) return;
    if(!wordData) return;
    if(wordData[0].sourceUrls.length > 0) return (
        <footer className='Footer'>
            <div>
                <hr />
                <div>
                    <h4>Source</h4>
                    <span>
                        {wordData[0].sourceUrls.map((sourceUrl, i) => {
                            return (
                                <a key={i} href={sourceUrl} 
                                    target='blank'>
                                    <span>{sourceUrl}</span>
                                    <img src={iconNewWindow} alt="icon new window" />
                                </a>
                            );
                        })}
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;