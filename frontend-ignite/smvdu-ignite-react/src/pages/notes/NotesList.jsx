import React from 'react'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import NoteCard from "@/pages/notes/NoteCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";

const NotesList = () => {
    return (
        <>
            <Card className="w-full pt-4">
                <CardContent>
                    <ScrollArea className="w-full h-[60vh]">
                    <div className="space-y-2">

                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item)=> <NoteCard key={item} />)}

                    </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    )
}
export default NotesList
