import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CreateProjectScreen() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    title: 'AI Fitness Coach',
    description: '',
    creatorName: '',
    rolesNeeded: '',
    teamSize: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleSave = () => {
    console.log('Save & Post clicked', formData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <ThemedText type="extraBold" style={styles.headerTitle}>
            Create a New Project
          </ThemedText>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Field */}
          <View style={styles.fieldGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Title
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter project title"
              placeholderTextColor="#c5c6cc"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          {/* Description Field */}
          <View style={styles.fieldGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Description
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="What is your project about?"
              placeholderTextColor="#c5c6cc"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
            />
          </View>

          {/* Creator Name Field */}
          <View style={styles.fieldGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Creator Name
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="First Name, Last Name"
              placeholderTextColor="#c5c6cc"
              value={formData.creatorName}
              onChangeText={(value) => handleInputChange('creatorName', value)}
            />
          </View>

          {/* Roles Needed Field */}
          <View style={styles.fieldGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Roles Needed
            </ThemedText>
            <View style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInput}
                placeholder="Select roles needed"
                placeholderTextColor="#c5c6cc"
                value={formData.rolesNeeded}
                onChangeText={(value) => handleInputChange('rolesNeeded', value)}
                editable={false}
              />
              <ThemedText style={styles.dropdownIcon}>▼</ThemedText>
            </View>
          </View>

          {/* Team Size Field */}
          <View style={styles.fieldGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Team Size
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Number of team members"
              placeholderTextColor="#c5c6cc"
              value={formData.teamSize}
              onChangeText={(value) => handleInputChange('teamSize', value)}
              keyboardType="number-pad"
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <ThemedText style={styles.saveButtonText}>Save & Post</ThemedText>
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
    paddingBottom: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2024',
    letterSpacing: 0.24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 41,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2f3036',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2f3036',
    fontFamily: 'Inter',
    minHeight: 48,
  },
  dropdownContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownInput: {
    flex: 1,
    fontSize: 14,
    color: '#c5c6cc',
    fontFamily: 'Inter',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#8f9098',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 41,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  cancelButton: {
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
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4e2c9e',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4e2c9e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
