import React from "react";
import Spin from "@/Components/Custom/Spin";

export default function StatCard({title, value, icon, loading = true, color = 'bg-indigo-500'}) {
    return (
        <div className="w-full lg:w-1/3">
            <div
                className="relative min-w-0 break-words bg-white py-3 px-2 rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Spin style="bg-indigo-500"/>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-2xs">
                                    {title}
                                </h5>
                                <span className="font-semibold text-2xl text-blueGray-700">{value}</span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className={"p-3 inline-flex justify-center items-center w-14 h-14 shadow-lg rounded-full " + color}>
                                    <i className={icon + ' text-2xl '}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}
