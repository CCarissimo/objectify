import React, { useMemo, useRef} from "react";
import { Text, View } from "react-native";
import Moment from "moment-timezone";
import { FlatList, Pressable } from "react-native";
// import { dateToUnix, useNostrEvents } from "nostr-react";
// import { Event } from "nostr-tools";

const Post = (props) => {
  const timeAgo = Moment(props.event.created_at * 1000).fromNow();
  
  return (
    <View className="bg-white dark:bg-black border-b border-gray-500 p-4">
      <Text className="text-xs dark:text-white mb-2">{timeAgo}</Text>
      <Text className="text-base dark:text-white">{props.event.content}</Text>
    </View>
  );
}

export default Post;
