import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as tensorflow from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg } from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';

import {Button} from '../components/Button';

import {styles} from '../styles';

export default function Home() {
  const navigation = useNavigation();
  const [ selectedImageUri, setSelectedImageUri ] = useState(''); //이미지 null → 표시사진
  const [isLoading,setIsLoading] = useState(false); //Loading ani
  const [result,setResult] = useState(); //Image → mobilenet → result.Json


  //값확인
  useEffect(() => {
    console.log("result state is",result);
  }, [result]);

  //이미지 선택 기능, 활동 표시기
  async function handleSelectImage(){
    setIsLoading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // only image view
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
      })

      //이미지 선택 취소하고 돌아왔을 때
      if(!result.canceled){
        const { uri } = result.assets[0];
        setSelectedImageUri(uri);
        await imageClassification(uri);
      }

    } catch (error){
      console.log("handleSelectImage Error : ",error);
    } finally{
      setIsLoading( false );
    }
    
  }

  // 이미지 분류 처리
  //Tensorlflow 모델 로드
  // image → mobilenet → result return
  async function imageClassification(imageUri: string){
    await tensorflow.ready();
    const model = await mobilenet.load();

    const imageBase64 = await FileSystem.readAsStringAsync(imageUri,{
      encoding: FileSystem.EncodingType.Base64
    });

    const imgBuffer = tensorflow.util.encodeString(imageBase64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);

    const classificationResult = await model.classify(imageTensor);
    // console.log(classificationResult);

    //확률 예외처리 하기 ↓↓↓
    setResult(classificationResult);
  }

  return (
    <View style={styles.container}>
      <StatusBar 
      style="light"
      backgroundColor='transparent'
      translucent
      />
      {/* state저장 이미지 표시 */}
      {/* 이미지 paceholder / if문사용*/}
      <Image
      source={{ uri: selectedImageUri ? selectedImageUri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTGUFUPs1xpgBwZsWNX18TOFpJFC67j7uGw&usqp=CAU'}}
      style = {styles.image}
      />
      
      <View style={styles.results}>
      {
        result &&
          <View style={styles.results}>
            {/* 전체 값 가지고오기 */}
            {/* {result.map((item , index) => (
              <Text key={index} style={{color:"#fff"}}>
                {item.className}
              </Text>
            ))} */}


            {/* 상단 1위만 가지고오기 */}
              <Text style={styles.resultsText}>
                {(result[0].probability * 100).toFixed(0)}% with probability
              </Text>
              <Text style={[ styles.resultsText,{fontSize:50}]}>
                {result[0].className}
              </Text>
            
            <View style={styles.navigationButtonContainer}>
              <Button title='LANGUAGE' onPress={() => navigation.navigate('LanguageStudy' , {data: result[0].className})}></Button>
              <Button title='PATTERN' onPress={() => navigation.navigate('PatternStudy' , {data: result[0].className})}></Button>
            </View>
          </View>
      }
      </View>
      {
        isLoading
        ? <ActivityIndicator color="#5f1bbf"/>
        : <Button title = "Selecionar imagem" onPress={handleSelectImage}></Button>
      }
      
      
    </View>
  );
}

