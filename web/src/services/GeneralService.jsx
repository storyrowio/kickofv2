import Api from "utils/api.jsx";

const GetSidebarMenus = () => {
    return Api.Instance.get('/front/menus')
        .then(res => res.data?.data);
};

const GeneralService = {
    GetSidebarMenus
};

export default GeneralService;