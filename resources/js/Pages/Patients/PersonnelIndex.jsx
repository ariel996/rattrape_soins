import React, {useEffect} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {useState} from "react";
import AdminServices from "@/store/services/AdminServices";
import Spin from "@/Components/Custom/Spin";
import PersonnelCard from "@/Components/Custom/PersonnelCard";
import PatientServices from "@/store/services/PatientServices";

export function PersonnelIndex() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    const getPersonnel = () => {
        PatientServices.getPersonnels()
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

    useEffect(() => {
        getPersonnel();
    }, []);

    return (
        <Authenticated>
            <h1 className="text-center text-3xl">Liste du personnel du site </h1>
            {loading ? (
                <div className="flex justify-center items-center md:h-32 h-10">
                    <Spin/>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-3">
                    {data.map((value) => {
                        const {name, surname} = value.account
                        return (
                            <PersonnelCard name={name}
                                           surname={surname}
                                           key={value.id}
                                           note={value.note}
                                           id={value.id}
                            />
                        )
                    })}
                </div>
            )}
        </Authenticated>
    )
}
