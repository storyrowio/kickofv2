import Api from "utils/api.jsx";

const GetSettings = () => {
    return Api.Instance.get('/setting')
        .then(res => res.data?.data);
};

const SettingService = {
    GetSettings,
};

export default SettingService;