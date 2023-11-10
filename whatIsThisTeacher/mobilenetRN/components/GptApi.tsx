import React from "react";
import { StyleSheet, Text, View,Image, ActivityIndicator , ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

// import axios from 'axios';

import config from '../config';
import {styles} from '../styles'; 



export default function GptApi({ text }) {

//  gpt 요청하기




const testTurbo = () => {
        const data = JSON.stringify({
            "model" : "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": ""},
                {"role": "user", "content": text}
            ]
        });

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization' : 'Bearer '+config.GPT_SECRET_KEY,
            },
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            if (data.choices && data.choices.length > 0) {
                setResponse(data.choices[0].message.content);
                console.log(data.choices[0].message.content);
            } else { 
                console.error("No choices returned from API");
                setResponse("");
            }
        })
        .catch(error => console.error(error));
    }






// =========================

    const exObject = [
        { "english" : "Could I get a beer glass, please?", "korean" : "맥주잔 좀 받을 수 있을까요?" },
        { "english" : "This beer glass is dirty. Could I have another one?", "korean" : "이 맥주잔이 더러워요. 다른 걸로 바꿀 수 있을까요?" },
        { "english" : "I accidentally broke the beer glass.", "korean" : "제가 실수로 맥주잔을 깨버렸어요." },
        { "english" : "Can you refill my beer glass?",  "korean": '제 맥주잔 다시 채워 주실래요?' },
        { 'english': 'How much is this beer glass?' , "korean": '이 맥주잔 얼마예요?' }
    ]

    const joystickObject = [
        { "english": "Move to the left.", "korean": "왼쪽으로 움직여." },
        { "english": "Watch out for the enemy on the right.", 
            "korean": "오른쪽의 적을 조심해." },
        { "english": "Can you cover me while I reload?", 
            "korean": '나 재장전하는 동안 커버해줄래?' },
        { "english":"We need to defend this area.",
            'korean':'우리는 이 지역을 방어해야 해.'},
        {"english":"Let's attack together.","korean":"함께 공격하자."},
    ];

    const [response,setResponse] = useState();


        useEffect(() => {
            console.log("gpt에게 전달할 값은 , " , text);
            testTurbo();
        },[] )


    return(
        <View>
            {
                <View >
                    <ScrollView>
                        {
                            text === 'joystick' ?
                                joystickObject.map((ex,index) => (
                                    <View key={index} style={styles.exObjectView}>
                                        <Text style={styles.exObjectText}>{ex.english}</Text>
                                        <Text style={styles.exObjectText}>{ex.korean}</Text>
                                    </View>
                                ))
                                :
                                exObject.map((ex,index) => (
                                    <View key={index} style={styles.exObjectView}>
                                        <Text style={styles.exObjectText}>{ex.english}</Text>
                                        <Text style={styles.exObjectText}>{ex.korean}</Text>
                                    </View>
                                ))
                        }



                        {/* ========================== */}
                        <View>
                            { response &&
                                <Text style={styles.exObjectText}>{response}</Text>
                            }
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    );
}


//  code 보관소



// export const testDavinci = (question) => {
//     const data = JSON.stringify({
//         "model" : "text-davinci-003",
//         "prompt" : question,
//         "max_tokens" : 500,
//         "temperature" : 0,
//         "top_p" : 1,
//         "stream" : false,
//         "frequency_penalty" : 0,
//         "presence_penalty" : 0,
//         "logprobs" : null
//     });

//     return fetch('https://api.openai.com/v1/completions', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//                 'Authorization' : 'Bearer '+config.GPT_SECRET_KEY,
//             },
//             body: data,
//     }).then(response => response.json());

// }


// String을 Json형식으로 변환
// let jsonString = '{"english":"Hello, world!", "korean":"안녕, 세상!"}';
// let jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);  // { english: 'Hello, world!', korean: '안녕, 세상!' }


    // // 비동기 작업을 수행하는 별도의 함수 선언
    // const fetchCompletion = async () => {
    //     try {
    //         const completion = await openai.createCompletion({
    //             model: "text-davinci-003",
    //             prompt: "say Hello world",
    //         });
    //         console.log(completion.data.choices[0].text);
    //         setResponse(completion.data.choices[0].text); // 결과를 상태에 저장
    //     } catch (error) {
    //         console.error(error);
    //     }
    //  };



// import openai from 'openai';

// // OpenAI API 인증 정보 설정
// const openaiInstance = new openai.OpenAIApi('YOUR_API_KEY');

// // 텍스트 생성 요청 함수
// async function generateText() {
//   const prompt = '예시 문장입니다.';
//   const response = await openaiInstance.complete({
//     engine: 'davinci', // 언어 모델 선택 (davinci 또는 curie)
//     prompt: prompt,
//     maxTokens: 100, // 생성할 최대 토큰 수
//     temperature: 0.7, // 다양성 조절 (낮은 값일수록 보수적인 답변)
//     n: 1, // 반환할 답변의 개수
//     stop: '\n', // 생성 중단 문자열 (선택 사항)
//   });

//   const generatedText = response.choices[0].text.trim();
  
//   console.log(generatedText);
// }

// // 함수 호출 예시
// generateText();











// try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt,
//         max_tokens: 60,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${'your_openai_api_key'}`,
//         },
//       }
//     );

//     return response.data.choices[0].text;
// } catch (error) {
//     console.error(error);
//   }

// const prompt = text;
// const apiKey = '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';
// const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${apiKey}`,
// };

// const data = {
//   prompt: prompt,
//   max_tokens: 1024,
//   temperature: 0.7,
// };

// try {
//   let responseJsonData = await fetch(url, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(data),
//   });

//   let resultData = await responseJsonData.json();

//   if (resultData && resultData.choices && resultData.choices.length > 0) {
//     setResponse(resultData.choices[0].text);
//     console.log(resultData.choices[0].text);
    
//    } else { 
//      console.error("No choices returned from API");
//      setResponse("");
//    }
   
//  } catch (error) {
//    console.error(error);
//  }
// };