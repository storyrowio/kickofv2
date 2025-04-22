import {createBrowserRouter} from "react-router";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AppLayout from "layouts/app/AppLayout.jsx";
import DashboardPage from "pages/app/DashboardPage.jsx";
import AuthCallbackPage from "pages/auth/AuthCallbackPage.jsx";
import AuthLayout from "layouts/auth/AuthLayout.jsx";

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
            { index: true, Component: DashboardPage }
        ]
    }
]);

export default routes;
