import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative bg-gray-300 pt-8 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl font-semibold">
                            Suivez Nous sur les réseaux!
                        </h4>
                        <h5 className="text-lg mt-0 mb-2 text-gray-700">
                            Suivez nous sur ses réseaux socials pour rester informer sur nos activités
                        </h5>
                        <div className="mt-6">
                            <button
                                className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                                type="button"
                            >
                                <i className="flex fab fa-twitter"/>
                            </button>
                            <button
                                className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                                type="button"
                            >
                                <i className="flex fab fa-facebook-square"/>
                            </button>
                            <button
                                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                                type="button"
                            >
                                <i className="flex fab fa-dribbble"/>
                            </button>
                            <button
                                className="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                                type="button"
                            >
                                <i className="flex fab fa-github"/>
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                  Liens Utile
                </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link
                                            className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                                            to="/">Acceuil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                                            to="/login">Se Conneter
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-400"/>
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-600 font-semibold py-1">
                            Copyright © {new Date().getFullYear()}{" "} Ratrappage Soin par{" "}

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
