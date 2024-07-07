import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '@/components/loader/Loader.tsx';
import { Pagination } from '@/components/pagination/Pagination.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import { SearchBar } from '@/components/searchBar/searchBar.component.tsx';
import useDebounse from '@/hooks/useDebounse.ts';
import { getProductsThunk } from '@/store/products/thunk.ts';
import type { AppDispatch } from '@/store/store.ts';
import { selectIsLoading, selectProductList, selectTotalPages } from '@/store/store.ts';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './productWrapper.module.css';

export const ProductWrapper: React.FC = () => {
    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const debounced = useDebounse(searchTerm, 350);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    const productList = useSelector(selectProductList);
    const isLoading = useSelector(selectIsLoading);
    const totalPages = useSelector(selectTotalPages);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, activeFilter, category]);

    useEffect(() => {
        dispatch(
            getProductsThunk({
                currentPage: page,
                limit: 8,
                searchTerm: debounced,
                category,
                activeFilter,
            }),
        );
    }, [dispatch, category, debounced, activeFilter, page]);

    const handleCategoryChange = (categoryId: number) => {
        categoryId === category ? setCategory(0) : setCategory(categoryId);
    };

    return (
        <>
            <div>
                <SearchBar
                    products={productList}
                    onFilteredProducts={(filteredProducts: Product[]) => {
                        setPaginatedProducts(filteredProducts);
                    }}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onCategoryChange={handleCategoryChange}
                    onFilterChange={(filter: string) => {
                        setActiveFilter(filter);
                    }}
                    currentCategory={category}
                />
                {isLoading && <Loader />}
                {!isLoading && productList.length === 0 ? (
                    <div className={styles.noProducts}>
                        <h1>No matches found for your search criteria.</h1>
                    </div>
                ) : (
                    <>
                        <ProductList products={paginatedProducts} />
                        <Pagination totalPages={totalPages} onPageChange={(next) => setPage(next)} />
                    </>
                )}
            </div>
        </>
    );
};
