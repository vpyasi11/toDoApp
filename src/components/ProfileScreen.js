import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [access_token,setAccessToken] = useState('')
  const [userDetails, setUserDetails] = useState({});

  // Hint: Create a function to fetch user details using the access_token
  const fetchUserDetails = async () => {
    try {
        AsyncStorage.getItem('access_token')
  .then(value => {
    if (value !== null) {
      setAccessToken(value)
    } else {
      console.log('No data with that key.');
    }
  })
  .catch(error => {
    console.error('Error retrieving data:', error);
  });
     
  // const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
  //   headers: {
  //     Authorization: `Bearer ${access_token}`
  //   }
    
  // });
  



    } catch (error) {
      throw new Error(error)
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('access_token')
  .then(() => {
    console.log('Data removed successfully.');
  })
  .catch(error => {
    console.error('Error removing data:', error);
  });

  AsyncStorage.removeItem('refresh_token')
  .then(() => {
    console.log('Data removed successfully.');
  })
  .catch(error => {
    console.error('Error removing data:', error);
  });
    navigation.navigate('Login')
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <View>
      <Text>Profile Page</Text>
      <Text>Name: {userDetails.name}</Text>
      {/* Hint: Display user details such as name, email, etc. */}
      <Text>Email: {userDetails.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
