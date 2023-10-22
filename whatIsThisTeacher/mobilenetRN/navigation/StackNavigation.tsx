import React from 'react';

import { createStackNavigator,TransitionPresets  } from '@react-navigation/stack';
import Home from '../screens/Home';
import LanguageStudy from '../screens/LanguageStudy';
import PatternStudy from '../screens/PatternStudy';

const Stack = createStackNavigator();

const StackNavigation =() => {
    return(
        <Stack.Navigator
        initialRouteName='Home'
        >
            <Stack.Screen
            name="Home"
            options={{ headerShown: false}}
            component={Home}
            />
            <Stack.Screen
            name="LanguageStudy"
            options={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal-inverted',
                headerStyle:{
                    backgroundColor:'#171717'
                },
                headerTintColor:'#fff',
                headerTitleStyle: {
                    fontWeight:'bold',
                }
             }}
            component={LanguageStudy}
            />
            <Stack.Screen
            name="PatternStudy"
            options={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                headerStyle:{
                    backgroundColor:'#171717'
                },
                headerTintColor:'#fff',
                headerTitleStyle: {
                    fontWeight:'bold',
                }
             }}
            component={PatternStudy}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation;