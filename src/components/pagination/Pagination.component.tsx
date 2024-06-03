import React, { useEffect, useState } from 'react';

import { LeftArrowIcon } from '@/assets/icons/LeftArrow.tsx';
import { RightArrowIcon } from '@/assets/icons/RightArrow.tsx';

import styles from './pagination.module.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange, currentPage }) => {
    const [activePage, setActivePage] = useState<number>(currentPage);

    const getPagination = (): (string | number)[] => {
        const pages = [];

        const shouldShowEllipsis = totalPages > 3;
        const startPage = Math.max(2, activePage - 1);
        const endPage = Math.min(totalPages - 1, activePage + 1);

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

    useEffect(() => {
        setActivePage(currentPage);
    }, [currentPage]);

    const handleClick = (page: number | string) => {
        if (page === '...') return;
        setActivePage(page as number);
        onPageChange(page as number);
    };

    const handlePreviousClick = () => {
        if (activePage > 1) {
            const newPage = activePage - 1;
            setActivePage(newPage);
            onPageChange(newPage);
        }
    };

    const handleNextClick = () => {
        if (activePage < totalPages) {
            const newPage = activePage + 1;
            setActivePage(newPage);
            onPageChange(newPage);
        }
    };

    return (
        <div className={styles.paginationWrapper}>
            <button onClick={handlePreviousClick} className={styles.arrowButton} disabled={activePage === 1}>
                <LeftArrowIcon disable={activePage === 1} />
            </button>

            {getPagination().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(page)}
                    disabled={typeof page === 'string'}
                    className={
                        typeof page === 'number' ? `${styles.pageNumber} ${page === activePage ? styles.selectedPage : ''}` : styles.dots
                    }
                >
                    {page}
                </button>
            ))}

            <button onClick={handleNextClick} className={styles.arrowButton} disabled={activePage === totalPages}>
                <RightArrowIcon disable={activePage === totalPages} />
            </button>
        </div>
    );
};
