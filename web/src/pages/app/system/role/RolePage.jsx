import useSWR from "swr";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {EditIcon, TrashIcon} from "lucide-react";
import {useNavigate} from "react-router";
import {ROLE_PATH} from "@/constants/paths.jsx";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function RolePage() {
    const navigate = useNavigate();
    const { data: resData } = useSWR(
        '/api/setting',
        () => RolePermissionService.GetRoles({}));

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <Button onClick={() => navigate(`${ROLE_PATH}/create`)}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className="text-right">Option</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resData?.data?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell>No Data</TableCell>
                            </TableRow>
                        ) : resData?.data?.data?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.code}</TableCell>
                                <TableCell>{e.permissionIds.length} Permissions</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="tonal"
                                        color="default"
                                        onClick={() => navigate(`${ROLE_PATH}/update/${e.id}`)}>
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
