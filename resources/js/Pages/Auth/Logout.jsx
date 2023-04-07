import React, {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "@/store/actions/authActions";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        let isMount = true;
        if (isMount){
            dispatch(logout())
                .then(() => {
                    navigate('/login')
                })
                .catch(() => {
                    navigate('/login')
                });
        }

    }, [])
}
