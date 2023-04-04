import {Outlet} from "react-router";
import Navbar from "@/Components/Custom/AuthNavbar";
import AuthFooter from "@/Components/Custom/AuthFooter";
import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import SideBarMenu from "@/Components/Custom/SideBarMenu";
import React from "react";

export default function Authenticated({children}) {

    const user = useSelector(UserSelector)
    return (
        <>
            <SideBarMenu />
            <div className="relative md:ml-64">
                {/* Header */}
                <Navbar user={user}/>
                <hr className="md:min-w-full"/>

                <div className="p-5 w-full">
                    {children ? children : <Outlet/>}
                </div>

                <footer className="block py-4">
                    <AuthFooter/>
                </footer>
            </div>

        </>
    );
}
