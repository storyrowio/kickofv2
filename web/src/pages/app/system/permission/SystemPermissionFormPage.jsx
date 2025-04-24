import {useFormik} from "formik";
import Input from "components/ui/form/Input.jsx";
import RolePermissionService from "services/RolePermissionService.jsx";
import {useNavigate} from "react-router";

export default function SystemPermissionFormPage() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            permissions: ''
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        try {
            const dataPermissions = JSON.parse(values.permissions);
            return RolePermissionService.CreateManyPermissions({permissions: dataPermissions})
                .then(() => {
                    navigate(-1);
                });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form
            className="flex flex-col items-start gap-4"
            onSubmit={formik.handleSubmit}>
            <span className="text-xs text-neutral-500">Permissions (In json/array)</span>
            <textarea
                className="textarea w-full"
                name="permissions"
                onChange={formik.handleChange}
                value={formik.values.permissions}/>
            <button
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}