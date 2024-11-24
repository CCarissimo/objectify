import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs (install with `npm i uuid`)
import { generateSecretKey, getPublicKey } from 'nostr-tools';


interface Profile {
  id: string; // Unique identifier for each profile
  privateKey: string;
  publicKey: string;
  nickname: string;
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newNickname, setNewNickname] = useState<string>('');

  const STORAGE_KEY = 'profiles';

  // Load profiles from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      const storedProfiles = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
      }
    };
    fetchProfiles();
  }, []);

  // Save profiles to AsyncStorage
  const saveProfiles = async (profiles: Profile[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  };

  // Add a new profile
  const addProfile = async () => {
    if (!newNickname.trim()) {
      Alert.alert('Error', 'Nickname cannot be empty.');
      return;
    }

    let sk = generateSecretKey()
    let pk = getPublicKey(sk)
    console.log(sk)
    console.log(pk)
    const newProfile: Profile = {
      id: uuidv4(),
      privateKey: sk.toString(), // Simulated private key
      publicKey: pk.toString(), // Simulated public key
      nickname: newNickname,
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    setNewNickname('');
    await saveProfiles(updatedProfiles);
  };

  // Edit a profile's nickname
  const editNickname = async (id: string, nickname: string) => {
    const updatedProfiles = profiles.map(profile =>
      profile.id === id ? { ...profile, nickname } : profile
    );
    setProfiles(updatedProfiles);
    await saveProfiles(updatedProfiles);
  };

  // Delete a profile
  const deleteProfile = async (id: string) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    await saveProfiles(updatedProfiles);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Profiles</Text>

      {/* Add New Profile Section */}
      <View style={styles.newProfileContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter nickname"
          value={newNickname}
          onChangeText={setNewNickname}
        />
        <TouchableOpacity style={styles.addButton} onPress={addProfile}>
          <Text style={styles.addButtonText}>Add Profile</Text>
        </TouchableOpacity>
      </View>

      {/* List of Profiles */}
      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.profileContainer}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Public Key: {item.publicKey}</Text>
              <Text style={styles.profileText}>Private Key: {item.privateKey}</Text>
              <TextInput
                style={styles.nicknameInput}
                value={item.nickname}
                onChangeText={(text) => editNickname(item.id, text)}
                placeholder="Nickname"
              />
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteProfile(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileText: {
    fontSize: 14,
    marginBottom: 4,
  },
  nicknameInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profiles;
