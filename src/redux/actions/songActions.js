// actions.js
import axios from 'axios';
import { serverUrl } from '../../apis/serverapi';


export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const fetchSongs = () => async dispatch => {
  dispatch({ type: FETCH_SONGS_REQUEST });
  try {
    const response = await axios.get(`${serverUrl}/songs`);
    dispatch({ type: FETCH_SONGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SONGS_FAILURE, payload: error.message });
  }
};



