import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {AppSidebar} from "@/components/ui/sidebar/app-sidebar.jsx";
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import AppNavbarProfile from "@/layouts/app/components/AppNavbarProfile.jsx";
import AppNavbarNotification from "@/layouts/app/components/AppNavbarNotification.jsx";
import {Outlet} from "react-router";
import AppNavbar from "@/layouts/app/components/AppNavbar.jsx";
import {Menubar} from "@/components/ui/menubar.jsx";
import FrontService from "@/services/FrontService.jsx";
import {ThemeActions} from "@/store/slices/ThemeSlice.jsx";
import {useDispatch} from "@/store/index.jsx";
import AuthService from "@/services/AuthService.jsx";
import {ProfileActions} from "@/store/slices/ProfileSlice.jsx";

export default function AppLayout() {
    const dispatch = useDispatch();
    const [isMiniSidebar, setIsMiniSidebar] = useState(false);

    const fetchInitial = async () => {
        await AuthService.GetProfile().then(res => dispatch(ProfileActions.setProfile(res?.data)))
        return FrontService.GetUserSidebarMenus()
            .then(res => {
                dispatch(ThemeActions.setSidebarMenus(res))
            });
    };

    useEffect(() => {
        fetchInitial();
    }, []);

    return (
        <SidebarProvider className="bg-neutral-400">
            <AppSidebar miniSidebar={isMiniSidebar}/>
            <SidebarInset className="bg-neutral-100">
                <header className="flex h-16 bg-white border-b border-border shrink-0 sticky top-0 z-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="w-full flex justify-between items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" onClick={() => setIsMiniSidebar(!isMiniSidebar)}/>
                        <Menubar className="border-0 shadow-none">
                            <AppNavbarNotification/>
                            <AppNavbarProfile/>
                        </Menubar>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
