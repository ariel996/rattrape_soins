import React, {useEffect} from 'react';
import StaffIndex from "@/Pages/Staff";
import PatientIndex from "@/Pages/Patients";
import AdminIndex from "@/Pages/Admin";
import SecretaryIndex from "@/Pages/Secretary";
import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import Role from "@/store/action-types/Role";


export default function Dashboard() {

    /*const {data} = useLoaderData();
    console.log(data)
    alert('What did you have in the console')*/

    const user = useSelector(UserSelector)

    useEffect(() => {
        document.title = 'Dashboard'
    })

    switch (user.role) {
        case Role.staff:
            return (<StaffIndex/>)
        case Role.patient:
            return (<PatientIndex/>)
        case Role.admin:
            return (<AdminIndex/>)
        case Role.secretary:
            return (<SecretaryIndex/>)
        default:
            return (<h1>No Path Match your role where found </h1>)
    }
}
