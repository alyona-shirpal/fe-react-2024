import React, { useEffect, useState } from 'react';

import { Pagination } from '@/components/pagination/Pagination.component.tsx';
import { ProductList } from '@/components/productList/ProductList.component.tsx';
import { SearchBar } from '@/components/searchBar/searchBar.component.tsx';
import type { Product } from '@/types/interfaces/Product.ts';
import { fetchApi } from '@/utils/fetchApi.ts';
import { getPaginatedProducts } from '@/utils/getPaginatedProducts.ts';

interface ProductWrapperProperty {
    updateTotalCart: () => void;
}

export const ProductWrapper: React.FC<ProductWrapperProperty> = ({ updateTotalCart }) => {
    const [totalPages, setTotalPages] = useState(0);

    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);

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
        <div>
            <SearchBar
                products={products}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onFilteredProducts={handleFilteredProducts}
            />
            <ProductList updateTotalCart={updateTotalCart} products={paginatedProducts} />
            <Pagination totalPages={totalPages} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>
    );
};
