import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectsScreen() {
  const { projects, removeProject } = useProjects();
  const router = useRouter();

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      'Usuń projekt',
      `Czy na pewno chcesz usunąć projekt "${name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Usuń', style: 'destructive', onPress: () => removeProject(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Moje projekty</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/projects/new')}
            >
              <Text style={styles.addButtonText}>+ Dodaj projekt</Text>
            </TouchableOpacity>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/projects/${item.id}`)}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.projectName}>{item.name}</Text>
              <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
                <Text style={styles.deleteBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.projectDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.techRow}>
              {item.technologies.map((tech, i) => (
                <View key={i} style={styles.techPill}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.yearText}>{item.year}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eeff' },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
    color: '#3b3486',
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  projectName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a2e', flex: 1 },
  deleteBtn: { fontSize: 16, color: '#ef4444', paddingHorizontal: 4 },
  projectDesc: { fontSize: 14, color: '#666666', lineHeight: 20, marginBottom: 10 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  techPill: {
    backgroundColor: '#ede9fe',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  techText: { fontSize: 11, color: '#5b21b6', fontWeight: '500' },
  yearText: { fontSize: 12, color: '#aaa', textAlign: 'right' },
});