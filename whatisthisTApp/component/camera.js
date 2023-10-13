import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraButton = () => {
  const handleCameraPress = async () => {
    // 카메라 기능을 실행하는 로직 작성
    try {
      const cameraPermission = await RNCamera.requestCameraPermission();
      if (cameraPermission) {
        // 카메라 기능 실행 코드 작성
        console.log('카메라가 실행됩니다.');
      }
    } catch (error) {
      console.log('카메라 권한 요청 에러:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleCameraPress}>
      <Text>카메라 켜기</Text>
    </TouchableOpacity>
  );
};

export default CameraButton;
