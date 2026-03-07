import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width - 32, 390);

type SkillItem = {
  skill: string;
  level: string;
};

type InterestItem = {
  interest: string;
  icon: string;
};

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  color: string;
};

type EditProfileProps = {
  username: string;
  bio: string;
  skills: SkillItem[];
  interests: InterestItem[];
  projects: ProjectItem[];
  onSave: (data: {
    username: string;
    bio: string;
    skills: SkillItem[];
    interests: InterestItem[];
    projects: ProjectItem[];
  }) => void;
  onCancel: () => void;
};

export default function EditProfile({
  username,
  bio,
  skills,
  interests,
  projects,
  onSave,
  onCancel,
}: EditProfileProps) {
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedBio, setEditedBio] = useState(bio);

  // Keeping these editable but still simple/hardcoded-friendly
  const [editedSkills, setEditedSkills] = useState(skills);
  const [editedInterests, setEditedInterests] = useState(interests);
  const [editedProjects, setEditedProjects] = useState(projects);

  const addSkill = () => {
    setEditedSkills([
      ...editedSkills,
      { skill: "", level: "Beginner" },
    ]);
  };
  
  const removeSkill = (index: number) => {
    setEditedSkills(editedSkills.filter((_, i) => i !== index));
  };
  
  const addInterest = () => {
    setEditedInterests([
      ...editedInterests,
      { interest: "", icon: "✨" },
    ]);
  };
  
  const removeInterest = (index: number) => {
    setEditedInterests(editedInterests.filter((_, i) => i !== index));
  };
  
  const addProject = () => {
    setEditedProjects([
      ...editedProjects,
      {
        title: "",
        description: "",
        tags: [],
        color: "#6c7aff",
      },
    ]);
  };
  
  const removeProject = (index: number) => {
    setEditedProjects(editedProjects.filter((_, i) => i !== index));
  };
  
  const updateSkill = (index: number, field: "skill" | "level", value: string) => {
    const updated = [...editedSkills];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSkills(updated);
  };

  const updateInterest = (index: number, field: "interest" | "icon", value: string) => {
    const updated = [...editedInterests];
    updated[index] = { ...updated[index], [field]: value };
    setEditedInterests(updated);
  };

  const updateProject = (
    index: number,
    field: "title" | "description" | "color",
    value: string
  ) => {
    const updated = [...editedProjects];
    updated[index] = { ...updated[index], [field]: value };
    setEditedProjects(updated);
  };

  const updateProjectTags = (index: number, value: string) => {
    const updated = [...editedProjects];
    updated[index] = {
      ...updated[index],
      tags: value.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    setEditedProjects(updated);
  };

  const handleSave = () => {
    onSave({
      username: editedUsername,
      bio: editedBio,
      skills: editedSkills,
      interests: editedInterests,
      projects: editedProjects,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Edit Profile</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={editedUsername}
            onChangeText={setEditedUsername}
            placeholder="@username"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={editedBio}
            onChangeText={setEditedBio}
            placeholder="Write your bio"
            placeholderTextColor="#999"
            multiline
          />

        <Text style={styles.sectionTitle}>Skills</Text>
        {editedSkills.map((item, index) => (
          <View key={index} style={styles.itemBlock}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                value={item.skill}
                onChangeText={(text) => updateSkill(index, "skill", text)}
                placeholder="Skill"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                value={item.level}
                onChangeText={(text) => updateSkill(index, "level", text)}
                placeholder="Level"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeSkill(index)}
            >
              <Text style={styles.removeButtonText}>Remove Skill</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addSkill}>
          <Text style={styles.addButtonText}>+ Add Skill</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Interests</Text>
        {editedInterests.map((item, index) => (
          <View key={index} style={styles.itemBlock}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.iconInput]}
                value={item.icon}
                onChangeText={(text) => updateInterest(index, "icon", text)}
                placeholder="🎯"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, styles.flexInput]}
                value={item.interest}
                onChangeText={(text) => updateInterest(index, "interest", text)}
                placeholder="Interest"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeInterest(index)}
            >
              <Text style={styles.removeButtonText}>Remove Interest</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addInterest}>
          <Text style={styles.addButtonText}>+ Add Interest</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Projects</Text>
        {editedProjects.map((project, index) => (
          <View key={index} style={styles.projectBlock}>
            <TextInput
              style={styles.input}
              value={project.title}
              onChangeText={(text) => updateProject(index, "title", text)}
              placeholder="Project title"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.multilineSmall]}
              value={project.description}
              onChangeText={(text) => updateProject(index, "description", text)}
              placeholder="Project description"
              placeholderTextColor="#999"
              multiline
            />
            <TextInput
              style={styles.input}
              value={project.tags.join(", ")}
              onChangeText={(text) => updateProjectTags(index, text)}
              placeholder="React, Firebase, UI"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={project.color}
              onChangeText={(text) => updateProject(index, "color", text)}
              placeholder="#6c7aff"
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeProject(index)}
            >
              <Text style={styles.removeButtonText}>Remove Project</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addProject}>
          <Text style={styles.addButtonText}>+ Add Project</Text>
        </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
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
    borderRadius: 32,
    padding: 20,
    shadowColor: "#ABADBF",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E1E1E",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E1E",
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F7F8FC",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1E1E1E",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6EAF2",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  multilineSmall: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 4,
  },
  halfInput: {
    flex: 1,
  },
  iconInput: {
    width: 60,
    textAlign: "center",
  },
  flexInput: {
    flex: 1,
  },
  projectBlock: {
    backgroundColor: "#FCFCFE",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF1F7",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#EDEDED",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#6C7A9C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#1E1E1E",
    fontWeight: "600",
    fontSize: 14,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  itemBlock: {
    marginBottom: 12,
  },
  
  addButton: {
    marginTop: 6,
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#EEF1F7",
    alignItems: "center",
  },
  
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C7A9C",
  },
  
  removeButton: {
    alignSelf: "flex-end",
    marginTop: -2,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  
  removeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D9534F",
  },
});