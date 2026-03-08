import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Avatar placeholder
const imgAvatar = 'https://www.figma.com/api/mcp/asset/6ad9422b-01de-43cd-bba7-4475554099a1';

type FormData = {
  username: string;
  skills: string[];
  interests: string[];
};

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData>({
    username: 'Katy',
    skills: [],
    interests: [],
  });

  const handleUsernameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));
  };

  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const handleAddInterest = () => {
    setFormData((prev) => ({
      ...prev,
      interests: [...prev.interests, ''],
    }));
  };

  const handleSaveChanges = () => {
    console.log('Save changes:', formData);
  };

  const handleDiscardChanges = () => {
    console.log('Discard changes');
    setFormData({
      username: 'Katy',
      skills: [],
      interests: [],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.container}>
        {/* Header with Avatar */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.shareButton}>
              <ThemedText style={styles.shareIcon}>↗</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          </View>

          {/* Avatar Circle */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: imgAvatar }}
              style={styles.avatar}
            />
          </View>

          {/* Change Picture */}
          <TouchableOpacity style={styles.changePictureButton}>
            <ThemedText style={styles.changePictureText}>Change Picture</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Username Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Username</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#999"
              value={formData.username}
              onChangeText={handleUsernameChange}
            />
          </View>

          {/* Skills Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldHeader}>
              <ThemedText style={styles.label}>Skills</ThemedText>
              <TouchableOpacity
                onPress={handleAddSkill}
                style={styles.addButton}
              >
                <ThemedText style={styles.addButtonText}>+</ThemedText>
              </TouchableOpacity>
            </View>
            {formData.skills.map((skill, index) => (
              <TextInput
                key={`skill-${index}`}
                style={[styles.input, styles.marginBottom]}
                placeholder="Add a skill"
                placeholderTextColor="#999"
                value={skill}
                onChangeText={(value) => {
                  const newSkills = [...formData.skills];
                  newSkills[index] = value;
                  setFormData((prev) => ({
                    ...prev,
                    skills: newSkills,
                  }));
                }}
              />
            ))}
          </View>

          {/* Interests Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldHeader}>
              <ThemedText style={styles.label}>Interest</ThemedText>
              <TouchableOpacity
                onPress={handleAddInterest}
                style={styles.addButton}
              >
                <ThemedText style={styles.addButtonText}>+</ThemedText>
              </TouchableOpacity>
            </View>
            {formData.interests.map((interest, index) => (
              <TextInput
                key={`interest-${index}`}
                style={[styles.input, styles.marginBottom]}
                placeholder="Add an interest"
                placeholderTextColor="#999"
                value={interest}
                onChangeText={(value) => {
                  const newInterests = [...formData.interests];
                  newInterests[index] = value;
                  setFormData((prev) => ({
                    ...prev,
                    interests: newInterests,
                  }));
                }}
              />
            ))}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleDiscardChanges}
          >
            <ThemedText style={styles.secondaryButtonText}>Discard Changes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveChanges}
          >
            <ThemedText style={styles.primaryButtonText}>Save Changes</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingBottom: 24,
  },
  headerContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  shareButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    padding: 8,
  },
  shareIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  changePictureButton: {
    marginTop: 8,
  },
  changePictureText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 36,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2024',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#1f2024',
    minHeight: 40,
  },
  marginBottom: {
    marginBottom: 8,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4e2c9e',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 36,
    paddingBottom: 32,
    paddingTop: 16,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4e2c9e',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  primaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
