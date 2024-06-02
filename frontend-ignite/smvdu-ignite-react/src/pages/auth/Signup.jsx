import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/redux/auth/Action';

const Signup = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        }
    });

    const { auth } = useSelector(store => store);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (auth.error) {
            setErrorMessage(auth.error.detail);
            setSuccessMessage(""); // Clear success message if there's an error
        } else {
            setErrorMessage('');
        }
    }, [auth.error]);

    const onSubmit = (data) => {
        try {
            dispatch(register(data));
            if (errorMessage.length===0) {
                setSuccessMessage("Registration successful! An activation email has been sent, activate and proceed for Login.");
                setErrorMessage(""); // Clear any previous error message
                form.reset();
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
        console.log('signup data: ', data);
    };

    const clearError = () => {
        setErrorMessage('');
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md p-4">
                <h1 className="text-3xl font-bold mb-4">Register</h1>
                {errorMessage && (
                    <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 text-green-500 bg-green-200 p-4 rounded-md">
                        {successMessage}
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-1">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="mr-4">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                                    placeholder="First Name"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        clearError();
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                                    placeholder="Last Name"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        clearError();
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                                placeholder="Email"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    clearError();
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                                placeholder="Password"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    clearError();
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full border sm:w-auto font-bold py-2 px-4 rounded">
                                Register
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
