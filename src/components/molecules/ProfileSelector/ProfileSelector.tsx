import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Profile {
  id: string;
  privateKey: string;
  publicKey: string;
  nickname: string;
}

interface ProfileSelectorProps {
  onSelectProfile: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Fetch profiles from AsyncStorage
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const storedProfiles = await AsyncStorage.getItem('profiles');
        if (storedProfiles) {
          setProfiles(JSON.parse(storedProfiles));
        }
      } catch (error) {
        console.error('Error loading profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // Handle profile selection
  const handleSelectProfile = (profile: Profile) => {
    setSelectedProfileId(profile.id);
    onSelectProfile(profile); // Notify parent component of selection
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Select a Profile</Text>
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.profileItem,
            selectedProfileId === item.id && styles.selectedProfileItem,
          ]}
          onPress={() => handleSelectProfile(item)}
        >
          <Text style={styles.profileNickname}>{item.nickname}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedProfileItem: {
    backgroundColor: '#cce5ff',
  },
  profileNickname: {
    fontSize: 16,
  },
});

export default ProfileSelector;
