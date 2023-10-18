import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';


// import * as ImagePicker from 'expo-image-picker';

import  decode  from '@tensorflow/tfjs-core';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';



async function loadModel() {
  const model = await mobilenet.load();
  return model;
}

loadModel().then(model => {
  console.log('Model loaded');
  // You can use the model here.
  // For example: const predictions = await model.classify(image);
 });


export default function App() {

  return (
    <>
    
    </>
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
