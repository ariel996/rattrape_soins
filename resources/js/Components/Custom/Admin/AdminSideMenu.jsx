import {Link, NavLink} from "react-router-dom";
import React, {useState} from "react";

export default function AdminSideMenu() {
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
                Gestion des patients
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        end
                        className={"text-xs uppercase py-3 font-bold block "}
                        to="/dashboard/admin/patients"
                    >
                        <i className="fa fa-users mr-2 text-sm"/> Liste de tous les patients
                    </NavLink>
                </li>

                <li className="items-center">
                    <NavLink
                        end
                        className="text-xs uppercase py-3 font-bold block"
                        to="/dashboard/admin/patients/create"
                    >
                        <i className="fa fa-plus mr-2 text-sm"/> Ajouter un patient
                    </NavLink>
                </li>
            </ul>

            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Gestion Du personnel
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <NavLink
                        end
                        className="text-xs uppercase py-3 font-bold block"
                        to="/dashboard/admin/personnels"
                    >
                        <i className="fa fa-users mr-2 text-sm"/> Liste du personnel
                    </NavLink>
                </li>

                <li className="items-center">
                    <NavLink
                        end
                        className="text-xs uppercase py-3 font-bold block"
                        to="/dashboard/admin/personnels/create"
                    >
                        <i className="fa fa-plus-circle mr-2 text-sm"/> Ajouter un personnel
                    </NavLink>
                </li>
            </ul>
        </>
    )
}
