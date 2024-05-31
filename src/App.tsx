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
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const total = getCartTotalAmount();
        setTotalCart(total);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await fetchApi();
            setProducts(productData);

            const paginated = productData.slice((currentPage - 1) * 8, currentPage * 8);
            setPaginatedProducts(paginated);

            setTotalPages(Math.ceil(productData.length / 8));
        };

        fetchProduct();
    }, [currentPage]);

    useEffect(() => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (activeCategories.length > 0) {
            filtered = filtered.filter((product) => activeCategories.includes(product.category.name));
        }

        if (activeFilter) {
            switch (activeFilter) {
                case 'price-asc': {
                    filtered = filtered.sort((a, b) => a.price - b.price);

                    break;
                }
                case 'price-desc': {
                    filtered = filtered.sort((a, b) => b.price - a.price);

                    break;
                }
                case 'newest': {
                    filtered = filtered.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());

                    break;
                }
                case 'oldest': {
                    filtered = filtered.sort((a, b) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime());

                    break;
                }
            }
        }

        const paginated = filtered.slice((currentPage - 1) * 8, currentPage * 8);
        setPaginatedProducts(paginated);
        setTotalPages(Math.ceil(filtered.length / 8));
    }, [activeFilter, searchTerm, activeCategories, products]);

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

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategories((previousCategories) =>
            previousCategories.includes(category)
                ? previousCategories.filter((cat) => cat !== category)
                : [...previousCategories, category],
        );
        setCurrentPage(1);
    };

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1);
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
                        onSearch={handleSearch}
                        onCategoryChange={handleCategoryChange}
                        onFilterChange={handleFilterChange}
                        activeCategories={activeCategories}
                        activeFilter={activeFilter}
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
