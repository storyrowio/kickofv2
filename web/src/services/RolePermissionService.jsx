import Api from "@/lib/api.jsx";
import AppStorage from "@/lib/storage.jsx";
import {AUTH_TOKEN} from "@/constants/storage.jsx";
const GetPermissions = (query) => {
    return Api.Instance.get('/admin/permission', {params: query})
        .then(res => res?.data?.data);
};

const RolePermissionService = {
    GetPermissions
};

export default RolePermissionService;
