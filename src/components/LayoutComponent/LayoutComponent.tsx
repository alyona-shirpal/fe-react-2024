import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/footer/Footer.component.tsx';
import { Header } from '@/components/header/Header.component.tsx';
import { THEME } from '@/constants/common.ts';
import type { ActiveTheme } from '@/types/states.ts';

import styles from './layout.module.css';

export const LayoutComponent = () => {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(THEME) as ActiveTheme;

        if (savedTheme) {
            return savedTheme;
        }

        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkMode ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState<ActiveTheme>(() => getInitialTheme());

    const handleThemeChange = (newTheme: ActiveTheme) => {
        setTheme(newTheme);
        localStorage.setItem(THEME, newTheme);
    };

    return (
        <div className={`${styles.mainContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <Header onThemeChange={handleThemeChange} currentTheme={theme} />
            <Outlet />
            <Footer />
        </div>
    );
};
