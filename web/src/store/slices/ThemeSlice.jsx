import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarMenus: [],
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarMenus: (state, action) => {
            state.sidebarMenus = action.payload;
        },
        reset: () => initialState
    }
});

export const ThemeActions = ThemeSlice.actions;

export default ThemeSlice;
