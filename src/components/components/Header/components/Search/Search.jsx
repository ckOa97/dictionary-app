import { useContext, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WordDataCtx, ErrorCtx } from '../../../../App.jsx';
import './css/Search.css';
import iconSearch from '../../../../../assets/icon-search.svg';

function Search() {
    const [wordData, setWordData] = useContext(WordDataCtx);
    const [error, setError] = useContext(ErrorCtx);
    const input = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [validationError, setValidationError] = useState({
        exist: false,
        message: null
    });

    function handleSubmit(e) {
        e.preventDefault();
        const word = input.current.value.trim().toLowerCase();
        input.current.blur();
        if(word === '') {
            setValidationError({
                exist: true,
                message: 'Whoops, can’t be empty…'
            });
            return;
        }
        setSearchParams(searchParams => {
            searchParams.set('word', word);
            return searchParams;
        });
    }

    function handleInput() {
        if(!validationError.exist) return;
        setValidationError({
            exist: false,
            message: null
        });
    }

    useEffect(() => {
        (() => {
            const word = searchParams.get('word');
            if(validationError.exist)
                setValidationError({
                    exist: false,
                    message: null
                });
            if(!word) {
                if(error.exist)
                    setError({
                        exist: false,
                        type: null,
                        message: null
                    });
                setWordData(null);
                input.current.value = '';
                return;
            }
            input.current.value = word;
            searchForWord(word);
        })();
    }, [searchParams]);

    async function searchForWord(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            setWordData(data);
            setError({
                exist: false,
                type: null,
                message: null
            });
        } catch(e) {
            switch(e.message) {
                case '404':
                    setError({
                        exist: true,
                        type: 'No Definitions Found',
                        message: "Sorry pal, we couldn't find definitions " +
                                 "for the word you were looking for. " +
                                 "You can try the search again at later " +
                                 "time or head to the web instead."
                    });
                    break;
                case 'Failed to fetch':
                    setError({
                        exist: true,
                        type: 'Whoops!',
                        message: 'Something went wrong. ' +
                                'Please check your internet ' +
                                'connection or try again later.'
                    });
                    break;
                default:
                    setError({
                        exist: true,
                        type: 'Whoops!',
                        message: 'Something went wrong. ' +
                                'Please try again later.'
                    });
            }
        }
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <input 
                    ref={input}
                    onInput={handleInput}
                    className={validationError.exist ? 'invalidInput':'validInput'}
                    type="text" 
                    id="search" 
                    name="search" 
                    placeholder="Search for any word…" />
                <button type="submit" tabIndex="-1"><img src={iconSearch} alt="icon search" /></button>
            </form>
            {validationError.exist && <span>{validationError.message}</span>}
        </div>
    );
}

export default Search;