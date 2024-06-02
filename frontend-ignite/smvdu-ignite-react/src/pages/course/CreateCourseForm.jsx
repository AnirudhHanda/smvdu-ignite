import React from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { useForm } from "react-hook-form";
import { DialogClose } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch } from 'react-redux';
import { createCourse } from '@/redux/course/Action';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const courseOptions = [
    { value: 'Architectural Design-I', label: 'Architectural Design-I' },
    { value: 'Building Materials & Construction -I', label: 'Building Materials & Construction -I' },
    { value: 'Building Structures-I', label: 'Building Structures-I' },
    { value: 'History of Architecture-I', label: 'History of Architecture-I' },
    { value: 'Architectural Drawings - I', label: 'Architectural Drawings - I' },
    { value: 'Basic Design & Visual Arts', label: 'Basic Design & Visual Arts' },
    { value: 'Model Workshop', label: 'Model Workshop' },
    { value: 'Architectural Design-III', label: 'Architectural Design-III' },
    { value: 'Building Materials & Construction -III', label: 'Building Materials & Construction -III' },
    { value: 'Building Structures-III', label: 'Building Structures-III' },
    { value: 'History of Architecture-III', label: 'History of Architecture-III' },
    { value: 'Computer Applications in Architecture - I', label: 'Computer Applications in Architecture - I' },
    { value: 'Climatology', label: 'Climatology' },
    { value: 'Building Services-I', label: 'Building Services-I' },
    { value: 'Architectural Design-V', label: 'Architectural Design-V' },
    { value: 'Building Materials & Construction -V', label: 'Building Materials & Construction -V' },
    { value: 'Building Structures-V', label: 'Building Structures-V' },
    { value: 'Principles of Management', label: 'Principles of Management' },
    { value: 'Computer Applications in Architecture - III', label: 'Computer Applications in Architecture - III' },
    { value: 'Acoustics & Lighting', label: 'Acoustics & Lighting' },
    { value: 'Sociology & Economics', label: 'Sociology & Economics' },
    { value: 'Professional Training', label: 'Professional Training' },
    { value: 'Architectural Design - VIII', label: 'Architectural Design - VIII' },
    { value: 'Professional Practice', label: 'Professional Practice' },
    { value: 'Green Buildings', label: 'Green Buildings' },
    { value: 'Dissertation', label: 'Dissertation' },
    { value: 'Engineering Mathematics-I', label: 'Engineering Mathematics-I' },
    { value: 'Basic Electronics', label: 'Basic Electronics' },
    { value: 'Basic Electronics Lab', label: 'Basic Electronics Lab' },
    { value: 'Engineering Physics', label: 'Engineering Physics' },
    { value: 'Engineering Physics Lab', label: 'Engineering Physics Lab' },
    { value: 'Introduction to "C" Programming', label: 'Introduction to "C" Programming' },
    { value: 'C Programming Lab', label: 'C Programming Lab' },
    { value: 'Professional Communication', label: 'Professional Communication' },
    { value: 'Professional Communication Lab', label: 'Professional Communication Lab' },
    { value: 'Engineering Graphics with CAD', label: 'Engineering Graphics with CAD' },
    { value: 'Introduction to Computer Sc. & Engineering', label: 'Introduction to Computer Sc. & Engineering' },
    { value: 'Data Structures', label: 'Data Structures' },
    { value: 'Data Structures Lab', label: 'Data Structures Lab' },
    { value: 'Programming using Python', label: 'Programming using Python' },
    { value: 'Python Programming Lab', label: 'Python Programming Lab' },
    { value: 'Digital Electronics', label: 'Digital Electronics' },
    { value: 'Digital Electronics Lab', label: 'Digital Electronics Lab' },
    { value: 'Engineering Mathematics II', label: 'Engineering Mathematics II' },
    { value: 'Discourse on Human Virtues', label: 'Discourse on Human Virtues' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Discrete Structures', label: 'Discrete Structures' },
    { value: 'Introduction to Logic', label: 'Introduction to Logic' },
    { value: 'Theory of Computation', label: 'Theory of Computation' },
    { value: 'Computer Organization & Architecture', label: 'Computer Organization & Architecture' },
    { value: 'Object Oriented Programming', label: 'Object Oriented Programming' },
    { value: 'Object Oriented Programming Lab', label: 'Object Oriented Programming Lab' },
    { value: 'Operating Systems', label: 'Operating Systems' },
    { value: 'Operating Systems Lab', label: 'Operating Systems Lab' },
    { value: 'Environmental Studies', label: 'Environmental Studies' },
    { value: 'Computer Network & Communications', label: 'Computer Network & Communications' },
    { value: 'Computer Network & Communications Lab', label: 'Computer Network & Communications Lab' },
    { value: 'Design & Algorithm Analysis', label: 'Design & Algorithm Analysis' },
    { value: 'Design & Algorithm Analysis Lab', label: 'Design & Algorithm Analysis Lab' },
    { value: 'Database Management Systems', label: 'Database Management Systems' },
    { value: 'Database Management Systems Lab', label: 'Database Management Systems Lab' },
    { value: 'Microprocessors & Interfacing', label: 'Microprocessors & Interfacing' },
    { value: 'Microprocessors & Interfacing Lab', label: 'Microprocessors & Interfacing Lab' },
    { value: 'Compiler Design', label: 'Compiler Design' },
    { value: 'Java Programming', label: 'Java Programming' },
    { value: 'Java Programming Lab', label: 'Java Programming Lab' },
    { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
    { value: 'Constitution of India', label: 'Constitution of India' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Machine Learning Lab', label: 'Machine Learning Lab' },
    { value: 'Soft Computing', label: 'Soft Computing' },
    { value: 'Soft Computing Lab', label: 'Soft Computing Lab' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Software Engineering Lab', label: 'Software Engineering Lab' },
    { value: 'Computer Network Security', label: 'Computer Network Security' },
    { value: 'Nature Inspired Algorithms', label: 'Nature Inspired Algorithms' },
    { value: 'Digital Image Processing', label: 'Digital Image Processing' },
    { value: 'Digital Image Processing Lab', label: 'Digital Image Processing Lab' },
    { value: 'Entrepreneurship Management', label: 'Entrepreneurship Management' },
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

const CreateCourseForm = () => {
    const { departmentId } = useParams();
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            name: "",
            deptId: "",
        }
    });

    const onSubmit = (data) => {
        dispatch(createCourse({
            name: data.name,
            deptId: departmentId,
        }));
        console.log("create course data: ", data);
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
                                               value={courseOptions.find(option => option.value === field.value)}
                                               onChange={(selectedOption) => {
                                                   field.onChange(selectedOption.value);
                                               }}
                                               options={courseOptions}
                                               isSearchable
                                               placeholder="Select a course"
                                               styles={customStyles}
                                               className="w-full"
                                           />
                                       </FormControl>
                                       <FormMessage />
                                   </FormItem>}
                    />
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                            Add Course
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default CreateCourseForm;
