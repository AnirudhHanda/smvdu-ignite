import React from 'react'
import CreateQuestionForm from "@/pages/qna/CreateQuestionForm.jsx";
import QuestionCard from "@/pages/qna/QuestionCard.jsx";

const QuestionsReplies = () => {



    return (

        <div className="px-20 py-8 text-gray-400">
            <CreateQuestionForm/>
            <div className="mt-8 space-y-5 border p-10 rounded-lg ">
                {[1, 1, 1, 1, 1].map((item) => <QuestionCard/>)}
            </div>
        </div>
    )
}
export default QuestionsReplies;
