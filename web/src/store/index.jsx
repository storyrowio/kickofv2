import {configureStore} from "@reduxjs/toolkit";
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from 'react-redux';
import ThemeSlice from "@/store/slices/ThemeSlice";

const store = configureStore({
    reducer: {
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
