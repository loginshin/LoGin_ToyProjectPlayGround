import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import {styles} from '../styles'; 
import config from '../config';


export default function PatternStudy({ route }){
    const navigation = useNavigation();
    const [resultText,setResultText] = useState("");
    const [isLoading,setIsLoading] = useState(false); //Loading ani
    const [images, setImages] = useState([]);

    useEffect(() => {
        setResultText(route.params.data);
        setIsLoading(false);
        console.log("routeparamsdata is : ",route.params.data);
    },[route])

    

        useEffect(() => {
            fetchPhotos();
        }, [resultText]);

        //DANGER ///////demo version is 50 photos request in 1hour
        const fetchPhotos = async () => {
            try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    count: 1, 
                    query: resultText,
                    client_id: config.UNSPLASH_CLIENT_SECRET,
                },
                }
            );
            setImages(response.data);
            setIsLoading(false);
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
            {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            images.map((photo) => (
                <Image
                key={photo.id}
                source={{ uri: photo.urls.regular }}
                style={styles.image}
                />
            ))
            )}
        </View>
    )
}