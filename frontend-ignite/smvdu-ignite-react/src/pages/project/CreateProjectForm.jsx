import React from 'react'
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

const CreateProjectForm = () => {
    const form = useForm({
        // resolver: zod
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = (data) => {
        console.log("create department data: ", data)
    }
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
                                    defaultValue="Computer Science"
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a department"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="computer science">Computer Science</SelectItem>
                                        <SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem>
                                        <SelectItem value="Research and Development">Research and Development</SelectItem>
                                        <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                                        <SelectItem value="Philosophy">Philosophy</SelectItem>
                                        <SelectItem value="Management">Management</SelectItem>
                                    </SelectContent>
                                </Select>
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
    )
}
export default CreateProjectForm
