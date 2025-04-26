import {useParams} from "react-router";
import useSWR from "swr";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function FrontSidebarMenuUpdatePage() {
    const params = useParams();
    console.log(params.id);

    const { data: resSidebarMenu } = useSWR('/api/admin/permission',
        () => RolePermissionService.GetPermissions({}));
}