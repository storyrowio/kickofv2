import useSWR from "swr";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {EditIcon, TrashIcon} from "lucide-react";
import {useNavigate} from "react-router";
import {PERMISSION_PATH, ROLE_PATH} from "@/constants/paths.jsx";
import RolePermissionService from "@/services/RolePermissionService.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {useState} from "react";
import DeleteConfirmation from "@/components/shared/dialog/DeleteConfirmation.jsx";
import {DefaultSort} from "@/constants/constants.jsx";

export default function PermissionPage() {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);

    const { data: resData, mutate } = useSWR(
        '/api/permission',
        () => RolePermissionService.GetPermissions({sort: DefaultSort.name.value}));

    const handleSelectItems = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(e => e.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleDelete = () => {
        const ids = selectedItems.map(e => e.id).join(',')
        return RolePermissionService.DeletePermission(ids)
            .then(() => mutate())
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    {selectedItems?.length > 0 && (
                        <>
                            <Button
                                className="mr-3"
                                color="secondary"
                                onClick={() => navigate(`${PERMISSION_PATH}/update`, {
                                    state: selectedItems
                                })}>
                                Edit
                            </Button>
                            <DeleteConfirmation
                                triggerButton={<Button className="mr-3" color="destructive">
                                    Delete
                                </Button>}
                                onSubmit={handleDelete}/>
                        </>
                    )}
                    <Button onClick={() => navigate(`${PERMISSION_PATH}/create`)}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Permission Id</TableHead>
                            <TableHead>Name</TableHead>
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
                                <TableCell>
                                    <Checkbox
                                        onCheckedChange={() => handleSelectItems(e)}/>
                                </TableCell>
                                <TableCell>{e.id}</TableCell>
                                <TableCell>{e.name}</TableCell>
                                <TableCell className="flex justify-end gap-2">
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
