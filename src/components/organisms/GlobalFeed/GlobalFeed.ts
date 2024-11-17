import React, { useRef, useEffect } from "react";
import { useNavigation } from '@react-navigation/core';
import { FlatList, Pressable, View, StyleSheet, Button } from "react-native";
import Moment from "moment-timezone";

// import { dateToUnix, useNostrEvents } from "nostr-react";
// import { Event, Kind } from "nostr-tools";

// import Post from "../../molecules/Post/Post";
// import Item from "../../molecules/Item/Item";
// import Cards from "../Cards/Cards"
// import { Text } from "../components/Themed";
// import { RootTabScreenProps } from "../types";

// import { NostrProvider } from "nostr-react";

// import SwipeCards from "../components/SwipeCards";
// import Swiper from "react-native-deck-swiper";

import { useNDK } from "@nostr-dev-kit/ndk-react";
import { NDKFilter } from "@nostr-dev-kit/ndk";

// // Import the package
// import NDK from "@nostr-dev-kit/ndk";

// // Create a new NDK instance with explicit relays
// const ndk = new NDK({
//     explicitRelayUrls: ["wss://a.relay", "wss://another.relay"],
// });
// // Now connect to specified relays
// await ndk.connect();


const GlobalFeed = async () => {

  const showFeed = useRef(true);
  const currentPost = useRef(null);
  
  const navigation = useNavigation();

  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { fetchEvents } = useNDK();

  const filter: NDKFilter = {
    // since: dateToUnix(now.current) - 10000000, // all new events from now
    kinds: [1],
    "#t": ["ndk", "art"],
  };

  const events = await fetchEvents(filter)

  return (
    events
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default GlobalFeed;