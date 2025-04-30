import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

export default function MyApplicationsScreen() {
  const [applications, setApplications] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMyApplications = async () => {
      const q = query(
        collection(db, 'applications'),
        where("applicantId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setApplications(data);
    };

    if (user?.uid) fetchMyApplications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Applications</Text>
      {applications.length === 0 ? (
        <Text>No applications found.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.jobTitle}</Text>
              <Text style={styles.email}>{item.applicantEmail}</Text>
              {item.note && <Text style={styles.note}>📝 {item.note}</Text>}
              <Text style={styles.status}>Status: {item.status || "Pending"}</Text> {/* Dynamic status */}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  email: { color: 'gray' },
  note: { marginTop: 5, fontStyle: 'italic' },
  status: { marginTop: 10, color: 'green', fontWeight: '600' }
});
