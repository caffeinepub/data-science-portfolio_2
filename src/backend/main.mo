import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Project = {
    title : Text;
    description : Text;
    tools : [Text];
    githubLink : Text;
    category : Text;
  };

  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      Text.compare(p1.title, p2.title);
    };

    public func compareByCategory(p1 : Project, p2 : Project) : Order.Order {
      switch (Text.compare(p1.category, p2.category)) {
        case (#equal) { Text.compare(p1.title, p2.title) };
	      case (order) { order };
      };
    };
  };

  type Skill = {
    name : Text;
    category : Text;
    proficiency : Nat; // 1-10 scale
  };

  module Skill {
    public func compare(s1 : Skill, s2 : Skill) : Order.Order {
      Text.compare(s1.name, s2.name);
    };

    public func compareByCategory(s1 : Skill, s2 : Skill) : Order.Order {
      switch (Text.compare(s1.category, s2.category)) {
        case (#equal) { Text.compare(s1.name, s2.name) };
	      case (order) { order };
      };
    };

    public func compareByProficiency(s1 : Skill, s2 : Skill) : Order.Order {
      switch (Nat.compare(s1.proficiency, s2.proficiency)) {
        case (#equal) { Text.compare(s1.name, s2.name) };
	      case (order) { order };
      };
    };
  };

  type Education = {
    degree : Text;
    institution : Text;
    year : Nat;
    description : Text;
  };

  module Education {
    public func compare(e1 : Education, e2 : Education) : Order.Order {
      switch (Nat.compare(e1.year, e2.year)) {
        case (#equal) { Text.compare(e1.degree, e2.degree) };
        case (order) { order };
      };
    };
  };

  type Profile = {
    name : Text;
    bio : Text;
    email : Text;
    github : Text;
    linkedin : Text;
  };

  let projects = List.empty<Project>();
  let skills = List.empty<Skill>();
  let educationEntries = List.empty<Education>();
  var profile : ?Profile = null;

  // Project functions
  public shared ({ caller }) func addProject(project : Project) : async () {
    projects.add(project);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.toArray().sort();
  };

  public query ({ caller }) func getProjectsByCategory(category : Text) : async [Project] {
    let filtered = projects.filter(
      func(p) { p.category == category }
    );
    filtered.toArray().sort(Project.compareByCategory);
  };

  // Skill functions
  public shared ({ caller }) func addSkill(skill : Skill) : async () {
    skills.add(skill);
  };

  public query ({ caller }) func getAllSkills() : async [Skill] {
    skills.toArray().sort();
  };

  public query ({ caller }) func getSkillsByCategory(category : Text) : async [Skill] {
    let filtered = skills.filter(func(s) { s.category == category });
    filtered.toArray().sort(Skill.compareByCategory);
  };

  public query ({ caller }) func getSkillsByProficiency() : async [Skill] {
    skills.toArray().sort(Skill.compareByProficiency);
  };

  // Education functions
  public shared ({ caller }) func addEducation(entry : Education) : async () {
    educationEntries.add(entry);
  };

  public query ({ caller }) func getAllEducation() : async [Education] {
    educationEntries.toArray().sort();
  };

  // Profile functions
  public shared ({ caller }) func updateProfile(newProfile : Profile) : async () {
    profile := ?newProfile;
  };

  public query ({ caller }) func getProfile() : async Profile {
    switch (profile) {
      case (null) { Runtime.trap("Profile not found") };
      case (?p) { p };
    };
  };

  // Tool functions
  public query ({ caller }) func getAllTools() : async [Text] {
    let allTools = List.empty<Text>();

    for (proj in projects.values()) {
      for (tool in proj.tools.values()) {
        allTools.add(tool);
      };
    };

    let uniqueTools = Set.empty<Text>();
    for (tool in allTools.values()) {
      uniqueTools.add(tool);
    };
    uniqueTools.toArray();
  };
};
