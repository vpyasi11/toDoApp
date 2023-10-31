import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddTaskScreen = ({ route, navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const {length} = route.params
  const { addTask } = route.params;
 
 
  const handleAddTask = () => {
  
    const newTask = {id:length+1, title, description };
    
    addTask(newTask);

    navigation.navigate('TodoList');
  };

  return (
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={(e)=>setTitle(e)}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={(e)=>setDescription(e)}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTaskScreen;
