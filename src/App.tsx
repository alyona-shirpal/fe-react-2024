import { useEffect, useState } from 'react';

import { About } from '@/components/about/About.component.tsx';
import { Footer } from '@/components/footer/Footer.component.tsx';
import { Header } from '@/components/header/Header.component.tsx';
import { Pagination } from '@/components/pagination/Pagination.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import { SearchBar } from '@/components/searchBar/searchBar.component.tsx';
import type { Product } from '@/types/interfaces/Product.ts';
import type { ActivePage, ActiveTheme } from '@/types/states.ts';
import { fetchApi } from '@/utils/fetchApi.ts';
import { getCartTotalAmount } from '@/utils/getCartTotalAmount.ts';
import { getPaginatedProducts } from '@/utils/getPaginatedProducts.ts';

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const total = getCartTotalAmount();
        setTotalCart(total);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await fetchApi();
            setProducts(productData);

            const paginated = getPaginatedProducts(productData, currentPage);
            setPaginatedProducts(paginated);

            setTotalPages(Math.ceil(productData.length / 8));
        };

        fetchProduct();
    }, [currentPage]);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilteredProducts = (filteredProducts: Product[]) => {
        setPaginatedProducts(filteredProducts);
        const paginated = getPaginatedProducts(filteredProducts, currentPage);
        setPaginatedProducts(paginated);
        setTotalPages(Math.ceil(filteredProducts.length / 8));
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

            {activePage === 'products' && products ? (
                <>
                    <SearchBar
                        products={products}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onFilteredProducts={handleFilteredProducts}
                    />
                    <ProductList updateTotalCart={updateTotalCart} products={paginatedProducts} />
                    <Pagination totalPages={totalPages} onPageChange={handlePageChange} currentPage={currentPage} />
                </>
            ) : (
                <About />
            )}

            <Footer />
        </div>
    );
}

export default App;
