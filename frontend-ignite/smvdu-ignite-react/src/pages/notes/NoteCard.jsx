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
import { deleteNote } from '@/redux/notes/Action';
import { useDispatch } from 'react-redux';

const NoteCard = ({ item }) => {

    const dispatch = useDispatch();
    const currentTime = new Date();

    const getTimeDifferenceString = (timeDifference) => {
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30);
        const months = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12);
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30 * 12));

        if (years > 0) {
            return `${years} year(s) ago`;
        } else if (months > 0) {
            return `${months} month(s) ago`;
        } else if (days > 0) {
            return `${days} day(s) ago`;
        } else if (hours > 0) {
            return `${hours} hour(s) ago`;
        } else if (minutes > 0) {
            return `${minutes} minute(s) ago`;
        } else {
            return `${seconds} second(s) ago`;
        }
    };

    const handleDownloadClick = () => {
        // Assuming item.downloadUrl is the URL for downloading the file
        const downloadUrl = item.downloadUrl;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = item.fileName; // Use the original filename
        document.body.appendChild(a); // Append the link to the body
        a.click(); // Trigger the download
        document.body.removeChild(a); // Remove the link after download
    };

    const handleDeleteClick = () => {
        dispatch(deleteNote(item.id, item.dbName));
    };

    return (
        <Card className="flex flex-col justify-between rounded-md pt-2">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="flex flex-col sm:flex-row w-full gap-8 items-center ">
                    <div className="mx-auto flex items-center flex-grow gap-5">
                        <img className="pdfImage" src={pdfImage} alt="Logo" />
                        <p className="pdfText">{item.fileName}</p>
                    </div>
                    <div className="mx-auto flex items-center gap-9 flex-grow">

                        <DropdownMenu className="border">
                            <DropdownMenuTrigger>
                                <Button
                                    size="icon"
                                    className="bg-gray-900 hover:text-black text-white rounded-full">
                                    <Avatar>
                                        <AvatarFallback>
                                            {item.uploadedBy.firstName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {item.uploadedBy.firstName} {item.uploadedBy.lastName}
                            </DropdownMenuContent>
                            {/*<DropdownMenuContent>*/}
                            {/*    TODO: User profile to be shown here*/}
                            {/*</DropdownMenuContent>*/}
                        </DropdownMenu>

                        <p>{getTimeDifferenceString(currentTime - new Date(item.uploadDateTime))}</p>
                    </div>
                    <div className="mx-auto flex items-center">
                        <Button className="rounded-full " variant="ghost" onClick={handleDownloadClick}>
                            <DownloadIcon />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className="rounded-full" size="icon" variant="ghost">
                                    <DotsVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    Report
                                </DropdownMenuItem>
                                <DropdownMenuItem className="bg-red-200 text-red-500 cursor-pointer"  onClick={handleDeleteClick}> 
                                    Delete
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
