import useSWR from "swr";
import SystemService from "services/SystemService.jsx";
import Input from "components/ui/form/Input.jsx";
import {useNavigate} from "react-router";

export default function SystemPermissionPage() {
    const navigate = useNavigate();

    const { data: resData } = useSWR(
        '/api/system-permission',
        () => SystemService.GetSystemPermissions());

    return (
        <>
            <div className="mb-6 flex justify-between">
                <Input
                    placeholder="Search by name ..."/>
                <button className="btn btn-primary" onClick={() => navigate('/app/system-permission/create')}>
                    Add Permission
                </button>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resData?.map((e, i) => (
                        <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}