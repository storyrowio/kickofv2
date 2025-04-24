import Api from "utils/api.jsx";

const GetRoles = () => {
    return Api.Instance.get('/role')
        .then(res => res.data?.data);
};

const CreateRole = (params) => {
    return Api.Instance.post('/role', params)
        .then(res => res.data?.data);
};

const GetPermissions = () => {
    return Api.Instance.get('/permission')
        .then(res => res.data?.data);
};

const CreateManyPermissions = (params) => {
    return Api.Instance.post('/permission', params)
        .then(res => res.data?.data);
};

const RolePermissionService = {
    GetRoles,
    CreateRole,
    GetPermissions,
    CreateManyPermissions
};

export default RolePermissionService;