import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {

    LoginRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;

    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;

    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    RegisterRequest: (state, action) => {
        state.loading = true;
    },
    RegisterSuccess: (state, action) => {        
        state.loading = false;
        state.user = action.payload;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    LoadUserRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

});