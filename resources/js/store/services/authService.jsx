import Http from '../../Http';

const register = (username, email, password) => {
    return Http.post("signup", {
        name,
        email,
        password,
    });
};

const login = (email, password) => {
    return Http
        .post("api/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            }
            console.log('From the service', response)
            return response.data;
        });
};

const logout = () => {
    Http.post('api/logout').then((response) => {
        return response.data;
    })
};

export default {
    register,
    login,
    logout,
};
