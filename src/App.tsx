import { AppProvider, useApp } from './AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { CareerSelectionPage } from './pages/CareerSelectionPage';
import { SkillLevelPage } from './pages/SkillLevelPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AssessmentResultPage } from './pages/AssessmentResultPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeUploadPage } from './pages/ResumeUploadPage';
import { ResumeCheckPage } from './pages/ResumeCheckPage';
import { JobInputPage } from './pages/JobInputPage';
import { JobMatchPage } from './pages/JobMatchPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { ImprovementPlanPage } from './pages/ImprovementPlanPage';
import { JobRecommendationsPage } from './pages/JobRecommendationsPage';
import type { PageId } from './types';

const PUBLIC_PAGES: PageId[] = ['landing', 'login', 'signup'];

function PageRouter() {
  const { currentPage, isAuthed } = useApp();

  if (!isAuthed && !PUBLIC_PAGES.includes(currentPage)) {
    return <LandingPage />;
  }

  switch (currentPage) {
    case 'landing': return <LandingPage />;
    case 'login': return <LoginPage />;
    case 'signup': return <SignupPage />;
    case 'profile-setup': return <ProfileSetupPage />;
    case 'career-selection': return <CareerSelectionPage />;
    case 'skill-level': return <SkillLevelPage />;
    case 'assessment': return <AssessmentPage />;
    case 'assessment-result': return <AssessmentResultPage />;
    case 'dashboard': return <DashboardPage />;
    case 'resume': return <ResumeUploadPage />;
    case 'resume-check': return <ResumeCheckPage />;
    case 'job-input': return <JobInputPage />;
    case 'job-match': return <JobMatchPage />;
    case 'skill-gap': return <SkillGapPage />;
    case 'improvement': return <ImprovementPlanPage />;
    case 'jobs': return <JobRecommendationsPage />;
    default: return <LandingPage />;
  }
}

function AppShell() {
  const { currentPage, isAuthed } = useApp();
  const isAuthPage = currentPage === 'login' || currentPage === 'signup';
  const showNav = !(currentPage === 'landing' && !isAuthed) || isAuthed;

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
