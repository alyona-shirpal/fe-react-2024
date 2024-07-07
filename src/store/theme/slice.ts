import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ThemeState = 'light' | 'dark';

const getInitialTheme = (): ThemeState => {
    const savedTheme = localStorage.getItem('theme') as ThemeState;
    if (savedTheme) {
        return savedTheme;
    }
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
};

const initialState: ThemeState = getInitialTheme();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeState>) => {
            localStorage.setItem('theme', action.payload);
            return action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
