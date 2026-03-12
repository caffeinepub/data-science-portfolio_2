import { useQuery } from "@tanstack/react-query";
import type { Education, Profile, Project, Skill } from "../backend.d";
import { useActor } from "./useActor";

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Alex Chen",
          bio: "Passionate about turning raw data into meaningful insights. Currently pursuing my MS in Data Science, with a focus on machine learning and NLP. I love building projects that solve real-world problems.",
          email: "alex.chen@datasci.edu",
          github: "https://github.com/alexchen",
          linkedin: "https://linkedin.com/in/alexchen",
        };
      }
      return actor.getProfile();
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
      const result = await actor.getAllProjects();
      return result.length > 0 ? result : defaultProjects;
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
      const result = await actor.getAllSkills();
      return result.length > 0 ? result : defaultSkills;
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
      const result = await actor.getAllEducation();
      return result.length > 0 ? result : defaultEducation;
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

const defaultProjects: Project[] = [
  {
    title: "Sentiment Analysis Engine",
    description:
      "NLP model analyzing 100k+ tweets in real-time with multi-class sentiment classification. Achieves 92% accuracy using fine-tuned BERT with custom preprocessing pipeline.",
    tools: ["Python", "BERT", "FastAPI", "Docker", "Redis"],
    category: "NLP",
    githubLink: "https://github.com/alexchen/sentiment-engine",
  },
  {
    title: "Customer Churn Predictor",
    description:
      "End-to-end ML pipeline for a telecom company that predicts churn with 89% precision, reducing customer attrition by 23%. Deployed with explainable AI features for business teams.",
    tools: ["Python", "XGBoost", "scikit-learn", "SHAP", "MLflow"],
    category: "Machine Learning",
    githubLink: "https://github.com/alexchen/churn-predictor",
  },
  {
    title: "COVID-19 Data Dashboard",
    description:
      "Interactive visualization platform tracking global pandemic data across 195 countries. Features real-time updates, predictive modeling, and comparative analysis tools.",
    tools: ["Python", "Plotly", "Dash", "Pandas", "PostgreSQL"],
    category: "Data Visualization",
    githubLink: "https://github.com/alexchen/covid-dashboard",
  },
  {
    title: "House Price Predictor",
    description:
      "Ensemble regression model with advanced feature engineering achieving top 5% on Kaggle. Implements automated feature selection, polynomial features, and stacked generalization.",
    tools: ["Python", "sklearn", "Pandas", "Seaborn", "Optuna"],
    category: "Regression",
    githubLink: "https://github.com/alexchen/house-prices",
  },
];

const defaultSkills: Skill[] = [
  { name: "Python", proficiency: BigInt(95), category: "Languages" },
  { name: "R", proficiency: BigInt(80), category: "Languages" },
  { name: "SQL", proficiency: BigInt(88), category: "Languages" },
  { name: "Scala", proficiency: BigInt(65), category: "Languages" },
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
  { name: "Apache Spark", proficiency: BigInt(68), category: "Tools" },
];

const defaultEducation: Education[] = [
  {
    institution: "Stanford University",
    degree: "M.S. in Data Science",
    year: BigInt(2024),
    description:
      "Specialization in Machine Learning and Natural Language Processing. Thesis: 'Attention Mechanisms in Low-Resource NLP Tasks'. GPA: 3.92/4.0.",
  },
  {
    institution: "UC Berkeley",
    degree: "B.S. in Statistics & Computer Science",
    year: BigInt(2022),
    description:
      "Double major with honors. Relevant coursework: Machine Learning, Statistical Computing, Algorithms, Data Structures. Dean's List 6 semesters.",
  },
  {
    institution: "Coursera / deeplearning.ai",
    degree: "Deep Learning Specialization",
    year: BigInt(2021),
    description:
      "5-course specialization covering neural networks, CNNs, sequence models, and structuring ML projects. Completed with distinction.",
  },
];
