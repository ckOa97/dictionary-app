import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import './css/App.css';

const WordDataCtx = createContext();
const ErrorCtx = createContext();

function App() {
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState({
        exist: false,
        type: null,
        message: null
    });

    return (
        <WordDataCtx.Provider value={[wordData, setWordData]}>
            <ErrorCtx.Provider value={[error, setError]}>
                <Routes>
                    <Route path='/' element={(
                        <>
                            <Header />
                            <Main />
                            <Footer />
                        </>
                    )} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ErrorCtx.Provider>
        </WordDataCtx.Provider>
    );
}

export { WordDataCtx, ErrorCtx };
export default App;

//implement searchParams and create logic that redirecting you to the home page