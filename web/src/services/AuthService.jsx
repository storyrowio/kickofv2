import Api from "utils/api.jsx";
import AppStorage from "utils/storage.jsx";
import {AUTH_TOKEN} from "constants/storage.jsx";

const Login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            AppStorage.SetItem(AUTH_TOKEN, res.data?.data?.token);
            return res
        });
};

const AuthService = {
    Login
};

export default AuthService;