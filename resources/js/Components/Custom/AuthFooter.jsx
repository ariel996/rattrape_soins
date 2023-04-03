import React from "react"

const AuthFooter = () => {
    return (
        <div className="container mx-auto px-4">
            <hr className="mb-4 border-b-1 border-blueGray-200"/>
            <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-4/12 px-4">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Copyright © {new Date().getFullYear()}{" "}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthFooter
