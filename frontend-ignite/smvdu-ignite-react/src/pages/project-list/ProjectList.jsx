import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import ProjectCard from '@/pages/project/ProjectCard.jsx';
import AddDepartmentPopup from './AddDepartmentPopup.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog.jsx";
import CreateProjectForm from "@/pages/project/CreateProjectForm.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { searchDepartments } from '@/redux/department/Action.js';
// import { fetchDepartments } from '@/redux/department/Action.js';


const ProjectList = () => {
    // ready for git push

    const dispatch = useDispatch();
    const { option } = useParams();



    // useEffect(() => {
    //     dispatch(fetchDepartments());
    // }, [dispatch]);


    const { department } = useSelector(store => store);


    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (department.error) {
            setErrorMessage(department.error.detail);
        }
    }, [department.error]);

    const [keyword, setKeyword] = useState('');
    const [showAddDepartment, setShowAddDepartment] = useState(false);

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        dispatch(searchDepartments(e.target.value));
    };

    const handleAddDepartmentClick = () => {
        setShowAddDepartment(true);
    };

    const handleClosePopup = () => {
        setShowAddDepartment(false);
    };

    console.log("Department Object: ", department);
    return (
        <div className="container mx-auto px-5 lg:px-0 py-5">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="relative flex-1 mr-4">
                        <MagnifyingGlassIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                        <Input
                            onChange={handleSearchChange}
                            placeholder="search department"
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
                            <DialogHeader>Add Department</DialogHeader>
                            <CreateProjectForm />
                        </DialogContent>
                    </Dialog>


                </div>
            </div>
            {errorMessage && (
                <div className="mb-4 px-4 py-3 bg-red-200 text-red-800 rounded-lg text-center">
                    {errorMessage}
                </div>
            )}

            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {keyword
                        ? department.searchDepartmentss?.map((item, index) => <ProjectCard item={item} key={item.id * index} />)
                        : department.departments?.map((item) => (
                            <ProjectCard option={option} key={item.id} item={item} />
                        ))}
                    {/* {Array.from({length: keyword ? 3 : department.departments}).map((_, index, item) => (
                            <ProjectCard option={option} key={item.id} item = {item}/>
                        ))} */}
                    {/* {department.departments?.filter((dept) => dept.name.toLowerCase().includes(keyword.toLowerCase()))
                            .map((item) => (
                                <ProjectCard key={item.id} option={option} item={item} />
                            ))} */}
                    {/* {department.departments?.map((item) => (
    <ProjectCard option={option} key={item.id} item={item}/>
    ))} */}
                </div>
            </div>

            {showAddDepartment && <AddDepartmentPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default ProjectList;
