import React, { useEffect, useRef, useState } from 'react';

import { ArrowDownIcon } from '@/assets/icons/ArrowDown.tsx';
import { ArrowUpIcon } from '@/assets/icons/ArrowUp.tsx';
import { SearchIcon } from '@/assets/icons/Search.tsx';
import { filters } from '@/constants/filters.ts';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './searchBar.module.css';

interface SearchProps {
    products: Product[];
    currentPage: number;
    onPageChange: (page: number) => void;
    onFilteredProducts: (products: Product[]) => void;
}

export const SearchBar: React.FC<SearchProps> = ({ products, currentPage, onPageChange, onFilteredProducts }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [currentSort, setCurrentSort] = useState<string>('Price (High - Low)');
    const buttonReference = useRef<HTMLButtonElement>(null);
    const dropdownReference = useRef<HTMLDivElement>(null);

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

        onFilteredProducts(filtered);
    }, [activeFilter, searchTerm, activeCategories, products, currentPage, onFilteredProducts]);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onPageChange(1);
    };

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

    const handleCategory = (category: string) => {
        setActiveCategories((previousCategories) =>
            previousCategories.includes(category)
                ? previousCategories.filter((cat) => cat !== category)
                : [...previousCategories, category],
        );
        onPageChange(1);
    };

    const handleFilter = (filterKey: string, filterName: string) => {
        setActiveFilter(filterKey);
        setCurrentSort(filterName);
        onPageChange(1);
        setIsDropdownOpen(false);
    };

    const filteredFilters = filters.filter((item) => item.label !== currentSort);

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
                        className={`${styles.priceLowButton} ${isDropdownOpen ? styles.priceLowButtonActive : ''}`}
                        ref={buttonReference}
                    >
                        {currentSort} {isDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
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
