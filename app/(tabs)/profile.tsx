/**
 * REACT NATIVE VERSION - MyProfile Component
 * 
 * This is a conversion of the web version to React Native.
 * You can use this in your React Native/Expo project.
 */

import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ArrowLeftIcon, EditIcon } from './../../components/profile-icon';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 32, 390);

type TabProps = {
  text: string;
  active?: boolean;
  onPress?: () => void;
};

function Tab({ text, active = false, onPress }: TabProps) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Text style={styles.tabText}>{text}</Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

type TabDotProps = {
  onPress?: () => void;
};

function TabDot({ onPress }: TabDotProps) {
  return (
    <TouchableOpacity style={styles.tabDot} onPress={onPress}>
      <View style={styles.dot} />
    </TouchableOpacity>
  );
}

export default function MyProfile() {
  const [activeTab, setActiveTab] = React.useState<string>('Skills');

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header Image */}
          <View style={styles.headerImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
              }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          </View>

          {/* Top Navigation */}
          <View style={styles.topNav}>
            <TouchableOpacity style={styles.navButton}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <EditIcon />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
                }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.username}>@Caty</Text>
            <Text style={styles.bio}>
              My name is Caty{'\n'}
              4th year Computer Science{'\n'}
              Interested in cyber security and software engineering
            </Text>
          </View>

          {/* Skills Tab */}
          <View style={styles.tabsContainer}>
            <Tab
              text="Skills"
              active={activeTab === 'Skills'}
              onPress={() => setActiveTab('Skills')}
            />
            <TabDot />
            <TabDot />
          </View>

          {/* Interests Tab */}
          <View style={styles.tabsContainer}>
            <Tab
              text="Interests"
              active={activeTab === 'Interests'}
              onPress={() => setActiveTab('Interests')}
            />
            <TabDot />
            <TabDot />
          </View>

          {/* Projects Tab */}
          <View style={styles.tabsContainer}>
            <Tab
              text="Projects"
              active={activeTab === 'Projects'}
              onPress={() => setActiveTab('Projects')}
            />
            <TabDot />
            <TabDot />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#ABADBF',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 20,
    minHeight: 700,
  },
  headerImageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#C4C4C4',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  topNav: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 44,
    height: 44,
    backgroundColor: '#E6EEFA',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: 138,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 100,
  },
  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileInfo: {
    marginTop: 68,
    paddingHorizontal: 33,
    alignItems: 'center',
    gap: 10,
  },
  username: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  bio: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 13,
    color: '#6C7A9C',
    textAlign: 'center',
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  tabText: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  tabIndicator: {
    marginTop: 2,
    width: 15,
    height: 3,
    backgroundColor: '#6C7A9C',
    borderRadius: 2,
  },
  tabDot: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
});
