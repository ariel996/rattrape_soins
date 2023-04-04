import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, LOGOUT_FAIL,
} from "../action-types";

const user = JSON.parse(localStorage.getItem("user"));
const access_token = JSON.parse(localStorage.getItem("access_token"));

const initialState = user === null ?
    {isLoggedIn: false, user: null, access_token: null} :
    {isLoggedIn: true, user, access_token};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            const {user, access_token} = payload.user;
            return {
                ...state,
                isLoggedIn: true,
                user,
                access_token
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                access_token: null,
            };
        case LOGOUT_FAIL:
            return {
                state,
            };
        default:
            return state;
    }
}
