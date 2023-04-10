import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, {useEffect, useState} from "react";
import AdminServices from "@/store/services/AdminServices";
import Spin from "@/Components/Custom/Spin";
import Table from "@/Components/Custom/Table";
import {Link} from "react-router-dom";


export default function PersonnelIndexAdmin() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        getPersonnel();
    }, []);

    const getPersonnel = () => {
        AdminServices.getPersonnels()
            .then((response) => {
                setLoading(false)
                const {personnels} = response.data
                return setData(personnels)
            })
            .catch(() => {
                setLoading(false)
                return setError(AdminServices.getErrorMessage(error))
            })
    }

    const TableRows = [
        {name: "ID"},
        {name: "Name"},
        {name: "email"},
        {name: 'Note'},
        {name: 'Date de naissance'},
        {name: 'Actions'}
    ]

    const handleDelete = (e) => {
        const {key} = e.target.dataset;
        if (confirm('Are you Sure that you want to delete this')) {
            setLoading(true)
            AdminServices.deletePersonnel(key)
                .then((response) => {
                    alert('Message: ' + response.data.message);
                })
                .catch((error) => {
                    alert('Error: ' + AdminServices.getErrorMessage(error))
                })
                .finally(() => {
                    getPersonnel()
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
                            const {name, surname, email, dob} = value.account
                            return (
                                <tr key={index}>
                                    {/*<td className="py-3 pl-4">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="checkbox"
                                            className="sr-only"
                                        >
                                            Checkbox
                                        </label>
                                    </div>
                                </td>*/}
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {value.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 text-sm whitespace-nowrap">
                                        {value.note}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 text-sm whitespace-nowrap">
                                        {dob}
                                    </td>
                                    <td className="flex justify-between">
                                        <div className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                            <Link
                                                className="text-green-500 hover:text-green-700"
                                                href="#"
                                                to={"/dashboard/admin/personnels/update/" + value.id}
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
