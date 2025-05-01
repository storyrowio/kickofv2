import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import * as React from "react";
import {useFormik} from "formik";
import {Button} from "@/components/ui/button.jsx";

export default function CreateInitialWorkspace() {
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

    const handleSubmit = (values) => {

    }

    return (
        <div className="h-screen p-6 flex justify-center items-center bg-muted">
            <Card className="min-w-full lg:min-w-3xl">
                <CardContent className="text-center">
                    <h1 className="text-2xl font-semibold">Create Your First Workspace</h1>
                    <p className="mb-10 text-sm">🚀 Let’s get started with your first workspace</p>
                    <form
                        className="grid gap-4">
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
                            <Label htmlFor="name">Workspace Code</Label>
                            <Input
                                id="name"
                                placeholder="Workspace code e.g. developer"
                                required
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}/>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Endpoint</Label>
                            <div className="flex items-center gap-2">
                                <p className="text-sm">http://</p>
                                <Input
                                    id="name"
                                    placeholder="developer"
                                    required
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}/>
                            </div>
                        </div>
                        <Button>
                            Create Workspace
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}