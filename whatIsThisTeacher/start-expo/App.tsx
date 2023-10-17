import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';


//TensorFlow.js 모델로드
async function loadModel(){
  const model = await mobilenet.load();
  return model;
}

//이미지 분류 함수 작성: 이미지를 입력받아 객체 인식 결과를 반환하는 함수를 작성
// 이미지 텐서화 // 모델에 이미지 전달하여 예측 수행 // 결과 반환
// async function classifyImage(image : HTMLImageElement, model : mobilenet.MobileNet){
//   const img = tf.browser.fromPixels(image);
//   const resizedImg = tf.image.resizeBilinear(img, [224, 224]);
//   const batchedImg = resizedImg.expandDims(0);

//   const predictions = await model.classify(batchedImg) as mobilenet.ClassificationResult[];

//   return predictions;
// }
const classifyImage = async (imgUri: string => {
  try{
    const imgBuffer = await FileSystem.readAsStringAsync(imgUri,{
      encoding: FileSystem.EncodingType.Base64,
    });
  }
})


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
