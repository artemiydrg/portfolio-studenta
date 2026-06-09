import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <ProjectsProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#6C63FF',
            tabBarInactiveTintColor: '#999999',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#f0f0f0',
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="projects"
            options={{
              title: 'Projekty',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="code-slash" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="contact"
            options={{
              title: 'Kontakt',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="mail" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ProjectsProvider>
    </ProfileProvider>
  );
}