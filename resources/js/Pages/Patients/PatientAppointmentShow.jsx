import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import PatientServices from "@/store/services/PatientServices";

export default function PatientAppointmentShow() {
    const [loading, setLoading] = useState(false)
    const [data, setDate] = useState({})

    const id = useParams();

    const getAppointmentDetails = async () => {
        const response = await PatientServices.getAppointmentDetail(id);
        const apiUser = response.data.patient.account
        setDate({
            name: apiUser.name,
            surname: apiUser.surname,
            email: apiUser.email,
            dob: apiUser.dob
        });
    }
    useEffect(() => {
        getAppointmentDetails()
    }, [])
}
