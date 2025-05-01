import RoleForm from "@/components/pages/system/RoleForm.jsx";
import {useParams} from "react-router";
import useSWR from "swr";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function RoleUpdatePage() {
    const { id } = useParams();

    const { data: resData } = useSWR(
        [id, '/api/role/update'],
        () => RolePermissionService.GetRole(id));

    return <RoleForm data={resData}/>;
}
