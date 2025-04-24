import useSWR from "swr";
import SystemService from "services/SystemService.jsx";
import Input from "components/ui/form/Input.jsx";
import {useNavigate} from "react-router";

export default function SystemRolePage() {
    const navigate = useNavigate();

    const { data: resData, isLoading: loading } = useSWR(
        '/api/system-role',
        () => SystemService.GetSystemRoles());
    console.log(resData)
    return (
        <>
            <div className="mb-6 flex justify-between">
                <Input
                    placeholder="Search by name ..."/>
                <button className="btn btn-primary" onClick={() => navigate('/app/system-role/create')}>
                    Add Role
                </button>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Permissions</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resData?.data?.map((e, i) => (
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.permissions?.length ?? 0} Permissions</td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}