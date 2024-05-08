import React from 'react'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import NoteCard from "@/pages/notes/NoteCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import PyqCard from "@/pages/pyq/PyqCard.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";

const PyqList = () => {
    return (
        <>
            <Card className="w-full pt-4">
                <CardContent>
                    <div className="space-y-2">
                        <ScrollArea className="w-full h-[60vh]">
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item)=> <PyqCard key={item} />)}
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default PyqList;
