import {Link, NavLink} from "react-router-dom";
import React from "react";

export default function PatientSideMenu() {
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
                Rendez vous
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/patient/personnel"
                    >
                        <i className="fas fa-users text-blueGray-400 mr-2 text-sm"/> Personnel disponible
                    </NavLink>
                </li>

                {/*<li className="items-center">
                    <Link
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/"
                    >
                        <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"/> Profile Page
                    </Link>
                </li>*/}
            </ul>

            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Gestion Des rendez-vous
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">

                <li className="items-center">
                    <NavLink
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/patient/appointment"
                    >
                        <i className="fa fa-calendar-alt mr-2 text-sm"/> Tous
                    </NavLink>
                </li>

                <li className="items-center">
                    <Link state={'up_coming'}
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/patient/appointment"
                    >
                        <i className="fa fa-arrow-up mr-2 text-sm"/> A venir
                    </Link>
                </li>

                <li className="items-center">
                    <Link
                        state={'pass'}
                        end
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/dashboard/patient/appointment"
                    >
                        <i className="fa fa-arrow-down mr-2 text-sm"/> Passer
                    </Link>
                </li>

            </ul>
        </>
    )
}
