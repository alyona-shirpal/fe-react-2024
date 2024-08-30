import { LoginIcon } from '@/assets/icons/Login.tsx';
import { SignUpIcon } from '@/assets/icons/SignUp.tsx';

import styles from './login.module.css';

export const LoginPage = () => (
    <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
            <h2 className={styles.title}>Login</h2>
            <input type="email" className={styles.loginInput} placeholder="Email address" />
            <input type="password" className={styles.loginInput} placeholder="Password" />

            <button>
                <LoginIcon /> Login
            </button>
            <button>
                <SignUpIcon /> Sign up
            </button>
        </div>
    </div>
);
