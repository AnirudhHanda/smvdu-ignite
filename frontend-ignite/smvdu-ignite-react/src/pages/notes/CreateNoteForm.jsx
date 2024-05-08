import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { DialogClose } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useForm } from "react-hook-form";

const CreateNoteForm = () => {
    const [isDropped, setDropped] = useState(false); // Set initial value to false
    const [droppedFileName, setDroppedFileName] = useState(""); // Define droppedFileName state
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [promptText, setPromptText] = useState("Drag 'n' drop some files here, or click to select files");

    const form = useForm({
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async () => {
        if (acceptedFiles.length === 0) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("courseId", 1); // Assuming courseId is defined somewhere in your code
        formData.append("file", acceptedFiles[0]);

        const token = "Bearer " +
            "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTUxOTYyNzksImV4cCI6MTcxNTI4MjY3OSwiZW1haWwiOiIyMWJjczAxNEBzbXZkdS5hYy5pbiJ9.R5luSltCPMRY0gDlje0PUPkOKa1SYCTfI3WYcNA_5z8cDw7y-Y2nUOGWsTg-Ows_FyraUEDW6QnzTffd75Ty8w"; // Replace "your_token_here" with the actual token
        const headers = new Headers();
        headers.append("Authorization", token);

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: formData,
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/notes/upload", requestOptions);
            const results = await response.json();
            console.log("results: ", results);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const droppedFile = acceptedFiles[0];
            const fileType = droppedFile.name.split('.').pop();
            if (fileType !== 'pdf') {
                setPromptText("Please upload a PDF file.");
                return;
            }
            setDropped(true); // Set isDropped to true
            setDroppedFileName(droppedFile.name); // Set the droppedFileName
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
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
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