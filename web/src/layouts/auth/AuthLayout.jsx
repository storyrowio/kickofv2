import {Card, CardContent} from "@/components/ui/card.jsx";
import Background from "@/assets/images/pages/auth/background.svg";
import ContentImage from "@/assets/images/pages/auth/content.png";
import {Outlet} from "react-router";

export default function AuthLayout() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-white relative">
            <img
                alt="background"
                src={Background}
                className="absolute z-0"/>
            <div className="w-full max-w-sm md:max-w-4xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden z-10 py-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <div className="p-6">
                                <Outlet/>
                            </div>
                            <div className="relative hidden bg-muted md:block">
                                <img
                                    src={ContentImage}
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <div
                        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}
