import { Navigate, Routes, Route } from "react-router-dom";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
import IssueDetail from "../pages/IssueDetail";
import AskQuestion from "../pages/AskQuestion";
import BookDetail from '../pages/BookDetail';
import InterviewDetail from "../pages/InterviewDetail";
export default function RouteConfig(props){
    return (
        <Routes>
            <Route path="/issues" element={<Issues keyWord={props.keyWord} />} />
            <Route path="/issues/:id" element={<IssueDetail />}/>
            <Route path="/issues/add" element={<AskQuestion />} />
            <Route path="/books" element={<Books />} keyWord={props.keyWord}/>
            <Route path="/books/:id" element={<BookDetail />}/>
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/:id" element={<InterviewDetail />} />
            <Route path="*" element={<Navigate replace to="/issues" />} />
        </Routes>
    );
}