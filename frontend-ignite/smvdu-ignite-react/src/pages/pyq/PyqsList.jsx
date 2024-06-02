import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import NoteCard from "@/pages/notes/NoteCard.jsx";
import { Button } from "@/components/ui/button.jsx";
import PyqCard from "@/pages/pyq/PyqCard.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPyqs } from '@/redux/pyqs/Action';

const PyqList = () => {
    const dispatch = useDispatch();
    const { courseId, courseName } = useParams();
    // const {note} = useSelector(store=>store);
    const { pyq } = useSelector(store => store);
    const { note } = useSelector(store => store);

    const [message, setMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (pyq.error) {
            setErrorMessage(pyq.error.detail);
        }
    }, [pyq.error]);

    useEffect(() => {
        if (note.message) {
            setMessage(note.message);
        } else{
            setMessage(pyq.message);
        }
    }, [note.message]);

    useEffect(() => {
        dispatch(fetchPyqs(courseId));
    }, [courseId])
    return (
        <>
            <Card className="w-full pt-4">
                <CardContent>
                    {message && (
                            <div className="mb-4 text-green-600">
                                {message}
                            </div>
                        )}
                    <div className="space-y-2">
                        <ScrollArea className="w-full h-[60vh]">
                            {pyq.pyqs?.length === 0 ? (
                                <div className="text-center text-white text-lg">
                                    Currently, PYQs are not available. They will be available when someone uploads them.
                                </div>
                            ) : (
                                pyq.pyqs?.map((item, index) => <PyqCard item={item} key={item * index * 10} />)
                            )}


                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default PyqList;
