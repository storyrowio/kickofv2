import {
    CableIcon,
    CalendarCheckIcon,
    FolderOpenIcon,
    LayoutDashboardIcon,
    NotepadTextDashedIcon
} from "lucide-react";

export const AppMenuIcons = {
    dashboard: LayoutDashboardIcon,
    calendar: CalendarCheckIcon,
    contentLibrary: FolderOpenIcon,
    template: NotepadTextDashedIcon,
    socialAccount: CableIcon
}

export const SidebarMenusOrder = [
    'dashboard',
    'content',
    'calendar',
    'contentLibrary',
    'template',
    'setting',
    'systemSetting',
    'frontSidebarMenu'
];
