import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '@/redux/question/Action';
import { getUser } from '@/redux/auth/Action';

const CreateQuestionForm = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            name: '',
        },
    });

    const { auth } = useSelector(store => store);
    useEffect(() => {
        dispatch(getUser());
    }, [auth.jwt, dispatch]);

    const onSubmit = (data) => {
        dispatch(createQuestion(data));
        console.log('create Question data: ', data);
        form.reset();
    };

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col sm:flex-row gap-2 items-center"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Avatar>
                        <AvatarFallback>{auth.user.firstName ? auth.user.firstName[0] : 'U'}</AvatarFallback>
                    </Avatar>

                    <FormField
                        control={form.control}
                        name="name"
                        rules={{
                            required: "Question is required",
                            minLength: {
                                value: 10,
                                message: "Question must be at least 10 characters long"
                            },
                            validate: value => value.trim() !== '' || "Question cannot be empty"
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                        placeholder="Ask a question..."
                                    />
                                </FormControl>
                                {error && <FormMessage>{error.message}</FormMessage>}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full sm:w-auto">
                        Ask
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateQuestionForm;
