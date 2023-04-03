import React, {useEffect} from "react";
import Navbar from "@/Components/Custom/Navbar";
import Footer from "@/Components/Custom/Footer";

export default function Landing() {
    useEffect(() => {
        document.title = `Home`;
    });
    return (
        <>
            <Navbar transparent/>
            <main className="w-full">
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
                     style={{
                         minHeight: "75vh"
                     }}>
                    <div className="absolute top-0 w-full h-full bg-center bg-cover">
                        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"/>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="">
                                    <h1 className="text-white font-semibold text-5xl">
                                        Ratrapage de Soin
                                    </h1>
                                    <p className="mt-3 text-gray-300 text-lg">
                                        Nous Aidons les malades à rattraper leurs soins
                                    </p>
                                    <p className="mt-4 text-xl text-gray-300">
                                        Develloper et Presenté par: Mr
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <section className="relative pb-20 w-full bg-gray-300 -mt-24">
                    <div className="relative container w-full mx-auto px-4">
                        <h1 className="text-center py-5 font-semibold text-3xl ">Les Services que nous offrons</h1>
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div
                                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div
                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <i className="fas fa-award"/>
                                        </div>
                                        <h6 className="text-xl font-semibold">Service 1</h6>
                                        <p className="mt-2 mb-4 text-gray-600">
                                            Description 1
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div
                                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div
                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                                            <i className="fas fa-retweet"/>
                                        </div>
                                        <h6 className="text-xl font-semibold">
                                            Service 2
                                        </h6>
                                        <p className="mt-2 mb-4 text-gray-600">
                                            Description 2
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div
                                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div
                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                                            <i className="fas fa-fingerprint"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">
                                            Service 3
                                        </h6>
                                        <p className="mt-2 mb-4 text-gray-600">
                                            Description
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}
