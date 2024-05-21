import React, { useState } from 'react';

import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx';
import { ArrowUpIcon } from '@/assets/icons/ArrowUp.tsx';
import { SearchIcon } from '@/assets/icons/Search.tsx';

import styles from './searchBar.module.css';
export const SearchBar: React.FC = () => {
    const [isDropdown, setIsDropdown] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [activeFilter, setActiveFilter] = useState<string>('');

    const handleDropdown = () => {
        if (isDropdown) {
            setIsDropdown(false);
        } else {
            setActiveFilter('');
            setIsDropdown(true);
        }
    };

    const handleCategory = (categoryName: string) => {
        setActiveCategory(categoryName);
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
                            className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className={styles.sortWrapper}>
                    <h3 className={styles.sortBy}> Sort by:</h3>
                    <button
                        onClick={handleDropdown}
                        className={`${styles.priceLowButton} ${isDropdown && !activeFilter ? styles.priceLowButtonActive : ''}`}
                    >
                        Price (High - Low) {isDropdown ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                    {isDropdown && (
                        <menu className={styles.dropdownMenu}>
                            <li
                                role="button"
                                onClick={() => handleFilter('Price (Low - High)')}
                                className={`${styles.filterPrice} ${activeFilter === 'Price (Low - High)' ? styles.filterPriceActive : ''}`}
                            >
                                Price (Low - High)
                            </li>
                            <li
                                role="button"
                                onClick={() => handleFilter('Newest')}
                                className={`${styles.filterPrice} ${activeFilter === 'Newest' ? styles.filterPriceActive : ''}`}
                            >
                                Newest
                            </li>
                            <li
                                role="button"
                                onClick={() => handleFilter('Oldest')}
                                className={`${styles.filterPrice} ${activeFilter === 'Oldest' ? styles.filterPriceActive : ''}`}
                            >
                                Oldest
                            </li>
                        </menu>
                    )}
                </div>
            </div>
        </div>
    );
};
