import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RegisterPage } from './Components/Register/RegisterPage';
import { UserPage } from './Components/User/UserPage';
import { AdminPage } from './Components/Admin/AdminPage';
import { NotFoundPage } from './Components/NotFound/NotFoundPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);