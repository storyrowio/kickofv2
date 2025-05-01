import {useNavigate} from "react-router";
import {useFormik} from "formik";
import FrontService from "@/services/FrontService.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {useEffect} from "react";
import PageTitle from "@/components/shared/PageTitle.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {SettingTypes} from "@/constants/constants.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import SettingService from "@/services/SettingService.jsx";
import {SYSTEM_SETTING_PATH} from "@/constants/paths.jsx";

const SettingForm = (props) => {
    const { formik } = props;

    const handleInputChange = (index, field, value) => {
        console.log(index, field, value)
        const updatedSetting = [...formik.values.setting]
        updatedSetting[index][field] = value
        console.log(updatedSetting)
        formik.setFieldValue('setting', [...updatedSetting]);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addRow()
        }
    }

    const addRow = () => {
        formik.setFieldValue("setting", [
            ...formik.values.setting,
            { id: Date.now(), key: "", value: "" }
        ])
    }

    return (
        <div className="w-full overflow-x-auto border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formik.values.setting.map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Input
                                    value={row.key}
                                    onChange={(e) => handleInputChange(i, "key", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    placeholder="Enter key e.g. API_KEY"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    value={row.value}
                                    onChange={(e) => handleInputChange(i, "value", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    placeholder="Enter value e.g. kwor1283ljlko"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default function SystemSettingForm(props) {
    const {data} = props;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            description: '',
            type: '',
            status: false,
            setting: [
                {key: 'MAIL_MAILER', value: 'smtp'}
            ]
        },
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        if (data?.id) {
            formik.setValues(data);
            formik.setFieldValue('setting', Object.keys(data?.setting).map(key => ({
                id: Date.now(),
                key: key,
                value: data?.setting[key]
            })));
        }
    }, [data?.id]);

    const submit = (params) => {
        if (data?.id) {
            return SettingService.UpdateSetting(data?.id, params);
        }

        return SettingService.CreateSetting(params);
    };

    const handleSubmit = (values) => {
        const setting = {};
        values.setting.forEach(e => {
            setting[e.key] = e.value;
        });

        return submit({...values, setting: setting})
            .then(() => navigate(SYSTEM_SETTING_PATH))
    };

    return (
        <>
            <PageTitle
                title={`${data?.id ? 'Update' : 'Create'} System Setting`}
                items={[
                    { title: 'Home', href: '/app' },
                    { title: 'Setting', href: '/app/system-setting' },
                    { title: `${data?.id ? 'Update' : 'Create'} System Setting` },
                ]}/>
            <Card>
                <CardContent>
                    <form
                        className="grid gap-6"
                        onSubmit={formik.handleSubmit}>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                required
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                required
                                name="code"
                                onChange={formik.handleChange}
                                value={formik.values.code}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Type</Label>
                            <Select value={formik.values.type} onValueChange={(val) => formik.setFieldValue('type', val)}>
                                <SelectTrigger
                                    className="w-full"
                                    aria-label="Select a value">
                                    <SelectValue placeholder="Select setting type"/>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {Object.keys(SettingTypes).map(key => (
                                        <SelectItem value={key} className="rounded-lg">
                                            {SettingTypes[key].name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="path">Status</Label>
                            <div className="py-3 items-top flex space-x-2">
                                <Checkbox
                                    id="status"
                                    onCheckedChange={(checked) => formik.setFieldValue('status', checked)}/>
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="status"
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >Is Active?</label>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Settings</Label>
                            <SettingForm formik={formik}/>
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
