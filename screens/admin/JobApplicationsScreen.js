import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Linking } from 'react-native';

export default function JobApplicationsScreen({ route }) {
  const { jobId, jobTitle } = route.params;
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const q = query(collection(db, 'applications'), where("jobId", "==", jobId));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    setApplications(data);
  };

  const updateStatus = async (docId, newStatus) => {
    try {
      const ref = doc(db, 'applications', docId);
      await updateDoc(ref, { status: newStatus });
      alert(`Status updated to ${newStatus}`);
      // Refresh applications
      fetchApplications();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.heading}>Applications for {jobTitle}</Text>
      {applications.length === 0 ? (
        <Text>No applications yet.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.docId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text>{item.applicantEmail}</Text>
              {item.note && <Text>📝 {item.note}</Text>}
              {item.resumeURL && (
                <Text
                  style={{ color: 'blue' }}
                  onPress={() => Linking.openURL(item.resumeURL)}
                >
                  📄 View Resume
                </Text>
              )}
              <Text style={{ marginTop: 5 }}>Status: {item.status || "Pending"}</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Button
                  title="Accept"
                  color="green"
                  onPress={() => updateStatus(item.docId, "Accepted")}
                />
                <View style={{ width: 10 }} />
                <Button
                  title="Reject"
                  color="red"
                  onPress={() => updateStatus(item.docId, "Rejected")}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: "#e6f0ff", borderRadius: 10, marginVertical: 8 },
  name: { fontWeight: 'bold', fontSize: 16 }
});
