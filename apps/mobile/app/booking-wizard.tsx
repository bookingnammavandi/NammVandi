import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function MobileBookingWizard() {
  const router = useRouter();
  const [pickupCity, setPickupCity] = useState('Chennai');
  const [dropCity, setDropCity] = useState('Coimbatore');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleBook = () => {
    const ref = `NM-20261012-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.successBadge}>✅ Booking Confirmed</Text>
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.refCode}>{bookingRef}</Text>
          <Text style={styles.subText}>NammaVandi team will contact you shortly to confirm your move schedule.</Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)/bookings')}>
            <Text style={styles.btnText}>View My Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.label}>Pickup City</Text>
        <TextInput style={styles.input} value={pickupCity} onChangeText={setPickupCity} />

        <Text style={styles.label}>Drop City</Text>
        <TextInput style={styles.input} value={dropCity} onChangeText={setDropCity} />

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={customerName} onChangeText={setCustomerName} placeholder="Gokul" placeholderTextColor="#64748b" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={customerPhone} onChangeText={setCustomerPhone} placeholder="9876543210" placeholderTextColor="#64748b" keyboardType="phone-pad" />

        <TouchableOpacity style={styles.btn} onPress={handleBook}>
          <Text style={styles.btnText}>Confirm & Generate Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  content: { padding: 16 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#cbd5e1', fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#0f172a', borderRadius: 12, padding: 12, color: '#ffffff', fontSize: 14, borderWidth: 1, borderColor: '#334155' },
  btn: { backgroundColor: '#f97316', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  successBadge: { color: '#10b981', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  title: { color: '#ffffff', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginTop: 8 },
  refCode: { color: '#f97316', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginVertical: 12 },
  subText: { color: '#94a3b8', fontSize: 12, textAlign: 'center', marginBottom: 20 },
});
