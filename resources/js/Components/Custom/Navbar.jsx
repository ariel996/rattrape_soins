import React from "react";
import {Link} from "react-router-dom";

export default function Navbar(props) {
    return (
        <nav
            className={
                (props.transparent
                    ? "absolute z-50 w-full container "
                    : "relative shadow-lg bg-white shadow-lg") +
                " flex flex-wrap items-center justify-between px-2 py-3 "
            }
        >
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between">
                    <Link
                        className={
                            (props.transparent ? "text-white" : "text-gray-800") +
                            " text-sm font-bold  inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        }
                        to="/"
                    >
                        Ratrapage Soin
                    </Link>

                    <Link
                        className={
                            "bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                        }
                        to="/login"
                    >
                        <i className="fa fa-user pr-1"/> Login
                    </Link>

                </div>
            </div>
        </nav>
    );
}
