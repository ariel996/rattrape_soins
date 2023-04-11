import React from 'react';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import {Link} from 'react-router-dom';
import PrimaryButton from "@/Components/PrimaryButton";

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const state = {
        loading: false,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: {},
        response: {
            error: false,
            message: '',
        },
        success: false,
    };

    const onFormSubmit = (data) => {
        const {name, email, password, password_confirmation} = data;
        const credentials = {
            name,
            email,
            password,
            password_confirmation,
        };

    };

    return (
        <GuestLayout>
            <div className="flex justify-between items-center my-10">
                <div className="hidden w-full md:flex md:w-1/2">
                    <img src="/img/register-banner.png" alt="Login banner"/>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-center">Créez votre compte pour beneficier de tous nos services  </h1>
                    <div className="flex justify-center">
                        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        validationFailed={errors.name}
                                        {...(register("name", {required: true}))}
                                    />
                                    {errors.name && (
                                        <InputError message="Le Nom est obligatoire" className="mt-2"/>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email"/>

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        validationFailed={errors.email}
                                        {...(register("email", {required: true}))}
                                    />
                                    {errors.email && (
                                        <InputError message="l'email est obligatoire" className="mt-2"/>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Date de naissance"/>

                                    <TextInput
                                        id="dob"
                                        type="date"
                                        className="mt-1 block w-full"
                                        autoComplete="date"
                                        validationFailed={errors.dob}
                                        {...(register("dob", {required: true}))}
                                    />
                                    {errors.dob && (
                                        <InputError message="La date de naissance est obligatiore" className="mt-2"/>
                                    )}
                                </div>


                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Mot de pass"/>

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
                                        <InputError message="Le Mot de pass est obligatoire " className="mt-2"/>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirmation mot de pass"/>

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
                                        <InputError message="Confirmation mot de pass obligatoire " className="mt-2"/>
                                    )}

                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm">Vous avez déja un compte ?</span>
                                    <Link
                                        to='/login'
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Se connecter?
                                    </Link>
                                    <PrimaryButton className="" disabled={state.loading}>
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>

    );

}

Register.propTypes = {

};

export default Register;
