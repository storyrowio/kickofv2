import {useFormik} from "formik";
import useSWR from "swr";
import SystemService from "services/SystemService.jsx";
import Input from "components/ui/form/Input.jsx";
import RolePermissionService from "services/RolePermissionService.jsx";
import Select from "components/ui/form/Select.jsx";
import {RoleTypes} from "constants/constants.jsx";
import {useNavigate} from "react-router";
import {useSelector} from "store/index.jsx";
import {useMemo} from "react";

export default function RoleForm() {
    const navigate = useNavigate();
    const { role } = useSelector(state => state.profile);
    const { data: resData, isLoading: loading } = useSWR(
        '/api/system-permission',
        () => SystemService.GetSystemPermissions());

    const formik = useFormik({
        initialValues: {
            name: '',
            permissionIds: []
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        return RolePermissionService.CreateRole(values)
            .then(() => navigate(-1));
    };

    const roleTypesData = useMemo(() => {
        if (role) {
            return Object.keys(RoleTypes).map(key => {
                if (key === RoleTypes.systemAdmin.value && role.code !== RoleTypes.systemAdmin.value) {
                    return null;
                }

                return {...RoleTypes[key], label: RoleTypes[key].name, value: key}
            });
        }

        return [];
    }, [role]);

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={formik.handleSubmit}>
            <Input
                label="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}/>

            <Select
                label="Select role type"
                onChange={(value) => formik.setFieldValue('roleType', value)}
                value={formik.values.roleType}
                items={roleTypesData}/>

            <div className="p-6 bg-white grid grid-cols-3 gap-4 border border-neutral-300 rounded-xl">
                {resData?.map((e, i) => (
                    <label key={i} className="label text-sm">
                        <input
                            type="checkbox"
                            checked={formik.values.permissionIds.includes(e.id)}
                            className="checkbox checkbox-primary"
                            onChange={() => formik.setFieldValue('permissionIds', [...formik.values.permissionIds, e.id])}/>
                        {e.name}
                    </label>
                ))}
            </div>
            <div className="flex justify-end">
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}