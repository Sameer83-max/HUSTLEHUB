import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import JobCard from '../../components/JobCard';

export default function StudentHome({ navigation }) {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const jobCollection = collection(db, "jobs");
    const jobSnapshot = await getDocs(jobCollection);
    const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to HustleHub 🎓</Text>
      <Button
        title="My Applications"
        onPress={() => navigation.navigate("MyApplications")} // New Button
      />
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <JobCard job={item} />
            <Button
              title="Apply"
              onPress={() => navigation.navigate("ApplyJob", { job: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});