import SystemSettingForm from "@/components/pages/system/SystemSettingForm.jsx";
import {useParams} from "react-router";
import useSWR from "swr";
import SettingService from "@/services/SettingService.jsx";

export default function SystemSettingUpdatePage() {
    const { id } = useParams();

    const { data: resData } = useSWR(
        '/api/setting/update',
        () => SettingService.GetSetting(id));

    return <SystemSettingForm data={resData}/>;
}
