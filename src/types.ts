export type SkillLevel = 'Beginner' | 'Intermediate' | 'Job Ready' | 'Advanced';

export type SkillName = 'Python' | 'SQL' | 'Power BI' | 'Excel' | 'JavaScript';

export interface SkillResult {
  skill: SkillName;
  selfDeclared: SkillLevel;
  verified: SkillLevel;
  score: number; // 0-100
}

export interface UserProfile {
  name: string;
  email: string;
  education: string;
  degree: string;
  graduationYear: string;
  careerCategory: string;
  careerRole: string;
  avatarColor: string;
}

export interface ResumeClaim {
  skill: string;
  claimedLevel: SkillLevel;
}

export interface JobRequirement {
  skill: string;
  requiredLevel: SkillLevel;
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercent: number;
  matchingSkills: string[];
  missingSkills: string[];
  salary: string;
  posted: string;
  readiness: 'Ready to apply' | 'Good match — apply while improving' | 'Improve before applying';
}

export interface ImprovementWeek {
  week: number;
  title: string;
  focus: string;
  tasks: string[];
  completed: boolean;
}

export type PageId =
  | 'landing'
  | 'login'
  | 'signup'
  | 'profile-setup'
  | 'career-selection'
  | 'skill-level'
  | 'assessment'
  | 'assessment-result'
  | 'dashboard'
  | 'resume'
  | 'resume-check'
  | 'job-input'
  | 'job-match'
  | 'skill-gap'
  | 'improvement'
  | 'jobs';

export const LEVEL_ORDER: Record<SkillLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  'Job Ready': 3,
  Advanced: 4,
};

export const LEVELS: { level: SkillLevel; tagline: string }[] = [
  { level: 'Beginner', tagline: 'I am learning the basics.' },
  { level: 'Intermediate', tagline: 'I understand concepts and can complete basic tasks.' },
  { level: 'Job Ready', tagline: 'I can independently handle real-world tasks.' },
  { level: 'Advanced', tagline: 'I can solve complex problems independently.' },
];
