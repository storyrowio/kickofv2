import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    miniSidebar: false,
    sidebarOpen: true,
    activeSidebarGroupMenu: []
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarOpen: (state, action) => {
            state.activeSidebarGroupMenu = [];
            state.sidebarOpen = action.payload;
        },
        setActiveSidebarGroupMenu: (state, action) => {
            if (state.activeSidebarGroupMenu.includes(action.payload)) {
                state.activeSidebarGroupMenu = state.activeSidebarGroupMenu.filter(e => e !== action.payload);
            } else {
                state.activeSidebarGroupMenu = [...state.activeSidebarGroupMenu, action.payload];
            }
        },
        reset: () => initialState
    }
});

export const ThemeActions = ThemeSlice.actions;

export default ThemeSlice;
