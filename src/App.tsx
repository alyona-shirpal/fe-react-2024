import { useEffect, useState } from 'react';

import { About } from '@/components/about/About.component.tsx';
import { Footer } from '@/components/footer/Footer.component.tsx';
import { Header } from '@/components/header/Header.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import type { ActivePage } from '@/types/states.ts';
import { getTotalCartCount } from '@/utils/getTotalCartCount.ts';

import styles from './App.module.css';

function App() {
    const [activePage, setActivePage] = useState<ActivePage>('about');
    const [totalCart, setTotalCart] = useState<number>(0);

    useEffect(() => {
        const total = getTotalCartCount();
        setTotalCart(total);
    }, []);

    const handleActivePage = (page: ActivePage) => {
        setActivePage(page);
    };

    const updateTotalCart = () => {
        const total = getTotalCartCount();
        setTotalCart(total);
    };

    return (
        <div className={styles.mainContainer}>
            <Header activePage={activePage} onChange={handleActivePage} totalCart={totalCart} />

            {activePage === 'about' ? <About /> : <ProductList updateTotalCart={updateTotalCart} />}

            <Footer />
        </div>
    );
}

export default App;
