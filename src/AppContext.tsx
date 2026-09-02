import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PageId, UserProfile, SkillResult, SkillName, SkillLevel, ResumeClaim } from './types';

interface AssessmentState {
  skill: SkillName | null;
  selfDeclaredLevel: SkillLevel | null;
  answers: number[];
  currentIndex: number;
  completed: boolean;
}

interface AppState {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
  isAuthed: boolean;
  setAuthed: (v: boolean) => void;
  skills: SkillResult[];
  setSkills: (s: SkillResult[]) => void;
  addSkillResult: (s: SkillResult) => void;
  resumeClaims: ResumeClaim[];
  setResumeClaims: (r: ResumeClaim[]) => void;
  jobDescription: string;
  setJobDescription: (j: string) => void;
  assessment: AssessmentState;
  setAssessment: (a: AssessmentState) => void;
}

const defaultUser: UserProfile = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  education: 'University',
  degree: 'B.S. Computer Science',
  graduationYear: '2026',
  careerCategory: 'Data Analytics',
  careerRole: 'Data Analyst',
  avatarColor: 'ember',
};

const defaultSkills: SkillResult[] = [
  { skill: 'Python', selfDeclared: 'Advanced', verified: 'Intermediate', score: 80 },
  { skill: 'SQL', selfDeclared: 'Intermediate', verified: 'Intermediate', score: 90 },
  { skill: 'Power BI', selfDeclared: 'Intermediate', verified: 'Beginner', score: 50 },
];

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'skillup-pro-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isAuthed, setAuthed] = useState(false);
  const [skills, setSkills] = useState<SkillResult[]>([]);
  const [resumeClaims, setResumeClaims] = useState<ResumeClaim[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [assessment, setAssessment] = useState<AssessmentState>({
    skill: null,
    selfDeclaredLevel: null,
    answers: [],
    currentIndex: 0,
    completed: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.user) setUserState(data.user);
        if (data.isAuthed) setAuthed(data.isAuthed);
        if (data.skills) setSkills(data.skills);
        if (data.resumeClaims) setResumeClaims(data.resumeClaims);
      }
    } catch {
      // ignore
    }
  }, []);

  const setUser = (u: UserProfile | null) => {
    setUserState(u);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, user: u }));
    } catch { /* ignore */ }
  };

  const persist = (partial: Partial<AppState>) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ...partial }));
    } catch { /* ignore */ }
  };

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addSkillResult = (s: SkillResult) => {
    setSkills((prev) => {
      const filtered = prev.filter((p) => p.skill !== s.skill);
      const next = [...filtered, s];
      persist({ skills: next });
      return next;
    });
  };

  const value: AppState = {
    currentPage,
    navigate,
    user,
    setUser,
    isAuthed,
    setAuthed: (v) => { setAuthed(v); persist({ isAuthed: v }); },
    skills,
    setSkills: (s) => { setSkills(s); persist({ skills: s }); },
    addSkillResult,
    resumeClaims,
    setResumeClaims: (r) => { setResumeClaims(r); persist({ resumeClaims: r }); },
    jobDescription,
    setJobDescription: (j) => { setJobDescription(j); },
    assessment,
    setAssessment: (a) => { setAssessment(a); },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { defaultUser, defaultSkills };
