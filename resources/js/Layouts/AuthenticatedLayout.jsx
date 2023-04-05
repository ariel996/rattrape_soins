import {Outlet} from "react-router";
import Navbar from "@/Components/Custom/AuthNavbar";
import AuthFooter from "@/Components/Custom/AuthFooter";
import {useDispatch, useSelector} from "react-redux";
import {MessageSelector, UserSelector} from "@/store/selector";
import SideBarMenu from "@/Components/Custom/SideBarMenu";
import React, {useEffect} from "react";
import Message from "@/Components/Message";
import {clearMessage} from "@/store/actions/messages";

export default function Authenticated({children}) {
    const {message, error} = useSelector(MessageSelector);
    const user = useSelector(UserSelector)

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearMessage())
        }, 20000)
    }, [message])


    return (
        <>
            <SideBarMenu/>
            <div className="relative md:ml-64">
                {/* Header */}
                <Navbar user={user}/>
                <hr className="md:min-w-full"/>

                <div className="p-5 w-full">
                    {message && <Message message={message} error={error}/>}
                    {children ? children : <Outlet/>}
                </div>

                <footer className="block py-4">
                    <AuthFooter/>
                </footer>
            </div>

        </>
    );
}
