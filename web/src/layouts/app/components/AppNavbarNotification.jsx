import {Bell} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {
    MenubarContent,
    MenubarItem, MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/ui/menubar.jsx";

export default function AppNavbarNotification() {
    return (
        <MenubarMenu>
            <MenubarTrigger className="border p-2.25 rounded-full cursor-pointer">
                <Bell size={16} className="text-neutral-700"/>
            </MenubarTrigger>
            <MenubarContent align="end" className="w-72">
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
