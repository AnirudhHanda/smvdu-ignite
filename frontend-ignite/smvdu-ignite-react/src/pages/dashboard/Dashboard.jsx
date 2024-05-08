import React from 'react'
import NotesCard from "@/pages/dashboard/NotesCard.jsx";
import PyqsCard from "@/pages/dashboard/PyqsCard.jsx";
import QnaCard from "@/pages/dashboard/QnaCard.jsx";

const Dashboard = () => {
    return (
        <>
            <div className="container1 flex justify-center items-start h-full mb-10">
                <div
                    className="container1 mx-auto px-5 lg:px-0 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32 mb-10">
                    <NotesCard/>
                    <PyqsCard/>
                    <QnaCard/>
                </div>
            </div>

        </>
    )
}
export default Dashboard
