import axios from "axios";
import React, { useState } from "react";

function Regist() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    let check = false;

    const handleInputId = (e) => {
        setInputId(e.target.value);
        axios.get("http://localhost:8080/checkUserId",{
            params:{
                "id": inputId
            }
        },
        { withCredintials: true}
        )
        .then(res => {
            console.log(res.data);
            if(res.data == false){
                check=false;
            } else {
                check=true;
            }
            console.log(check);
        })
        .catch()
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        console.log("click login");
        axios.post('http://localhost:8080/signupUser', 
        {
            "userId": inputId,
            "pw": inputPw
        },
        { withCredintials: true}
        )
        .then(res => {
            console.log(res.data);
            if(res.data == true){
                alert("Success sign up!");
            }
        })
        .catch(error => console.log(error))
    }

    // const onClickIdCheck = () => {
        // console.log("checkID");
        // axios.get("http://localhost:8080/checkUserId",{
        //     params:{
        //         "id": inputId
        //     }
        // },
        // { withCredintials: true}
        // )
        // .then(res => {
        //     console.log(res.data);
        //     if(res.data == false){
        //         alert("Do not use Id");
        //     } else {
        //         alert("Can use Id")
        //     }
        // })
        // .catch()
    // }

    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="input_id">ID: </label>
                <input type="text" name="input_id" value={inputId} onChange={handleInputId}/>
            </div>
            <div>
                <label htmlFor="input_pw">PW: </label>
                <input type="password" name="input_pw" value={inputPw} onChange={handleInputPw}/>
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>sign up</button>
            </div>
        </div>
    );
}

export default Regist;