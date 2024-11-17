import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { FlatList, Pressable, StyleSheet } from "react-native";

import { SafeScreen } from '@/components/templates';
import Cards from '@/components/organisms/Cards/Cards';
import Item from '@/components/molecules/Item/Item'
import Post from '@/components/molecules/Post/Post'

import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

import { Button, ButtonText } from '@/components/atoms/button';
// import { NDKProvider } from '@nostr-dev-kit/ndk-react';

// Import the package
import "websocket-polyfill";
import NDK from "@nostr-dev-kit/ndk";
import NDKFilter from "@nostr-dev-kit/ndk";
import NDKEvent from "@nostr-dev-kit/ndk";


function Inventory({ navigation }: RootScreenProps<Paths.Inventory>) {
  const relayUrls = [
      "wss://relay.damus.io",
      "wss://relay.snort.social",
      "wss://purplepag.es",
  ];

  // State to hold the data, loading, and error states
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showFeed = useRef(true);
  const currentPost = useRef(null);

  const getEvents = async () => {
    setLoading(true)
    try {
      console.log("getting...")
      const ndk = new NDK({
        explicitRelayUrls: relayUrls,
      });
      console.log("successful instantiation of ndk object")
      console.log("NDK instance:", ndk);

      await ndk.connect();
      
      const filter: NDKFilter = {
        kinds: [30402],
        limit: 10,
      };
  
      const results = await ndk.fetchEvents(filter);
      console.log(events);
  
      const eventArray = Array.from(results);
      setEvents(Object.values(eventArray))
      return (
        Object.values(eventArray)
      )

    } catch (error) {
      console.log(error.name)
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setEvents(getEvents())
  }, []);

  // Render loading indicator, error message, or the fetched data
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  console.log("here at events")
  console.log(typeof events)
  console.log(events[0])

  let feed = <FlatList
          data={events}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() => {
                //if (item.id) navigation.navigate("Post", { eventId: item.id });
                onKeyPress(item);
              }}
            >
              <Item event={item} />
            </Pressable>
          )}
        />;

  console.log(events.length)

  const onKeyPress = (e) => {
    showFeed.current = false;
    currentPost.current = <Post event={e} onPressBack = {() => changeToFeed()}/>;
  }

  const changeToFeed = () => {
    showFeed.current = true;
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View>
          {showFeed.current ? feed : currentPost.current}
        </View>
        {/* <Button size="md" variant="solid" action="primary" onPress={getEvents}>
          <ButtonText>Get the events</ButtonText>
        </Button> */}
      </ScrollView>
    </SafeScreen>
  );
}

export default Inventory;
