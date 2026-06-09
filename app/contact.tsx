import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

export default function ContactScreen() {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Błąd', 'Nie można otworzyć tego linku.');
      }
    } catch {
      Alert.alert('Błąd', 'Wystąpił problem z otwarciem linku.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Kontakt</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>E-mail</Text>
          <Text style={styles.contactValue}>artemsemenkoo@gmail.com</Text>

          <Text style={styles.sectionTitle}>Telefon</Text>
          <Text style={styles.contactValue}>+48 578 607 666</Text>

          <Text style={styles.sectionTitle}>GitHub</Text>
          <Text style={styles.contactValue}>github.com/artemiydrg</Text>

          <Text style={styles.sectionTitle}>Lokalizacja</Text>
          <Text style={styles.contactValue}>Polska</Text>

          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => openLink('mailto:artemsemenkoo@gmail.com')}
          >
            <Text style={styles.buttonText}>Wyślij e-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDark}
            onPress={() => openLink('https://github.com/artemiydrg')}
          >
            <Text style={styles.buttonText}>Otwórz GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={() => openLink('tel:+48578607666')}
          >
            <Text style={styles.buttonText}>Zadzwoń</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eeff' },
  scrollContent: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#3b3486',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C63FF',
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 15,
    color: '#1a1a2e',
    marginBottom: 4,
  },
  buttonBlue: {
    marginTop: 24,
    backgroundColor: '#6C63FF',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDark: {
    marginTop: 10,
    backgroundColor: '#1a1a2e',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGreen: {
    marginTop: 10,
    backgroundColor: '#10b981',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});