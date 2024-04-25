// src/redux/actions/authActions.js
import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';


export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error: error.toString()
});

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_ERROR
});

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post('http://localhost:5000/api/login', credentials);
        const { data } = response;
        dispatch(loginSuccess(data));
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        dispatch(loginFailure(error.response ? error.response.data : error.message));
    }
};
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const CLEAR_REGISTER_ERROR = 'CLEAR_REGISTER_ERROR';
export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    error: error.message
});

export const clearRegisterError = () => ({
    type: CLEAR_REGISTER_ERROR
});

export const registerUser = (credentials) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post('http://localhost:5000/api/register', credentials);
        const { data } = response;
        dispatch(registerSuccess(data));
        localStorage.setItem('user', JSON.stringify(data)); // Optionally save the user data in local storage
    } catch (error) {
        dispatch(registerFailure(error.response ? error.response.data : error.message));
    }
};
