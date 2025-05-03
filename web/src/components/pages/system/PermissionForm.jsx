import {useNavigate} from "react-router";
import {useFormik} from "formik";
import {PERMISSION_PATH} from "@/constants/paths.jsx";
import {useEffect} from "react";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import PageTitle from "@/components/shared/PageTitle.jsx";
import JsonEditor from "@/components/ui/form/json-editor.jsx";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function PermissionForm(props) {
    const {data} = props;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            permissions: []
        },
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        if (data?.length > 0) {
            formik.setFieldValue('permissions', data);
        }
    }, [data?.length]);

    const submit = (params) => {
        if (data?.length > 0) {
            return RolePermissionService.UpdatePermission(params);
        }

        return RolePermissionService.CreatePermission(params);
    };

    const handleSubmit = (values) => {
        console.log(values)
        return submit({permissions: JSON.parse(values.permissions)})
            .then(() => {
                navigate(PERMISSION_PATH);
                formik.handleReset();
            })
    };

    return (
        <>
            <PageTitle
                title={`${data?.id ? 'Update' : 'Create'} Permission`}
                items={[
                    { title: 'Home', href: '/app' },
                    { title: 'Permission', href: '/app/Permission' },
                    { title: `${data?.id ? 'Update' : 'Create'} Permission` },
                ]}/>
            <Card>
                <CardContent>
                    <form
                        className="grid gap-6"
                        onSubmit={formik.handleSubmit}>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Permissions</Label>
                            <JsonEditor
                                height={400}
                                language="json"
                                defaultValue={JSON.stringify(data, null, 2)}
                                onChange={(val) => formik.setFieldValue('permissions', val)}/>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}
