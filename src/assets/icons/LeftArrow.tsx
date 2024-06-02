import React from 'react';

interface PropertyIcon {
    disable: boolean;
}
export const LeftArrowIcon: React.FC<PropertyIcon> = ({ disable }) => (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.75016 6.91659L0.833496 3.99992L3.75016 1.08325"
            stroke={disable ? 'var(--light-grey)' : 'var(--text-color)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
