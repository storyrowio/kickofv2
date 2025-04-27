import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd, LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar.jsx"
import {NavMain} from "@/components/ui/sidebar/nav-main.jsx";
import Logo from "@/assets/images/logos/logo.svg";
import LogoIcon from "@/assets/images/logos/logo-icon.svg";
import {useSelector} from "@/store/index.jsx";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
        },
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}
export function AppSidebar(props) {
    const { miniSidebar } = props;
    const { sidebarMenus } = useSelector(state => state.theme);

    return (
        <Sidebar collapsible="icon" className="bg-white" {...props}>
            <SidebarHeader>
                <div className={miniSidebar ? `py-1` : `py-4.5 px-4`}>
                    <img
                        alt="logo"
                        src={miniSidebar ? LogoIcon : Logo}
                        style={{
                            width: miniSidebar ? 20 : 140,
                            margin: miniSidebar ? 'auto' : 0,
                        }}/>
                </div>
                {/*<TeamSwitcher teams={data.teams} />*/}
            </SidebarHeader>
            <SidebarContent className={miniSidebar ? 'px-0' : 'px-4'}>
                <NavMain items={sidebarMenus} miniSidebar={miniSidebar} />
            </SidebarContent>
            <SidebarFooter>
                {/*<NavUser user={data.user} />*/}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
