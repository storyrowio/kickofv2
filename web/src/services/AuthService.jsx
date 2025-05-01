import Api from "@/lib/api.jsx";
import AppStorage from "@/lib/storage.jsx";
import {AUTH_TOKEN} from "@/constants/storage.jsx";

const Login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            AppStorage.SetItem(AUTH_TOKEN, res.data?.data?.token);
            return res
        });
};

const Register = (params) => {
    return Api.Instance.post('/register', params)
        .then(res => {
            AppStorage.SetItem(AUTH_TOKEN, res.data?.data?.token);
            return res
        });
};

const GetProfile = () => {
    return Api.Instance.get('/profile')
        .then(res => res?.data);
};

const AuthService = {
    Login,
    Register,
    GetProfile
};

export default AuthService;
