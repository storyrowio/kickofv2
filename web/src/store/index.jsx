import {configureStore} from "@reduxjs/toolkit";
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from 'react-redux';
import ThemeSlice from "@/store/slices/ThemeSlice";
import ProfileSlice from "@/store/slices/ProfileSlice.jsx";
import AppSlice from "@/store/slices/AppSlice.jsx";

const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
        profile: ProfileSlice.reducer,
        theme: ThemeSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

export default store;
