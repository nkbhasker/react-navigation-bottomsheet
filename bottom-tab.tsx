import React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheetProvider, { RenderComponet, useBottomSheet } from './bottomsheet-provider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  const bottomsheet = useBottomSheet();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        title="Open Home Bottom Sheet"
        onPress={() => bottomsheet({ renderComponent: RenderComponet.HOME })}
      />
    </View>
  );
}

function SettingsScreen() {
  const bottomsheet = useBottomSheet();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'papayawhip',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        title="Open Settings Bottom Sheet"
        onPress={() => bottomsheet({ renderComponent: RenderComponet.SETTINGS })}
      />
    </View>
  );
}

const BottomTab: React.FC = () => {
  return (
    <BottomSheetProvider>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </BottomSheetProvider>
  );
}

const Main: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Main;