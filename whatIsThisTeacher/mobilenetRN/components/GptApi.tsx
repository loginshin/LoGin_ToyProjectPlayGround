import React from "react";
import { StyleSheet, Text, View,Image, ActivityIndicator , ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

// import axios from 'axios';

import config from '../config';
import {styles} from '../styles'; 

export default function GptApi({ text }) {

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