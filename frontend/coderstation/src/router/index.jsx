import { Navigate, Routes, Route } from "react-router-dom";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
import IssueDetail from "../pages/IssueDetail";
import AskQuestion from "../pages/AskQuestion";
import BookDetail from '../pages/BookDetail';
import InterviewDetail from "../pages/InterviewDetail";
import Profile from '../pages/Profile';
import RouteBefore from "./RouteBefore";
import config from './routeBeforeConfig'; 
export default function RouteConfig(){
    const getObj = (path) => {
        return config.find(item => item.path === path) || { requireLogin: false }; // 默认不需要登录
    }
    return (
        <Routes>
            <Route path='/issues' element={<Issues/>} />
            <Route path="/issues/:id" element={<IssueDetail />}/>
            <Route path={getObj("/issues/add").path} element={<RouteBefore requireLogin={getObj("/issues/add").requireLogin}><AskQuestion /></RouteBefore>} />
            <Route path="/books" element={<Books />}/>
            <Route path="/books/:id" element={<BookDetail />}/>
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/:id" element={<InterviewDetail />} />
            <Route path={getObj("/profile/:id").path} element={<RouteBefore requireLogin={getObj("/profile/:id").requireLogin}><Profile /></RouteBefore>} />
            <Route path="*" element={<Navigate replace to="/issues" />} />
        </Routes>
    );
}