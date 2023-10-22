import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import {styles} from '../styles'; 
import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';


export default function PatternStudy({ route }){
    const navigation = useNavigation();
    const [resultText,setResultText] = useState("");
    const [isLoading,setIsLoading] = useState(false); //Loading ani
    const [images, setImages] = useState([]);
    const ACCESS_KEY = config.UNSPLASH_CLIENT_SECRET;

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
                'https://api.unsplash.com/search/photos',
                {
                params: {
                    query: resultText,
                    per_page:5
                },
                headers: {
                    Authorization :`Client-ID ${ACCESS_KEY}`
                }
                }
            );
            setImages(response.data.results);
            setIsLoading(false);
            } catch (error) {
            console.error(error);
            }
        };


    return(
            <View style={styles.container}>
                <ScrollView>
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
            </ScrollView>
        </View>
    )
}