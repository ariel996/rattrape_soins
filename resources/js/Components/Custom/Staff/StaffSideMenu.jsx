import {Link, NavLink} from "react-router-dom";
import React from "react";

export default function StaffSideMenu() {
    return (
        <>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        end
                        className="text-xs uppercase py-3 font-bold block"
                        to="/dashboard"
                    >
                        <i className="fas fa-tv opacity-75 mr-2 text-sm"/> Dashboard
                    </NavLink>
                </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Patients
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/patient"
                    >
                        <i className="fa fa-users mr-2 text-sm"/> Liste de mes patients
                    </NavLink>
                </li>
            </ul>

            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Rendez-vous
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">

                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/appointment-up-coming"
                    >
                        <i className="fa fa-arrow-up mr-2 text-sm"/> A venir
                    </NavLink>
                </li>

                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/appointment-pass"
                    >
                        <i className="fa fa-arrow-down mr-2 text-sm"/> Passer
                    </NavLink>
                </li>
                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/appointments"
                    >
                        <i className="fa fa-calendar-alt mr-2 text-sm"/> Tous
                    </NavLink>
                </li>
            </ul>

            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Gestion Planning
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/planing"
                    >
                        <i className="fa fa-calendar mr-2 text-sm"/> Mon Planing
                    </NavLink>
                </li>

                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/staff/planing/create"
                    >
                        <i className="fa fa-plus-circle mr-2 text-sm"/> Ajouter
                    </NavLink>
                </li>
            </ul>
        </>
    )
}
