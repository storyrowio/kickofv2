import useSWR from "swr";
import FrontService from "@/services/FrontService.jsx";
import SettingService from "@/services/SettingService.jsx";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {EditIcon, TrashIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import {SettingTypes} from "@/constants/constants.jsx";
import {useNavigate} from "react-router";
import {SYSTEM_SETTING_PATH} from "@/constants/paths.jsx";

export default function SystemSettingPage() {
    const navigate = useNavigate();
    const { data: resData } = useSWR(
        '/api/setting',
        () => SettingService.GetSettings({}));
    console.log(resData?.data)

    const renderType = (type) => {
        return (
            <Badge variant="tonal" className={SettingTypes[type].className}>
                {SettingTypes[type].name}
            </Badge>
        )
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <Button onClick={() => navigate('/app/system-setting/create')}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Is Default?</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Option</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resData?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell>No Data</TableCell>
                            </TableRow>
                        ) : resData?.data?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.isDefault ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{renderType(e.type)}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="icon" variant="tonal" color="default" onClick={() => navigate(`${SYSTEM_SETTING_PATH}/update/${e.id}`)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button size="icon" variant="tonal" color="destructive">
                                        <TrashIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
