import axios from 'axios';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    error: error
});

// Thunk action for registering a user
export const registerUser = (credentials) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post('http://localhost:5000/api/register', credentials);
        const { data } = response;
        dispatch(registerSuccess(data));
        localStorage.setItem('user', JSON.stringify(data)); // Store the user in local storage
    } catch (error) {
        dispatch(registerFailure(error.response ? error.response.data : error.message));
    }
};
