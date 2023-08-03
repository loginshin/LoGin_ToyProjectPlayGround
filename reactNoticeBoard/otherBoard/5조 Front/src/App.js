import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import MainNavigation from './components/MainNavigation';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostView from './pages/PostView';
import Write from './pages/Write';
import PostUpdate from './pages/PostUpdate';

/* eslint-disable */

function App() {

 // 로그인 상태 관리
 const [isLogin, setIsLogin] = useState(false)

 useEffect(() => {
   if(sessionStorage.getItem('user_id') === null){
   // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
     console.log('isLogin ?? :: ', isLogin)
   } else {
   // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
   // 로그인 상태 변경
     setIsLogin(true)
     console.log('isLogin ?? :: ', isLogin)
   }
 })

  return (
    <Container>
      <BrowserRouter>
      <MainNavigation isLogin={isLogin}/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/postView/:id' element={<PostView />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/write' element={<Write />} />
          <Route path='/PostUpdate/:id' element={<PostUpdate />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: auto;
  height: auto;
  max-width: 1280px;
  margin:auto;
`