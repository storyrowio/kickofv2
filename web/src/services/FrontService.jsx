import Api from "@/lib/api.jsx";

const GetUserSidebarMenus = (query) => {
    return Api.Instance.get('/front/sidebar-menu', {params: query})
        .then(res => res.data?.data);
};

const GetSidebarMenus = (query) => {
    return Api.Instance.get('/admin/front/sidebar-menu', {params: query})
        .then(res => res.data?.data);
};

const CreateSidebarMenus = (params) => {
    return Api.Instance.post('/admin/front/sidebar-menu', params)
        .then(res => res?.data);
};

const UpdateSidebarMenu = (id, params) => {
    return Api.Instance.patch(`/admin/front/sidebar-menu/${id}`, params)
        .then(res => res?.data);
};

const DeleteSidebarMenu = (id) => {
    return Api.Instance.delete(`/admin/front/sidebar-menu/${id}`)
        .then(res => res?.data);
};

const FrontService = {
    GetUserSidebarMenus,
    GetSidebarMenus,
    CreateSidebarMenus,
    UpdateSidebarMenu,
    DeleteSidebarMenu
};

export default FrontService;
