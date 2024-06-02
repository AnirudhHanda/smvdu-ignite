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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/auth/Action';
import { fetchDepartments } from './redux/department/Action';
import About from './pages/navbar/About';
import AdminLogin from './pages/auth/AdminLogin';

function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store)
  useEffect(() => {
    dispatch(getUser())
    dispatch(fetchDepartments())
  }, [auth.jwt, dispatch])

  if (!auth.user) {
    return <Auth/>
  }

  if (!auth.user.enabled) {
    console.log("enabllllllllleedd-----", auth.user.enabled);                      
    return <Auth />;
  }

  console.log("user enalbeld: ", auth.en);

  return (
    <>
        {
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/departments/:option" element={<ProjectList/>}/>
                    <Route path="/departments/:option" element={<ProjectList/>}/>
                    <Route path="/department/courses/:option/:departmentId/:departmentName" element={<CourseList/>}/>
                    <Route path="/department/courses/:option/:departmentId/:departmentName" element={<CourseList/>}/>
                    <Route path="/course/:departmentId/notes/:option/:courseId/:courseName" element={<Notes/>}/>
                    <Route path="/course/:departmentId/pyqs/:option/:courseId/:courseName" element={<Pyqs/>}/>
                    <Route path="/questions" element={<QuestionsReplies/>}/>
                </Routes>
            </div>
        }

    </>
  )
}

export default App
