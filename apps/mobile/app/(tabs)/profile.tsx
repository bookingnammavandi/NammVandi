import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MobileProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>Gokul Seenuvasan</Text>
        <Text style={styles.meta}>+91 98765 43210</Text>
        <Text style={styles.meta}>gokulseenuvasan31@gmail.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  content: { padding: 16 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  name: { color: '#ffffff', fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  meta: { color: '#94a3b8', fontSize: 13, marginTop: 2 },
});
