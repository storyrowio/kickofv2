'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import IconButton from "components/ui/buttons/IconButton";
import {Menu02Icon} from "hugeicons-react";
import AppNavbarProfile from "layouts/app/components/AppNavbarProfile";
import AppNavbarNotification from "layouts/app/components/AppNavbarNotification.jsx";

export default function AppNavbar(props) {
    const { onToggleSidebar } = props;
    const { desktop } = useMediaQuery();

    const navbarClassnames = classNames({
        'h-16 min-w-screen px-4 lg:px-10 fixed z-[5] bg-white border-b border-neutral-200 flex items-center': true,
    });

    return (
        <div className={navbarClassnames}>
            {!desktop && (
                <IconButton onClick={onToggleSidebar}>
                    <Menu02Icon size={18} className="text-neutral-600"/>
                </IconButton>
            )}
            <div className="flex-1"/>
            <div className="flex gap-4">
                <AppNavbarNotification/>
                <AppNavbarProfile/>
            </div>
        </div>
    )
}
