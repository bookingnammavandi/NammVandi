import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MobileNotificationsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>🔔 Vehicle Assigned</Text>
        <Text style={styles.message}>
          Your vehicle TN 01 AB 1234 has been assigned. Driver Rajesh Kumar will contact you before pickup.
        </Text>
        <Text style={styles.time}>WhatsApp Notification • 24 Sep 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  content: { padding: 16 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#334155' },
  title: { color: '#ffffff', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  message: { color: '#cbd5e1', fontSize: 12, lineHeight: 18, marginBottom: 8 },
  time: { color: '#64748b', fontSize: 10 },
});
