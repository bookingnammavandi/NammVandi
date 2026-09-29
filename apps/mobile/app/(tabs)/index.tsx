import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function MobileHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Banner */}
      <View style={styles.heroCard}>
        <Text style={styles.heroBadge}>South India Relocation</Text>
        <Text style={styles.heroTitle}>Move Anything. Move Anywhere.</Text>
        <Text style={styles.heroSub}>
          House shifting, office relocation, bike & car carrier with verified drivers.
        </Text>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push('/booking-wizard')}
        >
          <Text style={styles.bookButtonText}>🚚 Book a Move Now</Text>
        </TouchableOpacity>
      </View>

      {/* Services Grid */}
      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.grid}>
        <View style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🏠</Text>
          <Text style={styles.serviceTitle}>House Shift</Text>
          <Text style={styles.serviceDesc}>1BHK to 5BHK relocation</Text>
        </View>

        <View style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🏢</Text>
          <Text style={styles.serviceTitle}>Office Move</Text>
          <Text style={styles.serviceDesc}>Commercial & IT desks</Text>
        </View>

        <View style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🏍️</Text>
          <Text style={styles.serviceTitle}>Bike Transport</Text>
          <Text style={styles.serviceDesc}>Door-to-door two wheeler</Text>
        </View>

        <View style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🚗</Text>
          <Text style={styles.serviceTitle}>Car Carrier</Text>
          <Text style={styles.serviceDesc}>Enclosed automobile container</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  content: { padding: 16 },
  heroCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  heroBadge: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  heroSub: { fontSize: 13, color: '#94a3b8', lineHeight: 18, marginBottom: 20 },
  bookButton: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  bookButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  serviceCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  serviceIcon: { fontSize: 28, marginBottom: 8 },
  serviceTitle: { fontSize: 14, fontWeight: 'bold', color: '#ffffff' },
  serviceDesc: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
});
