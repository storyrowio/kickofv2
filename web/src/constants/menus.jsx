import {
    BriefcaseIcon, DoorOpenIcon,
    LayoutDashboardIcon, MonitorCogIcon,
    PanelLeftDashedIcon, SettingsIcon, WaypointsIcon
} from "lucide-react";

export const AppMenuIcons = {
    dashboard: LayoutDashboardIcon,
    workspace: BriefcaseIcon,
    systemSetting: MonitorCogIcon,
    frontSidebarMenu: PanelLeftDashedIcon,
    setting: SettingsIcon,
    role: WaypointsIcon,
    permission: DoorOpenIcon
}

export const SidebarMenusOrder = [
    'dashboard',
    'setting',
    'systemSetting',
    'frontSidebarMenu'
];
