import classNames from "classnames";
import {useDispatch, useSelector} from "store/index.jsx";
import {ThemeActions} from "store/slices/ThemeSlice.jsx";
import {ArrowDown01Icon, Image02Icon, MoreHorizontalCircle01Icon} from "hugeicons-react";
import {useLocation, useNavigate} from "react-router";
import {AppMenuIcons} from "constants/menus.jsx";

export default function AppSidebarItem(props) {
    const { item, isMiniSidebar, miniSidebarHover } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { activeSidebarGroupMenu } = useSelector(state => state.theme);
    const Icon = AppMenuIcons[item.icon] ?? Image02Icon;
    const active = pathname === `/app${item.href}` || item.paths?.includes(pathname);
    const itemClassNames = classNames({
        'py-2.5 px-4 my-0.5 flex items-center gap-4 rounded-xl cursor-pointer hover:bg-neutral-200': true,
        'justify-center': isMiniSidebar,
        'bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-700 focus:bg-primary-700': active,
    });

    const ItemIcon = () => {
        return (
            <Icon
                size={18}
                strokeWidth={2}
                className={`${active ? 'text-white' : 'text-neutral-400'}`}/>
        )
    };

    const ItemContent = () => {
        const textClassNames = classNames({
            'flex-1 text-[13px] text-neutral-500': true,
            'text-white': active,
            'hidden': !miniSidebarHover && isMiniSidebar
        });

        return (
            <>
                {item.icon && <ItemIcon/>}
                <div className={textClassNames}>{item.title}</div>
                {(item.children || miniSidebarHover) && !isMiniSidebar && (
                    <ArrowDown01Icon size={15} className={active ? 'text-white' : 'text-neutral-500'}/>
                )}
            </>
        )
    };

    if (item.sectionTitle) {
        return (
            <li className="mt-5 mb-1 px-4 text-[10px] text-neutral-400 font-semibold uppercase tracking-widest">
                {!miniSidebarHover && isMiniSidebar ? (
                    <MoreHorizontalCircle01Icon size={16} className="p-0 text-neutral-500"/>
                ) : item.title}
            </li>
        )
    }

    if (item.children) {
        return (
            <div className="w-full">
                <div className={itemClassNames} onClick={() => dispatch(ThemeActions.setActiveSidebarGroupMenu(item.id))}>
                    <ItemContent/>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        activeSidebarGroupMenu.includes(item.id) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="pl-1 ml-6.5 mb-2 border-l-2 border-neutral-200">
                        {item.children.map((child, idx) => (
                            <AppSidebarItem key={idx} item={child}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <li onClick={() => navigate(`/app${item.path}`)}>
            <div className={itemClassNames}>
                <ItemContent/>
            </div>
        </li>
    )
}
