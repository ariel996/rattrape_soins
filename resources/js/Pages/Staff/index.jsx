import React from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Outlet} from "react-router";
import StatCard from "@/Components/Custom/StatCard";

export default function StaffIndex() {
    return (
        <Authenticated>


            <div className="flex flex-wrap">
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='fas fa-arrow-up'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
            </div>

            <div className="px-4 md:px-10 relative mx-auto w-full">
                <div className="relative flex-wrap">
                    Here is the staff
                </div>
            </div>
        </Authenticated>
    )
}
