import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { moderateScale } from "react-native-size-matters";
import { useRoute } from "@react-navigation/native";

const CompanyChat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (messagesArray) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messagesArray)
    );
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "orange",
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default CompanyChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
