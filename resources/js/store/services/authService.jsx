import Http, {setHeader} from '../../Http';

const register = (data) => {
    return Http.post('/api/patient/register', data);
};

const login = (email, password) => {
    return Http
        .post("/api/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            }
            return response.data;
        });
};

const logoutService = () => {
    setHeader();
    return Http.post('/api/logout')
        .then((response) => {
            return response.data;
        })
};

export default {
    register,
    login,
    logoutService
};
