import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { BurgerIcon } from '@/assets/icons/Burger.tsx';
import { CartIcon } from '@/assets/icons/Cart.tsx';
import { LoginIcon } from '@/assets/icons/Login.tsx';
import { LogoIcon } from '@/assets/icons/Logo.tsx';
import { MoonIcon } from '@/assets/icons/Moon.tsx';
import { SignUpIcon } from '@/assets/icons/SignUp.tsx';
import { SunIcon } from '@/assets/icons/Sun.tsx';
import { useCart } from '@/contexts/CartContextProvider.tsx';
import type { ActiveTheme } from '@/types/states.ts';

import styles from './header.module.css';

interface HeaderProps {
    onThemeChange: (theme: ActiveTheme) => void;
    currentTheme: ActiveTheme;
}
export const Header: React.FC<HeaderProps> = ({ onThemeChange, currentTheme }) => {
    const [activeTheme, setActiveTheme] = useState<ActiveTheme>(currentTheme);
    const cart = useCart().cart;
    const changeTheme = (theme: ActiveTheme) => {
        setActiveTheme(theme);
        onThemeChange(theme);
    };

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.leftHeader}>
                <div>
                    <LogoIcon />
                </div>
                <div className={styles.themeWrapper}>
                    <button className={styles.themeButton} onClick={() => changeTheme('light')}>
                        <SunIcon theme={activeTheme} />
                    </button>

                    <div className={styles.pipe}></div>

                    <button className={styles.themeButton} onClick={() => changeTheme('dark')}>
                        <MoonIcon theme={activeTheme} />
                    </button>
                </div>
            </div>

            <div className={styles.rightHeader}>
                <div className={styles.pages}>
                    <NavLink className={({ isActive }) => (isActive ? styles.activeButton : styles.defaultLink)} to={'/'}>
                        {' '}
                        About{' '}
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.activeButton : styles.defaultLink)} to={'/products'}>
                        {' '}
                        Products{' '}
                    </NavLink>
                </div>

                <div className={styles.menuSide}>
                    <button className={styles.cartButton}>
                        <CartIcon color={'white'} />
                        {cart.length > 0 && (
                            <div className={styles.counter}>{cart.reduce((accumulator, it) => accumulator + it.quantity, 0)}</div>
                        )}
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
