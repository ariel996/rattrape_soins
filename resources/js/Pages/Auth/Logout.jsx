import React from 'react';
import {useDispatch} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {logout} from "@/store/actions/authActions";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(logout())
        .then(() => {
            navigate('/login')
        }).catch(() => {
        navigate('/dashboard')
    });
    return (
        <Navigate to="/login"/>
    )
}
