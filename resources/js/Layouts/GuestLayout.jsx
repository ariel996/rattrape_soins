import React from 'react'
import {NavLink} from 'react-router-dom';
import Message from "@/Components/Message";
import {useSelector} from "react-redux";
import {MessageSelector} from "@/store/selector";
import Navbar from "@/Components/Custom/Navbar";
import Footer from "@/Components/Custom/Footer";

export default function ({children}) {
    const {message, error} = useSelector(MessageSelector);

    return (
        <>
            <main className="min-h-screen flex justify-center items-center flex-col relative">
                {message && <Message message={message} error={error}/>}

                {children}
            </main>
        </>


    );
}
