import React from "react";

import UserDropdown from "./UserDropdown";
import {Link} from "react-router-dom";
import Dropdown from "@/Components/Dropdown";

export default function Navbar({user}) {
    return (
        <>
            {/* Navbar */}
            <nav
                className=" top-0 left-0 w-full z-10 bg-transparent p-4">
                <div
                    className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <Link
                        to='/dashboard'
                        className="text-xl uppercase hidden lg:inline-block font-semibold">
                        Dashboard {user.role}
                    </Link>

                    <div className="hidden flex-row md:flex md:justify-between py-2 lg:ml-auto mr-5 md:items-center">
                        <div>
                            <p>Date Aujourd'hui</p>
                            <p>{new Date().toLocaleDateString("fr-FR")}</p>
                        </div>
                        <i className="fa fa-calendar-alt m-2 text-3xl"/>
                    </div>
                    {/* Form */}
                    <form className="md:flex hidden flex-row flex-wrap items-center  mr-3">
                        <div className="relative flex w-full flex-wrap items-stretch">
                              <span
                                  className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i className="fas fa-search"/>
                              </span>
                            <input type="text" placeholder="Search here..."
                                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
                        </div>
                    </form>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <Dropdown>
                            <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <span
                                                    className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                                    <img
                                                        alt="..."
                                                        className="w-full rounded-full align-middle border-none shadow-lg"
                                                        src={"/img/user.png"}
                                                    />
                                                  </span>
                                            </button>
                                        </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link to="#">Profile</Dropdown.Link>
                                <Dropdown.Link to="/dashboard/logout">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </ul>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}
