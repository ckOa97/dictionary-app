import { useContext } from 'react';
import { ErrorCtx } from '../../../../App.jsx';
import './css/Error.css';

function Error() {
    const [error, setError] = useContext(ErrorCtx);

    return (
        <main className='Error'>
            <section>
                <span>😕</span>
                <div>
                    <h1>{error.type}</h1>
                    <p>{error.message}</p>
                </div>
            </section>
        </main>
    );
}

export default Error;