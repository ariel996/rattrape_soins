import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import Role from "@/store/action-types/Role";
import React from "react";
import Sidebar from "@/Components/Custom/SideBar";
import StaffSideMenu from "@/Components/Custom/Staff/StaffSideMenu";
import PatientSideMenu from "@/Components/Custom/Patient/PatientSideMenu";
import AdminSideMenu from "@/Components/Custom/Admin/AdminSideMenu";
import SecretarySideMenu from "@/Components/Custom/Secretary/SecretarySideMenu";

export default function SideBarMenu() {
    const user = useSelector(UserSelector)
    switch (user.role) {
        case Role.staff:
            return (<Sidebar> <StaffSideMenu/> </Sidebar>)
        case Role.patient:
            return (<Sidebar> <PatientSideMenu/> </Sidebar>)
        case Role.admin:
            return (<Sidebar> <AdminSideMenu/> </Sidebar>)
        case Role.secretary:
            return (<Sidebar> <SecretarySideMenu/> </Sidebar>)
        default:
            return (<h1>No Menu Found for your role </h1>)
    }
}
