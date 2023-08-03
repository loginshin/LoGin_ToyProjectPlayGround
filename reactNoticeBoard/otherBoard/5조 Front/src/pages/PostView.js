// rsf
import React from 'react';
import 'antd/dist/antd.min.css';
import styled from "styled-components";
import { Button, Divider } from "antd";
import { Link, useParams } from "react-router-dom";
import { RocketOutlined } from '@ant-design/icons';
import CommentCard from '../components/CommentCard';
import { useEffect, useState } from "react";
import axios from 'axios';
import Editor from '../components/EditorComponent2';

function PostView(props) {
    const id = useParams().id; //url 게시글 번호
    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [desc, setDesc] = useState('');

    function onEditorChange(value) {
        setDesc(value)
    }

    // 댓글 작성
    const newComment = () => {
        if(sessionStorage.getItem("user_id") == null){
            alert("로그인 후 댓글을 작성할 수 있습니다.")
            document.location.href = "/Login"
            return;
        }
        axios.post('http://127.0.0.1:3001/comments',{
          params: {
            comment_content: desc,
            comment_nickname: sessionStorage.getItem("user_nickname"), //유저 닉네임
            comment_fk_post_info_id : id // 해당 게시글 번호 입력
          }
        })
          .then(res => {
            alert("댓글을 작성했습니다.")
            document.location.href = `/postView/${id}`
          })
          .catch(function(error){
           console.log(error);
        })
    }

    //게시글 상세정보 요청
    useEffect(() => {
        axios.post('http://127.0.0.1:3001/postview', {
            params: {
                post_id: id
            }
        })
            .then(res => setPostData(res.data[0]))
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    //해당 게시글 댓글 요청
    useEffect(() => {
        axios.post('http://127.0.0.1:3001/postcomment', {
            params: {
                post_id: id
            }
        })
            .then(res => setCommentData(res.data))
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    // 삭제 버튼 클릭 이벤트
    const onClickDelete = () => {
        if (sessionStorage.getItem('user_id') == postData.post_user_id) {
            axios.post('http://localhost:3001/onDelete', null, {
                params: {
                    'postnickname': postData.post_nickname,
                    'post_id': id
                }
            })
                .then(res => {
                    alert('댓글이 삭제 되었습니다.')
                    //삭제되면 새로고침
                    document.location.href = '/'
                    console.log(res.data);
                })

                .catch()
        }
        else {
            alert('작성자만 삭제 및 수정이 가능합니다.')
        }
    }

    // 수정 버튼 클릭 이벤트
    const onClickUpdate = () => {
        if (sessionStorage.getItem('user_id') == postData.post_user_id) {
            document.location.href = `/PostUpdate/${id}`
        }
        else {
            alert('작성자만 삭제 및 수정이 가능합니다.')
        }
    }

    return (
        <MainContainer>
             <SideBar>
                <Link to='/'style={{color:"#ffffff"}}>Home<RocketOutlined /></Link>
                <br></br><br></br><br></br>
                <Link to='/postView/7' style={{color:"#ffffff"}}>Question<RocketOutlined /></Link>
            </SideBar>

            <Content>
                <QuestionHeader>
                    <QuestionInfo>
                        <h2><b> {postData.post_title} </b></h2>
                    </QuestionInfo>
                    <AskButton>
                        <Link to='/write'><Button type="primary" size="large" style={{borderColor: "#9e67a3", backgroundColor: "#9e67a3"}}>Ask Question</Button></Link>
                    </AskButton>
                </QuestionHeader>
                <br></br><br></br><br></br>
                <PostTime>
                    <InnerData>{postData.post_upload_time}</InnerData>
                    <Divider type="vertical"></Divider>
                    <span style={{color:'black',fontSize:'13px'}}>공감 {postData.post_like_count}</span>
                    <br/><br/>
                    <Button style={{fontSize:'13px',border:'0',color:'gray'}} variant="danger" onClick={onClickUpdate}>글 수정</Button>
                    <Button style={{fontSize:'13px',border:'0',color:'gray'}} variant="danger" onClick={onClickDelete}>글 삭제</Button>
                </PostTime>

            </Content>
            <PostContent>
                <br/><br/><br/><br/><br/>
                <div dangerouslySetInnerHTML={{__html: postData.post_content}} />
                <br/><br/><br/><br/><br/>
            </PostContent>

            {/* 해당 게시글의 댓글 */}
            {commentData &&
                <div>
                    {
                        commentData.map((a, i) => {
                            return <CommentCard items={commentData[i]} />
                        })
                    }
                </div>
            }

           <PostComment>
                <h2 style={{padding:"1% 0% 1% 2%"}}>Your Answer</h2>
                <Editor value={desc} onChange={onEditorChange} />
                <Button type="primary" htmltype="submit" size="large" style={{marginLeft:"45%", borderColor: "#9e67a3", backgroundColor: "#9e67a3"}} onClick={newComment}>Post Your Answer</Button>
            </PostComment>

        </MainContainer>
    );
}

export default PostView;

const MainContainer = styled.div`
`
const SideBar = styled.div`
  float: left;
  width: 15%;
  height: 110vh;
  padding: 3% 0 0 3%;
  border-color: #f0f0f0;
  background-color: #A6D1E6;
  font-size: large;
`;
const Content = styled.div`
    float: left;
    width: 85%;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-color: #f0f0f0;
    padding-bottom: 2%;
`
const QuestionHeader = styled.div`
    justify-content: center;
    margin-top: 3%;
    margin-left: 5%;
`
const QuestionInfo = styled.div`
    float: left;
    width: 75%;
`
const AskButton = styled.div`
    width: 15%;
    float: right; 
`
const PostTime = styled.dd`
    display: block;
    float: left;
    position: relative;
    color: #909090;
    margin-left: 5%;
`

const InnerData = styled.span`
    font-family: inherit;
    position: relative;
    padding-right:3px;
`

const PostContent = styled.div`
    float: left;
    width: 85%;
    height: auto;
    padding: 2% 0% 2% 5%;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-color: #f0f0f0;
`
const PostComment = styled.div`
    float: left;
    width: 85%;
    border-right: 1px solid black;
    border-color: #f0f0f0;
`