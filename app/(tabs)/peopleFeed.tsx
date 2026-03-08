import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Asset constants from Figma
const imgLauraFischer = 'https://www.figma.com/api/mcp/asset/a4d07fed-aaad-41d4-93d5-afd31736d840';
const imgNathanReevs = 'https://www.figma.com/api/mcp/asset/0dadd331-1f0c-4d4d-96fb-5665023424c2';
const imgUnsplashILip77SbmOe = 'https://www.figma.com/api/mcp/asset/cb23abd3-d241-4418-a144-947e4ee1ba4e';
const imgAvatar = 'https://www.figma.com/api/mcp/asset/6b9fe5a2-4820-4fa4-8a99-c71200b675d8';

type Person = {
  id: string;
  name: string;
  description: string;
  avatar: string;
};

const PEOPLE: Person[] = [
  {
    id: '1',
    name: 'Sally Jackson',
    description:
      "Hi everyone! I'm getting started with Python and thinking about taking a Coursera course. Let me know if anyone wants to join & hold each other accountable! 😄",
    avatar: imgLauraFischer,
  },
  {
    id: '2',
    name: 'Nathan Zhang',
    description: 'UI/UX designer looking gain experience in mobile app design. Proficient at Figma.',
    avatar: imgNathanReevs,
  },
  {
    id: '3',
    name: 'Alona Fyshe',
    description: 'Studying Computer Engg and would love to collaborate on an embedded systems project!',
    avatar: imgUnsplashILip77SbmOe,
  },
  {
    id: '4',
    name: 'Abdul Bello',
    description:
      'Im interested in developing my skills in Rust and would love to collaborate on a project using it, & any tips are appreciated :)',
    avatar: imgAvatar,
  },
];

type PersonCardProps = {
  person: Person;
};

const PersonCard = ({ person }: PersonCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Image source={{ uri: person.avatar }} style={styles.avatar} />
      <View style={styles.textContent}>
        <ThemedText type="defaultSemiBold" style={styles.personName}>
          {person.name}
        </ThemedText>
        <ThemedText style={styles.personDescription}>{person.description}</ThemedText>
      </View>
    </View>
    <TouchableOpacity style={styles.connectButton}>
      <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
    </TouchableOpacity>
  </View>
);

type TabSwitcherProps = {
  activeTab: 'projects' | 'people';
  onTabChange: (tab: 'projects' | 'people') => void;
};

const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => (
  <View style={styles.tabSwitcher}>
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === 'projects' && styles.tabButtonActive,
      ]}
      onPress={() => onTabChange('projects')}
    >
      <ThemedText
        style={[
          styles.tabButtonText,
          activeTab === 'projects' && styles.tabButtonTextActive,
        ]}
      >
        Projects
      </ThemedText>
    </TouchableOpacity>
    <View style={styles.tabDivider} />
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === 'people' && styles.tabButtonActive,
      ]}
      onPress={() => onTabChange('people')}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[
          styles.tabButtonText,
          activeTab === 'people' && styles.tabButtonTextActive,
        ]}
      >
        People
      </ThemedText>
    </TouchableOpacity>
  </View>
);

export default function PeopleFeedScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'projects' | 'people'>('people');

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <ThemedText type="defaultSemiBold" style={styles.headerSubtitle}>
          Connect
        </ThemedText>
      </View>

      {/* Tab Switcher */}
      <View style={styles.switcherContainer}>
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {/* People List */}
      {activeTab === 'people' && (
        <FlatList
          data={PEOPLE}
          renderItem={({ item }) => <PersonCard person={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'projects' && (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>Projects section</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fe',
  },
  header: {
    backgroundColor: '#4e2c9e',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4e2c9e',
  },
  switcherContainer: {
    paddingHorizontal: 29,
    paddingVertical: 16,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#e8e9f1',
    borderRadius: 16,
    padding: 4,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71727a',
  },
  tabButtonTextActive: {
    color: '#1f2024',
  },
  tabDivider: {
    width: 0.5,
    height: 10,
    backgroundColor: '#d4d6dd',
    marginHorizontal: 2,
  },
  listContent: {
    paddingHorizontal: 29,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    backgroundColor: '#f8f9fe',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#b4dbff',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  personName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2024',
    marginBottom: 4,
  },
  personDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#71727a',
    lineHeight: 16,
    letterSpacing: 0.12,
  },
  connectButton: {
    borderWidth: 1.5,
    borderColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  connectButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4e2c9e',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#71727a',
  },
});
