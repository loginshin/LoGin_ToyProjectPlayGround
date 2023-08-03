import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import BoardMain from './component/BoardMain';
import BoardView from './component/BoardView';
import Header from './component/Header';
import BoardEdit from './component/boardEdit/boardEdit';
import Login from './component/Login';
import "./App.css";




function App() {

    const isLogin = false;
    return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
        
        <Route exact path="/" element={<BoardMain />} />
        <Route exact path="/content/:num" element={<BoardView />} />
        <Route exact path="/Write" element={ <BoardEdit />}/>
        <Route exact path="/Login" element={<Login />} />
    </Routes>
    </BrowserRouter>
    </>
    );
}
export default App;