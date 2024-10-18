import { Navigate, Routes, Route } from "react-router-dom";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
import IssueDetail from "../pages/IssueDetail";
import AskQuestion from "../pages/AskQuestion";
import BookDetail from '../pages/BookDetail'
export default function RouteConfig(){
    return (
        <Routes>
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<IssueDetail />}/>
            <Route path="/issues/add" element={<AskQuestion />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />}/>
            <Route path="/interviews" element={<Interviews />} />
            <Route path="*" element={<Navigate replace to="/issues" />} />
        </Routes>
    );
}