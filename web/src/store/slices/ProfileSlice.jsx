import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: '',
    email: '',
    name: '',
    role: {}
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        reset: () => initialState
    }
});

export const ProfileActions = ProfileSlice.actions;

export default ProfileSlice;
