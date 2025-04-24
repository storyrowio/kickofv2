import useSWR from "swr";
import SystemService from "services/SystemService.jsx";
import SettingService from "services/SettingService.jsx";
import {useEffect, useState} from "react";
import Input from "components/ui/form/Input.jsx";
import {useFormik} from "formik";

export default function SystemSettingPage() {
    const [selected, setSelected] = useState(0);
    const { data: resData } = useSWR(
        '/api/setting   ',
        () => SettingService.GetSettings());
    console.log(resData)

    const formik = useFormik({
        initialValues: {},
    });

    useEffect(() => {
        if (resData?.data?.length > 0 && !formik.values.id) {
            formik.setValues(resData?.data[0]);
        }
    }, [resData?.data, formik]);

    const handleSelect = (index) => {
        setSelected(index);
        formik.setValues(resData?.data[index]);
    }

    return (
        <>
            <div className="tabs tabs-box">
                {resData?.data?.map((e, i) => (
                    <input
                        key={i}
                        type="radio"
                        name={e.code}
                        className="tab"
                        aria-label={e.name}
                        checked={selected === i}
                        onChange={() => handleSelect(i)}/>
                ))}
            </div>
            <form
                className="flex flex-col gap-4"
                onSubmit={formik.handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
                <Input
                    label="Code"
                    name="code"
                    onChange={formik.handleChange}
                    value={formik.values.code}/>
            </form>
        </>
    )
}