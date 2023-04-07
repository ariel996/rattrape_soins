import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

export function setHeader() {
    const state = store.getState();
    const token = state.Auth.access_token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            console.log('LogOut dispached')
            store.dispatch(actions.authLogout());
        }
        return Promise.reject(error);
    },
);

export default axios;
