import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { DialogClose } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createNote } from '@/redux/notes/Action';

const CreateNoteForm = ({ option, courseId }) => {
    const dispatch = useDispatch();
    const [isDropped, setDropped] = useState(false);
    const [droppedFileName, setDroppedFileName] = useState("");
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [promptText, setPromptText] = useState("Drag 'n' drop some files here, or click to select files");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const form = useForm({
        defaultValues: {
            name: ""
        }
    });

    console.log("Option: ", option);

    const onSubmit = async () => {
        if (acceptedFiles.length === 0) {
            setErrorMessage("No file selected");
            setTimeout(() => {
                setErrorMessage(""); // Clear the error message after 5 seconds
            }, 5000);
            return;
        }

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("file", acceptedFiles[0]);

        dispatch(createNote(option, formData));
        // const token = "Bearer " + localStorage.getItem('jwt');
        // const headers = new Headers();
        // headers.append("Authorization", token);

        // const requestOptions = {
        //     method: "POST",
        //     headers: headers,
        //     body: formData,
        // };

        // try {
        //     const response = await fetch(`http://localhost:8080/api/v1/${option}/upload`, requestOptions);
        //     if (!response.ok) {
        //         throw new Error("File upload failed");
        //     }
        //     const results = await response.json();
        //     console.log("results: ", results);
        //     setSuccessMessage("File uploaded successfully!");
        //     setErrorMessage(""); // Clear any previous error messages
        //     setTimeout(() => {
        //         setSuccessMessage(""); // Clear the success message after 5 seconds
        //     }, 5000);
        //     setTimeout(() => {
        //         window.location.reload(); // Reload the page after 5 seconds
        //     }, 5000);
        // } catch (error) {
        //     console.error("Error uploading file:", error);
        //     setErrorMessage("Error uploading file");
        //     setTimeout(() => {
        //         setErrorMessage(""); // Clear the error message after 5 seconds
        //     }, 5000);
        // } finally {
        //     setLoading(false); // End loading
        // }
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const droppedFile = acceptedFiles[0];
            const fileType = droppedFile.name.split('.').pop();
            if (fileType !== 'pdf') {
                setPromptText("Please upload a PDF file.");
                setErrorMessage("Please upload a PDF file.");
                return;
            }
            setDropped(true);
            setDroppedFileName(droppedFile.name);
            setAcceptedFiles(acceptedFiles);
            setPromptText(`File dropped: ${droppedFile.name}`);
            console.log('File dropped:', droppedFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <Form {...form}>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <FormField control={form.control}
                        name="name"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <div {...getRootProps()} style={dropZoneStyle}>
                                        <input {...getInputProps()} />
                                        <p>{promptText}</p>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />
                    {errorMessage && (
                        <div className="mb-4 text-red-600">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 text-green-500">
                            {successMessage}
                        </div>
                    )}
                    {loading && (
                        <div className="mb-4 text-blue-500">
                            Uploading... Please wait.
                        </div>
                    )}
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5" disabled={loading}>
                            Upload file
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

const dropZoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
};

export default CreateNoteForm;
