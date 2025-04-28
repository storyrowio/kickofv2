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

const FrontService = {
    GetUserSidebarMenus,
    GetSidebarMenus,
    CreateSidebarMenus
};

export default FrontService;
