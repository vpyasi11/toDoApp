import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleSignup = () => {
    // Implement user registration logic here. You can store the user data locally or using a database.

    // For simplicity, this example uses local storage.
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists.
    const isUserExists = existingUsers.some((user) => user.username === username);

    if (isUserExists) {
      setSignupError('Username already exists.');
    } else {
      // Store the new user.
      const newUser = { username, password };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      navigation.navigate('Login');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={{ color: 'red' }}>{signupError}</Text>
    </View>
  );
};

export default SignupScreen;
