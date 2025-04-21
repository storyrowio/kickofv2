import {GenerateUniqueId} from "utils/helper.jsx";
import {
    ArtboardToolIcon,
    Calendar03Icon,
    ChartRelationshipIcon,
    CpuSettingsIcon, Door01Icon,
    Folder02Icon,
    Home01Icon, MentoringIcon
} from "hugeicons-react";

export const AppMenuIcons = {
    dashboard: Home01Icon,
    calendar: Calendar03Icon,
    contentLibrary: Folder02Icon,
    template: ArtboardToolIcon,
    socialAccount: ChartRelationshipIcon,
    systemSetting: CpuSettingsIcon,
    role: MentoringIcon,
    permission: Door01Icon
}

export const AppMenus = [
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Main'
    },
    {
        id: GenerateUniqueId(),
        title: 'Dashboard',
        icon: Home01Icon,
        href: '',
    },
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Content'
    },
    {
        id: GenerateUniqueId(),
        title: 'Calendar',
        icon: Calendar03Icon,
        href: '/calendar',
    },
    {
        id: GenerateUniqueId(),
        title: 'Content Library',
        icon: Folder02Icon,
        href: '/content-library',
    },
    {
        id: GenerateUniqueId(),
        title: 'Templates',
        icon: ArtboardToolIcon,
        paths: ['/user', '/user/create', '/user/:id/update'],
        children: [
            {
                id: GenerateUniqueId(),
                title: 'List Users',
                href: '/user'
            },
            {
                id: GenerateUniqueId(),
                title: 'Create User',
                children: [
                    {
                        id: GenerateUniqueId(),
                        title: 'List Users',
                        href: '/user'
                    },
                    {
                        id: GenerateUniqueId(),
                        title: 'Create User',
                        href: '/user/create'
                    }
                ]
            }
        ]
    },
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Social Account'
    },
    {
        id: GenerateUniqueId(),
        title: 'Social Accounts',
        icon: ChartRelationshipIcon,
        href: '/social-account',
    },
];
