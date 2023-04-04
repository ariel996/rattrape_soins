import React from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Custom/StatCard";

export default function AdminIndex() {
    return (
        <Authenticated>
            <div className="flex flex-wrap gap-6">
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='fas fa-arrow-up'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
                <StatCard title="Patients" value="4" icon='far fa-chart-bar'/>
            </div>
        </Authenticated>
    )
}
