import styled from 'styled-components';
import { Button } from 'antd';
import React from 'react';
import 'antd/dist/antd.min.css';
import axios from 'axios';

function CommentCard(props) {
    const test = props.items.comment_nickname
    console.log(test)

      // 댓글 삭제 버튼 클릭 이벤트
       const onClickCommentDelete = () => {

        // console.log(props.items.comment_id)
        // console.log(props.items.comment_nickname)
        // console.log(props.items.comment_content)

        if( sessionStorage.getItem('user_nickname') == props.items.comment_nickname){
          axios.post('http://localhost:3001/onDeleteComment', {
            params: {
            
            comment_nickname : props.items.comment_nickname,
            comment_id : props.items.comment_id,
            

            }
        })
            .then(res => {
                alert('해당 글이 삭제 되었습니다.')
                //삭제되면 새로고침
                document.location.href = '/'
                console.log(res.data);
            })

            .catch()
        }
        else{
            alert('작성자만 삭제 및 수정이 가능합니다.')
        }
    }

    return (
        <Card>
            <AnswerList>
                <div style={{margin: "0 auto"}}>
                    <div style={{float:"left", marginLeft:"5%", width:"4%", height:"100%", alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                        <Button>▲</Button>
                        <div className="LikeCount" style={{textAlign:"center", padding:"50% 0"}}>{props.items.comment_like_count}</div>
                        <Button>▼</Button>
                    </div>

                    <UserContext>
                        <span style={{color:"gary"}}>작성자 : </span>
                        <NickSpan>{props.items.comment_nickname}</NickSpan>
                        <span style={{color:'gray'}}>{props.items.comment_upload_time}</span>
                        <Button style={{fontSize:'13px',border:'0',color:'gray'}} variant="danger" onClick={onClickCommentDelete}>댓글 삭제</Button>
                        
                        <br/><br/>
                        <div dangerouslySetInnerHTML={{__html: props.items.comment_content}} />
                    </UserContext>
                </div>
            </AnswerList>
        </Card>
    );
}

export default CommentCard;

const Card = styled.div`
`
const AnswerList = styled.div`
    float: left;
    width: 85%;
    min-height: 200px;
    height: auto;
    padding-top: 2%;
    padding-bottom: 2%;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-top: 0;
    border-color: #f0f0f0;
`
const UserContext = styled.div`
    float: left; 
    margin-left: 5%;
    height:"100%"
`

const NickSpan = styled.span`
    font-size: 15px;
    margin-right: 20px;
    font-weight: bold;
`