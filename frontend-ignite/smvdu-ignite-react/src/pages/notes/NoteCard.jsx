import React from 'react';
import { Card, CardContent } from "@/components/ui/card.jsx";
import pdfImage from '../../assets/pdfLogo.svg';
import './NoteCard.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Button } from "@/components/ui/button.jsx";
import { DotsVerticalIcon, DownloadIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";

const NoteCard = () => {
    return (
        <Card className="flex flex-col justify-between rounded-md pt-2">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="flex flex-col sm:flex-row w-full gap-8 items-center ">
                    <div className="mx-auto flex items-center flex-grow gap-5">
                        <img className="pdfImage" src={pdfImage} alt="Logo"/>
                        <p className="pdfText">fileName</p>
                    </div>
                    <div className="mx-auto flex items-center gap-9 flex-grow">

                        <DropdownMenu className="border">
                            <DropdownMenuTrigger>
                                <Button
                                    size="icon"
                                    className="bg-gray-900 hover:text-black text-white rounded-full">
                                    <Avatar>
                                        <AvatarFallback>
                                            <PersonIcon/>
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            {/*<DropdownMenuContent>*/}
                            {/*    TODO: User profile to be shown here*/}
                            {/*</DropdownMenuContent>*/}
                        </DropdownMenu>

                        <p>2 weeks ago</p>
                    </div>
                    <div className="mx-auto flex items-center">
                        <Button className="rounded-full " variant="ghost">
                            <DownloadIcon/>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className="rounded-full" size="icon" variant="ghost">
                                    <DotsVerticalIcon/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    Report
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
);
};

export default NoteCard;
