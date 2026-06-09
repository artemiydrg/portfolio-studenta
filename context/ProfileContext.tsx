import React, { createContext, useContext, useEffect, useState } from 'react';
import { saveData, loadData } from '../utils/storage';

export type Profile = {
  name: string;
  bio: string;
  skills: string[];
};

type Ctx = {
  profile: Profile;
  updateProfile: (p: Profile) => void;
};

const ProfileContext = createContext<Ctx | null>(null);
const STORAGE_KEY = '@profile';

const defaultProfile: Profile = {
  name: 'Artem Semenko',
  bio: 'Student 3. roku Informatyki, semestr 6. Numer legitymacji: 14872. Interesuję się programowaniem mobilnym, tworzeniem aplikacji webowych oraz projektowaniem UI/UX w Figmie. Zrealizowałem kilka własnych projektów — od gier mobilnych po aplikacje komunikacyjne.',
  skills: ['JavaScript', 'React Native', 'Kotlin', 'Android Studio', 'Figma', 'TypeScript', 'Git'],
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    (async () => {
      const stored = await loadData<Profile>(STORAGE_KEY);
      if (stored) setProfile(stored);
    })();
  }, []);

  const updateProfile = (p: Profile) => {
    setProfile(p);
    saveData(STORAGE_KEY, p);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile musi być użyty w ProfileProvider');
  return ctx;
}