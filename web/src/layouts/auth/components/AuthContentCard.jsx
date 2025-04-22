import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import BackgroundContent from "assets/images/pages/auth/content.png";
export default function AuthContentCard({ children }) {
    const { desktop, tablet, mobile } = useMediaQuery();

    const contentClassNames = classNames({
        '': true,
        'w-[60%] h-[80%] flex items-center': desktop,
        'w-[70%]': tablet,
        'w-[85%]': mobile
    });

    const leftClassNames = classNames({
        'flex-1 flex items-center justify-center': true,
        'col-span-2': tablet || mobile,
    });

    const rightClassNames = classNames({
        'flex-1 w-full relative': true,
        'hidden': tablet || mobile,
    });

    return (
        <div className="h-full grid grid-cols-2 relative">
            <div className={leftClassNames}>
                <div className={contentClassNames}>
                    {children}
                </div>
            </div>
            <div className={rightClassNames}>
                <img
                    src={BackgroundContent}
                    alt="background"
                    className="h-full w-full object-cover top-0 right-0 absolute"
                    style={{
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                    }}/>
            </div>
        </div>
    )
}
