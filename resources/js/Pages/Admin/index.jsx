import React, {useEffect, useState} from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Custom/StatCard";
import {AdminDashboardServices} from "@/store/services/DashbordServices";


export default function AdminIndex() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        AdminDashboardServices()
            .then((response) => {
                setLoading(false)
                return setData(response.data)
            })
            .catch((error) => {
                setLoading(false)
                return setError(error.toString())
            })
    }, [])

    return (
        <Authenticated>
            <div className="flex flex-wrap gap-6">
                {data ? (
                    <>
                        <StatCard loading={loading} title="Rendez Vous" value={data.nbrAppointment} icon='fa fa-calendar-alt'/>
                        <StatCard loading={loading} title="Patients" value={data.nbrPatient} icon='fa fa-users'/>
                        <StatCard loading={loading} title="Personnels" value={data.nbrPersonnel} icon='fa fa-user-alt'/>
                    </>
                ) : (
                    <h1>{error}</h1>
                )}
            </div>
        </Authenticated>
    )
}
