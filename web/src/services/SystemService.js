import Api from "utils/api.jsx";

const GetSystemRoles = () => {
    return Api.Instance.get('/role')
        .then(res => res.data?.data);
};

const SystemService = {
    GetSystemRoles
};

export default SystemService;