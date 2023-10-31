import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const TodoListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([{id:1,title:"test",description:"test"}])
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const refresh_token = AsyncStorage.getItem('refresh_token')
    if(refresh_token){
    loadTasks();
    }
    else{
      navigation.navigate('Login')
    }
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await AsyncStorage.getItem('tasks');
      if (tasksData) {
        // Parse the data into an array
        const parsedTasks = JSON.parse(tasksData);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {

    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    try {
      // Convert the tasks array to a JSON string and save it to AsyncStorage
      const tasksData = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', tasksData);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleMarkComplete=(task)=>{
    
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
  };
  

  const handleDeleteTask=(taskToRemove)=>{
     setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToRemove));
  }
  
  const addTask = (newTask) => {
    
    setTasks([...tasks, newTask]);
  };
  
  const editTask = (updatedTask)=>{
    const updatedTasks = tasks.map((task)=>
      task.id === updatedTask.id ? updatedTask : task
    )
    setTasks(updatedTasks);
  }




  return (
    <ScrollView >
      <View style={styles.container}>
      <Text>To-Do List:</Text>
   
      {tasks.map((task) => (
        <View key={task.id}>
          <Text style={task.completed ? { textDecorationLine: 'line-through' } : {fontWeight:"bold"}}>
            {task.title}
          </Text>
          <Text style={task.completed ? { color:"gray" } : {color:"gray"}}>
            {task.description}
          </Text>
          <View style={styles.buttons}>
          <Button
            title="Edit"
            onPress={() => navigation.navigate('TaskDetail', { editTask, task})}
          />
          <Button
            title="Mark as Complete"
            onPress={() => handleMarkComplete(task)}
          />
          <Button
            title="Delete"
            onPress={() => handleDeleteTask(task)}
          />
          </View>
        </View>
      ))}
   
      {completedTasks.length !=0 ? <Text style={{fontWeight:"bold"}}>Completed Tasks</Text>: null}
      
      {completedTasks.map((task) => (
        <View key={task.id}>
          <Text style={{ textDecorationLine: 'line-through' }}>
            {task.title}
          </Text>
          
        </View>
      ))}
      <Button title="Add New Task" onPress={() => navigation.navigate('AddTask', { addTask , length:tasks.length  })} />
      </View>
      <Button title='Profile' onPress={()=> navigation.navigate('Profile')}/>
    </ScrollView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  }
});