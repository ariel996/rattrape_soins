import Authenticated from "@/Layouts/AuthenticatedLayout";
import Spin from "@/Components/Custom/Spin";
import Table from "@/Components/Custom/Table";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import StaffServices from "@/store/services/StaffServices";
import AuthServices from "@/store/services/AdminServices";

export default function PatientIndex() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = () => {
        StaffServices.getMyPatients()
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
        {name: "Name"},
        {name: "Surname"},
        {name: "email"},
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
                    <h1 className="text-center text-xl">Liste de Mes patients </h1>
                    <Table rows={TableRows}>
                        { data.length<=0 ? (
                            <tr>
                                <td colSpan="5" className="p-3 text-center">No data found </td>
                            </tr>
                        ): (
                            data.map((value, index) => {
                                const {name, surname, email} = value.patient.account
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {value.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {surname}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {email}
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
