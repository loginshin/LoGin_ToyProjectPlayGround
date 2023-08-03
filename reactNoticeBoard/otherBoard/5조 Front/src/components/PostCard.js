import { Avatar, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom";

function PostCard (props) {
    return (
        <Card>
            <UserData>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                        float: "left",
                        width: "96px",
                        height: "96px"
                    }}
                    icon={<UserOutlined style={{fontSize:"48px", marginTop:"20px"}}/>}
                />
                <PostWriter>{props.items.post_nickname}</PostWriter>
            </UserData>
            <ListData>
                <Link to={`/postView/${props.items.post_id}`}>
                <PostTitle>{props.items.post_title}</PostTitle>
                </Link>

                {/* 무시해도 됩니다 */}
                <ScreenOut>카테고리</ScreenOut>
                <PostTime>
                    <InnerData>{props.items.post_upload_time}</InnerData>
                    <Divider type="vertical"></Divider>
                </PostTime>
                {/* 무시해도 됩니다 */}
                <Thumbs>공감</Thumbs>
                <ThumbsCount>{props.items.post_like_count}</ThumbsCount>
            </ListData>
        </Card>
    )
}

export default PostCard;

const Card = styled.div`
    display: flex;
    width: 100%;
    height: 178px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-color: #f0f0f0;
`
const UserData = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ListData = styled.div`
    width: 74%;
    line-height: 25px;
    font-size: 13px;
    padding-top: 30px;
    padding-left: 20px;
    list-style: none;
`
const PostWriter = styled.p`
    display: flex;
    padding-top: 10px;
    margin-top: 5px;
    font-size: 18px;
    line-height: 8px;
`
const PostTitle = styled.strong`
    display: block;
    position: relative;
    max-width: 680px;
    font-size: 25px;
    line-height: 2;
    color: black;
    font-weight: normal;
    margin-bottom: 15px;
    /* text-overflow: ellipsis;
    white-space: nowrap; */
`
const ScreenOut = styled.dt`
    float: left;
    position: absolute;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
`
const PostTime = styled.dd`
    display: block;
    float: left;
    position: relative;
    color: #909090;
`
const InnerData = styled.span`
    font-family: inherit;
    position: relative;
    padding-right:3px;
`
const Thumbs = styled.dt`
    float: left;
    line-height: 26px;
    font-size: 13px;
    margin: 0 4px 0;
`
const ThumbsCount = styled.dd`
    line-height: 24px;
`