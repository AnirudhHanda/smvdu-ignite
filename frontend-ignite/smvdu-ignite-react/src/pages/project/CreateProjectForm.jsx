import React, { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { useForm } from "react-hook-form";
import { DialogClose } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch } from 'react-redux';
import { createDepartment } from '@/redux/department/Action';
import Select from 'react-select';

const departmentOptions = [
    { value: 'School of Computer Science & Engineering', label: 'School of Computer Science & Engineering' },
    { value: 'School of Electronics & Communication Engineering', label: 'School of Electronics & Communication Engineering' },
    { value: 'School of Mechanical Engineering', label: 'School of Mechanical Engineering' },
    { value: 'School of Civil Engineering', label: 'School of Civil Engineering' },
    { value: 'School of Electrical Engineering', label: 'School of Electrical Engineering' },
    { value: 'School of Energy Management', label: 'School of Energy Management' },
    { value: 'School of Architecture & Landscape Design', label: 'School of Architecture & Landscape Design' },
    { value: 'School of Physics', label: 'School of Physics' },
    { value: 'School of Mathematics', label: 'School of Mathematics' },
    { value: 'School of Biotechnology', label: 'School of Biotechnology' },
    { value: 'School of Business', label: 'School of Business' },
    { value: 'School of Economics', label: 'School of Economics' },
    { value: 'School of Philosophy & Culture', label: 'School of Philosophy & Culture' },
    { value: 'School of Languages & Literature', label: 'School of Languages & Literature' },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#1a1a1a',
        color: 'white',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1a1a1a',
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#333' : '#1a1a1a',
        color: 'white',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
};

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const form = useForm({
        // resolver: zod
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = (data) => {
        dispatch(createDepartment(data));
        console.log("create department data: ", data);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                       name="name"
                       render={({ field }) =>
                       <FormItem>
                           <FormControl>
                               <Select
                                   value={departmentOptions.find(option => option.value === field.value)}
                                   onChange={(selectedOption) => {
                                       field.onChange(selectedOption.value);
                                   }}
                                   options={departmentOptions}
                                   isSearchable
                                   placeholder="Select a department"
                                   styles={customStyles}
                                   className="w-full"
                               />
                           </FormControl>
                           <FormMessage/>
                       </FormItem>}
                    />
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                            Add Department
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
}

export default CreateProjectForm;
