import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import StaffServices from "@/store/services/StaffServices";
import Spin from "@/Components/Custom/Spin";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm} from "react-hook-form";
import AdminServices from "@/store/services/AdminServices";
import Message from "@/Components/Message";

export default function CreatePlanning() {
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(false);
    const {day} = useParams();

    const {state} = useLocation();

    let [planning, setPlanning] = useState({
        day: '',
        debut: '',
        fin: '',
        duree: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setPlanning({...planning, [name]: value})
        console.log(planning)
    }

    const handleChangeDuree = (e) => {
        const {name, value} = e.target
        const [heure, minutes, secondes] = planning.duree.split(':')
        let newDuree
        switch (name) {
            case 'heure':
                newDuree = value + ':' + minutes + ':' + secondes
                break;
            case 'minute':
                newDuree = heure + ':' + value + ':' + secondes
                break;
            default:
                newDuree = heure + ':' + minutes + ':' + value
        }

        setPlanning({...planning, duree: newDuree})
    }

    useEffect(() => {
        if (day) {
            setLoading(true)
            const getPlanning = async () => {
                const response = await StaffServices.getMyPlanning(state);
                const apiPlanning = response.data.availability
                setPlanning({
                    day: apiPlanning.day,
                    debut: apiPlanning.debut,
                    fin: apiPlanning.fin,
                    duree: apiPlanning.duration
                });
            };
            getPlanning();
            setLoading(false)
        }
    }, [])

    const [heure, minute, secondes] = planning.duree.split(':')

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();

    const onFormSubmit = (data) => {
        setLoadingData(true)
        const newdata = {...planning, ...data}
        StaffServices.UpdatePlanning(state, newdata)
            .then((response) => {
                navigate('/dashboard/staff/planing')
            })
            .catch((error) => {
                setError(AdminServices.getErrorMessage(error))
            })
            .finally(() => {
                setLoadingData(false)
            })
    };


    return (
        <Authenticated>
            {error && (
                <div className="w-full justify-center flex my-3">
                    <Message message={error} error={error}/>
                </div>
            )}

            <h1 className="text-center font-bold text-3xl px-3"> Modifier le planing de {day} </h1>
            {loading ? (
                <div className="flex min-h-screen justify-center items-center">
                    <Spin/>
                </div>
            ) : (
                <div className="flex justify-center flex-wrap">
                    <div className={"w-full md:w-1/2 mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg "
                    + (error ? "border border-red-500" : "")}>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="mt-4">
                                <InputLabel htmlFor="day" value="Day"/>
                                <TextInput
                                    id="day"
                                    name="day"
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    value={planning.day}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="debut" value="Debut"/>
                                <TextInput
                                    id="day"
                                    type="time"
                                    name="debut"
                                    className="mt-1 block w-full"
                                    value={planning.debut}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="fin" value="Fin"/>
                                <TextInput
                                    id="fin"
                                    name="fin"
                                    type="time"
                                    className="mt-1 block w-full"
                                    value={planning.fin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="fin" value="Duree du rendez-vous"/>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <InputLabel htmlFor="fin" value="Heures"/>
                                        <TextInput
                                            id="heure"
                                            name="heure"
                                            type="number"
                                            max="5"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={heure}
                                            onChange={handleChangeDuree}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="fin" value="Minutes"/>
                                        <TextInput
                                            id="minute"
                                            name="minute"
                                            type="number"
                                            max="60"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={minute}
                                            onChange={handleChangeDuree}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="fin" value="Secondes"/>
                                        <TextInput
                                            id="seconde"
                                            name="seconde"
                                            type="number"
                                            max="60"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={secondes}
                                            onChange={handleChangeDuree}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="" disabled={loadingData}>
                                    Modifier
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </Authenticated>
    )
}
