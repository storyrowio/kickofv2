import {ChevronRight} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem, useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils.js";

const ItemButtonContent = ({item, active}) => {
    const textClassName = cn('text-neutral-700', active && 'text-white');

    return (
        <>
            {item.icon && <item.icon className={active ? 'text-white' : 'text-neutral-700'}/>}
            <span className={textClassName}>{item.title}</span>
            {item.items && (
                <ChevronRight className={cn(
                    'ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90',
                    active ? 'text-white' : 'text-neutral-700'
                )} />
            )}
        </>
    )
};

export function NavMain({items, miniSidebar}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items?.map((item, i) => {
                    const active = item.isActive;
                    const buttonClassName = cn(
                        'h-10 cursor-pointer',
                        active ? 'bg-primary-500 hover:!bg-primary-600' : 'bg-transparent'
                    );

                    const miniSidebarButtonClassName = cn(
                        'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                        active ? 'bg-primary-500 hover:!bg-primary-600' : 'bg-transparent'
                    )

                    if (miniSidebar && !isMobile) {
                        return (
                            <DropdownMenu key={i}>
                                <SidebarMenuItem>
                                    <DropdownMenuTrigger asChild className="cursor-pointer">
                                        <SidebarMenuButton className={miniSidebarButtonClassName}>
                                            {item.icon && <item.icon className={active ? 'text-white' : 'text-neutral-700'}/>}
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    {item.items?.length > 0 ? (
                                        <DropdownMenuContent
                                            side={isMobile ? "bottom" : "right"}
                                            align={isMobile ? "end" : "start"}
                                            className="min-w-56 rounded-lg"
                                        >
                                            {item.items.map((e) => (
                                                <DropdownMenuItem key={e.title}>
                                                    {e.title}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </DropdownMenu>
                        )
                    } else if (item.items) {
                        return (
                            <Collapsible
                                key={i}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild >
                                        <SidebarMenuButton tooltip={item.title} className={buttonClassName}>
                                            <ItemButtonContent item={item} active={active}/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span className="text-neutral-700">{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    }

                    return (
                        <SidebarMenuItem key={i}>
                            <SidebarMenuButton tooltip={item.title} className={buttonClassName}>
                                <ItemButtonContent item={item} active={active}/>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
