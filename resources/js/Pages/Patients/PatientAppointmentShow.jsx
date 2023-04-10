import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import PatientServices from "@/store/services/PatientServices";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Spin from "@/Components/Custom/Spin";
import PrimaryButton from "@/Components/PrimaryButton";
import StaffServices from "@/store/services/StaffServices";
import TextInput from "@/Components/TextInput";

export default function PatientAppointmentShow() {
    const [loading, setLoading] = useState(false)
    const [loadingNote, setLoadingNote] = useState(false)
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({})
    const [loadingStatus, setLoadingStatus] = useState(false);

    const {id} = useParams();

    const getAppointmentDetails = async () => {
        const response = await PatientServices.getAppointmentDetail(id);
        const {appointment} = response.data
        setFormData({...formData, 'note': appointment?.note})
        setData(appointment)
    }

    const IsPass = () => {
        return data.status === 'Pass'
    }

    useEffect(() => {
        getAppointmentDetails()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        setLoadingNote(true)
        StaffServices.updateNoteAppointment(id, {'note': formData.note})
            .then(() => {
            })
            .finally(() => setLoadingNote(false))
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoadingStatus(true)
        StaffServices.updateStatusAppointment(id, {'status': formData.status})
            .then(() => {
            })
            .finally(() => setLoadingStatus(false))
    }

    const {patient, schedule, observations} = data

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
                            {
                                observations?.length <= 0 ? (
                                    <h1 className="p-3">Pas d'observation disponible pour l'instant </h1>
                                ) : (
                                    observations?.map((value) => {
                                        return (
                                            <div key={value.id}
                                                 className="border flex justify-between items-center rounded-lg p-2 mb-3">
                                                <div className="">
                                                    <h1 className="md:text-lg mb-3">{value.content}</h1>
                                                    <p className="text-xs">Ajouter le: {value.created_at}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>

                        {IsPass()&& (
                            <div className="border w-1/2 shadow-lg rounded-lg p-2">
                                <h1 className="text-center font-semibold">Donner une note a ce personnel pour le
                                    service </h1>
                                <form onSubmit={handleAddNote}>
                                    <TextInput
                                        type="number"
                                        max="5"
                                        min="0"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        className="w-full"
                                    />

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton className="" disabled={loadingNote}>
                                            Enregister
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        )}

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
