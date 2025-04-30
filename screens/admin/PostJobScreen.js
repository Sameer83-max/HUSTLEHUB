import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function PostJobScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handlePostJob = async () => {
    try {
      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        description,
        postedAt: serverTimestamp()
      });
      alert("Job posted successfully");
      setTitle(""); setCompany(""); setLocation(""); setDescription("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Job Title</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Company</Text>
      <TextInput value={company} onChangeText={setCompany} />
      <Text>Location</Text>
      <TextInput value={location} onChangeText={setLocation} />
      <Text>Description</Text>
      <TextInput multiline value={description} onChangeText={setDescription} />
      <Button title="Post Job" onPress={handlePostJob} />
      <Button title="View All Applications" onPress={() => navigation.navigate("ViewPostedJobs")} /> {/* New Button */}
    </View>
  );
}
