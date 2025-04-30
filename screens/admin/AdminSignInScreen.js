import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const adminEmails = ["admin@hustlehub.com"]; // Add more if needed

export default function AdminSignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (adminEmails.includes(email)) {
        navigation.replace("PostJob");
      } else {
        alert("Access Denied. Not an admin.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Admin Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Admin Sign In" onPress={handleAdminLogin} />
    </View>
  );
}
