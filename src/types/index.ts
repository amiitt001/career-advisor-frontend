export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Recommendation = {
  title: string;
  overview: string;
  whyGoodFit: string;
  keySkillsRequired: string[];
  skillGapsForUser: string[];
  howToGetStarted: string[];
  averageSalaryIndiaLPA: string;
  dayInTheLifeSummary: string;
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

export type ComparisonPoint = {
  metric: string;
  career1_details: string;
  career2_details: string;
};

export type ComparisonResult = {
  career1_title: string;
  career2_title: string;
  comparisonPoints: ComparisonPoint[];
};