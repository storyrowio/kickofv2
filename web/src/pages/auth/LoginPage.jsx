import {useNavigate} from "react-router";
import {SignIn, useSignIn} from "@clerk/clerk-react";
import {useFormik} from "formik";
import AuthService from "services/AuthService.jsx";
import {Mail01Icon} from "hugeicons-react";
export default function LoginPage() {
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
        <div className="w-1/2 min-h-screen mx-auto flex items-center">
            <div>
                <h1 className="mb-6">Sign in to your account</h1>
                <form onSubmit={formik.handleSubmit} className="mb-4 flex flex-col gap-6">
                    <label className="input">
                        <Mail01Icon/>
                        <input
                            type="email"
                            className="grow"
                            placeholder="Your email address"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}/>
                    </label>
                    <label className="input">
                        <Mail01Icon/>
                        <input
                            type="password"
                            className="grow"
                            placeholder="Your password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                    </label>
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <button className="btn btn-primary" onClick={handleSignIn}>
                    Sign in with social
                </button>
                <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/>
            </div>
        </div>
    )
}
