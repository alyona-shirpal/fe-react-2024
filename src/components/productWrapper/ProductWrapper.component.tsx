import React, { useEffect, useState } from 'react';

import { Loader } from '@/components/loader/Loader.tsx';
import { Pagination } from '@/components/pagination/Pagination.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import { SearchBar } from '@/components/searchBar/searchBar.component.tsx';
import type { Product } from '@/types/interfaces/Product.ts';
import { fetchProductFnct } from '@/utils/fetchProduct.ts';

import styles from './productWrapper.module.css';

export const ProductWrapper: React.FC = () => {
    const [totalPages, setTotalPages] = useState(0);

    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const limit = 8;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await fetchProductFnct(currentPage, limit, searchTerm, category, activeFilter);

                setIsLoading(false);
                setProducts(productData.products);
                setPaginatedProducts(productData.products);

                const calculatedTotalPages = Math.ceil(productData.total / limit);
                setTotalPages(calculatedTotalPages);
            } catch {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [currentPage, searchTerm, category, activeFilter]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilteredProducts = (filteredProducts: Product[]) => {
        setPaginatedProducts(filteredProducts);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const onFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };

    const handleCategoryChange = (categoryId: number) => {
        categoryId === category ? setCategory(0) : setCategory(categoryId);
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <SearchBar
                        products={products}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onFilteredProducts={handleFilteredProducts}
                        onSearch={handleSearch}
                        onCategoryChange={handleCategoryChange}
                        onFilterChange={onFilterChange}
                    />
                    {products.length === 0 ? (
                        <div className={styles.noProducts}>
                            <h1>No matches found for your search criteria.</h1>
                        </div>
                    ) : (
                        <>
                            <ProductList products={paginatedProducts} />
                            <Pagination totalPages={totalPages} onPageChange={handlePageChange} currentPage={currentPage} />
                        </>
                    )}
                </div>
            )}
        </>
    );
};
