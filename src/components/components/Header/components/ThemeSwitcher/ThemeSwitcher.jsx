import { useState, useEffect } from 'react';
import './css/ThemeSwitcher.css';
import moonIcon from '../../../../../assets/icon-moon.svg';
import moonIconDark from '../../../../../assets/icon-moon-dark.svg';

function ThemeSwitcher() {
    const [darkTheme, setDarkTheme] = useState(false);

    function toggleTheme() {
        setDarkTheme(darkTheme => !darkTheme);
    }

    function handleKeyDown(e) {
        if(e.key === ' ') e.preventDefault();
        switch(e.key) {
            case 'Enter':
                toggleTheme();
                break;
            case ' ':
                toggleTheme();
                break;
        }
    }

    useEffect(() => {
        if(matchMedia && matchMedia('(prefers-color-scheme: dark)'))
            setDarkTheme(true);
    }, []);

    useEffect(() => {
        if(document.body.classList.contains('dark'))
            document.body.classList.remove('dark');
        if(document.body.classList.contains('light'))
            document.body.classList.remove('light');

        if(darkTheme) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.add('light');
        }
    }, [darkTheme]);

    return (
        <div className="ThemeSwitcher">
            <div onClick={toggleTheme} onKeyDown={handleKeyDown} tabIndex="0">
                <div></div>
            </div>
            <img 
            src={darkTheme ? moonIconDark : moonIcon} 
            alt="moon icon" />
        </div>
    );
}

export default ThemeSwitcher;