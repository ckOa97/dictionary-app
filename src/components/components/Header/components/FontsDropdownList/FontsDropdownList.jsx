import { useState, useRef, useReducer, useEffect } from 'react';
import './css/FontsDropdownList.css';
import iconArrowDown from '../../../../../assets/icon-arrow-down.svg';

function reduceFont(state, action) {
    function goUpOrDown(direction) {
        console.log(state);
        const index = state.fonts.findIndex(
            font => font === state.selected
        );

        switch(direction) {
            case 'down':
                if(index < state.fonts.length - 1) {
                    const currentFont = 
                    state.dropDown ? 
                    state.currentFont : 
                    state.fonts[index + 1];
                    return {
                        ...state,
                        selected: state.fonts[index + 1], 
                        currentFont
                    };
                }
                break;

            case 'up':
                if(index > 0) {
                    const currentFont = 
                    state.dropDown ? 
                    state.currentFont : 
                    state.fonts[index - 1];
                    return {
                        ...state, 
                        selected: state.fonts[index - 1], 
                        currentFont
                    };
                }
                    break;
        }

        return state;
    }
    switch(action.type) {
        case 'openDropDown': return {...state, dropDown: true};
        case 'closeDropDown': return {
            ...state, 
            dropDown: false,
            currentFont: state.selected
        };
        case 'toggleDropDown':
            if(state.dropDown) 
                return {
                    ...state, 
                    dropDown: false,
                    currentFont: state.selected
                };
            return {
                ...state,
                dropDown: true
            };
        case 'goDown': return goUpOrDown('down');
        case 'goUp': return goUpOrDown('up');
        case 'setFont': return {
            ...state, 
            dropDown: false,
            selected: action.font,
            currentFont: action.font
        };
    }

    return state;
}

function FontsDropdownList() {
    const [dropDownState, dispatchDropDownState] = useReducer(reduceFont, {
        dropDown: false,
        currentFont: 'Sans Serif',
        selected: 'Sans Serif',
        fonts: ['Sans Serif', 'Serif', 'Mono']
    });

    function handleBlur() {
        dispatchDropDownState({type: 'closeDropDown'});
    }

    function setSelectedClass(font) {
        return font === dropDownState.selected ? 'selected':'';
    }

    function handleClick(e) {
        dispatchDropDownState({type: 'toggleDropDown'});
    }

    function handleKeyDown(e) {
        if(e.key !== 'Tab') e.preventDefault();
        switch(e.key) {
            case ' ':
                dispatchDropDownState({type: 'openDropDown'});
                break;
            case 'Enter':
                dispatchDropDownState({type: 'toggleDropDown'});
                break;
            case 'ArrowDown':
                dispatchDropDownState({type: 'goDown'});
                break;
            case 'ArrowUp':
                dispatchDropDownState({type: 'goUp'});
                break;
            case 'Tab':
                dispatchDropDownState({type: 'blur'});
                break;
        }
    }

    function itemClickHandler(font) {
        dispatchDropDownState({type: 'setFont', font});
    }

    useEffect(() => {
        dropDownState.fonts.forEach(font => {
            if(document.body.classList.contains(font.split(' ').join('')))
                document.body.classList.remove(font.split(' ').join(''));
        });
        document.body.classList.add(dropDownState.currentFont.split(' ').join(''));
    }, [dropDownState]);

    return (
        <div
        className={`FontsDropdownList ${dropDownState.dropDown ? 'opened':'closed'}`} 
        tabIndex='0' onBlur={handleBlur}
        onKeyDown={handleKeyDown}>
            <div onClick={handleClick}>
                <span>{dropDownState.selected}</span>
                <img src={iconArrowDown} alt="arrow down" />
            </div>
            <ul>
                {dropDownState.fonts.map(
                    font => <li key={font} onClick={() => itemClickHandler(font)} className={setSelectedClass(font)}>{font}</li>
                )}
            </ul>
        </div>
    );
}

export default FontsDropdownList;