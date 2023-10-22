import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator , ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import config from '../config';
import {styles} from '../styles'; 

export default function LanguageStudy({ route }){
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false); //Loading ani
    const [translatedText, setTranslatedText] = useState('');

    const exObject = [
        { "english" : "Could I get a beer glass, please?", "korean" : "맥주잔 좀 받을 수 있을까요?" },
        { "english" : "This beer glass is dirty. Could I have another one?", "korean" : "이 맥주잔이 더러워요. 다른 걸로 바꿀 수 있을까요?" },
        { "english" : "I accidentally broke the beer glass.", "korean" : "제가 실수로 맥주잔을 깨버렸어요." },
        { "english" : "Can you refill my beer glass?",  "korean": '제 맥주잔 다시 채워 주실래요?' },
        { 'english': 'How much is this beer glass?' , "korean": '이 맥주잔 얼마예요?' }
    ]
    

    useEffect(() => {
        setIsLoading(true);

        const originalText = route.params.data;

        if(originalText) {
            translateText(originalText)
        }

        setIsLoading(false);
        console.log("routeparamsdata is : ",route.params.data);

    }, [route])

    const translateText = async (originalText:string) => {
        try {
            console.log("text in trans late Text func  : " , originalText);
            const response = await axios.post(
                'https://openapi.naver.com/v1/papago/n2mt',
                null,
                {
                params: {
                    source: 'en',
                    target: 'ko',
                    text: originalText,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Naver-Client-Id': config.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': config.NAVER_CLIENT_SECRET,
                    "Content-Length":51
                },
                }
            );
            setIsLoading(false);
            setTranslatedText(response.data.message.result.translatedText);
            console.log(response.data.message.result.translatedText);
            console.log(translatedText);
        } catch (error) {
        console.error(error);
        if (error.response) { // 서버로부터의 응답이 있는 경우
            console.error('Response data:', error.response.data); // 서버로부터 받은 데이터
            console.error('Response status:', error.response.status); // HTTP 상태 코드
            console.error('Response headers:', error.response.headers); // HTTP 헤더
            } else if (error.request) { // 요청이 만들어졌으나, 응답을 받지 못한 경우 
            console.error('Request:', error.request);
            }
        }
    };

    return(
        <View style={styles.container}>
            {translatedText &&
                <Text style={styles.resultsText}>
                    {translatedText}
                </Text>
            }
            {
                exObject &&
                <View >
                    <ScrollView>
                        {
                            exObject &&
                                exObject.map((ex,index) => (
                                    <View key={index} style={styles.exObjectView}>
                                        <Text style={styles.exObjectText}>{ex.english}</Text>
                                        <Text style={styles.exObjectText}>{ex.korean}</Text>
                                    </View>
                                ))
                        }
                            </ScrollView>
                </View>
            }
        </View>
    )
}