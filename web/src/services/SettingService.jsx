import Api from "@/lib/api.jsx";

const settingPath = '/setting';

const GetSettings = (query) => {
    return Api.Instance.get(`/admin${settingPath}`, {params: query})
        .then(res => res.data?.data);
};

const CreateSetting = (params) => {
    return Api.Instance.post(`/admin${settingPath}`, params)
        .then(res => res?.data);
};

const GetSetting = (id) => {
    return Api.Instance.get(`/admin${settingPath}/${id}`)
        .then(res => res?.data?.data);
};

const UpdateSetting = (id, params) => {
    return Api.Instance.patch(`/admin${settingPath}/${id}`, params)
        .then(res => res?.data);
};

const DeleteSetting = (id) => {
    return Api.Instance.get(`/admin${settingPath}/${id}`)
        .then(res => res?.data);
};

const SettingService = {
    GetSettings,
    CreateSetting,
    GetSetting,
    UpdateSetting,
    DeleteSetting
};

export default SettingService;
