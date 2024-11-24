import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";

import { finalizeEvent, Relay } from "nostr-tools";
import "websocket-polyfill";
import { PermissionsAndroid, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Make sure the user installs react-native-image-picker and react-native-geolocation-service

import ProfileSelector from '@/components/molecules/ProfileSelector/ProfileSelector';


interface Profile {
  id: string; // Unique identifier for each profile
  privateKey: string;
  publicKey: string;
  nickname: string;
}

const STORAGE_KEY = 'profiles';

function CreateItem() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  // Handle image selection
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
    });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle camera capture
  const takePicture = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      includeBase64: false,
    });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle location retrieval
  
  const fetchLocation = async () => {
  try {
    // Check for permissions on Android
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location to show your current position.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }
    }

    // Handle location retrieval for both platforms
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`
        );
      },
      (error) => {
        Alert.alert("Error", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } catch (error) {
    Alert.alert("Error", "Failed to request location permission.");
  }
  };

  // Handle posting the event
  const postItem = async () => {
    const storedProfiles = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
      }
    console.log("profiles", profiles)
    let secretKey = selectedProfile?.privateKey
    // const secretKey = "2ef806494f0d556c9885af606c9d96d412861ef0ccc7a0b9046b9612216740ec";
    const timestamp = Math.floor(Date.now() / 1000);

    const relay = await Relay.connect('wss://relay.damus.io')
    console.log(`connected to ${relay.url}`)

    const eventTemplate = {
      kind: 30402,
      created_at: timestamp,
      tags: [
        ["title", title],
        ["summary", summary],
        ["location", location],
        ["price", price],
        ["image", image || "No Image"],
        ["published_at", timestamp.toString()],
      ],
      content: `New item created: ${title}`,
    };

    const signedEvent = finalizeEvent(eventTemplate, secretKey);
    console.log("Signed Event:", signedEvent);

    await relay.publish(signedEvent)

    relay.close()
    console.log("relay closed")
    Alert.alert("Success", "Your item has been posted!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Item</Text>
        <Text style={styles.subtitle}>Fill in the details below to create a new item listing.</Text>
      </View>
      <View style={styles.container}>
      <ProfileSelector onSelectProfile={handleProfileSelect} />
      {selectedProfile && (
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Selected Profile:</Text>
          <Text style={styles.detailText}>Nickname: {selectedProfile.nickname}</Text>
          <Text style={styles.detailText}>ID: {selectedProfile.id}</Text>
        </View>
      )}
    </View>
      <View style={styles.form}>
        {/* Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Summary Input */}
        <TextInput
          style={styles.input}
          placeholder="Summary"
          value={summary}
          onChangeText={setSummary}
        />

        {/* Location Input */}
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.button} onPress={fetchLocation}>
          <Text style={styles.buttonText}>Use Current Location</Text>
        </TouchableOpacity>

        {/* Image Input */}
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={selectImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Price Input */}
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={postItem}>
          <Text style={styles.buttonText}>Post Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CreateItem;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  form: {
    flex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#1F1F1F",
  },
  button: {
    backgroundColor: "#6B7280",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#4F46E5",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  profileDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
