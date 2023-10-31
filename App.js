import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button } from 'react-native';
import LoginScreen from './src/components/LoginScreen';
import TodoListScreen from './src/components/TodoListScreen';
import AddTaskScreen from './src/components/AddTaskScreen';
import TaskDetailScreen from './src/components/TaskDetailScreen';
import ProfileScreen from './src/components/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(false);

  const checkLogin= async()=>{
  
    let temp = await AsyncStorage.getItem('access_token')
    if(temp){
    setUser(true)
  } 
  checkLogin()
}
  return (
   
    <NavigationContainer>
    <Stack.Navigator initialRouteName={user ? 'TodoList' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
    
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
