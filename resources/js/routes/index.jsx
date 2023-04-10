import React from 'react';
import {Route, Routes, Navigate, Outlet, useNavigate} from 'react-router-dom';

import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import Welcome from "@/Pages/Welcome";
import ForgetPassword from "@/Pages/Auth/ForgotPassword";
import Dashboard from "@/Pages/Dashboard";
import {useSelector} from "react-redux";
import {UserSelector} from "@/store/selector";
import Role from "@/store/action-types/Role";
import Logout from "@/Pages/Auth/Logout";
import Planing from "@/Pages/Staff/Planing/index";
import CreatePlanning from "@/Pages/Staff/Planing/Create";
import UpdatePatient from "@/Pages/Staff/Patient/Update";
import PatientIndexAdmin from "@/Pages/Admin/Patients/index";
import CreatePatientAdmin from "@/Pages/Admin/Patients/Create";
import UpdatePatientAdmin from "@/Pages/Admin/Patients/Update";
import PersonnelIndexAdmin from '@/Pages/Admin/Personnels/index';
import CreatePersonnelAdmin from "@/Pages/Admin/Personnels/Create";
import UpdatePersonnelAdmin from "@/Pages/Admin/Personnels/Update";
import PatientIndex from "@/Pages/Staff/Patient";
import StaffAppointmentIndex from "@/Pages/Staff/Appointment";
import StaffUpComingAppointmentIndex from "@/Pages/Staff/Appointment/UpComing";
import StaffPassAppointmentIndex from "@/Pages/Staff/Appointment/PassAppointment";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {PersonnelIndex} from "@/Pages/Patients/PersonnelIndex";
import BookAppointmentIndex from "@/Pages/Patients/BookAppointmentIndex";
import PatientAppointmentIndex from "@/Pages/Patients/AppointmentIndex";
import PatientAppointmentShow from "@/Pages/Patients/PatientAppointmentShow";
import AppointmentDetail from "@/Pages/Staff/Appointment/AppointmentDetails";

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

                <Route path="dashboard" element={<ProtectedRoutes isAllowed={user !== null}/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="logout" element={<Logout/>}/>

                    {/* Staff Route Are Here */}
                    <Route path="staff" element={<AllowRoutes role={Role.staff} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Staff Profile</h1>}/>
                        {/* Print the list of patient */}
                        <Route path="patient" element={<PatientIndex/>}/>
                        <Route path="appointments" element={<StaffAppointmentIndex/>}/>
                        <Route path="appointments/more/:id" element={<AppointmentDetail/>}/>
                        <Route path="appointment-pass" element={<StaffPassAppointmentIndex/>}/>
                        <Route path="appointment-up-coming" element={<StaffUpComingAppointmentIndex/>}/>
                        <Route path="patient/update" element={<UpdatePatient/>}/>
                        <Route path="planing" element={<Planing/>}/>
                        <Route path='planning/update/:day' element={<CreatePlanning/>}/>
                    </Route>

                    {/* Admin Route Are Here */}
                    <Route path="admin" element={<AllowRoutes role={Role.admin} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Admin Profile</h1>}/>
                        <Route path="patients">
                            <Route index element={<PatientIndexAdmin/>}/>
                            <Route path="create" element={<CreatePatientAdmin/>}/>
                            <Route path="update/:id" element={<CreatePatientAdmin/>}/>
                        </Route>
                        <Route path="personnels">
                            <Route index element={<PersonnelIndexAdmin/>}/>
                            <Route path="create" element={<CreatePersonnelAdmin/>}/>
                            <Route path="update/:id" element={<CreatePersonnelAdmin/>}/>
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

                    {/* Patient Are Here */}
                    <Route path="patient" element={<AllowRoutes role={Role.patient} redirectPath='/dashboard'/>}>
                        <Route index element={<h1> Patient Profile</h1>}/>
                        <Route path="personnel" element={<PersonnelIndex/>}/>
                        <Route path="appointment" element={<PatientAppointmentIndex/>}/>
                        <Route path="personnel/book-appointment" element={<BookAppointmentIndex/>}/>
                        <Route path="appointment/update/:id" element={<PatientAppointmentShow/>}/>
                    </Route>

                </Route>
            </Route>

            <Route path="*" element={<Page4O4/>}/>
        </Routes>
    )
}


const Page4O4 = () => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate(-1)
    }
    return (
        <Authenticated>
            <div className="flex flex-col justify-center items-center h-1OO my-5 md:my-32 gap-4">
                <h1 className="text-3xl">Page Not Found: It look like you are lost</h1>

                <button onClick={handleClick} className="border px-10 rounded-lg py-3 bg-indigo-500">
                    <i className="fa fa-arrow-left mr-3"/>Go back
                </button>
            </div>
        </Authenticated>
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
