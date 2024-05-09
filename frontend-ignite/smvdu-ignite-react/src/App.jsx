import './App.css'
import Home from "@/pages/home/Home.jsx";
import Navbar from "@/pages/navbar/Navbar.jsx";

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css";
import {Route, Routes} from "react-router-dom";
import CourseList from "@/pages/course/CourseList.jsx";
import ProjectList from "@/pages/project-list/ProjectList.jsx";
import Notes from "@/pages/notes/Notes.jsx";
import Pyqs from "@/pages/pyq/Pyqs.jsx";
import QuestionsReplies from "@/pages/qna/QuestionsReplies.jsx";
import Auth from "@/pages/auth/Auth.jsx"; // Specify weight and style

function App() {

  return (
    <>
        {
            true? <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/departments/:option" element={<ProjectList/>}/>
                    <Route path="/departments/:option" element={<ProjectList/>}/>
                    <Route path="/department/courses/:option/:departmentId" element={<CourseList/>}/>
                    <Route path="/department/courses/:option/:departmentId" element={<CourseList/>}/>
                    <Route path="/course/:departmentId/notes/:courseId" element={<Notes/>}/>
                    <Route path="/course/:departmentId/pyqs/:courseId" element={<Pyqs/>}/>
                    <Route path="/questions" element={<QuestionsReplies/>}/>
                </Routes>
            </div> : <Auth/>
        }

    </>
  )
}

export default App
