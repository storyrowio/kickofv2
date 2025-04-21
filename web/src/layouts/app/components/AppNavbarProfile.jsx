import IconButton from "components/ui/buttons/IconButton";
import {ArrowDown01Icon} from "hugeicons-react";
import Avatar from 'assets/images/avatar/avatar.png';

export default function AppNavbarProfile() {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0} role="button"
                className="py-1 px-2 flex items-center gap-2 rounded-xl cursor-pointer hover:bg-neutral-100">
                <IconButton className="!p-0 !rounded-full !border-none">
                    <img
                        src={Avatar}
                        alt="avatar"
                        style={{ width: 40, height: 40 }}/>
                </IconButton>
                <div>
                    <p className="text-xs font-semibold">John Doe</p>
                    <p className="text-xs text-neutral-400">System Admin</p>
                </div>
                <ArrowDown01Icon size={18} className="text-neutral-500"/>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-6 w-52 p-2 shadow-xl/2 border border-neutral-200">
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    )
}
