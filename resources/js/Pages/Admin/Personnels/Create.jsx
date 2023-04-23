import React, {useEffect, useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm} from "react-hook-form";
import AdminServices from "@/store/services/AdminServices";
import Message from "@/Components/Message";
import {useNavigate, useParams} from "react-router-dom";
import Spin from "@/Components/Custom/Spin";

export default function CreatePersonnelAdmin() {
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {id} = useParams()
    let [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        dob: ''
    })
    useEffect(() => {
        if (id) {
            // getting the updating user information
            setLoadingData(true)
            const getUser = async ()=> {
                const response = await AdminServices.getPersonnel(id);
                const apiUser = response.data.personnel.account
                setUser({
                    name: apiUser.name,
                    surname: apiUser.surname,
                    email: apiUser.email,
                    dob: apiUser.dob
                });
            };
            getUser();
            setLoadingData(false)

            /*AdminServices.getPersonnel(id)
                .then((response) => {
                    const apiUser = response.data.personnel.account
                    setUser({
                        name: apiUser.name,
                        surname: apiUser.surname,
                        email: apiUser.email,
                    });
                })
                .catch(() => {
                    setError(AdminServices.getErrorMessage(error))
                })
                .finally(() => {
                    setLoadingData(false)
                })*/
        }
    }, [])
    console.log("User ", user)


    const navigate = useNavigate();

    const handleChanged = e =>{
        alert('chanfge')
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const onFormSubmit = (data) => {
        setLoading(true)
        if(id){
            const newdata = {...user, ...data}
            AdminServices.updatePersonnel(id, newdata)
                .then((response) => {
                    navigate('/dashboard/admin/personnels')
                })
                .catch((error) => {
                    setError(AdminServices.getErrorMessage(error))
                })
                .finally(() => {
                    setLoading(false)
                })
        }else {
            AdminServices.createPersonnel(data)
                .then((response) => {
                    navigate('/dashboard/admin/personnels')
                })
                .catch((error) => {
                    setError(AdminServices.getErrorMessage(error))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    };

    return (
        <Authenticated>
            {error && (
                <div className="w-full justify-center flex my-3">
                    <Message message={error} error={error}/>
                </div>
            )}

            {id ? (
                <h1 className="text-center text-xl">Editer les informations du personnel </h1>
            ) : (
                <h1 className="text-center text-xl">Enregister un nouveau membre du personnel</h1>
            )}

            {loadingData ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spin/>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className={"w-full md:w-1/2 mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg "
                    + (error ? "border border-red-500" : "")}>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name"/>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    defaultValue={user.name}
                                    validationFailed={errors.name}
                                    onChange={handleChanged}
                                    {...(register("name", {required: true}))}
                                />
                                {errors.name && (
                                    <InputError message="Le Nom est obligatoire" className="mt-2"/>
                                )}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="surname" value="Surname"/>
                                <TextInput
                                    id="surname"
                                    className="mt-1 block w-full"
                                    autoComplete="surname"
                                    defaultValue={user.surname}
                                    validationFailed={errors.name}
                                    {...(register("surname", {required: true}))}
                                />
                                {errors.surname && (
                                    <InputError message="Le prenom est obligatoire" className="mt-2"/>
                                )}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email"/>
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    defaultValue={user.email}
                                    validationFailed={errors.email}
                                    {...(register("email", {required: true}))}
                                />
                                {errors.email && (
                                    <InputError message="l'email est obligatoire" className="mt-2"/>
                                )}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="ville" value="Ville"/>
                                <TextInput
                                    id="ville"
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="ville"
                                    validationFailed={errors.ville}
                                    {...(register("ville", {required: true}))}
                                />
                                {errors.ville && (
                                    <InputError message="la ville est obligatoire" className="mt-2"/>
                                )}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="rue" value="rue"/>
                                <TextInput
                                    id="rue"
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="quartier"
                                    validationFailed={errors.quartier}
                                    {...(register("quartier", {required: true}))}
                                />
                                {errors.quartier && (
                                    <InputError message="la rue est obligatoire" className="mt-2"/>
                                )}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Date de naissance"/>

                                <TextInput
                                    id="dob"
                                    type="date"
                                    className="mt-1 block w-full"
                                    autoComplete="date"
                                    defaultValue={user.dob}
                                    validationFailed={errors.dob}
                                    {...(register("dob", {required: true}))}
                                />
                                {errors.dob && (
                                    <InputError message="La date de naissance est obligatiore" className="mt-2"/>
                                )}
                            </div>



                            {!id && (
                                <>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password"/>

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            validationFailed={errors.password}
                                            {...register('password', {required: true})}
                                        />
                                        {errors.password && (
                                            <InputError message="Le Mot de pass est obligatoire" className="mt-2"/>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            validationFailed={errors.password_confirmation}
                                            {...register("password_confirmation", {required: true})}
                                        />

                                        {errors.password_confirmation && (
                                            <InputError message="La confirmation est obligatoire" className="mt-2"/>
                                        )}

                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="" disabled={loading}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </Authenticated>
    )
}
