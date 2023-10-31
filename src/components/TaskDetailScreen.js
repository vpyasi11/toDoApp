import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task, editTask } = route.params;
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveChanges = () => {
    const updatedTask = {
      id: task.id,
      title: editedTitle,
      description: editedDescription
    }
    editTask(updatedTask)
    navigation.navigate('TodoList', {updatedTask});
  };

  return (
    <View>
      <TextInput
        value={editedTitle}
        onChangeText={(e)=>setEditedTitle(e)}
      />
      <TextInput
        value={editedDescription}
        onChangeText={(e)=>setEditedDescription(e)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default TaskDetailScreen;
