import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as tensorflow from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as FileSystem from 'expo-file-system';

import {Button} from './components/Button';

import {styles} from './styles';

export default function App() {
  const [ selectedImageUri, setSelectedImageUri ] = useState('');
  const [isLoading,setIsLoading] = useState(false);

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
  async function imageClassification(imageUri: string){
    await tensorflow.ready();
    const model = await mobilenet.load();

    const imageBase64 = await FileSystem.readAsStringAsync(imageUri)
  }

  return (
    <View style={styles.container}>
      
      <StatusBar 
      style="light"
      backgroundColor='transparent'
      translucent
      />

      {/* state저장 이미지 표시 */}
      {/* 이미지 paceholder if문사용*/}
      <Image
      source={{ uri: selectedImageUri ? selectedImageUri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTGUFUPs1xpgBwZsWNX18TOFpJFC67j7uGw&usqp=CAU'}}
      style = {styles.image}
      />

      
      <View style={styles.results}>

      </View>
      {
        isLoading
        ? <ActivityIndicator color="#5f1bbf"/>
        : <Button title = "Selecionar imagem" onPress={handleSelectImage}></Button>
      }
      
      
    </View>
  );
}
