import React from 'react';
import { Card } from '@/components/ui/card.jsx';
import './CourseCard.css';
import {useNavigate, useParams} from "react-router-dom";

const CourseCard = ({option, item}) => {
    const isNotesOption = option === 'notes'; // Check if the selected option is "notes"
    const isPyqsOption = option === 'pyqs'; // Check if the selected option is "pyqs"
    const [isHovered, setIsHovered] = React.useState(false);

    const {departmentId} = useParams();


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const navigate = useNavigate();

    return (
        <Card
            // onClick={()=>navigate("/course/notes/3")}
            onClick={()=>navigate(`/course/${departmentId}/${option}/${option}/${item.id}/${item.name}`)}
            className={`card2 p-8 w-full lg:max-w-4xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
                isHovered ? 'shadow-white-lg scale-110 bg-blue-500 cursor-pointer' : 'shadow-lg bg-white cursor-pointer'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h2 className={`text-xl font-semibold mb-4 ${
                isHovered ? 'text-white' : 'text-gray-700'
            } transition-colors duration-500`}
                // onClick={() => navigate("/department/3")}
            >
                {item.name}
            </h2>
        </Card>
    ); 
};

export default CourseCard;
