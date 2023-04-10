import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, {useEffect, useState} from "react";
import AdminServices from "@/store/services/AdminServices";
import Spin from "@/Components/Custom/Spin";
import Table from "@/Components/Custom/Table";
import {Link} from "react-router-dom";

export default function PatientIndexAdmin () {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = () => {
        AdminServices.getPatients()
            .then((response) => {
                setLoading(false)
                const {patients} = response.data
                return setData(patients)
            })
            .catch(() => {
                setLoading(false)
                return setError(AdminServices.getErrorMessage(error))
            })
    }

    const TableRows = [
        {name: "ID"},
        {name: "Name"},
        {name: "Surname"},
        {name: "email"},
        {name: 'Actions'}
    ]

    const handleDelete = (e) => {
        const {key} = e.target.dataset;
        if (confirm('Are you Sure that you want to delete this')) {
            setLoading(true)
            AdminServices.deletePatient(key)
                .then((response) => {
                    alert('Message: ' + response.data.message);
                })
                .catch((error) => {
                    alert('Error: ' + AdminServices.getErrorMessage(error))
                })
                .finally(() => {
                    getPatients()
                    setLoading(false)
                })
        }
    }
    return (
        <Authenticated>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spin/>
                </div>
            ) : (
                <Table rows={TableRows}>
                    {data.map((value, index) => {
                            const {name, surname, email} = value.account
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
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={handleDelete}
                                                data-key={value.id}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </Table>
            )}
        </Authenticated>
    )
}
