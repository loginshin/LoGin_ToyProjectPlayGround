import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import styled from "styled-components";
import PostCard from "../components/PostCard";
import { Input, Space } from 'antd';
import { Button } from "antd";
import { Link } from "react-router-dom";
import { RocketOutlined } from "@ant-design/icons";

const { Search } = Input;

const onSearch = (value) => console.log(value);

function Main(props) {
  const [allQuestions, setAllQuestions] = useState([]);

  //전체글 불러오기
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/questions')
      .then(res => setAllQuestions(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  //검색
  const onSearch = (value) => {
    setAllQuestions(allQuestions.filter((quet) =>
      quet.post_title.includes(value)
    ))
  };

  //질문하기
  const addQuestion = () => {
    if (sessionStorage.getItem('user_nickname') != null) {
      document.location.href = '/write';
    } else{
      alert("로그인 후 이용해주세요.")
      document.location.href = '/Login';
    }
  }

  return (
    <MainContainer>

      <SideBar>
        <Link to='/' style={{color:"#ffffff"}}>Home<RocketOutlined /></Link>
        <br></br><br></br><br></br>
        <Link to='/postView/7' style={{color:"#ffffff"}}>Question<RocketOutlined /></Link>
      </SideBar>

      <Content>
        <SearchDiv>
          <table width="100%" >
            <tr></tr>
            <tr align="center">
              <td width="870px">
                <Space direction="vertical" style={{marginTop: "2.5%"}}>
                  <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    style={{
                      width: 600
                    }}
                  />
                </Space>
              </td>
              <td align="center" style={{ paddingBottom: "16px" }}>
                <Link to='/write'><Button type="primary" size="large" style={{ borderColor: "#9e67a3", backgroundColor: "#9e67a3", color: "#ffffff"}}>Ask Question</Button></Link>
              </td>
            </tr>
          </table>
        </SearchDiv>

                    {asd ? true : null}
                    {asd && asdasd1}
        {allQuestions &&
        <div>
          {
            allQuestions.map((a, i) => {
              return <PostCard items={allQuestions[i]} />
            })
          }
        </div>}

      </Content>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
`
const SideBar = styled.div`
  float: left;
  width: 15%;
  height: 130vw;
  padding: 3% 0 0 3%;
  border-color: #A6D1E6;
  background-color: #A6D1E6;
  font-size: large;
`;

const Content = styled.div`
  float: left;
  width: 85%;
  border-right: 1px solid black;
  border-color: #f0f0f0;
`

const SearchDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-color: #f0f0f0;
  font-size: 35px;
`
