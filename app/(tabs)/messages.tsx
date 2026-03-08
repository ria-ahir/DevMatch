import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

// Asset Constants from Figma
const imgAvatar = 'https://www.figma.com/api/mcp/asset/982feedb-88ab-414f-8cc7-42046ad40c65';
const imgSearch = 'https://www.figma.com/api/mcp/asset/b32aa985-eb2c-4faf-b124-c1ce7f791207';

const { width } = Dimensions.get('window');

// Design System Colors (from Figma)
const figmaColors = {
  primaryDark: '#4e2c9e',
  lightBg: '#e6eefa',
  white: '#FFFFFF',
  textDark: '#1f2024',
  textMedium: '#71727a',
  textLight: '#8f9098',
  inputBg: '#f8f9fe',
  avatarBg: '#eaf2ff',
  badgeBg: '#006ffd',
  borderLight: 'rgba(0,0,0,0.15)',
};

type Message = {
  id: string;
  name: string;
  message: string;
  unreadCount: number;
};

// Avatar Component
const Avatar = ({ size = 40 }: { size?: number }) => (
  <View style={[styles.avatar, { width: size, height: size }]}>
    <Image
      source={{ uri: imgAvatar }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  </View>
);

// Search Bar Component
const SearchBar = () => (
  <View style={styles.searchBarContainer}>
    <Image source={{ uri: imgSearch }} style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      placeholderTextColor={figmaColors.textLight}
    />
  </View>
);

// Chat List Item Component
const ChatListItem = ({
  name,
  message,
  unreadCount,
  onPress,
}: {
  name: string;
  message: string;
  unreadCount: number;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress} activeOpacity={0.7}>
    <Avatar size={40} />
    <View style={styles.listItemContent}>
      <ThemedText type="defaultSemiBold" style={styles.senderName}>
        {name}
      </ThemedText>
      <ThemedText style={styles.messagePreview} numberOfLines={1}>
        {message}
      </ThemedText>
    </View>
    {unreadCount > 0 && (
      <View style={styles.badge}>
        <ThemedText style={styles.badgeText}>{unreadCount}</ThemedText>
      </View>
    )}
  </TouchableOpacity>
);

const MESSAGES_DATA: Message[] = [
    {
      id: '1',
      name: 'Ada Lovelace',
      message: "I'll send some mocks of my ideas",
      unreadCount: 9,
    },
    {
      id: '2',
      name: 'Sally Jackson',
      message: "Let's get started!",
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Nelson Amaral',
      message: 'I am really interested in cyber security',
      unreadCount: 2,
    },
    {
      id: '4',
      name: 'Omid Ardakanian',
      message: "I can't wait to add this to my portfolio",
      unreadCount: 0,
    },
    {
      id: '5',
      name: 'Euijin Choo',
      message: "Can't wait to test out your gamified learning pl",
      unreadCount: 0,
    },
    {
      id: '6',
      name: 'Carrie Epp',
      message: 'Can you approve my PR please!!!!',
      unreadCount: 0,
    },
    {
      id: '7',
      name: 'Alona Fyshe',
      message: 'I added you as a collaborator on the repo.',
      unreadCount: 0,
    },
    {
      id: '8',
      name: 'Abram Hindle',
      message: 'HAVE YOU FINISHED THE ISC2 CC MODULE?',
      unreadCount: 0,
    },
  ];

export default function MessagesScreen() {
  const colorScheme = useRNColorScheme();
  const insets = useSafeAreaInsets();
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(MESSAGES_DATA);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>
          Messages
        </ThemedText>
        <SearchBar />
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            name={item.name}
            message={item.message}
            unreadCount={item.unreadCount}
            onPress={() => console.log(`Tapped: ${item.name}`)}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No messages found</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: figmaColors.borderLight,
  },
  headerTitle: {
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: figmaColors.inputBg,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: figmaColors.textDark,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexGrow: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: figmaColors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: figmaColors.avatarBg,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  senderName: {
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 12,
    color: figmaColors.textMedium,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: figmaColors.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: figmaColors.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: figmaColors.textMedium,
  },
});
