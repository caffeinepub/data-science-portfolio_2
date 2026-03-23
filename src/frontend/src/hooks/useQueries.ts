import { useQuery } from "@tanstack/react-query";
import type { Education, Profile, Project, Skill } from "../backend.d";
import { useActor } from "./useActor";

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const fallback: Profile = {
        name: "Karan Joshi",
        bio: "I am a 3rd-year B.Tech Computer Science and Engineering student with a strong interest in the Data Science domain. I enjoy working with data to uncover insights, build analytical models, and solve real-world problems using technology.",
        email: "karanjoshikj1997@gmail.com",
        github: "https://github.com/karanjoshii",
        linkedin: "https://in.linkedin.com/in/karan-joshi-7a97832a1",
      };
      if (!actor) return fallback;
      try {
        return await actor.getProfile();
      } catch {
        return fallback;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return defaultProjects;
      try {
        const result = await actor.getAllProjects();
        return result.length > 0 ? result : defaultProjects;
      } catch {
        return defaultProjects;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useSkills() {
  const { actor, isFetching } = useActor();
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return defaultSkills;
      try {
        const result = await actor.getAllSkills();
        return result.length > 0 ? result : defaultSkills;
      } catch {
        return defaultSkills;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useEducation() {
  const { actor, isFetching } = useActor();
  return useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => {
      if (!actor) return defaultEducation;
      try {
        const result = await actor.getAllEducation();
        return result.length > 0 ? result : defaultEducation;
      } catch {
        return defaultEducation;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

const defaultProjects: Project[] = [
  {
    title: "Exploratory Data Analysis",
    description:
      "Comprehensive EDA project exploring datasets using Python — uncovering patterns, distributions, and correlations through statistical analysis and visualizations.",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    category: "Data Visualization",
    githubLink: "https://github.com/karanjoshii/Exploratory-Data-Analysis",
  },
  {
    title: "AI Mood-Based Music Recommender",
    description:
      "AI-powered system that detects a user's mood and recommends music accordingly. Combines machine learning with audio data processing for personalized listening experiences.",
    tools: ["Python", "scikit-learn", "Pandas", "Machine Learning"],
    category: "Machine Learning",
    githubLink:
      "https://github.com/karanjoshii/AI-MOOD-BASED-MUSIC-RECOMMENDER",
  },
  {
    title: "Tower of Hanoi Visualizer",
    description:
      "Interactive browser-based visualization of the Tower of Hanoi algorithm with animated disk movements and step-by-step recursive logic display.",
    tools: ["JavaScript", "HTML", "CSS", "Recursion"],
    category: "Algorithms",
    githubLink: "https://github.com/karanjoshii/Tower-of-Hanoi",
  },
  {
    title: "Dynamic Shopping Cart System",
    description:
      "Feature-rich shopping cart system in C++ using dynamic data structures for real-time cart management, product lookup, pricing, and order processing.",
    tools: ["C++", "Data Structures", "OOP"],
    category: "Systems",
    githubLink: "https://github.com/karanjoshii/Dynamic-Shopping-Cart-System",
  },
];

const defaultSkills: Skill[] = [
  { name: "Python", proficiency: BigInt(95), category: "Languages" },
  { name: "R", proficiency: BigInt(80), category: "Languages" },
  { name: "SQL", proficiency: BigInt(88), category: "Languages" },
  { name: "C++", proficiency: BigInt(75), category: "Languages" },
  { name: "TensorFlow", proficiency: BigInt(85), category: "ML / AI" },
  { name: "PyTorch", proficiency: BigInt(82), category: "ML / AI" },
  { name: "scikit-learn", proficiency: BigInt(92), category: "ML / AI" },
  { name: "XGBoost", proficiency: BigInt(88), category: "ML / AI" },
  { name: "Tableau", proficiency: BigInt(78), category: "Visualization" },
  { name: "Matplotlib", proficiency: BigInt(90), category: "Visualization" },
  { name: "Plotly", proficiency: BigInt(85), category: "Visualization" },
  { name: "Seaborn", proficiency: BigInt(88), category: "Visualization" },
  { name: "Git", proficiency: BigInt(90), category: "Tools" },
  { name: "Jupyter", proficiency: BigInt(95), category: "Tools" },
  { name: "Docker", proficiency: BigInt(72), category: "Tools" },
  { name: "Pandas", proficiency: BigInt(93), category: "Tools" },
];

const defaultEducation: Education[] = [
  {
    institution: "Lovely Professional University, Punjab",
    degree: "B.Tech Computer Science and Engineering",
    year: BigInt(2027),
    description:
      "3rd-year undergraduate with a strong focus on Data Science, Machine Learning, and Algorithms. Actively working on analytical projects using Python, Pandas, NumPy, and data visualization tools.",
  },
];
