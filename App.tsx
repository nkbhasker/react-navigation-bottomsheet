import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './bottom-tab';


export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}