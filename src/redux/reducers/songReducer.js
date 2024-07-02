// reducers.js
import { FETCH_SONGS_FAILURE, FETCH_SONGS_REQUEST, FETCH_SONGS_SUCCESS } from '../actions/songActions';


const initialState = {
  loading: false,
  songs: [],
  error: '',
};

export const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS_REQUEST:
      return { ...state, loading: true };
    case FETCH_SONGS_SUCCESS:
      return { loading: false, songs: action.payload, error: '' };
    case FETCH_SONGS_FAILURE:
      return { loading: false, songs: [], error: action.payload };
    default:
      return state;
  }
};




