import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import StatusBar from '@/components/status-bar';

const INTERESTS = [
  { id: '1', name: 'User Interface' },
  { id: '2', name: 'UX Research' },
  { id: '3', name: 'Product Design' },
  { id: '4', name: 'Social Good Projects' },
  { id: '5', name: 'Game Development' },
  { id: '6', name: 'Data Visualization' },
  { id: '7', name: 'AI Development' },
  { id: '8', name: 'Open Source' },
];

export default function SetupInterests() {
  const insets = useSafeAreaInsets();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['1']);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.progressBarActive]} />
        <View style={styles.progressBar} />
        <View style={styles.progressBar} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingTop: 24 }}
        scrollEnabled={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Choose your Interests
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Select the areas you're most interested in.
          </ThemedText>
        </View>

        {/* Interests List */}
        <View style={styles.interestsList}>
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestItem,
                  isSelected && styles.interestItemSelected,
                ]}
                onPress={() => toggleInterest(interest.id)}
              >
                <ThemedText style={styles.interestText}>
                  {interest.name}
                </ThemedText>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <ThemedText style={styles.checkmarkIcon}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.nextButton}>
          <ThemedText style={styles.nextButtonText}>Next</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E8E9F1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarActive: {
    backgroundColor: '#4e2c9e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    gap: 16,
    marginBottom: 41,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2024',
    letterSpacing: 0.24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#71727a',
    lineHeight: 20,
  },
  interestsList: {
    gap: 8,
    paddingBottom: 120,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#C5C6CC',
    backgroundColor: '#FFFFFF',
  },
  interestItemSelected: {
    backgroundColor: '#EAF2FF',
    borderColor: '#006FFD',
    borderWidth: 1,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1f2024',
    lineHeight: 20,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#4e2c9e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  nextButton: {
    backgroundColor: '#4e2c9e',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
