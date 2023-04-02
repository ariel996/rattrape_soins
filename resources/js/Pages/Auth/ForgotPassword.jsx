import React, {useState} from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {useForm} from 'react-hook-form'
import {login} from "@/store/actions/authActions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFormSubmit = (data) => {
        setLoading(true);

        const {email} = data
        // todo : change to use the right service
        dispatch(login(email))
            .then(() => {
                console.log("log In")
            })
            .catch(() => {
                setLoading(false);
            });
    }
    return (
        <GuestLayout>


            <div className="sm:max-w-md mt-6 px-6 py-4 bg-white w-full shadow-md sm:rounded-lg">
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a
                    password
                    reset link that will allow you to choose a new one.
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        focus
                        className="mt-1 block w-full"
                        validationFailed={errors.email}
                        {...register('email', {required: true})}
                    />
                    {errors.email && (
                        <InputError message="The email is required" className="mt-2"/>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        <Link to="/login"
                              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md"
                        >
                            Login
                        </Link>
                        <PrimaryButton className="ml-4" disabled={loading}>
                            Envoyer
                        </PrimaryButton>
                    </div>
                </form>
            </div>

        </GuestLayout>
    );
}
