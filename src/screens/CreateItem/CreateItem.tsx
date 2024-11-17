// CreateItem.tsx

import { useRef, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Moment from "moment-timezone";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { Event, Kind } from "nostr-tools";
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import Post from "@/components/molecules/Post/Post";
import Item from "@/components/molecules/Item/Item";
// import PostButton from "../components/CreateItem"
// Import the package
import "websocket-polyfill";
import NDK from "@nostr-dev-kit/ndk";
import NDKEvent from "@nostr-dev-kit/ndk";
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools'
import { Relay } from 'nostr-tools'


const relayUrls = [
  // "wss://nostr-pub.wellorder.net",
  // "wss://relay.nostr.ch",
  // "wss://nostr.sats.li",
  // "wss://nostr.hifish.org",
  // "wss://pablof7z.nostr1.com",
  // "wss://offchain.pub",
  // "wss://relay.f7z.io",
  "wss://relay.damus.io",
  // "wss://relay.snort.social",
  // "wss://offchain.pub/",
  // "wss://nostr.mom",
  // "wss://nostr-pub.wellorder.net",
  // "wss://purplepag.es",
  // "wss://brb.io/",
];

function PostButton() {

  console.log("here with you")

  // State to hold the data, loading, and error states
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onPost = async () => {
    setLoading(true)
    let sk = generateSecretKey() // `sk` is a Uint8Array
    let pk = getPublicKey(sk) // `pk` is a hex string
    console.log("post button pressed")
    console.log(pk)
    try {

      const relay = await Relay.connect('wss://relay.damus.io')
      console.log(`connected to ${relay.url}`)

      let eventTemplate = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'hello world',
      }
      
      // this assigns the pubkey, calculates the event id and signs the event in a single step
      const signedEvent = finalizeEvent(eventTemplate, sk)
      await relay.publish(signedEvent)
      
      relay.close()
      return (
        eventTemplate
      )

    } catch (error) {
      console.log(error.name)
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onPress={onPost} title="Post a message!"></Button>
  );
}

const CreateItemInput = () => {
  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');
  const [images, onChangeImages] = useState([]);
  const [currency, onChangeCurrency] = useState('');
  const [price, onChangePrice] = useState('');
  const [location, onChangeLocation] = useState([]);

  return (
    <SafeAreaView>
      <Text>Create an Object</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder="title"
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDescription}
        value={description}
        placeholder="summary"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeLocation}
        value={location}
        placeholder="location"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeImages}
        placeholder="image urls"
        value={images}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCurrency}
        value={currency}
        placeholder="currency"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePrice}
        placeholder="price"
        value={price}
        keyboardType="numeric"
      />
      <PostButton/> 
    </SafeAreaView>
  );
};

export default function CreateItem({ navigation }: RootScreenProps<Paths.CreateItem>) {
  
  return (
    <CreateItemInput />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
  },
});
