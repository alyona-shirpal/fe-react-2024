import React, { useState } from 'react';

import { filters } from '@/assets/constants/filters.ts';
import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx';
import { ArrowUpIcon } from '@/assets/icons/ArrowUp.tsx';
import { SearchIcon } from '@/assets/icons/Search.tsx';

import styles from './searchBar.module.css';

interface SearchProps {
    onSearch: (term: string) => void;
    onCategoryChange: (category: string) => void;
    onFilterChange: (filter: string) => void;
    activeCategories: string[];
    activeFilter: string;
}
export const SearchBar: React.FC<SearchProps> = ({ onSearch, onCategoryChange, onFilterChange, activeCategories, activeFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };
    const handleDropdown = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        } else {
            onFilterChange('price-desc');
            setIsDropdownOpen(true);
        }
    };

    const handleCategory = (categoryName: string) => {
        onCategoryChange(categoryName);
    };

    const handleFilter = (filterName: string) => {
        onFilterChange(filterName);
    };

    return (
        <div className={styles.searchBarWrapper}>
            <div className={styles.inputSearch}>
                <input type="text" placeholder="Search..." className={styles.search} onChange={handleSearchChange} value={searchTerm} />
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
                        className={`${styles.priceLowButton} ${isDropdownOpen && activeFilter === 'price-desc' ? styles.priceLowButtonActive : ''}`}
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
