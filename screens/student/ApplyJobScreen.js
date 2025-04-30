import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase/config';

export default function ApplyJobScreen({ route, navigation }) {
  const { job } = route.params;
  const user = auth.currentUser;

  const [fullName, setFullName] = useState('');
  const [note, setNote] = useState('');
  const [resumeURL, setResumeURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

    if (result.type === 'success') {
      setUploading(true);
      const file = await fetch(result.uri).then(res => res.blob());
      const filename = `resumes/${user.uid}_${Date.now()}.pdf`;

      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setResumeURL(downloadURL);
      setUploading(false);
      alert("Resume uploaded successfully!");
    }
  };

  const handleApply = async () => {
    if (!fullName) return alert("Name is required");

    try {
      await addDoc(collection(db, 'applications'), {
        jobId: job.id,
        jobTitle: job.title,
        applicantId: user.uid,
        applicantEmail: user.email,
        fullName,
        note,
        resumeURL,
        appliedAt: serverTimestamp()
      });

      alert("Application submitted!");
      navigation.goBack();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apply for {job.title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Why are you a good fit? (Optional)"
        value={note}
        onChangeText={setNote}
        multiline
      />
      <Button title="Upload Resume (PDF)" onPress={pickResume} />
      {resumeURL && <Text style={{ color: "green" }}>✅ Resume Uploaded</Text>}
      {uploading && <Text>Uploading...</Text>}
      <Button title="Submit Application" onPress={handleApply} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  }
});

