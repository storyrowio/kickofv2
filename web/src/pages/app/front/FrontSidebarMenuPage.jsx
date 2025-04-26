import useSWR from "swr";
import {useState} from "react";
import {DefaultSort} from "@/constants/constants.jsx";
import FrontService from "@/services/FrontService.jsx";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router";
import {DeleteIcon, EditIcon, TrashIcon} from "lucide-react";

export default function FrontSidebarMenuPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({sort: DefaultSort.name.value});

    const { data: resData } = useSWR(
        [filter, '/api/front/sidebar-menus'],
        () => FrontService.GetSidebarMenus(filter));

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <Button onClick={() => navigate('/app/front/sidebar-menu/create')}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Menu Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className="text-right">Option</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resData?.length === 0 ? (
                            <TableRow>
                                <TableCell>No Data</TableCell>
                            </TableRow>
                        ) : resData?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{e.id}</TableCell>
                                <TableCell>{e.title}</TableCell>
                                <TableCell>{e.permissions?.join(', ')}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="icon" variant="tonal" color="secondary">
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
