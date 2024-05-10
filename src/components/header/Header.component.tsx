import React, { useState } from 'react';

import { BurgerIcon } from '@/assets/icons/Burger.tsx';
import { CartIcon } from '@/assets/icons/Cart.tsx';
import { LoginIcon } from '@/assets/icons/Login.tsx';
import { LogoIcon } from '@/assets/icons/Logo.tsx';
import { MoonIcon } from '@/assets/icons/Moon.tsx';
import { SignUpIcon } from '@/assets/icons/SignUp.tsx';
import { SunIcon } from '@/assets/icons/Sun.tsx';
import type { ActivePage, ActiveTheme } from '@/types/states.ts';

import styles from './header.module.css';

interface HeaderProps {
    onChange: (page: ActivePage) => void;
    activePage: ActivePage;
    totalCart: number;
}
export const Header: React.FC<HeaderProps> = ({ onChange, activePage, totalCart }) => {
    const [activeTheme, setActiveTheme] = useState<ActiveTheme>('dark');

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.leftHeader}>
                <div>
                    <LogoIcon />
                </div>
                <div className={styles.themeWrapper}>
                    <button className={styles.themeButton} onClick={() => setActiveTheme('light')}>
                        <SunIcon theme={activeTheme} />
                    </button>

                    <div className={styles.pipe}></div>

                    <button className={styles.themeButton} onClick={() => setActiveTheme('dark')}>
                        <MoonIcon theme={activeTheme} />
                    </button>
                </div>
            </div>

            <div className={styles.rightHeader}>
                <div className={styles.pages}>
                    <button className={activePage === 'about' ? styles.activeButton : styles.defaultLink} onClick={() => onChange('about')}>
                        About
                    </button>
                    <button
                        className={activePage === 'products' ? styles.activeButton : styles.defaultLink}
                        onClick={() => onChange('products')}
                    >
                        Products
                    </button>
                </div>

                <div className={styles.menuSide}>
                    <button className={styles.cartButton}>
                        <CartIcon color={'white'} />
                        {totalCart > 0 && <div className={styles.counter}>{totalCart}</div>}
                    </button>
                    <button className={styles.burgerButton}>
                        <BurgerIcon />
                    </button>
                    <div className={styles.authWrapper}>
                        <button className={styles.authButton}>
                            <LoginIcon /> Login
                        </button>
                        <button className={styles.signUpButton}>
                            <SignUpIcon /> Sign up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
