import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {AppSidebar} from "@/components/ui/sidebar/app-sidebar.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import AppNavbarProfile from "@/layouts/app/components/AppNavbarProfile.jsx";
import AppNavbarNotification from "@/layouts/app/components/AppNavbarNotification.jsx";
import {Outlet, useNavigate} from "react-router";
import {Menubar} from "@/components/ui/menubar.jsx";
import FrontService from "@/services/FrontService.jsx";
import {ThemeActions} from "@/store/slices/ThemeSlice.jsx";
import {useDispatch, useSelector} from "@/store/index.jsx";
import AuthService from "@/services/AuthService.jsx";
import {ProfileActions} from "@/store/slices/ProfileSlice.jsx";
import WorkspaceService from "@/services/WorkspaceService.jsx";
import {AppActions} from "@/store/slices/AppSlice.jsx";
import Loader from "@/assets/images/loader.svg";

export default function AppLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, role } = useSelector(state => state.profile);
    const { workspaces, activeWorkspace, needCreateWorkspace } = useSelector(state => state.app);
    const [loading, setLoading] = useState([]);
    const [isMiniSidebar, setIsMiniSidebar] = useState(false);
    console.log(needCreateWorkspace)
    const fetchInitial = async () => {
        await AuthService.GetProfile()
            .then(res => {
                dispatch(ProfileActions.setProfile(res?.data));
                setLoading([...loading, 'profile']);
            })
            .catch((err) => {
                if (err.status === 401) {
                    navigate('/')
                }
            });
        await WorkspaceService.GetWorkspaces({user: id})
            .then(res => {
                if (role?.code !== "systemadmin") {
                    dispatch(AppActions.setWorkspaces(res.data));
                    if (res?.data?.length === 0) {
                        navigate('/workspace/initial')
                    }
                }
                setLoading([...loading, 'workspace']);
            });
        return FrontService.GetUserSidebarMenus()
            .then(res => {
                dispatch(ThemeActions.setSidebarMenus(res));
                setLoading([...loading, 'sidebarMenus']);
            });
    };

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            fetchInitial().then(() => {
                mounted.current = true;
            })
        }
    }, [id]);

    if (loading.length < 3) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img
                    alt="loading"
                    src={Loader}
                    className="w-24 h-24"/>
            </div>
        )
    }

    return (
        <SidebarProvider className="bg-neutral-400">
            <AppSidebar miniSidebar={isMiniSidebar}/>
            <SidebarInset className="bg-neutral-100">
                <header className="flex h-16 bg-white border-b border-border shrink-0 sticky top-0 z-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="w-full flex justify-between items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-primary-foreground" onClick={() => setIsMiniSidebar(!isMiniSidebar)}/>
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
