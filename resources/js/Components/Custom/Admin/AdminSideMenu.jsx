import {Link} from "react-router-dom";
import React from "react";

export default function AdminSideMenu() {
    return (
        <>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                        to="/dashboard"
                    >
                        <i className="fas fa-tv opacity-75 mr-2 text-sm"/> Dashboard
                    </Link>
                </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Gestion des patients
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/"
                    >
                        <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"/> Landing Page
                    </Link>
                </li>

                <li className="items-center">
                    <Link
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/"
                    >
                        <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"/> Profile Page
                    </Link>
                </li>
            </ul>

            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Gestion Planning
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/"
                    >
                        <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"/> Landing Page
                    </Link>
                </li>

                <li className="items-center">
                    <Link
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                        to="/"
                    >
                        <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"/> Profile Page
                    </Link>
                </li>
            </ul>
        </>
    )
}
