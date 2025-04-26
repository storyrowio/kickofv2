import Avatar from "@/assets/images/avatar/avatar.png";
import {
    MenubarContent, MenubarItem, MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/ui/menubar.jsx";
import {ChevronDown} from "lucide-react";

export default function AppNavbarProfile() {
    return (
        <MenubarMenu>
            <MenubarTrigger className="gap-2 rounded-lg">
                <img
                    alt="avatar"
                    src={Avatar}
                    style={{width: 36, height: 36}}/>
                <div className="w-20">
                    <p className="text-xs font-bold text-left">John Doe</p>
                    <p className="text-xs text-neutral-400 text-left">Admin</p>
                </div>
                <ChevronDown size={14} className="text-neutral-500"/>
            </MenubarTrigger>
            <MenubarContent align="end">
                <MenubarRadioGroup value="benoit">
                    <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                    <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                    <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
