import React, {useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from "react-redux";
import {login} from "@/store/actions/authActions";
import {IsLoginSelector} from "@/store/selector";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLoginSubmit = (data) => {
        setLoading(true);

        const {email, password} = data

        dispatch(login(email, password))
            .then(() => {
                console.log("log In")
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (

        <GuestLayout>
            <h1 className="text-center text-xl">Login Form</h1>

            <div className="sm:max-w-md mt-6 px-6 py-4 bg-white w-full shadow-md sm:rounded-lg">
                <form onSubmit={handleSubmit(handleLoginSubmit)}>
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
                            <InputError message="The email is required" className="mt-2"/>
                        )}
                    </div>

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
                            <InputError message="The password is required" className="mt-2"/>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            to={'/forget-password'}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>

                        <PrimaryButton className="ml-4" disabled={loading}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>

    )
        ;
}
