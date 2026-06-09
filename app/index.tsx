import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [skillsText, setSkillsText] = useState(profile.skills.join(', '));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Min. 2 znaki';
    if (bio.trim().length < 10) e.bio = 'Min. 10 znaków';
    const skillsArr = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsArr.length === 0) e.skills = 'Podaj min. 1 umiejętność';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const skillsArr = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    updateProfile({ name: name.trim(), bio: bio.trim(), skills: skillsArr });
    setEditing(false);
    Alert.alert('Sukces', 'Profil został zaktualizowany!');
  };

  const handleCancel = () => {
    setName(profile.name);
    setBio(profile.bio);
    setSkillsText(profile.skills.join(', '));
    setErrors({});
    setEditing(false);
  };

  if (editing) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Edytuj profil</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Imię i nazwisko</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={name}
              onChangeText={setName}
              placeholder="Imię i nazwisko"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <Text style={styles.label}>O mnie</Text>
            <TextInput
              style={[styles.input, styles.inputMulti, errors.bio ? styles.inputError : null]}
              value={bio}
              onChangeText={setBio}
              placeholder="Krótki opis..."
              multiline
              numberOfLines={4}
            />
            {errors.bio ? <Text style={styles.errorText}>{errors.bio}</Text> : null}

            <Text style={styles.label}>Umiejętności (oddzielone przecinkami)</Text>
            <TextInput
              style={[styles.input, errors.skills ? styles.inputError : null]}
              value={skillsText}
              onChangeText={setSkillsText}
              placeholder="JavaScript, React Native, ..."
            />
            {errors.skills ? <Text style={styles.errorText}>{errors.skills}</Text> : null}

            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
              <Text style={styles.buttonText}>Zapisz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
              <Text style={styles.buttonCancelText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Portfolio Studenta</Text>
        <View style={styles.card}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.image}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.subtitle}>Informatyka, 3 rok</Text>

          <Text style={styles.sectionTitle}>O mnie</Text>
          <Text style={styles.description}>{profile.bio}</Text>

          <Text style={styles.sectionTitle}>Umiejętności</Text>
          {profile.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>• {skill}</Text>
          ))}

          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edytuj profil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Informacja', 'Cześć! Jestem Artem Semenko — programista mobilny i webowy. Zapraszam do kontaktu!')}
          >
            <Text style={styles.buttonText}>Dowiedz się więcej</Text>
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#6C63FF',
  },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, textAlign: 'center', color: '#1a1a2e' },
  subtitle: { fontSize: 16, color: '#666666', marginBottom: 16, textAlign: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#6C63FF',
  },
  description: { fontSize: 15, lineHeight: 22, color: '#333333' },
  skill: { fontSize: 15, marginBottom: 4, color: '#333333' },
  button: {
    marginTop: 12,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonEdit: {
    marginTop: 24,
    backgroundColor: '#a29bfe',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonSave: {
    marginTop: 24,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  buttonCancelText: { color: '#555', fontSize: 16, fontWeight: '600' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#333' },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a1a2e',
  },
  inputMulti: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
});