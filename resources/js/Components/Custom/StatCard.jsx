import React from "react";

export default function StatCard ({title, value, icon}) {

    return (
        <div className="w-full lg:w-1/3 xl:w-2/12 px-8">
            <div
                className="relative min-w-0 break-words bg-white py-3 px-2 rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {title}
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">{value}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className="p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                                <i className={icon}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
