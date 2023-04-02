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
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
