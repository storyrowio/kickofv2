import RoleForm from "@/components/pages/system/RoleForm.jsx";
import {useLocation} from "react-router";
import PermissionForm from "@/components/pages/system/PermissionForm.jsx";

export default function PermissionUpdatePage() {
    const { state } = useLocation();
    console.log('Data permission', state)

    return <PermissionForm data={state}/>;
}
