import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { RocketOutlined } from "@ant-design/icons";
import Icon from "../components/Icon";
import Button from "../components/Button";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Login(props) {
    //디자인 아이콘
    const FacebookBackground = "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
    const InstagramBackground = "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
    const TwitterBackground = "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
    
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const onFinish = (values) => {
        onClickLogin();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
   // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        axios.post('http://localhost:3001/onLogin', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }
        })
        .then(res => {
            if(res.data.iduser === undefined){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.msg)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data.iduser === null){
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')
            } else if(res.data.iduser === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
                sessionStorage.setItem('user_nickname',res.data.nickname)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch()
    }
 
   // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/server/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])

    return (
        <MainContainer>
            <SideBar>
                <Link to='/' style={{ color: "#ffffff" }}>Home<RocketOutlined /></Link>
                <br></br><br></br><br></br>
                <Link to='/postView/:id' style={{ color: "#ffffff" }}>Question<RocketOutlined /></Link>
            </SideBar>

            <MainBox>
                <InputBox style={{ padding: "17" }}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 9,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            htmlFor='input_id'
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'ENTER THE ID',
                                },
                            ]}
                        >
                            <Input type='text' placeholder='ID' name='input_id' value={inputId} onChange={handleInputId} maxLength={"16"}
                                style={{ width: "190pt", cursor: "pointer", outline: "none", border: "none", borderRadius: "2rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)" }} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            htmlFor='input_pw'
                            rules={[
                                {
                                    required: true,
                                    message: 'ENTER THE PW',
                                },
                            ]}
                        >
                            <Input.Password type='password' name='input_pw' value={inputPw} onChange={handleInputPw} placeholder='PASSWORD' maxLength={"18"}
                                style={{ width: "190pt", cursor: "pointer", outline: "none", border: "none", borderRadius: "2rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)" }} />
                        </Form.Item>
                        <br></br>
                        <Button margin="auto" content="Login" align="center" onClick={{onClickLogin}} />
                    </Form>
                    <br></br><br></br>
                    <h5>OR LOGIN WITH</h5>
                    <br></br>
                    <HorizontalRule />
                    <IconsContainer>
                        <Icon color={FacebookBackground}>
                            <a href="https://ko-kr.facebook.com/" style={{ color: "#ffffff" }}>
                                <FaFacebookF></FaFacebookF>
                            </a>
                        </Icon>
                        <Icon color={InstagramBackground}>
                            <a href="https://www.instagram.com/" style={{ color: "#ffffff" }}>
                                <FaInstagram />
                            </a>
                        </Icon>
                        <Icon color={TwitterBackground}>
                            <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D" style={{ color: "#ffffff", align: "center" }}>
                                <FaTwitter />
                            </a>
                        </Icon>
                    </IconsContainer>
                    <h5><Link to='/signup'>Don't have an account?</Link></h5>
                </InputBox>
            </MainBox>
        </MainContainer>

    );
}

export default Login;

const MainContainer = styled.div`
border-right: 1px solid black;
border-color: #f0f0f0;
`;

const SideBar = styled.div`
  float: left;
  width: 15%;
  height: 100vh;
  padding: 3% 0 0 3%;
  border-color: #f0f0f0;
  background-color: #A6D1E6;
  font-size: large;
`;

const MainBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: auto;
height:840px;
`;

const InputBox = styled.div`
 display: flex;
 align-items: center;
 flex-direction: column;
 height: 550px;
 width: 580px;
 box-shadow: 0 8px 12px 0 rgba(10, 40, 35, 0.47);
 border-radius: 10px;
 text-transform: uppercase;
 letter-spacing: 0.4rem;
 margin-bottom: 100px;
 padding-top: 43px;
 background-color: #f0f2f2;
 /* background: rgba(255, 255, 255, 0.15); */
 /* backdrop-filter: blur(8.5px); */
 /* -webkit-backdrop-filter: blur(8.5px); */
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #A6D1E6 20%, #9e67a3 90%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;