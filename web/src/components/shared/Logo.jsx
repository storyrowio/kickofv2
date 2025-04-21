import LogoIcon from "assets/images/logos/logo-icon.svg";
import LogoComponent from "assets/images/logos/logo.svg";

export default function Logo(props) {
    let {
        width = 120,
        height = 21,
        icon = false,
        className
    } = props;
    const logoSrc = icon ? LogoIcon : LogoComponent;

    if (icon) {
        width = 40;
        height = 40 ;
    }

    return (
        <img
            src={logoSrc}
            alt="logo"
            className={className}
            style={{width, height, objectFit: 'contain'}}/>

    )
}
