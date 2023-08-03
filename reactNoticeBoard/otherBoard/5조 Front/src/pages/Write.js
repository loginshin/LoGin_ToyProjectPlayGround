import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Editor from '../components/EditorComponent';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


function Write(props) {
    const [postId, setPostId] = useState('');
    const [desc, setDesc] = useState('');

    const handlePostId = (e) => {
        setPostId(e.target.value);
    }
    
    function onEditorChange(value) {
        setDesc(value);
    }

    const newPosting = () => {
        axios.post('http://localhost:3001/questions',{
          params: {
            post_title: postId,
            post_content: desc,
            post_nickname : sessionStorage.getItem('user_nickname'),
            post_user_id : sessionStorage.getItem('user_id'),
          }
        })
          .then(res => {
            console.log(res.data)
            alert("글 작성이 완료되었습니다.")
            document.location.href = '/'
          })
        //   .then(res => setValue(res.data))
          .catch(function(error){
           console.log(error);
        })
      }

    return (
        <MainContainer>
            <SideBar>
                <Link to='/' style={{ color: "#ffffff" }}>Home<RocketOutlined /></Link>
                <br></br><br></br><br></br>
                <Link to='/postView/7' style={{ color: "#ffffff" }}>Question<RocketOutlined /></Link>
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

                    <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                        <Input name='post_id' value={postId} onChange={handlePostId} />
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
                        <Button type="primary" htmlType="submit" onClick={newPosting} style={{borderColor: "#9e67a3", backgroundColor: "#9e67a3", color: "#ffffff"}}> 
                            OK
                        </Button>
                    </Form.Item>
                </Form>
            </MainBox>
        </MainContainer>
    );
}

export default Write;

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

const MainBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: auto;
height: 500px;
`;