import {useParams} from "react-router";
import FrontSidebarMenuForm from "@/components/pages/front/menu/sidebar/FrontSidebarMenuForm.jsx";
import useSWR from "swr";
import FrontService from "@/services/FrontService.jsx";

export default function FrontSidebarMenuUpdatePage() {
    const { id } = useParams();

    const { data: resData } = useSWR(
        [id, '/api/front/sidebar-menus'],
        () => FrontService.GetSidebarMenu(id));
    console.log(resData)
    return (
        <FrontSidebarMenuForm data={resData}/>
    )
}
