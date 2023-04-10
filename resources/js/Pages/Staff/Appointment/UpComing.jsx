import React, {useEffect, useState} from 'react'
import StaffServices from "@/store/services/StaffServices";
import AuthServices from "@/store/services/AdminServices";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Spin from "@/Components/Custom/Spin";
import Table from "@/Components/Custom/Table";
import {Link} from "react-router-dom";

export default function StaffUpComingAppointmentIndex() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        getMyAppointments();
    }, []);

    const getMyAppointments = () => {
        StaffServices.getMyAppointment('up_coming')
            .then((response) => {
                setLoading(false)
                const {appointments} = response.data
                return setData(appointments)
            })
            .catch(() => {
                setLoading(false)
                return setError(AuthServices.getErrorMessage(error))
            })
    }

    const TableRows = [
        {name: "ID"},
        {name: "Nom du patient "},
        {name: "Date du rendez-vous"},
        {name: "Heure"},
        {name: "Status"},
        {name: 'Actions'}
    ]

    return (
        <Authenticated>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spin/>
                </div>
            ) : (
                <>
                    <h1 className="text-center text-xl">Liste de Mes Rendez-vous A venir</h1>
                    <Table rows={TableRows}>
                        { data.length<=0 ? (
                            <tr>
                                <td colSpan="5" className="p-3 text-center">No data found </td>
                            </tr>
                        ): (
                            data.map((value, index) => {
                                const {name} = value.patient.account
                                const {end, start} = value.schedule
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {value.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {name}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {value.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <span className="font-medium">Debut:</span> {start} <br/>
                                            <span className="font-medium"> Fin: </span> {end}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {value.status}
                                        </td>
                                        <td className="flex justify-between">
                                            <div className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                                <Link
                                                    className="text-green-500 hover:text-green-700"
                                                    href="#"
                                                    to={"/dashboard/admin/patients/update/" + value.id}
                                                >
                                                    More
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )  }
                    </Table>
                </>

            )}
        </Authenticated>
    )
}
