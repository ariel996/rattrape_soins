import React, {useEffect, useState} from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Spin from "@/Components/Custom/Spin";
import {useParams} from "react-router-dom";
import AdminServices from "@/store/services/AdminServices";
import StaffServices from "@/store/services/StaffServices";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AppointmentDetail() {
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingObservation, setLoadingObservation] = useState(false);
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({})

    const {id} = useParams();

    // get the Appointment detail
    const getAppointmentDetail = async () => {
        const response = await StaffServices.getAppointmentDetail(id);
        const {appointment} = response.data
        setData(appointment)
    }

    useEffect(() => {
        getAppointmentDetail();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoadingStatus(true)
        StaffServices.updateStatusAppointment(id, {'status': formData.status})
            .then(() => {
            })
            .finally(() => setLoadingStatus(false))
    }

    const handleAddObservation = (e) => {
        e.preventDefault();
        setLoadingObservation(true);
        StaffServices.addObservation(
            {'content': formData.content, 'appointment_id': id}
        ).then((response) => {
            getAppointmentDetail();
            setFormData({...formData, 'content': ''})
        }).finally(() => {
            setLoadingObservation(false)
        })
    }

    const {patient, schedule, observations} = data

    console.log(schedule, patient)
    return (
        <Authenticated>
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <Spin/>
                </div>
            ) : (
                <div className="flex justify-center gap-3">
                    <div className="w-full md:w-75">
                        <h1 className="text-center text-lg font-semibold py-3"> Observation de ce rendez-vous </h1>
                        <div className=" p-3 rounded-lg mb-5">
                            {observations?.length <= 0 ? (
                                <h1 className="p-3">No data Found </h1>
                            ) : (
                                observations?.map((value) => {
                                    return (
                                        <div className="border flex justify-between items-center rounded-lg p-2 mb-3">
                                            <h1 className="md:text-lg">{value.content}</h1>
                                            <PrimaryButton
                                                className="rounded bg-red-500 w-8 h-8 flex items-center justify-center">
                                                <i className="fa fa-close p-2 "/>
                                            </PrimaryButton>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        <div className="border shadow-lg rounded-lg p-2">
                            <h1 className="text-center font-semibold">Ajouter des Observation a ce rendez-vous </h1>
                            <form onSubmit={handleAddObservation}>
                                <textarea onChange={handleChange}
                                          name="content" id="content"
                                          value={formData.content}
                                          className="w-full rounded m-2 mr-4"
                                          rows="5"/>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="" disabled={loadingObservation}>
                                        Ajouter
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="w-full md:w-1/3 pl-2 border-l flex flex-col gap-5 ">
                        <div className="border shadow-lg rounded-lg p-2">
                            <h1 className="text-center font-semibold">Information sur le patient</h1>
                            <div className="mt-3">
                                <p className="mb-2"> Nom: <span
                                    className="font-semibold"> {patient?.account?.name}</span></p>
                                <p className="mb-2">Prenom: <span
                                    className="font-semibold">{patient?.account?.surname}</span></p>
                                <p className="mb-2">Date de Naissance: <span
                                    className="font-semibold">{patient?.account?.dob}</span></p>
                            </div>
                        </div>
                        <div className="border shadow-lg rounded-lg p-2">
                            <h1 className="text-center font-semibold">Information sur le rendez-vous </h1>
                            <div className="mt-3">
                                <p className="mb-2"> Date: <span className="font-semibold"> {data?.date}</span></p>
                                <p className="mb-2">Status: <span className="font-semibold">{data?.status}</span></p>
                                <p className="mb-2">Heure: <span
                                    className="font-semibold">{schedule?.start} à {schedule?.end}</span></p>
                            </div>
                        </div>
                        <div className="border shadow-lg rounded-lg p-2">
                            <h1 className="text-center font-semibold">Changer le status du rendez-vous </h1>
                            <div className="mt-3">
                                <form onSubmit={handleFormSubmit}>
                                    <select name="status"
                                            onChange={handleChange}
                                            className="rounded-lg w-full">
                                        <option selected={data?.status === 'Pass'} value="Pass"> Pass</option>
                                        <option selected={data?.status === 'Up Coming'} value="Up Coming"> Up Coming
                                        </option>
                                        <option selected={data?.status === 'Canceled'} value="Canceled"> Canceled
                                        </option>
                                    </select>
                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton className="" disabled={loadingStatus}>
                                            Update
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Authenticated>
    )
}
