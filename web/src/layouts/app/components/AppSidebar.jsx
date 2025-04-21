import useMediaQuery from "hooks/useMediaQuery.jsx";
import {useState} from "react";
import classNames from "classnames";
import Logo from "components/shared/Logo.jsx";
import IconButton from "components/ui/buttons/IconButton.jsx";
import {AppMenus} from "constants/menus.jsx";
import SimpleBar from "simplebar-react";
import {ArrowLeft01Icon} from "hugeicons-react";
import AppSidebarItem from "layouts/app/components/AppSidebarItem.jsx";
import {useSelector} from "store/index.jsx";

export default function AppSidebar(props) {
    const { sidebarOpen, isMiniSidebar, onToggleSidebar } = props;
    const { sidebarMenus } = useSelector(state => state.theme);
    const { desktop } = useMediaQuery();
    const [miniSidebarHover, setMiniSidebarHover] = useState(false);

    const sidebarClassnames = classNames({
        'w-56 h-screen fixed z-10 bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out': true,
        '!w-18': isMiniSidebar && !miniSidebarHover,
        '!w-0': !desktop && !open
    });

    const menuClassNames = classNames({
        'menu mx-auto': true,
        'w-50': !isMiniSidebar || miniSidebarHover,
        'w-18': isMiniSidebar
    });

    const handleMouseHover = (actionType) => {
        if (actionType === 'enter') {
            setMiniSidebarHover(isMiniSidebar)
        } else {
            setMiniSidebarHover(false);
        }
    }
    console.log(sidebarMenus)
    return (
        <aside className={sidebarClassnames}>
            <div className="relative">
                {(desktop || (!desktop && open)) && (
                    <IconButton
                        className="absolute -right-[16px] top-[16px] z-8"
                        onClick={onToggleSidebar}>
                        <ArrowLeft01Icon size={18} className={`text-neutral-500 ${!sidebarOpen ? 'rotate-180' : ''}`}/>
                    </IconButton>
                )}
                <div
                    onMouseEnter={() => handleMouseHover('enter')}
                    onMouseLeave={() => handleMouseHover('leave')}>
                    <div className={`h-16 ${isMiniSidebar ? 'px-2' : 'px-4'} flex items-center justify-start`}>
                        <Logo icon={isMiniSidebar && !miniSidebarHover} width={158} height={30}
                              className={!isMiniSidebar || miniSidebarHover ? 'ml-2' : 'ml-0'}/>
                    </div>
                    <SimpleBar
                        autoHide={true}
                        style={{
                            maxHeight: 'calc(100vh - 64px)',
                            overflowX: 'hidden',
                        }}>
                        <div
                            className="sidebar">
                            <ul className={menuClassNames}>
                                {sidebarMenus.map((e, i) => {
                                    return (
                                        <AppSidebarItem
                                            key={i}
                                            item={e}
                                            isMiniSidebar={isMiniSidebar}
                                            miniSidebarHover={miniSidebarHover}/>
                                    )
                                })}
                            </ul>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </aside>
    )
}
