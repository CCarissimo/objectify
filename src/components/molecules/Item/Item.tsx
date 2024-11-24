// Item.tsx

import React, { useMemo, useRef } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { FlatList, Pressable } from "react-native";
import Moment from "moment-timezone";
// import { Event } from "nostr-tools";
// import { dateToUnix, useNostrEvents } from "nostr-react";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  item: {
    width: 200,
    height: 200,
  },
});

const Item = (props) => {
  const timeAgo = Moment(props.event.created_at * 1000).fromNow();
  
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  // const { reactions } = useNostrEvents({
  //   filter: {
  //     since: dateToUnix(now.current)-10000000, // all new events from now
  //     kinds: [7],
  //     "#e": [props.event.id]
  //   },
  // });
  // console.log("reactions")
  // console.log(reactions)
  console.log("Item component: props event content")
  console.log(props.event)

  // console.log(dictionary)

  console.log("processing tags")
  const tags = props.event.tags
  // console.log(tags)
  const parsedTags = tags.reduce((acc, [key, ...values]) => {
    // If key already exists, handle duplicates as an array
    if (acc[key]) {
      acc[key] = Array.isArray(acc[key]) ? [...acc[key], ...values] : [acc[key], ...values];
    } else {
      acc[key] = values.length > 1 ? values : values[0];
    }
    return acc;
  }, {});
  
  console.log(parsedTags);
  // const content = JSON.parse(dictionary)

  const price = parsedTags?.price ?? 0;

  // console.log(content.images.length() > 0)
  const images = [parsedTags.image].flat(1)
  const imagesTrue = (images) ? true : false
  console.log("Item component: images from parsed tags")
  console.log(images)

  return (
    <View className="bg-white dark:bg-black border-b border-gray-500 p-4">
      <Text className="text-xs dark:text-white mb-2">{timeAgo}</Text>
      <Text className="text-xl dark:text-white">{parsedTags.title}</Text>
      <Text className="text-base dark:text-white">{props.event.content}</Text>
      <Text className="text-base dark:text-white">{price}</Text> 
      {imagesTrue ? images.map((url, index) => (<Image style={styles.item} source={{uri: url}} />)) : <Text className="text-base dark:text-white">No Images</Text>}
    </View>
  );
}

export default Item;
