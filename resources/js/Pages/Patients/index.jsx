import React, {useEffect, useState} from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {PatientDashboardServices} from "@/store/services/DashbordServices";
import StatCard from "@/Components/Custom/StatCard";

export default function PatientIndex() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        PatientDashboardServices()
            .then((response) => {
                setLoading(false)
                return setData(response.data)
            })
            .catch((error) => {
                setLoading(false)
                return setError(error.toString())
            })
    }, [])
    console.log(data)

    return (
        <Authenticated>
            <div className="flex flex-wrap gap-6">
                {data ? (
                    <>
                        <StatCard loading={loading} title="Rendez Vous" value={data.nbrAppointment} icon='fa fa-calendar-alt'/>
                        <StatCard loading={loading} title="Rendez Vous Ajourd'hui " value={data.nbrAppointmentToday} icon='fa fa-calendar-alt'/>
                    </>
                ) : (
                    <h1>{error}</h1>
                )}
            </div>
        </Authenticated>
    )
}
