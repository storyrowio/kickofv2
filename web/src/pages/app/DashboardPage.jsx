import DashboardAreaStacked from "@/components/pages/dashboard/DashboardAreaStacked.jsx";
import DashboardDonutChart from "@/components/pages/dashboard/DashboardDonutChart.jsx";
import DashboardAreaChart from "@/components/pages/dashboard/DashboardAreaChart.jsx";
import DashboardDataTable from "@/components/pages/dashboard/DashboardDataTable.jsx";

export default function DashboardPage() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-4 gap-4">
                    <DashboardAreaChart/>
                    <DashboardAreaChart/>
                    <DashboardAreaChart/>
                    <DashboardAreaChart/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 md:col-span-3">
                        <DashboardAreaStacked/>
                    </div>
                    <div className="col-span-4 md:col-span-1">
                        <DashboardDonutChart/>
                    </div>
                </div>
                <DashboardDataTable/>
            </div>
        </>
    )
}
