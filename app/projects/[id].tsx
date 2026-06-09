import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, removeProject } = useProjects();
  const router = useRouter();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Nie znaleziono projektu</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Wróć do listy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Usuń projekt',
      `Czy na pewno chcesz usunąć projekt "${project.name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => {
            removeProject(project.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Wróć do listy</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.projectName}>{project.name}</Text>

          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.description}>{project.description}</Text>

          <Text style={styles.sectionTitle}>Technologie</Text>
          <View style={styles.techRow}>
            {project.technologies.map((tech, i) => (
              <View key={i} style={styles.techPill}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Rok realizacji</Text>
          <Text style={styles.yearText}>{project.year}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Usuń projekt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eeff' },
  scrollContent: { padding: 20 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  notFoundText: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 20 },
  backBtn: { marginTop: 20, marginBottom: 12 },
  backBtnText: { fontSize: 15, color: '#6C63FF', fontWeight: '600' },
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
  projectName: { fontSize: 26, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#6C63FF', marginTop: 16, marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 24, color: '#333333' },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techPill: { backgroundColor: '#ede9fe', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  techText: { fontSize: 13, color: '#5b21b6', fontWeight: '500' },
  yearText: { fontSize: 15, color: '#333', marginBottom: 8 },
  backButton: { backgroundColor: '#6C63FF', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  deleteButton: { marginTop: 24, backgroundColor: '#ef4444', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  deleteButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});