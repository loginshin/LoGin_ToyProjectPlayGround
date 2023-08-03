import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import logo from "../img/rabbit.png"; //src파일에 있음
import {CommentOutlined} from "@ant-design/icons";

function MainNavigation(props) {
    const onLogout = () => {
        // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.clear();
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }

    const isLogin = props.isLogin  //App.js로부터 프로퍼티를 받아서 true,false 확인

   if(isLogin == true){
    return (
        <MainNav>
            {/* <Link to='/'><h1>일단하자</h1></Link>
            <ul>
                <Button type="primary" size="5" onClick={onLogout}>로그아웃</Button>
            </ul> */}
            <table align="center" width="1280px">
                <tr>
                    <td align="center" width="192px"><Link to='/'><img src={logo} alt="logo"></img></Link></td>
                    <td align="center"><Link to='/' style={{ color: "#000000" }}><div style={{ fontSize: "35px" }}><CommentOutlined style={{color:"#a6d1e6"}}/>301B Overflow</div></Link></td>
                    <td align="center" width="185px"><Link to='/login'> <Button type="button" style={{ borderColor: "#9e67a3", backgroundColor: "#9e67a3", color: "#ffffff" }} size="5" onClick={onLogout}>LogOut</Button></Link>
                    </td>
                </tr>
            </table>

        </MainNav>
    )
    }
        else{
        return (
            <MainNav>
                <table align="center" width="1280px">
                    <tr><td align="center" width="192px"><Link to='/'><img src={logo} alt="logo"></img></Link></td>
                        <td align="center"><Link to='/' style={{ color: "#000000" }}><div style={{ fontSize: "35px" }}><CommentOutlined style={{color:"#a6d1e6"}} /> 301B Overflow</div></Link></td>
                        <td align="left" width="85px"><Link to='/signup'><Button type="button" style={{ borderColor: "#9e67a3", backgroundColor: "#9e67a3", color: "#ffffff" }} size="5">Sign Up</Button></Link></td>
                        <td align="left" width="100px"><Link to='/login'><Button type="primary" size="5" style={{ borderColor: "#9e67a3", backgroundColor: "#9e67a3", color: "#ffffff" }}>Login</Button></Link></td></tr>
                </table>
            </MainNav>
        )
        }
}

export default MainNavigation;

const MainNav = styled.header`
    font-size: medium;
    border-bottom: 1px solid black;
    border-color: #e1e2e3;
    padding-top:0.2%;
`;