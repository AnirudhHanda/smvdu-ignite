import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import NoteCard from "@/pages/notes/NoteCard.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '@/redux/notes/Action';
import { useParams } from 'react-router-dom';

const NotesList = () => {
    const dispatch = useDispatch();
    const { courseId, courseName } = useParams();
    const { note } = useSelector(store => store);

    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (note.error) {
            setErrorMessage(note.error);
        }
    }, [note.error]);

    useEffect(() => {
        if (note.message) {
            setMessage(note.message);
        }
    }, [note.message]);

    useEffect(() => {
        dispatch(fetchNotes(courseId));
    }, [courseId]);

    return (
        <>
            <Card className="w-full pt-4">
                <CardContent>
                    {message && (
                        <div className="mb-4 text-green-600">
                            {message}
                        </div>
                    )}
                    <ScrollArea className="w-full h-[60vh]">
                        <div className="space-y-2">
                            {note.notes?.length === 0 ? (
                                <div className="text-center text-white text-lg">
                                    Currently, notes are not available. They will be available when someone uploads them.
                                </div>
                            ) : (
                                note.notes.map((item) => <NoteCard key={item.id} item={item} />)
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
};

export default NotesList;
