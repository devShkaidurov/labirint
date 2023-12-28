import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RegisterPage } from './Components/Register/RegisterPage';
import { UserPage } from './Components/User/UserPage';
import { AdminPage } from './Components/Admin/AdminPage';
import { NotFoundPage } from './Components/NotFound/NotFoundPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserInfo } from './Components/Info/UserInfo/userInfo';
import { AdminInfo } from './Components/Info/AdminInfo/adminInfo';
import { Info } from './Components/Info/Info/info';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/userInfo" element={<UserInfo/>}/>
                <Route path="/adminInfo" element={<AdminInfo/>}/>
                <Route path="/info" element={<Info/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);