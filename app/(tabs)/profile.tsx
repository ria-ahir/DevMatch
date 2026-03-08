/**
 * REACT NATIVE VERSION - MyProfile with Edit functionality
 *
 * This version includes the EditProfile component.
 * Replace your MyProfile.tsx with this file.
 */

import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import EditProfile from "../editProfile";
import { ArrowLeftIcon, EditIcon } from "./../../components/profile-icon";

const { width } = Dimensions.get("window");
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

type SkillBadgeProps = {
  skill: string;
  level: string;
};

function SkillBadge({ skill, level }: SkillBadgeProps) {
  return (
    <View style={styles.skillBadge}>
      <Text style={styles.skillName}>{skill}</Text>
      <Text style={styles.skillLevel}>{level}</Text>
    </View>
  );
}

type InterestCardProps = {
  interest: string;
  icon: string;
};

function InterestCard({ interest, icon }: InterestCardProps) {
  return (
    <View style={styles.interestCard}>
      <Text style={styles.interestIcon}>{icon}</Text>
      <Text style={styles.interestName}>{interest}</Text>
    </View>
  );
}

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  color: string;
};

function ProjectCard({
  title,
  description,
  tags,
  color,
}: ProjectCardProps) {
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View
          style={[
            styles.projectIcon,
            { backgroundColor: color },
          ]}
        >
          <View style={styles.projectIconInner} />
        </View>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{title}</Text>
          <Text style={styles.projectDescription}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.projectTags}>
        {tags.map((tag, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function MyProfile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<
    "Skills" | "Interests" | "Projects" | null
  >(null);

  const [username, setUsername] = React.useState("@Katy");
  const [bio, setBio] = React.useState(
    "My name is Katy\n4th year Computer Science\nInterested in cyber security and software engineering",
  );

  const [skills, setSkills] = React.useState([
    { skill: "Python", level: "Advanced" },
    { skill: "JavaScript", level: "Intermediate" },
    { skill: "React", level: "Intermediate" },
    { skill: "Cybersecurity", level: "Advanced" },
    { skill: "SQL", level: "Intermediate" },
    { skill: "Git", level: "Advanced" },
  ]);

  const [interests, setInterests] = React.useState([
    { interest: "AI & ML", icon: "🤖" },
    { interest: "Web Dev", icon: "💻" },
    { interest: "Security", icon: "🔒" },
    { interest: "Gaming", icon: "🎮" },
    { interest: "Music", icon: "🎵" },
    { interest: "Travel", icon: "✈️" },
  ]);

  const [projects, setProjects] = React.useState([
    {
      title: "SecureChat App",
      description:
        "End-to-end encrypted messaging platform with user authentication",
      tags: ["React", "Node.js", "Encryption"],
      color: "#6c7aff",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio showcasing projects and skills",
      tags: ["HTML", "CSS", "JavaScript"],
      color: "#ff6c9d",
    },
    {
      title: "Expense Tracker",
      description:
        "Mobile app for tracking daily expenses with data visualization",
      tags: ["React Native", "Firebase"],
      color: "#ffa726",
    },
  ]);

  const toggleTab = (
    tab: "Skills" | "Interests" | "Projects",
  ) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleSave = (data: {
    username: string;
    bio: string;
    skills: any[];
    interests: any[];
    projects: any[];
  }) => {
    setUsername(data.username);
    setBio(data.bio);
    setSkills(data.skills);
    setInterests(data.interests);
    setProjects(data.projects);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditProfile
        username={username}
        bio={bio}
        skills={skills}
        interests={interests}
        projects={projects}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

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
                uri: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
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
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setIsEditing(true)}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
                }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.bio}>{bio}</Text>
          </View>

          {/* Tab Navigation with Accordion Content */}
          <View style={styles.tabNavigation}>
            {/* Skills Tab */}
            <View style={styles.tabSection}>
              <View style={styles.tabsContainer}>
                <Tab
                  text="Skills"
                  active={activeTab === "Skills"}
                  onPress={() => toggleTab("Skills")}
                />
                <TabDot />
                <TabDot />
              </View>

              {/* Skills Content */}
              {activeTab === "Skills" && (
                <View style={styles.expandedContent}>
                  <View style={styles.skillsContainer}>
                    {skills.map((item, idx) => (
                      <SkillBadge
                        key={idx}
                        skill={item.skill}
                        level={item.level}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Interests Tab */}
            <View style={styles.tabSection}>
              <View style={styles.tabsContainer}>
                <Tab
                  text="Interests"
                  active={activeTab === "Interests"}
                  onPress={() => toggleTab("Interests")}
                />
                <TabDot />
                <TabDot />
              </View>

              {/* Interests Content */}
              {activeTab === "Interests" && (
                <View style={styles.expandedContent}>
                  <View style={styles.interestsContainer}>
                    {interests.map((item, idx) => (
                      <InterestCard
                        key={idx}
                        interest={item.interest}
                        icon={item.icon}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Projects Tab */}
            <View style={styles.tabSection}>
              <View style={styles.tabsContainer}>
                <Tab
                  text="Projects"
                  active={activeTab === "Projects"}
                  onPress={() => toggleTab("Projects")}
                />
                <TabDot />
                <TabDot />
              </View>

              {/* Projects Content */}
              {activeTab === "Projects" && (
                <View style={styles.expandedContent}>
                  <View style={styles.projectsContainer}>
                    {projects.map((project, idx) => (
                      <ProjectCard
                        key={idx}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        color={project.color}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    overflow: "visible",
    shadowColor: "#ABADBF",
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 20,
    paddingBottom: 30,
  },
  headerImageContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#C4C4C4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  topNav: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    width: 44,
    height: 44,
    backgroundColor: "#E6EEFA",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    position: "absolute",
    top: 138,
    left: "50%",
    marginLeft: -50,
    width: 100,
    height: 100,
  },
  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
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
    alignItems: "center",
    gap: 10,
  },
  username: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  bio: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 13,
    color: "#6C7A9C",
    textAlign: "center",
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  tabNavigation: {
    marginTop: 20,
    gap: 20,
  },
  tabSection: {
    width: "100%",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  tab: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  tabText: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 13,
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  tabIndicator: {
    marginTop: 2,
    width: 15,
    height: 3,
    backgroundColor: "#6C7A9C",
    borderRadius: 2,
  },
  tabDot: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillBadge: {
    backgroundColor: "#F0F3FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 2,
  },
  skillName: {
    fontFamily: "System",
    fontWeight: "600",
    fontSize: 12,
    color: "#1E1E1E",
    letterSpacing: -0.3,
  },
  skillLevel: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 10,
    color: "#6C7A9C",
    letterSpacing: -0.3,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interestCard: {
    backgroundColor: "#FFF5F0",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 140,
  },
  interestIcon: {
    fontSize: 20,
  },
  interestName: {
    fontFamily: "System",
    fontWeight: "500",
    fontSize: 12,
    color: "#1E1E1E",
    letterSpacing: -0.3,
  },
  projectsContainer: {
    gap: 16,
  },
  projectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  projectIconInner: {
    width: 24,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 6,
  },
  projectInfo: {
    flex: 1,
    gap: 4,
  },
  projectTitle: {
    fontFamily: "System",
    fontWeight: "600",
    fontSize: 14,
    color: "#1E1E1E",
    letterSpacing: -0.3,
  },
  projectDescription: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 11,
    color: "#6C7A9C",
    lineHeight: 16,
    letterSpacing: -0.3,
  },
  projectTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 9,
    color: "#6C7A9C",
  },
});