import {Outlet} from "react-router";

export default function BaseLayout() {
    return (
        <div>
            <p>Base Layout</p>
            <Outlet/>
        </div>
    )
}
