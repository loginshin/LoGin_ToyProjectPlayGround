import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  // 이미지 URI를 저장할 상태 변수
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // 갤러리에서 이미지를 선택합니다.
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

     // 사용자가 이미지 선택을 취소하지 않은 경우
    if (!result.canceled) {
      // 첫 번째 이미지의 URI를 상태 변수에 저장합니다.
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
         {/* 선택된 이미지가 있을 경우 화면에 표시합니다. */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
