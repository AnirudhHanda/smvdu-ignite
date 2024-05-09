import React from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import NotesList from "@/pages/notes/NotesList.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "@radix-ui/react-icons";
import CreateNoteForm from "@/pages/notes/CreateNoteForm.jsx";
import {useParams} from "react-router-dom";

const Notes = () => {
    const {departmentId, courseId} = useParams();
    return (
        <>
            <div className="container mx-auto px-5 lg:px-0 py-5">
                <div className="mx-auto max-w-5xl">
                    <div className="text-gray-600 pb-10 w-full">
                        <h1 className="font-semibold pb-5 text-3xl">Operating Systems</h1>
                        <div className="flex items-center border-b justify-between mb-8">
                            <p className="text-2xl py-5  text-gray-300 -tracking-wider">Notes</p>
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center  mt-4 md:mt-0 ml-0 md:ml-4 px-4 py-2  text-base font-medium rounded-md text-white hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <PlusIcon className="w-6 h-6"/>
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>Upload Notes</DialogHeader>
                                    <CreateNoteForm/>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="lg-flex md:flex  justify-between">
                       <NotesList/>
                    </div>
                </div>


            </div>
        </>
)
}
export default Notes
