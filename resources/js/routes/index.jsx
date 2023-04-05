import React from 'react';
import {Route, Routes, Navigate, Outlet} from 'react-router-dom';

import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import Welcome from "@/Pages/Welcome";
import ForgetPassword from "@/Pages/Auth/ForgotPassword";
import Dashboard from "@/Pages/Dashboard";
import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import Role from "@/store/action-types/Role";
import Logout from "@/Pages/Auth/Logout";
import PatientIndex from "@/Pages/Patients";
import Planing from "@/Pages/Staff/Planing";
import CreatePlanning from "@/Pages/Staff/planing/Create";
import UpdatePatient from "@/Pages/Staff/Patient/Update";
import PatientIndexAdmin from "@/Pages/Admin/Patients";
import CreatePatientAdmin from "@/Pages/Admin/Patients/Create";
import UpdatePatientAdmin from "@/Pages/Admin/Patients/Update";
import PersonnelIndexAdmin from "@/Pages/Admin/Personnels";
import CreatePersonnelAdmin from "@/Pages/Admin/Personnels/Create";
import UpdatePersonnelAdmin from "@/Pages/Admin/Personnels/Update";

function Routers() {

    const user = useSelector(UserSelector);

    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Welcome/>}/>
                <Route element={<ProtectedRoutes isAllowed={user === null} redirectPath='/dashboard'/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="forget-password" element={<ForgetPassword/>}/>
                </Route>

                <Route path="dashboard"  element={<ProtectedRoutes isAllowed={user !== null}/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="logout" element={<Logout/>}/>

                    {/* Staff Route Are Here */}
                    <Route path="staff" element={<AllowRoutes role={Role.staff} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Staff Profile</h1>}/>
                        {/* Print the list of patient */}
                        <Route path="patient" element={<PatientIndex/>}/>
                        <Route path="patient/update" element={<UpdatePatient/>}/>
                        <Route path="planing" element={<Planing/>}/>
                        <Route path='planning/create' element={<CreatePlanning/>}/>
                    </Route>

                    {/* Admin Route Are Here */}
                    <Route path="admin" element={<AllowRoutes role={Role.admin} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Admin Profile</h1>}/>
                        <Route path="patients">
                            <Route index element={<PatientIndexAdmin/>}/>
                            <Route path="create" element={<CreatePatientAdmin/>}/>
                            <Route path="update" element={<UpdatePatientAdmin/>}/>
                        </Route>
                        <Route path="personnels">
                            <Route index element={<PersonnelIndexAdmin/>}/>
                            <Route path="create" element={<CreatePersonnelAdmin/>}/>
                            <Route path="update" element={<UpdatePersonnelAdmin/>}/>
                        </Route>
                    </Route>

                    {/* Secretary route*/}
                    <Route path="secretary">
                        <Route index element={<h1> Secretary Profile Page</h1>}/>
                        <Route path="patients">
                            <Route index element={<PatientIndexAdmin/>}/>
                            <Route path="create" element={<CreatePatientAdmin/>}/>
                            <Route path="update" element={<UpdatePatientAdmin/>}/>
                        </Route>
                        <Route path="personnels">
                            <Route index element={<PersonnelIndexAdmin/>}/>
                            <Route path="create" element={<CreatePersonnelAdmin/>}/>
                            <Route path="update" element={<UpdatePersonnelAdmin/>}/>
                        </Route>
                    </Route>

                    {/* Staff patient Are Here */}
                    <Route path="patient" element={<AllowRoutes role={Role.patient} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Patient Profile</h1>}/>
                    </Route>

                </Route>
            </Route>

            <Route path="*" element={<h1> Page Not Found </h1>}/>
        </Routes>
    )
}

const ProtectedRoutes = ({isAllowed = false, redirectPath = '/login', children}) => {
    if (isAllowed)
        return children ? children : <Outlet/>;
    return <Navigate to={redirectPath} replace/>;

}

const AllowRoutes = ({role = 'Patient', redirectPath, children}) => {
    const user = useSelector(UserSelector);
    if (role === user.role)
        return children ? children : <Outlet/>
    return <Navigate to={redirectPath} replace/>;
}

export default Routers;
