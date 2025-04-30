import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JobCard({ job }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.location}>📍 {job.location}</Text>
      <Text style={styles.description}>{job.description}</Text>
      <Button
        title="Apply"
        onPress={() => navigation.navigate("ApplyJob", { job })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#f2f2f2", padding: 15, marginVertical: 10, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  company: { fontSize: 16, color: 'gray' },
  location: { marginVertical: 4 },
  description: { marginBottom: 10 }
});

