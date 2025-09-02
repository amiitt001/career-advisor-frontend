export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Recommendation = {
  title: string;
  reason: string;
  required_skills: string[];
  skill_gaps: string[];
  learning_path: string;
  jobSearchUrl: string; // We will add this feature later
};

export type Profile = {
    uid: string;
    name: string;
    email: string;
    interests: string[];
    skills: string[];
    createdAt: string;
    assessmentScore?: number;
    resumeUrl?: string;
    extractedSkills?: string[];
};