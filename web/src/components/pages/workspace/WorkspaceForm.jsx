import {useFormik} from "formik";
import {useEffect} from "react";
import PageTitle from "@/components/shared/PageTitle.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea.jsx";
import WorkspaceService from "@/services/WorkspaceService.jsx";
import {useNavigate} from "react-router";

export default function WorkspaceForm(props) {
    const { data, onSubmit } = props;

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        if (data?.id) {
            formik.setValues(data);
        }
    }, [data?.id]);

    const submit = (params) => {
        if (data?.id) {
            return WorkspaceService.UpdateWorkspace(data?.id, params);
        }

        return WorkspaceService.CreateWorkspace(params);
    };

    const handleSubmit = (values) => {
        return submit({...values})
            .then(() => {
                formik.handleReset();
                onSubmit();
            })
    };

    return (
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="grid gap-1">
                <Label htmlFor="name">Workspace Name</Label>
                <Input
                    id="name"
                    placeholder="Workspace name e.g. Developer"
                    required
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
            </div>
            <div className="grid gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Workspace description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}/>
            </div>
            <div className="flex justify-end">
                <Button>
                    Create Workspace
                </Button>
            </div>
        </form>
    )
}