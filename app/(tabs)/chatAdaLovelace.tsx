import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Asset Constants from Figma
const imgUserProfile = 'https://www.figma.com/api/mcp/asset/81ee54c5-70e1-48b8-b34a-ec29645fab8f';
const imgRemove = 'https://www.figma.com/api/mcp/asset/e3c40fe1-dc68-4e37-8884-65d646ec76cd';
const imgEllipse256 = 'https://www.figma.com/api/mcp/asset/6bd5cc07-0ee4-4364-92e7-45da979309c7';
const imgSubtract = 'https://www.figma.com/api/mcp/asset/910eff35-0959-446d-a73a-cc19f7a69fdd';
const imgSend = 'https://www.figma.com/api/mcp/asset/82d5d70e-65db-4b26-8f05-663c06d0eb46';

type Message = {
  id: string;
  text: string;
  isOwn: boolean;
};

const CHAT_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hi! I saw the project you're building, it's rly cool!",
    isOwn: false,
  },
  {
    id: '2',
    text: 'thx! but the UI/UX is needs some work lol',
    isOwn: true,
  },
  {
    id: '3',
    text: 'I love designing! Can I help out w/ that?',
    isOwn: false,
  },
  {
    id: '4',
    text: 'Sure! Send me ur GitHub',
    isOwn: true,
  },
  {
    id: '5',
    text: 'jane-doe',
    isOwn: false,
  },
  {
    id: '6',
    text: 'Added you to the repo!',
    isOwn: true,
  },
  {
    id: '7',
    text: "I'll send some mocks of my ideas",
    isOwn: false,
  },
];

type ChatMessageProps = {
  message: Message;
};

const ChatBubble = ({ message }: ChatMessageProps) => {
  if (message.isOwn) {
    return (
      <View style={styles.ownMessageContainer}>
        <View style={styles.ownBubble}>
          <ThemedText style={styles.ownText}>{message.text}</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.otherMessageContainer}>
      <View style={styles.otherBubble}>
        <ThemedText style={styles.otherText}>{message.text}</ThemedText>
      </View>
    </View>
  );
};

export default function ChatAdaLovelaceScreen() {
  const insets = useSafeAreaInsets();
  const [messageText, setMessageText] = useState('Yes, excited to collaborate');
  const [messages, setMessages] = useState<Message[]>(CHAT_MESSAGES);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: messageText,
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={{ uri: imgUserProfile }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <ThemedText type="defaultSemiBold" style={styles.userName}>
              Ada Lovelace
            </ThemedText>
            <ThemedText style={styles.status}>Active</ThemedText>
          </View>
        </View>
        <TouchableOpacity style={styles.exitButton}>
          <Image source={{ uri: imgRemove }} style={styles.exitIcon} />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        {/* Camera Button */}
        <TouchableOpacity style={styles.cameraButton}>
          <Image source={{ uri: imgEllipse256 }} style={styles.cameraIcon} />
          <Image source={{ uri: imgSubtract }} style={styles.cameraInner} />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image source={{ uri: imgEllipse256 }} style={styles.sendBackground} />
          <Image source={{ uri: imgSend }} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6eefa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#e6eefa',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2024',
    marginBottom: 2,
  },
  status: {
    fontSize: 15,
    color: '#6c7a9c',
  },
  exitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5790df',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitIcon: {
    width: 24,
    height: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  ownMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  ownBubble: {
    backgroundColor: '#5790df',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '70%',
  },
  ownText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  otherMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '70%',
  },
  otherText: {
    color: '#1f2024',
    fontSize: 15,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e6eefa',
    gap: 10,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5790df',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  cameraInner: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    maxHeight: 100,
    color: '#1f2024',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5790df',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'absolute',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});
