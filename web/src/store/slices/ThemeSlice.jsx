import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarMenus: [],
    miniSidebar: false,
    sidebarOpen: true,
    activeSidebarGroupMenu: []
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarMenus: (state, action) => {
            state.sidebarMenus = action.payload;
        },
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
