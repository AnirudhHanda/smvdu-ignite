import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import {ChevronDownIcon, DotsVerticalIcon} from '@radix-ui/react-icons';
import {Button} from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

const QuestionCard = () => {
    const [repliesVisible, setRepliesVisible] = useState(false);
    const [newReply, setNewReply] = useState('');

    const replies = [
        {
            username: 'User1',
            content: 'This is reply 1 for the question of the world and for the nature and is no one gona handle this and no one will be responsible for the curse of the world aldfalskdjlf dkfjdsl kf sadf sdlfks dlf jsad flsdflks df lsadf laskd .',
        },
        {
            username: 'User2',
            content: 'This is reply 2.',
        },
    ];

    const handleNewReplyChange = (event) => {
        setNewReply(event.target.value);
    };

    const handleNewReplySubmit = (event) => {
        event.preventDefault();
        // Add code to submit the new reply
        setNewReply('');
    };

    return (
        <Card className="flex flex-col justify-between rounded-md pt-2">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="flex flex-col sm:flex-row w-full gap-8 items-center ">
                    <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full sm:text-sm">
                        <p className="text-secondary text-sm sm:text-xl truncate">
                            Addictoss Zen
                        </p>
                        <p className="text-base sm:text-lg text-ellipsis overflow-hidden">
                            How much work is pending? And how you are thinking to solve this problem in one or the other way and really no one is going to help anyone in this case?
                        </p>
                    </div>
                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                        <p className="text-xs sm:text-sm">Asked 2 hours ago</p>
                        <button
                            className="focus:outline-none"
                            onClick={() => setRepliesVisible(!repliesVisible)}
                        >
                            <p className={`text-white  ${repliesVisible? 'rotate-90' : ''}`} >Replies</p>
                        </button>
                    </div>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
            {repliesVisible && (
                <CardContent className="border-t border-gray-200 pt-4 bg-gray-950">
                    {replies.map((reply, index) => (
                        <Card key={index} className="flex flex-col sm:flex-row w-full gap-8 items-center mb-4 pt-2 pb-2 pr-2 pl-5">
                            <div className="flex items-center gap-2 ">
                                <Avatar>
                                    <AvatarFallback>{reply.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p className="text-secondary text-sm sm:text-xl truncate italic">
                                    {reply.username}
                                </p>
                            </div>
                            <p className="text-base sm:text-lg text-ellipsis overflow-hidden italic">
                                {reply.content}
                            </p>
                        </Card>
                    ))}
                    <form onSubmit={handleNewReplySubmit} className="flex flex-col sm:flex-row gap-2 items-center">
                        <input
                            type="text"
                            value={newReply}
                            onChange={handleNewReplyChange}
                            placeholder="Write your reply..."
                            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
                        />
                        <Button type="submit" className="w-full sm:w-auto">
                            Ask
                        </Button>
                    </form>
                </CardContent>
            )}
        </Card>
    );
};

export default QuestionCard