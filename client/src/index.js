import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Register from './components/Register';
import { Main } from './components/Main';
import { NotFoundPage } from './components/NotFoundPage';
import { AdminWindow } from './components/AdminWindow';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="game" element={<Main/>}/>
                <Route path="admin" element={<AdminWindow/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);