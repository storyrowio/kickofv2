import {useClerk, useSignIn} from "@clerk/clerk-react";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function AuthCallbackPage() {
    const { signIn, isLoaded } = useSignIn();
    const navigate = useNavigate();
    const { handleRedirectCallback } = useClerk();

    useEffect(() => {
        if (!isLoaded) {
            return; // Wait until Clerk is loaded
        }

        handleRedirectCallback({
            afterSignInUrl: '/app',
            afterSignUpUrl: '/app',
        })
            .then(() => {
                navigate('/app');
            })
            .catch((error) => {
                console.error('Error handling callback:', error);
                navigate('/');
            });
    }, [isLoaded, signIn, navigate]);

    return (
        <div className="h-48 flex items-center justify-center">
            Loading...
        </div>
    )
}