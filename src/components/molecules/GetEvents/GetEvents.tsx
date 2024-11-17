// import { NDKProvider } from "@nostr-dev-kit/ndk-react";
// import { useNDK } from "@nostr-dev-kit/ndk-react";
import NDK from "@nostr-dev-kit/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const relayUrls = [
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://purplepag.es",
  ]

async function ConnectAndFilter () {
  // Create a new NDK instance with explicit relays
  const ndk = new NDK({
    explicitRelayUrls: [
      "wss://relay.damus.io",
      "wss://relay.snort.social",
      "wss://purplepag.es",
    ],
  });
  // Now connect to specified relays
  await ndk.connect();

  // Create a filter
  const filter: NDKFilter = { 
    kinds: [1],
    limit: 100,
  };

  // Will return all found events
  const events = await ndk.fetchEvents(filter);

  const eventArray = Array.from(events);
  const eventArrayValues = Object.values(eventArray)

  return (
    <View></View>
  )
}

const FilteredEvents = await ConnectAndFilter()

export default function GetEvents () {
  return (
    <NDKProvider relayUrls={relayUrls}>
      <ConnectAndFilter/>
    </NDKProvider>
  );
}
