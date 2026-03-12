import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Profile {
    bio: string;
    linkedin: string;
    name: string;
    email: string;
    github: string;
}
export interface Project {
    title: string;
    tools: Array<string>;
    githubLink: string;
    description: string;
    category: string;
}
export interface Skill {
    name: string;
    proficiency: bigint;
    category: string;
}
export interface Education {
    institution: string;
    year: bigint;
    description: string;
    degree: string;
}
export interface backendInterface {
    addEducation(entry: Education): Promise<void>;
    addProject(project: Project): Promise<void>;
    addSkill(skill: Skill): Promise<void>;
    getAllEducation(): Promise<Array<Education>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllSkills(): Promise<Array<Skill>>;
    getAllTools(): Promise<Array<string>>;
    getProfile(): Promise<Profile>;
    getProjectsByCategory(category: string): Promise<Array<Project>>;
    getSkillsByCategory(category: string): Promise<Array<Skill>>;
    getSkillsByProficiency(): Promise<Array<Skill>>;
    updateProfile(newProfile: Profile): Promise<void>;
}
