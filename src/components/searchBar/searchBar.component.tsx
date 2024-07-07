import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx';
import { ArrowUpIcon } from '@/assets/icons/ArrowUp.tsx';
import { SearchIcon } from '@/assets/icons/Search.tsx';
import { categories } from '@/constants/categories.ts';
import { filters } from '@/constants/filters.ts';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './searchBar.module.css';

interface SearchProps {
    products: Product[];
    onFilteredProducts: (products: Product[]) => void;
    onCategoryChange: (categoryId: number) => void;
    onFilterChange: (filter: string) => void;
    currentCategory: number;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchProps> = ({
    products,
    onFilteredProducts,
    onCategoryChange,
    onFilterChange,
    currentCategory,
    searchTerm,
    setSearchTerm,
}: SearchProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [currentSort, setCurrentSort] = useState<string>('Price (High - Low)');
    const buttonReference = useRef<HTMLButtonElement>(null);
    const dropdownReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let filtered = [...products];

        if (activeFilter) {
            switch (activeFilter) {
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

        onFilteredProducts(filtered);
    }, [activeFilter, products]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownReference.current &&
                !dropdownReference.current.contains(event.target as Node) &&
                buttonReference.current &&
                !buttonReference.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleDropdown = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        } else {
            if (!activeFilter) {
                setActiveFilter('price-desc');
            }
            setIsDropdownOpen(true);
        }
    };

    const handleCategory = (categoryId: number) => {
        onCategoryChange(categoryId);
    };

    const handleFilter = (filterKey: string, filterName: string) => {
        setActiveFilter(filterKey);
        setCurrentSort(filterName);
        setIsDropdownOpen(false);
        onFilterChange(filterKey);
    };

    const filteredFilters = filters.filter((item) => item.label !== currentSort);

    return (
        <div className={styles.searchBarWrapper}>
            <div className={styles.inputSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.search}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    value={searchTerm}
                />
                <button className={styles.searchIconButton}>
                    <SearchIcon />
                </button>
            </div>

            <div className={styles.categoriesWrapper}>
                <div className={styles.categories}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategory(category.id)}
                            className={`${styles.categoryButton} ${currentCategory === category.id ? styles.activeCategory : ''}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className={styles.sortWrapper}>
                    <h3 className={styles.sortBy}> Sort by:</h3>
                    <button
                        onClick={handleDropdown}
                        className={`${styles.priceLowButton} ${isDropdownOpen ? styles.priceLowButtonActive : ''}`}
                        ref={buttonReference}
                    >
                        {currentSort}
                        {isDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>

                    {isDropdownOpen && (
                        <menu className={styles.dropdownMenu} ref={dropdownReference}>
                            {filteredFilters.map((item) => (
                                <li
                                    role="button"
                                    key={item.key}
                                    onClick={() => handleFilter(item.key, item.label)}
                                    className={`${styles.filterPrice} ${activeFilter === item.key ? styles.filterPriceActive : ''}`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </menu>
                    )}
                </div>
            </div>
        </div>
    );
};
