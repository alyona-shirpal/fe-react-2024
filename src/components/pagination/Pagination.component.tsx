import React from 'react';
import { useSelector } from 'react-redux';

import { LeftArrowIcon } from '@/assets/icons/LeftArrow.tsx';
import { RightArrowIcon } from '@/assets/icons/RightArrow.tsx';
import { selectCurrentPage } from '@/store/store.ts';

import styles from './pagination.module.css';

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
    const currentPage = useSelector(selectCurrentPage);

    const getPagination = (): (string | number)[] => {
        const pages = [];

        const shouldShowEllipsis = totalPages > 3;
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        pages.push(1);

        if (shouldShowEllipsis && startPage > 2) {
            pages.push('...');
        }

        for (let index = startPage; index <= endPage; index++) {
            pages.push(index);
        }

        if (shouldShowEllipsis && endPage < totalPages - 1) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const handleClick = (page: number | string) => {
        if (page === '...') return;
        onPageChange(page as number);
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            onPageChange(newPage);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            onPageChange(newPage);
        }
    };

    return (
        <div className={styles.paginationWrapper}>
            <button onClick={handlePreviousClick} className={styles.arrowButton} disabled={currentPage === 1}>
                <LeftArrowIcon disable={currentPage === 1} />
            </button>

            {getPagination().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(page)}
                    disabled={typeof page === 'string'}
                    className={
                        typeof page === 'number' ? `${styles.pageNumber} ${page === currentPage ? styles.selectedPage : ''}` : styles.dots
                    }
                >
                    {page}
                </button>
            ))}

            <button onClick={handleNextClick} className={styles.arrowButton} disabled={currentPage === totalPages}>
                <RightArrowIcon disable={currentPage === totalPages} />
            </button>
        </div>
    );
};
