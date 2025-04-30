import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

export default function ViewPostedJobsScreen() {
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };
    fetchJobs();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.heading}>All Job Posts</Text>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("JobApplications", { jobId: item.id, jobTitle: item.title })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.company}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: "#f1f1f1", marginBottom: 10, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: "gray" }
});
