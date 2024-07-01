// import { Fragment } from 'react';
import './css/Meaning.css';

function Meaning({meaning}) {
    return (
        <section className='Meaning'>
            {meaning.partOfSpeech &&
                <div className='partOfSpeech'>
                    <h2>{meaning.partOfSpeech}</h2>
                    <div>
                        <hr />
                    </div>
                </div>}
            {meaning.definitions.length > 0 ? (
                <div className='definitions'>
                    <h3>Meaning</h3>
                    <div>
                        <ul>
                            {meaning.definitions.map((definition, i) => {
                                return (
                                    <li key={i}>
                                        <div>
                                            <span>{definition.definition}</span>
                                            {definition.example && <span>“{definition.example}”</span>}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            ) : ''}
            {meaning.synonyms.length > 0 ? (
                <div className='synonyms'>
                    <h3>Synonyms</h3>
                    <span>
                        {meaning.synonyms.map((synonym, i) => {
                            return i === (meaning.synonyms.length - 1)
                            ? <span key={i}><span>{synonym}</span></span> 
                            : <span key={i}><span>{synonym}</span>, </span>;
                        })}
                    </span>
                </div>
            ): ''}
        </section>
    );
}

export default Meaning;