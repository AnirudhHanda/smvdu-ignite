import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createReply, deleteReply, fetchReplies } from '@/redux/reply/Action';
import { deleteQuestion } from '@/redux/question/Action';

const QuestionCard = ({ item, replies }) => {
    const dispatch = useDispatch();
    const [repliesVisible, setRepliesVisible] = useState(false);
    const [replyAddedMessage, setReplyAddedMessage] = useState('');

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            reply: '',
        },
    });

    useEffect(() => {
        dispatch(fetchReplies(item.id));
    }, [dispatch, item.id]);

    const onSubmit = async (data) => {
        await dispatch(createReply({ name: data.reply, questionId: item.id }));
        reset(); // reset the form after submission
        setReplyAddedMessage('Your reply has been added.');
        setTimeout(() => {
            setReplyAddedMessage('');
            window.location.reload(); // reload the page
        }, 2000);
    };

    const createdDateTime = new Date(item.createdDateTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdDateTime;

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

    const handleDelete = async () => {
        await dispatch(deleteQuestion(item.id));
        // window.location.reload(); // reload the page after deletion
    };

    const handleDeleteReply = async (replyId) => {
        await dispatch(deleteReply(replyId));
        window.location.reload(); // reload the page after deletion
    };

    return (
        <Card className="flex flex-col justify-between rounded-md pt-2 w-full">
            <CardContent className="grid grid-cols-1 gap-4">
                <div className="flex flex-col w-full gap-4 items-start sm:flex-row sm:items-center">
                    <Avatar>
                        <AvatarFallback>{item.owner.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full">
                        <p className="text-secondary text-sm sm:text-xl truncate">
                            {item.owner.firstName} {item.owner.lastName}
                        </p>
                        <p className="text-base sm:text-lg text-ellipsis overflow-hidden">
                            {item.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-8 mt-2 sm:mt-0 sm:ml-auto ">
                        <p className="text-xs sm:text-sm">{getTimeDifferenceString(timeDifference)}</p>
                        <button
                            className="focus:outline-none"
                            onClick={() => setRepliesVisible(!repliesVisible)}
                        >
                            <p className={`text-white ${repliesVisible ? 'rotate-90' : ''}`}>Replies</p>
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
                            <DropdownMenuItem className="bg-red-200 text-red-500 cursor-pointer" onClick={handleDelete}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
            {repliesVisible && (
                <CardContent className="border-t border-gray-200 pt-4 bg-gray-950 w-full">
                    {replies?.map((reply, index) => (
                        <Card key={index} className="flex flex-col w-full gap-2 mb-4 p-2">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>{reply.owner.firstName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p className="text-secondary text-sm sm:text-xl truncate italic">
                                    {reply.owner.firstName} {reply.owner.lastName}
                                </p>
                            </div>
                            <p className="text-base sm:text-lg overflow-hidden italic">
                                {reply.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">
                                {getTimeDifferenceString(currentTime - new Date(reply.createdDateTime))}
                            </p>
                            <div className="flex justify-end mt-2">
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
                                        <DropdownMenuItem className="bg-red-200 text-red-500 cursor-pointer" onClick={() => handleDeleteReply(reply.id)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </Card>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center w-full">
                        <Controller
                            name="reply"
                            control={control}
                            rules={{
                                required: "Reply is required",
                                minLength: {
                                    value: 5,
                                    message: "Reply must be at least 5 characters long"
                                },
                                validate: value => value.trim() !== '' || "Reply cannot be empty"
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Write your reply..."
                                        className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
                                    />
                                    {errors.reply && (
                                        <p className="text-red-600">
                                            {errors.reply.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                        <Button type="submit" className="w-full sm:w-auto">
                            Reply
                        </Button>
                    </form>
                    {replyAddedMessage && (
                        <p className="text-green-500 mt-2">{replyAddedMessage}</p>
                    )}
                </CardContent>
            )}
        </Card>
    );
};

export default QuestionCard;
