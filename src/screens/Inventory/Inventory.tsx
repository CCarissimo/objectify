// import { useEffect, useState, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// import { FlatList, Pressable, StyleSheet } from "react-native";

// import { SafeScreen } from '@/components/templates';
// import Cards from '@/components/organisms/Cards/Cards';
// import Item from '@/components/molecules/Item/Item'
// import Post from '@/components/molecules/Post/Post'

// import type { RootScreenProps } from '@/navigation/types';
// import { Paths } from '@/navigation/paths';

// // Import the package
// import "websocket-polyfill";
// import NDK from "@nostr-dev-kit/ndk";
// import NDKFilter from "@nostr-dev-kit/ndk";

// function Inventory({ navigation }: RootScreenProps<Paths.Inventory>) {
//   const relayUrls = [
//       "wss://relay.damus.io",
//       "wss://relay.snort.social",
//       "wss://purplepag.es",
//   ];

//   // State to hold the data, loading, and error states
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const showFeed = useRef(true);
//   const currentPost = useRef(null);

//   const getEvents = async () => {
//     setLoading(true)
//     try {
//       console.log("getting...")
//       const ndk = new NDK({
//         explicitRelayUrls: relayUrls,
//       });
//       console.log("successful instantiation of ndk object")
//       console.log("NDK instance:", ndk);

//       await ndk.connect();
      
//       const filter: NDKFilter = {
//         kinds: [30402],
//         limit: 10,
//       };
  
//       const results = await ndk.fetchEvents(filter);
//       console.log(events);
  
//       const eventArray = Array.from(results);
//       setEvents(Object.values(eventArray))
//       return (
//         Object.values(eventArray)
//       )

//     } catch (error) {
//       console.log(error.name)
//       console.log(error.message)
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     setEvents(getEvents())
//   }, []);

//   // Render loading indicator, error message, or the fetched data
//   if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   console.log("here at events")
//   console.log(typeof events)
//   console.log(events[0])

//   let feed = <FlatList
//           data={events}
//           renderItem={({ item }) => (
//             <Pressable
//               key={item.id}
//               onPress={() => {
//                 onKeyPress(item);
//               }}
//             >
//               <Item event={item} />
//             </Pressable>
//           )}
//         />;

//   console.log(events.length)

//   const onKeyPress = (e) => {
//     showFeed.current = false;
//     currentPost.current = <Post event={e} onPressBack = {() => changeToFeed()}/>;
//   }

//   const changeToFeed = () => {
//     showFeed.current = true;
//   }

//   return (
//     <SafeScreen>
//       <ScrollView>
//         <View>
//           {showFeed.current ? feed : currentPost.current}
//         </View>
//         {/* <Button size="md" variant="solid" action="primary" onPress={getEvents}>
//           <ButtonText>Get the events</ButtonText>
//         </Button> */}
//       </ScrollView>
//     </SafeScreen>
//   );
// }

// export default Inventory;


import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SafeScreen } from '@/components/templates';
import Item from '@/components/molecules/Item/Item';
import Post from '@/components/molecules/Post/Post';

import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

import "websocket-polyfill";
import NDK from "@nostr-dev-kit/ndk";
import NDKFilter from "@nostr-dev-kit/ndk";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile {
  id: string; // Unique identifier for each profile
  privateKey: string;
  publicKey: string;
  nickname: string;
}

const [profiles, setProfiles] = useState<Profile[]>([]);

// Get Profiles from Local Storage
const getProfiles = async() => {
  try {
    const storedProfiles = await AsyncStorage.getItem('profiles');
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
      console.log("list profiles log")
      console.log(profiles)
      console.log(typeof profiles)
      console.log("log")
    }
  } catch (error) {
    console.error('Error loading profiles:', error);
  }
  const pubkeys = profiles.map((profile) => profile.publicKey)
  return (
    pubkeys
  )
}

function Inventory({ navigation }: RootScreenProps<Paths.Inventory>) {
  const relayUrls = [
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://purplepag.es",
  ];

  // State management
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [publicKeys, setPublicKeys] = useState(Object);

  const showFeed = useRef(true);
  const currentPost = useRef(null);

  // Fetch NOSTR events
  const getEvents = async () => {
    setLoading(true);
    getProfiles();
    try {
      const storedProfiles = await AsyncStorage.getItem('profiles');
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
        console.log("list profiles log")
        console.log(profiles)
        console.log(typeof profiles)
        console.log("log")
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
    setPublicKeys(profiles.map((profile) => profile.publicKey));
    console.log(publicKeys)

    try {
      const ndk = new NDK({ explicitRelayUrls: relayUrls });
      await ndk.connect();
      
      const filter: NDKFilter = { 
        kinds: [30402],
        authors: publicKeys,
        limit: 10 };
      const results = await ndk.fetchEvents(filter);

      const eventArray = Array.from(results);
      setEvents(eventArray);
    } catch (err) {
      setError("Failed to fetch events. Please try again.");
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Event Handlers
  const onKeyPress = (event) => {
    showFeed.current = false;
    currentPost.current = (
      <Post event={event} onPressBack={changeToFeed} />
    );
  };

  const changeToFeed = () => {
    showFeed.current = true;
  };

  // UI Components
  const Feed = () => (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onKeyPress(item)} style={styles.cardContainer}>
          <Item event={item} />
        </Pressable>
      )}
      contentContainerStyle={styles.feedContainer}
    />
  );

  const LoadingIndicator = () => (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#6B7280" />
      <Text style={[styles.text, styles.gray600]}>Loading events...</Text>
    </View>
  );

  const ErrorMessage = () => (
    <View style={styles.centered}>
      <Text style={[styles.text, styles.errorText]}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={getEvents}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  // Render logic
  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={[styles.title]}>Inventory</Text>
          <Text style={[styles.subtitle]}>
            Explore the latest events in the NOSTR network.
          </Text>
        </View>
        {loading && <LoadingIndicator />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && (
          <View>{showFeed.current ? <Feed /> : currentPost.current}</View>
        )}
      </View>
    </SafeScreen>
  );
}

export default Inventory;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  feedContainer: {
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#F2E7FE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  gray600: {
    color: '#6B7280',
  },
  errorText: {
    color: '#D32F2F',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
