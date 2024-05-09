import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';

const CreateQuestionForm = () => {
    const form = useForm({
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (data) => {
        console.log('create Question data: ', data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col sm:flex-row gap-2 items-center"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-3 px-4 sm:py-5 sm:px-5"
                                        placeholder="Ask a question..."
                                    />
                                </FormControl>
                                <FormMessage />
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
