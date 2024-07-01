import FontsDropdownList from './components/FontsDropdownList/FontsDropdownList.jsx';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher.jsx';
import Search from './components/Search/Search.jsx';
import './css/Header.css';
import logo from '../../../assets/logo.svg';

function Header() {

    return (
        <header className='Header'>
            <div>
                <img src={logo} alt="logo" />
                <div>
                    <FontsDropdownList />
                    <ThemeSwitcher />
                </div>
            </div>
            <Search />
        </header>
    );

}

export default Header;