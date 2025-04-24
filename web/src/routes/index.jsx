import {createBrowserRouter} from "react-router";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AppLayout from "layouts/app/AppLayout.jsx";
import DashboardPage from "pages/app/DashboardPage.jsx";
import AuthCallbackPage from "pages/auth/AuthCallbackPage.jsx";
import AuthLayout from "layouts/auth/AuthLayout.jsx";
import SystemRolePage from "pages/app/system/role/SystemRolePage.jsx";
import SystemRoleFormPage from "pages/app/system/role/SystemRoleFormPage.jsx";
import SystemPermissionFormPage from "pages/app/system/permission/SystemPermissionFormPage.jsx";
import SystemPermissionPage from "pages/app/system/permission/SystemPermissionPage.jsx";
import SystemSettingPage from "pages/app/system/setting/SystemSettingPage.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            { index: true, Component: LoginPage },
            { path: '/register', Component: RegisterPage },
            { path: '/auth-callback', Component: AuthCallbackPage }
        ]
    },
    {
        path: '/app',
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: '/app/system-role', Component: SystemRolePage },
            { path: '/app/system-role/create', Component: SystemRoleFormPage },
            { path: '/app/system-permission', Component: SystemPermissionPage },
            { path: '/app/system-permission/create', Component: SystemPermissionFormPage },
            { path: '/app/system-setting', Component: SystemSettingPage },
        ]
    }
]);

export default routes;
