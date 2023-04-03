import {Outlet} from "react-router";
import Navbar from "@/Components/Custom/AuthNavbar";
import AuthFooter from "@/Components/Custom/AuthFooter";
import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import SideBarMenu from "@/Components/Custom/SideBarMenu";

export default function Authenticated({children}) {

    const user = useSelector(UserSelector)
    return (
        <>
            <SideBarMenu />
            <div className="relative md:ml-64">
                <Navbar user={user}/>
                {/* Header */}

                {children ? children : <Outlet/>}

                <footer className="block py-4">
                    <AuthFooter/>
                </footer>
            </div>

        </>
    );
}
