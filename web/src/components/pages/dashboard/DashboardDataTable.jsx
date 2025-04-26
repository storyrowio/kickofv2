import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table} from "@/components/ui/table.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {TrendingUpIcon} from "lucide-react";

export default function DashboardDataTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transaction</CardTitle>
                <CardDescription>
                    Showing recent transaction and its status
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
