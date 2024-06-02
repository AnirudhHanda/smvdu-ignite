import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog.jsx";
import CreateCourseForm from "@/pages/course/CreateCourseForm.jsx";
import CourseCard from "@/pages/course/CourseCard.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, searchCourses } from '@/redux/course/Action';


const CourseList = () => {
    const dispatch = useDispatch();
    const { departmentId, option, departmentName } = useParams();

    const { course } = useSelector(store => store);

    const [keyword, setKeyword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (course.error) {
            setErrorMessage(course.error.detail);
        }
    }, [course.error]);

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        dispatch(searchCourses(e.target.value, departmentId));
    };

    useEffect(() => {
        dispatch(fetchCourses(departmentId));
    }, [departmentId])

    return (
        <>
            <div className="container mx-auto px-5 lg:px-0 py-5">
                <div className="mx-auto max-w-5xl">
                    <div className="text-gray-600 pb-10 w-full">
                        <h1 className="font-semibold pb-5 text-3xl">{departmentName}</h1>
                    </div>


                    <div className="flex items-center justify-between mb-8">
                        <div className="relative flex-1 mr-4">
                            <MagnifyingGlassIcon
                                className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                            <Input
                                onChange={handleSearchChange}
                                placeholder="search coureName"
                                className="md:w-80 px-8 py-3 text-lg border focus:outline-none focus:ring focus:ring-blue-400"
                            />

                        </div>

                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center  mt-4 md:mt-0 ml-0 md:ml-4 px-4 py-2  text-base font-medium rounded-md text-white hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <PlusIcon className="w-6 h-6" />
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>Add Course</DialogHeader>
                                <CreateCourseForm />
                            </DialogContent>
                        </Dialog>


                    </div>
                    <p className="py-5 border-b text-lg -tracking-wider">Courses</p>
                    {errorMessage && (
                       <div className="mb-4 px-4 py-3 bg-red-200 text-red-800 rounded-lg text-center">
                            {errorMessage}
                        </div>
                    )}

                    <div className="lg-flex md:flex gap-3  justify-between py-5">
                        {/*<Dialog>*/}
                        <ScrollArea className="w-full h-[80vh]">
                            <Card className="w-full pt-4">
                                <CardContent>
                                    <div className="mx-auto max-w-5xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {keyword
                                                ? course.searchCoursess?.map((item, index) => <CourseCard option={option} item={item} key={item.id * 10} />)
                                                : course.courses?.map((item) => (
                                                    <CourseCard option={option} key={item.id} item={item} />
                                                ))}

                                            {/* {Array.from({length: keyword ? 3 : 4}).map((_, index) => (
                                                <CourseCard option={option} key={index}/>
                                            ))} */}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollArea>
                        {/*</Dialog>*/}
                    </div>
                </div>


            </div>
        </>
    );
};

export default CourseList;
