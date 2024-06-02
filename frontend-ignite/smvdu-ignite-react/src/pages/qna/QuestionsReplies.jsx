import React, { useEffect, useState } from 'react'
import CreateQuestionForm from "@/pages/qna/CreateQuestionForm.jsx";
import QuestionCard from "@/pages/qna/QuestionCard.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '@/redux/question/Action';
import { fetchReplies } from '@/redux/reply/Action';

const QuestionsReplies = () => {

    const dispatch = useDispatch();
    const { question } = useSelector(store => store);
    const { reply } = useSelector(store => store);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (question.error) {
            setErrorMessage(question.error.detail);
        }
    }, [question.error]);

    useEffect(() => {
        if (reply.error) {
            setErrorMessage(reply.error.detail);
        }
    }, [reply.error]);




    const [newErrorMessage, setNewErrorMessage] = useState('');

    useEffect(() => {
        if (question.error) {
            setNewErrorMessage(question.error.detail);
        }
    }, [question.error]);

    useEffect(() => {
        if (reply.error) {
            setNewErrorMessage(reply.error.detail);
        }
    }, [reply.error]);



    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(fetchDepartments());
    // }, [dispatch]);

    console.log("questions data :", question);

    return (
        <div className="px-4 py-8 text-gray-400 md:px-20">
            <CreateQuestionForm />
            <br></br>
            {newErrorMessage && (
                        <div className="mb-4 px-4 py-3 bg-blue-200 text-blue-800 rounded-lg text-center">
                            {newErrorMessage}
                        </div>
            )}
            <div className="mt-8 space-y-5 border p-4 md:p-10 rounded-lg">  
                {/* {errorMessage && (
                    <div className="mb-4 text-red-600">
                        {errorMessage}
                    </div>
                )} */}
                {question.questions?.map((item) => (
                    item && <QuestionCard item={item} replies={item.replies} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default QuestionsReplies;
