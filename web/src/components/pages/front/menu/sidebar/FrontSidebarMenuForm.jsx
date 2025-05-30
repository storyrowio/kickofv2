import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useFormik} from "formik";
import {useNavigate} from "react-router";
import useSWR from "swr";
import FrontService from "@/services/FrontService.jsx";
import RolePermissionService from "@/services/RolePermissionService.jsx";
import * as React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useRef} from "react";
import {FRONT_SIDEBAR_MENU_PATH} from "@/constants/paths.jsx";

export default function FrontSidebarMenuForm(props) {
    const { data } = props;
    const navigate = useNavigate();
    const { data: resPermissions } = useSWR('/api/admin/permission',
        () => RolePermissionService.GetPermissions({}));

    const formik = useFormik({
        initialValues: {
            id: '',
            title: '',
            icon: '',
            path: '',
            permissions: [],
            children: [],
            sectionTitle: false
        },
        onSubmit: values => handleSubmit(values)
    });

    const mounted = useRef(false);
    useEffect(() => {
        if (data?.id && !mounted.current) {
            formik.setValues(data);
            mounted.current = true;
        }
    }, [data, data?.id, formik]);

    const handleChangePermission = (id) => {
        if (formik.values.permissions.includes(id)) {
            formik.setFieldValue('permissions', formik.values.permissions.filter(e => e !== id));
        } else {
            formik.setFieldValue('permissions', [...formik.values.permissions, id])
        }
    };

    const submit = (params) => {
        if (data?.id) {
            return FrontService.UpdateSidebarMenu(data?.id, params);
        }

        return FrontService.CreateSidebarMenus({
            menus: [params]
        });
    };

    const handleSubmit = (values) => {
        return submit(values).then(() => navigate(FRONT_SIDEBAR_MENU_PATH))
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{data?.id ? 'Update Sidebar Menu' : 'Create Sidebar Menu'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    className="grid gap-6"
                    onSubmit={formik.handleSubmit}>
                    <div className="grid gap-1">
                        <Label htmlFor="id">Menu Id</Label>
                        <Input
                            id="id"
                            required
                            placeholder="e.g. dashboard"
                            name="id"
                            onChange={formik.handleChange}
                            value={formik.values.id}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            required
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="icon">Icon</Label>
                        <Input
                            id="icon"
                            name="icon"
                            onChange={formik.handleChange}
                            value={formik.values.icon}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="path">Path</Label>
                        <Input
                            id="path"
                            name="path"
                            onChange={formik.handleChange}
                            value={formik.values.path}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="path">Section Title</Label>
                        <div className="py-3 items-top flex space-x-2">
                            <Checkbox
                                id="sectionTitle"
                                onCheckedChange={(checked) => formik.setFieldValue('sectionTitle', checked)}/>
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="sectionTitle"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >Is Section Title?</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="title">Permissions</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {resPermissions?.map((e, i) => (
                                <div key={i} className="py-3 items-top flex space-x-2">
                                    <Checkbox id={e.id} checked={formik.values.permissions.includes(e.id)} onCheckedChange={() => handleChangePermission(e.id)}/>
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor={e.id}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >{e.name}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
