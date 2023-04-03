import {SET_MESSAGE, CLEAR_MESSAGE} from "../action-types";

const initialState = {};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
           /* setTimeout(() => {
                return {message: "", error: false}
            }, 3000)*/
            return {message: payload.message, error: payload.error};

        case CLEAR_MESSAGE:
            return {message: "", error: false};

        default:
            return state;
    }
}
