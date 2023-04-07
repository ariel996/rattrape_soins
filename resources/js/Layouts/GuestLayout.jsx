import React, {useEffect} from 'react'
import Message from "@/Components/Message";
import {useDispatch, useSelector} from "react-redux";
import {MessageSelector} from "@/store/selector";
import {clearMessage} from "@/store/actions/messages";

export default function ({children}) {
    const {message, error} = useSelector(MessageSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearMessage())
        }, 20000)
    },[message])
    return (
        <>
            <main className="min-h-screen flex justify-center items-center flex-col relative">
                {message && <Message message={message} error={error}/>}

                {children}
            </main>
        </>


    );
}
