import React from 'react';
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

const Login = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (data) => {
        console.log('login data: ', data);
    };

    return (
        <div className="flex justify-center bg-">
            <div className="w-full max-w-md p-4">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
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
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full border sm:w-auto font-bold py-2 px-4 rounded">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;