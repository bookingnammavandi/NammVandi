import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MobileBookingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.bookingNumber}>NM-20261012-0001</Text>
          <Text style={styles.badge}>Assigned</Text>
        </View>
        <Text style={styles.route}>Chennai ➔ Coimbatore</Text>
        <Text style={styles.meta}>12 Oct 2026 • 10:00 AM • Eicher Tempo</Text>
        <View style={styles.driverBox}>
          <Text style={styles.driverText}>Driver: Rajesh Kumar (TN 01 AB 1234)</Text>
          <Text style={styles.driverPhone}>Contact: +91 98765 12345</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  content: { padding: 16 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#334155' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  bookingNumber: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  badge: { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontSize: 11, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  route: { color: '#f97316', fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  meta: { color: '#94a3b8', fontSize: 12, marginBottom: 12 },
  driverBox: { backgroundColor: '#0f172a', padding: 12, borderRadius: 12 },
  driverText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
  driverPhone: { color: '#38bdf8', fontSize: 12, marginTop: 2 },
});
