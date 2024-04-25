import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, CLEAR_REGISTER_ERROR, CLEAR_LOGIN_ERROR } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false,
  loginError: null,
  registerError: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
      case REGISTER_SUCCESS:
        return {
            ...state,loading:false
        }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.error
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        registerError: action.error
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: null
      };
    case CLEAR_REGISTER_ERROR:
      return {
        ...state,
        registerError: null
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}

export default authReducer;
