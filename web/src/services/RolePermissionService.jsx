import Api from "@/lib/api.jsx";

const rolePath = "/role";
const permissionPath = "/permission";

const GetRoles = (query) => {
    return Api.Instance.get('/admin/role', {params: query})
        .then(res => res?.data);
};

const CreateRole = (params) => {
    return Api.Instance.post(`/admin${rolePath}`, params)
        .then(res => res?.data);
};

const GetRole = (id) => {
    return Api.Instance.get(`${rolePath}/${id}`)
        .then(res => res?.data?.data);
};

const UpdateRole = (id, params) => {
    return Api.Instance.patch(`/admin${rolePath}/${id}`, params)
        .then(res => res?.data);
};

const DeleteRole = (id) => {
    return Api.Instance.get(`/admin${rolePath}/${id}`)
        .then(res => res?.data);
};

const GetPermissions = (query) => {
    return Api.Instance.get(`/admin${permissionPath}`, {params: query})
        .then(res => res?.data?.data);
};

const CreatePermission = (params) => {
    return Api.Instance.post(`/admin${permissionPath}`, params)
        .then(res => res?.data);
};

const GetPermission = (id) => {
    return Api.Instance.get(`${permissionPath}/${id}`)
        .then(res => res?.data?.data);
};

const UpdatePermission = (params) => {
    return Api.Instance.patch(`/admin${permissionPath}`, params)
        .then(res => res?.data);
};

const DeletePermission = (ids) => {
    return Api.Instance.delete(`/admin${permissionPath}/${ids}`)
        .then(res => res?.data);
};

const RolePermissionService = {
    GetRoles,
    CreateRole,
    GetRole,
    UpdateRole,
    DeleteRole,
    GetPermissions,
    CreatePermission,
    GetPermission,
    UpdatePermission,
    DeletePermission
};

export default RolePermissionService;
