import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Project = {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  matchColor: 'success' | 'error';
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project Idea: Learning platform',
    description: 'I have an app idea where people can learn a skill together. looking for 2 or 3 more people',
    matchPercentage: 90,
    matchColor: 'success',
  },
  {
    id: '2',
    title: 'Need 1 more person',
    description: 'Me and one other person are working on a project. We need help with the security side of the project.',
    matchPercentage: 45,
    matchColor: 'error',
  },
  {
    id: '3',
    title: 'Looking for UI/UX Partner',
    description: "I'm building a productivity web app but design isn't my strength. Anyone into Figma & clean UI systems?",
    matchPercentage: 95,
    matchColor: 'success',
  },
  {
    id: '4',
    title: 'LeetCode Accountability Group',
    description: 'Solving 2 problems daily. Looking for consistent people to join.',
    matchPercentage: 45,
    matchColor: 'success',
  },
];

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const matchBgColor = project.matchColor === 'success' ? '#e7f4e8' : '#ffe2e5';
  const matchTextColor = project.matchColor === 'success' ? '#298267' : '#ed3241';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          {project.title}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>{project.description}</ThemedText>
      </View>
      <View
        style={[
          styles.matchTag,
          {
            backgroundColor: matchBgColor,
          },
        ]}
      >
        <ThemedText
          style={[
            styles.matchTagText,
            {
              color: matchTextColor,
            },
          ]}
        >
          {project.matchPercentage}% MATCH
        </ThemedText>
      </View>
      <TouchableOpacity style={styles.seeMoreLink}>
        <ThemedText style={styles.seeMoreText}>See more</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

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
        type="defaultSemiBold"
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

export default function ProjectsFeedScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'projects' | 'people'>('projects');

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

      {/* Projects List */}
      {activeTab === 'projects' && (
        <FlatList
          data={PROJECTS}
          renderItem={({ item }) => <ProjectCard project={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'people' && (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>People section coming soon</ThemedText>
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
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2024',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000738',
    lineHeight: 16,
    letterSpacing: 0.12,
  },
  matchTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  seeMoreLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  seeMoreText: {
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
