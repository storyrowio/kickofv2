import Logo from "components/shared/Logo.jsx";
import Input from "components/ui/form/Input.jsx";
import {Mail02Icon, SquareLock02Icon} from "hugeicons-react";
import {Link, useNavigate} from "react-router";
import {useSignIn} from "@clerk/clerk-react";
import {useFormik} from "formik";
import AuthService from "services/AuthService.jsx";

export default function LoginForm() {
    const navigate = useNavigate();
    const { signIn } = useSignIn();

    const formik = useFormik({
        initialValues: { email: 'admin@kickof.com', password: 'admin' },
        onSubmit: values => handleSubmit(values)
    })

    const handleSubmit = (values) => {
        return AuthService.Login(values)
            .then(() => {
                navigate('/app')
            });
    };

    const handleSignIn = async () => {
        await signIn.authenticateWithRedirect({
            strategy: `oauth_google`,
            redirectUrl: '/auth-callback',
            redirectUrlComplete: '/app'
        })
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <Logo width={200}/>
            <div>
                <h2 className="mb-2 text-3xl">Login</h2>
                <span className="text-xs text-neutral-400">Welcome back! Enter your credentials to access your account</span>

                <form onSubmit={formik.handleSubmit} className="mb-4 mt-6 flex flex-col gap-4">
                    <Input
                        placeholder="Your email address"
                        icon={<Mail02Icon size={16} className="text-neutral-500"/>}
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}/>
                    <Input
                        placeholder="Your password"
                        icon={<SquareLock02Icon size={16} className="text-neutral-500"/>}
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={Boolean(formik.errors.password)}
                        helperText={formik.errors.password}/>
                    <button className="btn btn-primary">
                        Sign In
                    </button>
                </form>

                <p className="mt-10 mb-6 text-center text-xs text-neutral-500">
                    Don't have account? <Link to="/register">Create Account</Link>
                </p>

                <div className="divider my-8 text-[10px] text-neutral-500">Or</div>

                <button className="btn btn-block bg-neutral-100 text-neutral-600 font-medium">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.6712 8.368H18V8.33342H10.5V11.6667H15.2096C14.5225 13.6072 12.6762 15.0001 10.5 15.0001C7.73874 15.0001 5.49999 12.7613 5.49999 10.0001C5.49999 7.23883 7.73874 5.00008 10.5 5.00008C11.7746 5.00008 12.9342 5.48091 13.8171 6.26633L16.1742 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C5.89791 1.66675 2.16666 5.398 2.16666 10.0001C2.16666 14.6022 5.89791 18.3334 10.5 18.3334C15.1021 18.3334 18.8333 14.6022 18.8333 10.0001C18.8333 9.44133 18.7758 8.89592 18.6712 8.368Z"
                            fill="#FFC107"/>
                        <path
                            d="M3.1275 6.12133L5.86542 8.12925C6.60625 6.29508 8.40042 5.00008 10.5 5.00008C11.7746 5.00008 12.9342 5.48091 13.8171 6.26633L16.1742 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C7.29917 1.66675 4.52334 3.47383 3.1275 6.12133Z"
                            fill="#FF3D00"/>
                        <path
                            d="M10.5 18.3334C12.6525 18.3334 14.6083 17.5096 16.0871 16.17L13.5079 13.9875C12.6433 14.6455 11.5865 15.0012 10.5 15C8.33249 15 6.49207 13.618 5.79874 11.6892L3.08124 13.783C4.4604 16.4817 7.26124 18.3334 10.5 18.3334Z"
                            fill="#4CAF50"/>
                        <path
                            d="M18.6713 8.36784H18V8.33325H10.5V11.6666H15.2096C14.8809 12.5901 14.2889 13.3971 13.5067 13.9878L13.5079 13.987L16.0871 16.1695C15.9046 16.3353 18.8333 14.1666 18.8333 9.99992C18.8333 9.44117 18.7758 8.89575 18.6713 8.36784Z"
                            fill="#1976D2"/>
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}
