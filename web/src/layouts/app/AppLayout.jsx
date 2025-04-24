import useMediaQuery from "hooks/useMediaQuery.jsx";
import {useDispatch, useSelector} from "store/index.jsx";
import classNames from "classnames";
import AppSidebar from "layouts/app/components/AppSidebar.jsx";
import {ThemeActions} from "store/slices/ThemeSlice.jsx";
import AppNavbar from "layouts/app/components/AppNavbar.jsx";
import {Outlet} from "react-router";
import GeneralService from "services/GeneralService.jsx";
import {useEffect} from "react";
import AuthService from "services/AuthService.jsx";
import {ProfileActions} from "store/slices/ProfileSlice.jsx";

export default function AppLayout() {
    const dispatch = useDispatch();
    const { desktop} = useMediaQuery();
    const { sidebarOpen } = useSelector(state => state.theme);
    const isMiniSidebar = desktop && !sidebarOpen;
    // const isMobileSidebarOpen = (tablet || mobile) && sidebarOpen;

    let contentClass = isMiniSidebar ? 'pl-18' : 'pl-56';

    const contentClassNames = classNames({
        'min-h-screen pt-[64px] transition-[width, margin] duration-300 ease-in-out': true,
        [contentClass]: desktop
    });

    const overlayClassNames = classNames({
        'w-screen h-screen bg-black fixed z-[6] transition-all duration-300 ease-in-out': true,
        'hidden': desktop || (!desktop && !sidebarOpen),
        'opacity-50': !desktop && sidebarOpen,
    });

    const fetchProfile = () => {
        return AuthService.GetProfile()
            .then(res => dispatch(ProfileActions.setProfile(res?.data)));
    };

    const fetchSidebarMenus = () => {
        return GeneralService.GetSidebarMenus()
            .then(res => dispatch(ThemeActions.setSidebarMenus(res)));
    };

    useEffect(() => {
        fetchProfile();
        fetchSidebarMenus();
    }, []);

    const handleToggleSidebar = () => {
        dispatch(ThemeActions.setSidebarOpen(!sidebarOpen))
    }

    return (
        <div>
            <AppSidebar
                sidebarOpen={sidebarOpen}
                isMiniSidebar={isMiniSidebar}
                onToggleSidebar={handleToggleSidebar}/>
            <div className={overlayClassNames} onClick={handleToggleSidebar}/>

            <AppNavbar
                sidebarOpen={sidebarOpen}
                onToggleSidebar={handleToggleSidebar}/>


            <div className={contentClassNames}>
                <div className="p-5 md:p-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
