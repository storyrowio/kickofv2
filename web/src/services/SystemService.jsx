import Api from "utils/api.jsx";

const GetSystemRoles = () => {
    return Api.Instance.get('/role')
        .then(res => res.data?.data);
};

const GetSystemPermissions = () => {
    return Api.Instance.get('/permission')
        .then(res => res.data?.data);
};


const SystemService = {
    GetSystemRoles,
    GetSystemPermissions
};

export default SystemService;