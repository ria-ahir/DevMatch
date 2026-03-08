import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Asset Constants from Figma
const imgCreatorAvatar = 'https://www.figma.com/api/mcp/asset/6e758ddc-a8eb-4953-8ab4-a240f9919678';
const imgArrowLeft = 'https://www.figma.com/api/mcp/asset/2de2a4c6-aa3d-4230-bf6f-94c2bbba1c11';

type Project = {
  title: string;
  description: string;
  creator: string;
  creatorAvatar: string;
  rolesNeeded: string[];
  teamSize: number;
};

const PROJECT_DATA: Project = {
  title: 'Project Idea: Learning platform',
  description:
    'I have an app idea where people can learn a skill together. looking for 2 or 3 more people. I am not looking for someone with any particular skill rather just work on an app and learn together as this is my first time building an app.',
  creator: 'Sally Jackson',
  creatorAvatar: imgCreatorAvatar,
  rolesNeeded: ['Developer'],
  teamSize: 3,
};

type ProjectFieldProps = {
  label: string;
  value: string | number;
};

const ProjectField = ({ label, value }: ProjectFieldProps) => (
  <View style={styles.fieldContainer}>
    <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
      {label}
    </ThemedText>
    <View style={styles.fieldInputWrapper}>
      <ThemedText style={styles.fieldValue}>{value}</ThemedText>
    </View>
  </View>
);

type CreatorSectionProps = {
  name: string;
  avatar: string;
};

const CreatorSection = ({ name, avatar }: CreatorSectionProps) => (
  <View style={styles.creatorContainer}>
    <ThemedText type="defaultSemiBold" style={styles.creatorLabel}>
      Creator
    </ThemedText>
    <View style={styles.creatorField}>
      <Image source={{ uri: avatar }} style={styles.creatorAvatar} />
      <ThemedText style={styles.creatorName}>{name}</ThemedText>
    </View>
  </View>
);

export default function ProjectDetailScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useRNColorScheme();

  const handleBack = () => {
    console.log('Go back');
  };

  const handleMessage = () => {
    console.log('Open message');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={{ uri: imgArrowLeft }} style={styles.backIcon} />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
          devMatch
        </ThemedText>
        <View style={{ width: 44 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Project Info Card */}
        <View style={styles.infoCard}>
          {/* Project Title and Description */}
          <View style={styles.projectHeader}>
            <ThemedText type="defaultSemiBold" style={styles.projectTitle}>
              {PROJECT_DATA.title}
            </ThemedText>
            <ThemedText style={styles.projectDescription}>{PROJECT_DATA.description}</ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Creator Section */}
          <CreatorSection name={PROJECT_DATA.creator} avatar={PROJECT_DATA.creatorAvatar} />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Roles Needed */}
          <ProjectField label="Roles Needed" value={PROJECT_DATA.rolesNeeded.join(', ')} />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Team Size */}
          <ProjectField label="Team Size" value={PROJECT_DATA.teamSize} />
        </View>
      </ScrollView>

      {/* Message Button */}
      <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
        <ThemedText style={styles.messageButtonText}>Message</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fe',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 16,
    backgroundColor: '#4e2c9e',
    height: 100,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6eefa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e8e9f1',
    letterSpacing: 0.24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  infoCard: {
    backgroundColor: '#f8f9fe',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  projectHeader: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2024',
    marginBottom: 8,
    letterSpacing: 0.09,
  },
  projectDescription: {
    fontSize: 12,
    color: '#000738',
    lineHeight: 16,
    letterSpacing: 0.12,
  },
  divider: {
    height: 1,
    backgroundColor: '#d4d6dd',
    marginVertical: 16,
  },
  creatorContainer: {
    marginBottom: 8,
  },
  creatorLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2f3036',
    marginBottom: 8,
    letterSpacing: 0.08,
  },
  creatorField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fe',
    borderRadius: 12,
    gap: 12,
  },
  creatorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  creatorName: {
    fontSize: 14,
    color: '#1f2024',
    fontWeight: '400',
  },
  fieldContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2f3036',
    marginBottom: 8,
    letterSpacing: 0.08,
  },
  fieldInputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fe',
    borderRadius: 12,
  },
  fieldValue: {
    fontSize: 14,
    color: '#1f2024',
    fontWeight: '400',
  },
  messageButton: {
    marginHorizontal: 28,
    marginBottom: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4e2c9e',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  messageButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.408,
  },
});
