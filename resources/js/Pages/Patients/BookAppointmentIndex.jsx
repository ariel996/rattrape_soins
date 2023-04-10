import React, {useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link, useLocation} from "react-router-dom";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Spin from "@/Components/Custom/Spin";
import PatientServices from "@/store/services/PatientServices";
import AdminServices from "@/store/services/AdminServices";
import SchedulerCard from "@/Components/Custom/SchedulerCard";

export default function BookAppointmentIndex() {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    const [date_appointment, setDateAppointment] = useState('')

    const {state} = useLocation();

    const handleDateChange = (e) => {
        const {name, value} = e.target
        setDateAppointment(value);
        setShow(true);
        getScheduler(value);
    }

    const getScheduler = (date) => {
        setLoading(true);
        PatientServices.getScheduler({'date': date, 'personnel_id': state})
            .then((response) => {
                const scheduler = response.data
                return setData(scheduler)
            })
            .catch(() => {
                return setError(AdminServices.getErrorMessage(error))
            }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Authenticated>
            <div className="flex justify-center items-center">
                <div className="rounded-lg shadow-lg w-full md:w-1/2 p-4">
                    <div className="mt-4">
                        <InputLabel htmlFor="debut" value="Selectioner la date"/>
                        <TextInput
                            id="day"
                            type="date"
                            name="debut"
                            className="mt-1 block w-full"
                            onChange={handleDateChange}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {loading ? (
                    <Spin/>
                ) : (
                    show && (
                        <div className="rounded-lg shadow-lg w-full p-4 mt-5">
                            {data.length <= 0 ? (
                                <h1 className="text-center text-xl py-3">Ce Personnel n'est pas disponible en cette date
                                    selectionner une autre date</h1>
                            ) : (
                                <>
                                    <h1 className="text-center py-3 text-xl font-bold">Selectionner la periode de votre
                                        rendez-vous</h1>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {data.map((value) => {
                                            const {id, start, end} = value
                                            return (
                                                <SchedulerCard key={id} debut={start} fin={end} id={id}
                                                               personnel_id={state} date={date_appointment}/>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                )}
            </div>
        </Authenticated>
    )
}
