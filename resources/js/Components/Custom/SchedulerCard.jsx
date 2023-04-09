import React, {useState} from 'react';
import PatientServices from "@/store/services/PatientServices";
import AdminServices from "@/store/services/AdminServices";
import {useNavigate} from "react-router-dom";
import Spin from "@/Components/Custom/Spin";


export default function SchedulerCard({debut, fin, id, personnel_id, date}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate();
    // book the appointment
    const handleSelection = (e) => {
        setLoading(true);
        PatientServices.bookAppointment(
            {personnel_id, 'scheduler_id': id, 'date_appointment': date})
            .then((response) => {
                console.log(response.data)
                // navigate to the appointment page
                navigate('/dashboard/patient/appointment')
            })
            .catch(() => {
                setError(AdminServices.getErrorMessage(error))
            }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className="w-1/4 bg-white min-h-48 m-3 mb-5 font-medium">
            <div className="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                {loading ? (
                    <div className="flex w-full justify-center p-4 items-center">
                        <Spin/>
                    </div>
                ) : (
                    <div className="block p-3 rounded-t overflow-hidden text-center ">
                        <div className="py-3 bg-white">
                        <span className="font-semibold leading-tight">
                            De: {debut} à {fin}
                        </span>
                        </div>
                        <div className="pb-2 text-center">
                            <button onClick={handleSelection} className="border btn px-3 rounded-lg py-2">
                                <i className="fa fa-plus-circle mr-2"/>
                                Selectionner
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
