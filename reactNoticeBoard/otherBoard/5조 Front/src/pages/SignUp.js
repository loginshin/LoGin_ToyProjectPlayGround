import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form, Input} from 'antd';
import axios from 'axios';
import { useState } from "react";

function SignUp(props) {
    const [form] = Form.useForm();
    //유효성검사
    const [regId, setRegId] = useState(false);
    const [regPw, setRegPw] = useState(false);
    const [regCpw, setRegcPw] = useState(false);
    const [regName, setRegName] = useState(false);
    //유저아이디
    const [userId, setUserId] = useState('');
    //중복체크
    const [idDuplicate, setidDuplicate] = useState(true);

    //유효성 검사 및 서버 요청
    const onFinish = (values) => {
        if(regId == false){
            alert("아이디를 확인하세요. (영문, 숫자 6~16 글자)")
            return;
        }
        if(regPw == false){
            alert("비밀번호를 확인하세요. (영문, 숫자 6~18 글자)")
            return;
        }
        if(regCpw != regPw){
            alert("동일한 비밀번호를 입력해주세요.")
            return;
        }
        if(regName == false){
            alert("이름을 확인하세요. (영문, 숫자 2~10 글자)")
            return;
        }
        if(idDuplicate) {
            alert("아이디 중복 검사를 진행해 주세요.")
            return;
        }
        console.log('Success:', values);
        signup(values)
    };

    //서버 요청
    const signup = (values) => {
        axios.post('http://127.0.0.1:3001/signup',{
          params: values
        })
          .then(res => {
            alert(res.data);
            window.location.href = '/login';
          })
          .catch(function(error){
           console.log(error);
        })
    }

    //id 중복검사
    const idDuplicateCheck = () => {
        if(!regId){
            alert("유효성 검사를 통과하세요.");
            return;
        }

        axios.post('http://127.0.0.1:3001/idDuplicateCheck',{
          params: userId
        })
          .then(res => {
            if(res.data[0].count >= 1){
                setidDuplicate(true);
                alert("중복된 ID 입니다.")
            } else {
                alert("사용 가능한 ID 입니다.")
                setidDuplicate(false);
            }
          })
          .catch(function(error){
           console.log(error);
        })
    };
    console.log(idDuplicate);

    //미입력 이벤트
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //유효성검사
    const handleInputId = (e) => {
        // 6자~16자 소문자 영어, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-z]{6,16}$/
        setRegId(regExp.test(e.target.value));
        setUserId(e.target.value);
    };
 
    const handleInputPw = (e) => {
        // 8자~16자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/
        setRegPw(regExp.test(e.target.value));
    };

    const handleInputChkPw = (e) => {
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/
        setRegcPw(regExp.test(e.target.value));
    };

    const handleNickname = (e) => {
        // 2자~10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/
        setRegName(regExp.test(e.target.value));
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <MainContainer>
            <SideBar>
                <Link to='/'>Home</Link>
                <br></br><br></br><br></br>
                <Link to='/postView/7'>Question</Link>
            </SideBar>
            <MainBox>
                <Form form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
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
                        label="아이디"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'ID를 입력해 주세요',
                            },
                        ]}
                    >
                        <Input placeholder="영문, 숫자 6~16 글자" onChange={handleInputId}/>
                        
                        </Form.Item>
                        
                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '비밀번호를 입력해 주세요',
                            },
                        ]}
                    >
                        <Input.Password onChange={handleInputPw} placeholder="영문, 숫자 6~18 글자"/>
                    </Form.Item>
                    <Form.Item
                        label="비밀번호 확인"
                        name="chkpassword"
                        rules={[
                            {
                                required: true,
                                message: '비밀번호를 한 번 더 입력해 주세요',
                            },
                        ]}
                    >
                        <Input.Password onChange={handleInputChkPw}/>
                    </Form.Item>

                    <Form.Item
                        label="이름"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '이름을 입력해 주세요',
                            },
                        ]}
                    >
                        <Input placeholder="영문, 숫자 2~10 글자" onChange={handleNickname}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <br></br>
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{marginLeft:"25px"}}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ height: "302px", marginLeft: "15px"}}>
                    <Button type="dashed" style={{borderColor:'40A9FF', color:'#40A9FF'}} onClick={idDuplicateCheck}>중복검사</Button>
                </div>
            </MainBox>
           
        </MainContainer>
    );
}

export default SignUp;

const MainContainer = styled.div`
`
const SideBar = styled.div`
  float: left;
  width: 15%;
  height: 100vh;
  padding: 3% 0 0 3%;
  border-color: #f0f0f0;
  background-color: #A6D1E6;
  font-size: large;
`;

const Box = styled.div`
display: flex;
flex-direction: row;
`;

const MainBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 500px;
width: auto;
`;  
