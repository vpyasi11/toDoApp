import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [access_token,setAccessToken] = useState('')
  const [refresh_token, setRefreshToken] = useState('')

  const handleLogin = async () => {
    try{
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
    email: 'john@mail.com',
    password: 'changeme'
});
      
      setAccessToken(response.data.access_token); 
      setRefreshToken(response.data.refresh_token);

      
      
      AsyncStorage.setItem('access_token', access_token)
        .then(() => {
          console.log('Data stored successfully.');
        })
        .catch(error => {
          console.error('Error storing data:', error);
        });
      AsyncStorage.setItem('refresh_token', refresh_token)
        .then(() => {
          console.log('Data stored successfully.');
        })
        .catch(error => {
          console.error('Error storing data:', error);
        });

    }
    catch(err){
      throw new Error("something went wrong")
    }
    navigation.navigate('TodoList', access_token);
  };


  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(e)=>setUsername(e)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(e)=>setPassword(e)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={{ color: 'red' }}>{loginError}</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
