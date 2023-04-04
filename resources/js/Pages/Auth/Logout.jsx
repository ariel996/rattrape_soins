import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "@/store/actions/authActions";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout())
            .then(() => {
                navigate('/login')
            })
            .catch(() => {
                navigate('/login')
            });
    }, [dispatch])
}
