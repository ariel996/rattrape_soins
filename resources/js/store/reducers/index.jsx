import { combineReducers } from 'redux';
import Auth from './Auth';
import messages from "./messages";

const RootReducer = combineReducers({ Auth, messages });

export default RootReducer;
