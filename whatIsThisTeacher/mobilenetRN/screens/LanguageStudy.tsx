import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import config from '../config';
import {styles} from '../styles'; 

export default function LanguageStudy({ route }){
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false); //Loading ani
    const [translatedText, setTranslatedText] = useState('');

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
        </View>
    )
}