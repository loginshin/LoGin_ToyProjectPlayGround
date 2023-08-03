import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import Editor from '../components/EditorComponent';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function PostUpdate(props) {
    const [inputTitle, setinputTitle] = useState('')
    const [desc, setDesc] = useState('');
    const id = useParams().id; //url 게시글 번호

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleinputTitle = (e) => {
        setinputTitle(e.target.value)
    }
    
    function onEditorChange(value) {
        setDesc(value);
    }
    
    // 수정요청
    const onClickUpdate = () => {
        if (inputTitle != "" && desc != "") {
            axios.post('http://localhost:3001/onUpdate', {
                params: {
                    post_id: id,
                    post_title: inputTitle,
                    post_content: desc,
                    post_nickname: sessionStorage.getItem("user_nickname")
                }
            })
                .then(res => {
                    console.log(res.data)
                    alert("수정이 완료되었습니다.")
                    document.location.href = '/'
                })
                .catch()
        }
        else {
            alert("글 혹은 내용을 입력해야만 합니다.")
        }
    }

    return (
        <MainContainer>
            <SideBar>
                <Link to='/'>Home</Link>
                <br></br><br></br><br></br>
                <Link to='/postView/7'>Question</Link>
            </SideBar>

            <MainBox>
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                >
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br>

                    <Form.Item label="제목" name="title" rules={[{ required: true }]}>
                        <Input name='post_id' value={inputTitle} onChange={handleinputTitle}/>
                    </Form.Item>
                    <br></br>
                    <Editor value={desc} onChange={onEditorChange} />
                    <br></br>
                     <Form.Item
                        wrapperCol={{
                            offset: 12,
                            span: 16,
                        }}
                    >
                        <br></br>
                        <Button type="primary" htmlType="submit" onClick={onClickUpdate}> 
                            글 수정
                        </Button>

                    </Form.Item>
                </Form>
            </MainBox>
        </MainContainer>
    );
}

export default PostUpdate;

const MainContainer = styled.div`
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

const Box = styled.div`
display: flex;
flex-direction: row;
`;

const MainBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: auto;
height: 500px;
`;