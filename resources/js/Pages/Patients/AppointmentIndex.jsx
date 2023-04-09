import React, {useEffect, useState} from 'react'
import StaffServices from "@/store/services/StaffServices";
import AuthServices from "@/store/services/AdminServices";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Spin from "@/Components/Custom/Spin";
import Table from "@/Components/Custom/Table";
import {Link} from "react-router-dom";
import PatientServices from "@/store/services/PatientServices";
import {useLocation} from "react-router-dom";

export default function PatientAppointmentIndex() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    const {state} = useLocation();

    useEffect(() => {
        getMyAppointments();
    }, []);

    const getMyAppointments = () => {
        PatientServices.getMyAppointments(state)
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
        {name: "Date du rendez-vous"},
        {name: "Heure"},
        {name: "Status"},
        {name: "Note"},
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
                    <h1 className="text-center text-xl">Liste de Mes Rendez-vous </h1>
                    <Table rows={TableRows}>
                        {data.length <= 0 ? (
                            <tr>
                                <td colSpan="5" className="p-3 text-center">No data found</td>
                            </tr>
                        ) : (
                            data.map((value, index) => {
                                const {end, start} = value.schedule
                                return (
                                    <tr key={index}>
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
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {value.note}
                                        </td>
                                        <td className="flex justify-between">
                                            <div className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                                <Link
                                                    className="text-green-500 hover:text-green-700"
                                                    href="#"
                                                    to={"/dashboard/patient/appointment/update/" + value.id}
                                                >
                                                    Plus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </Table>
                </>

            )}
        </Authenticated>
    )
}
