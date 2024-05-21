import { useEffect, useState } from 'react';

import { About } from '@/components/about/About.component.tsx';
import { Footer } from '@/components/footer/Footer.component.tsx';
import { Header } from '@/components/header/Header.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import { SearchBar } from '@/components/searchBar/searchBar.component.tsx';
import type { ActivePage, ActiveTheme } from '@/types/states.ts';
import { getCartTotalAmount } from '@/utils/getCartTotalAmount.ts';

import styles from './App.module.css';

function App() {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme') as ActiveTheme;

        if (savedTheme) {
            return savedTheme;
        }

        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkMode ? 'dark' : 'light';
    };

    const [activePage, setActivePage] = useState<ActivePage>('about');
    const [totalCart, setTotalCart] = useState<number>(0);
    const [theme, setTheme] = useState<ActiveTheme>(() => getInitialTheme());

    useEffect(() => {
        const total = getCartTotalAmount();
        setTotalCart(total);
    }, []);

    const handleActivePage = (page: ActivePage) => {
        setActivePage(page);
    };

    const updateTotalCart = () => {
        const total = getCartTotalAmount();
        setTotalCart(total);
    };

    const handleThemeChange = (newTheme: ActiveTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className={`${styles.mainContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <Header
                activePage={activePage}
                onChange={handleActivePage}
                totalCart={totalCart}
                onThemeChange={handleThemeChange}
                currentTheme={theme}
            />
            {activePage === 'products' && <SearchBar />}

            {activePage === 'about' ? <About /> : <ProductList updateTotalCart={updateTotalCart} />}

            <Footer />
        </div>
    );
}

export default App;
