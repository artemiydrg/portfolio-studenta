import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function NewProjectScreen() {
  const { addProject } = useProjects();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = 'Min. 3 znaki';
    if (description.trim().length < 10) e.description = 'Min. 10 znaków';
    const techs = technologies.split(',').map(t => t.trim()).filter(Boolean);
    if (techs.length === 0) e.technologies = 'Podaj min. 1 technologię';
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 2000 || y > 2030) e.year = 'Rok 2000–2030';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const techs = technologies.split(',').map(t => t.trim()).filter(Boolean);
    addProject({
      name: name.trim(),
      description: description.trim(),
      technologies: techs,
      year: parseInt(year, 10),
    });
    Alert.alert('Sukces', 'Projekt został dodany!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>← Wróć</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nowy projekt</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Nazwa projektu</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={name}
              onChangeText={setName}
              placeholder="Np. Aplikacja pogodowa"
              placeholderTextColor="#aaa"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <Text style={styles.label}>Opis projektu</Text>
            <TextInput
              style={[styles.input, styles.inputMulti, errors.description ? styles.inputError : null]}
              value={description}
              onChangeText={setDescription}
              placeholder="Krótki opis projektu..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

            <Text style={styles.label}>Technologie (oddzielone przecinkami)</Text>
            <TextInput
              style={[styles.input, errors.technologies ? styles.inputError : null]}
              value={technologies}
              onChangeText={setTechnologies}
              placeholder="Np. React Native, TypeScript"
              placeholderTextColor="#aaa"
            />
            {errors.technologies ? <Text style={styles.errorText}>{errors.technologies}</Text> : null}

            <Text style={styles.label}>Rok realizacji</Text>
            <TextInput
              style={[styles.input, errors.year ? styles.inputError : null]}
              value={year}
              onChangeText={setYear}
              placeholder="Np. 2025"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              maxLength={4}
            />
            {errors.year ? <Text style={styles.errorText}>{errors.year}</Text> : null}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Zapisz projekt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eeff' },
  scrollContent: { padding: 20 },
  backBtn: { marginTop: 20, marginBottom: 4 },
  backBtnText: { fontSize: 15, color: '#6C63FF', fontWeight: '600' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#3b3486', marginBottom: 20, marginTop: 8 },
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
  saveButton: { marginTop: 24, backgroundColor: '#6C63FF', paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  cancelButton: { marginTop: 10, backgroundColor: '#f0f0f0', paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
  cancelButtonText: { color: '#555', fontSize: 16, fontWeight: '600' },
});