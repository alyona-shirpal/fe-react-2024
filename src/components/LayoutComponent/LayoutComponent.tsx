import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/footer/Footer.component.tsx';
import { Header } from '@/components/header/Header.component.tsx';
import { CartProvider } from '@/contexts/CartContextProvider.tsx';
import { selectTheme } from '@/store/store.ts';
import { setTheme } from '@/store/theme/slice.ts';
import type { ActiveTheme } from '@/types/states.ts';

import styles from './layout.module.css';

export const LayoutComponent = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();
    const handleThemeChange = (newTheme: ActiveTheme) => {
        dispatch(setTheme(newTheme));
    };

    return (
        <CartProvider>
            <div className={`${styles.mainContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
                <Header onThemeChange={handleThemeChange} currentTheme={theme} />
                <Outlet />
                <Footer />
            </div>
        </CartProvider>
    );
};
