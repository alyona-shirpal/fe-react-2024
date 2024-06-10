import { useNavigate } from 'react-router-dom';

import styles from './notFound.module.css';
export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <h1 className={styles.number}> 404</h1>
                <h3 className={styles.text}> Oops! The page not found</h3>
                <button className={styles.buttonToHome} onClick={handleBackHome}>
                    Back To Home
                </button>
            </div>
        </div>
    );
};
