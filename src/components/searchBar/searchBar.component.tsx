import React, { useState } from 'react';

import { filters } from '@/assets/constants/filters.ts';
import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx';
import { ArrowUpIcon } from '@/assets/icons/ArrowUp.tsx';
import { SearchIcon } from '@/assets/icons/Search.tsx';

import styles from './searchBar.module.css';
export const SearchBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('');

    const handleDropdown = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        } else {
            setActiveFilter('');
            setIsDropdownOpen(true);
        }
    };

    const handleCategory = (categoryName: string) => {
        setActiveCategories((previousCategory) =>
            previousCategory.includes(categoryName)
                ? previousCategory.filter((category) => category !== categoryName)
                : [...previousCategory, categoryName],
        );
    };

    const handleFilter = (filterName: string) => {
        setActiveFilter(filterName);
    };

    return (
        <div className={styles.searchBarWrapper}>
            <div className={styles.inputSearch}>
                <input type="text" placeholder="Search..." className={styles.search} />
                <button className={styles.searchIconButton}>
                    <SearchIcon />
                </button>
            </div>

            <div className={styles.categoriesWrapper}>
                <div className={styles.categories}>
                    {['Electronics', 'Shoes', 'Clothes'].map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategory(category)}
                            className={`${styles.categoryButton} ${activeCategories.includes(category) ? styles.activeCategory : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className={styles.sortWrapper}>
                    <h3 className={styles.sortBy}> Sort by:</h3>
                    <button
                        onClick={handleDropdown}
                        className={`${styles.priceLowButton} ${isDropdownOpen && !activeFilter ? styles.priceLowButtonActive : ''}`}
                    >
                        Price (High - Low) {isDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                    {isDropdownOpen && (
                        <menu className={styles.dropdownMenu}>
                            {filters.map((item) => (
                                <li
                                    role="button"
                                    key={item.key}
                                    onClick={() => handleFilter(item.key)}
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
