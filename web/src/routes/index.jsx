import {createBrowserRouter} from "react-router";
import AppLayout from "@/layouts/app/AppLayout.jsx";
import DashboardPage from "@/pages/app/DashboardPage.jsx";
import AuthLayout from "@/layouts/auth/AuthLayout.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import FrontSidebarMenuPage from "@/pages/app/front/FrontSidebarMenuPage.jsx";
import FrontSidebarMenuCreatePage from "@/pages/app/front/FrontSidebarMenuCreatePage.jsx";
import BlankLayout from "@/layouts/BlankLayout.jsx";
import CreateInitialWorkspace from "@/pages/app/workspace/CreateInitialWorkspace.jsx";
import {FRONT_SIDEBAR_MENU_PATH, PERMISSION_PATH, ROLE_PATH} from "@/constants/paths.jsx";
import FrontSidebarMenuUpdatePage from "@/pages/app/front/FrontSidebarMenuUpdatePage.jsx";
import RolePage from "@/pages/app/system/role/RolePage.jsx";
import RoleCreatePage from "@/pages/app/system/role/RoleCreatePage.jsx";
import RoleUpdatePage from "@/pages/app/system/role/RoleUpdatePage.jsx";
import PermissionPage from "@/pages/app/system/permission/PermissionPage.jsx";
import PermissionCreatePage from "@/pages/app/system/permission/PermissionCreatePage.jsx";
import PermissionUpdatePage from "@/pages/app/system/permission/PermissionUpdatePage.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            { index: true, Component: LoginPage },
            { path: '/register', Component: RegisterPage }
        ]
    },
    {
        path: '/',
        Component: BlankLayout,
        children: [
            { path: '/workspace/initial', Component: CreateInitialWorkspace }
        ]
    },
    {
        path: '/app',
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: `${FRONT_SIDEBAR_MENU_PATH}`, Component: FrontSidebarMenuPage },
            { path: `${FRONT_SIDEBAR_MENU_PATH}/create`, Component: FrontSidebarMenuCreatePage },
            { path: `${FRONT_SIDEBAR_MENU_PATH}/update/:id`, Component: FrontSidebarMenuUpdatePage },
            { path: `${ROLE_PATH}`, Component: RolePage },
            { path: `${ROLE_PATH}/create`, Component: RoleCreatePage },
            { path: `${ROLE_PATH}/update/:id`, Component: RoleUpdatePage },
            { path: `${PERMISSION_PATH}`, Component: PermissionPage },
            { path: `${PERMISSION_PATH}/create`, Component: PermissionCreatePage },
            { path: `${PERMISSION_PATH}/update`, Component: PermissionUpdatePage },
        ]
    }
]);

export default routes;
