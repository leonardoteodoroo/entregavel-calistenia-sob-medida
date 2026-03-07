import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { MainAppLayout } from './layouts/MainAppLayout';
import { AssistantScreen } from './screens/app/AssistantScreen';
import { LibraryScreen } from './screens/app/LibraryScreen';
import { PlanScreen } from './screens/app/PlanScreen';
import { ProfileScreen } from './screens/app/ProfileScreen';
import { ProgressScreen } from './screens/app/ProgressScreen';
import { ReactivationScreen } from './screens/app/ReactivationScreen';
import { SupportScreen } from './screens/app/SupportScreen';
import { TodayScreen } from './screens/app/TodayScreen';
import { OnboardingAdjustmentsScreen } from './screens/onboarding/OnboardingAdjustments';
import { PlanReason } from './screens/onboarding/PlanReason';
import { ProfileConfirmation } from './screens/onboarding/ProfileConfirmation';
import { SplashAccess } from './screens/onboarding/SplashAccess';
import { Welcome } from './screens/onboarding/Welcome';
import { WorkoutCompletionScreen } from './screens/workout/WorkoutCompletionScreen';
import { WorkoutSessionScreen } from './screens/workout/WorkoutSessionScreen';

const RequireAccess = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  if (!state.onboarding.accessGranted) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const RequireWelcome = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  if (!state.onboarding.welcomeSeen) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
};

const RequireProfileConfirmed = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  if (!state.onboarding.profileConfirmed) return <Navigate to="/perfil" replace />;
  return <>{children}</>;
};

const RequireAdjustments = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  if (!state.onboarding.adjustments) return <Navigate to="/ajustes" replace />;
  return <>{children}</>;
};

const RequireOnboardingComplete = ({ children }: { children: ReactNode }) => {
  const { isOnboardingComplete } = useAppContext();
  if (!isOnboardingComplete) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const EntryRoute = () => {
  const { isOnboardingComplete } = useAppContext();
  if (isOnboardingComplete) return <Navigate to="/app/hoje" replace />;
  return <SplashAccess />;
};

const App = () => (
  <Routes>
    <Route path="/" element={<EntryRoute />} />
    <Route
      path="/welcome"
      element={
        <RequireAccess>
          <Welcome />
        </RequireAccess>
      }
    />
    <Route
      path="/perfil"
      element={
        <RequireAccess>
          <RequireWelcome>
            <ProfileConfirmation />
          </RequireWelcome>
        </RequireAccess>
      }
    />
    <Route
      path="/ajustes"
      element={
        <RequireAccess>
          <RequireWelcome>
            <RequireProfileConfirmed>
              <OnboardingAdjustmentsScreen />
            </RequireProfileConfirmed>
          </RequireWelcome>
        </RequireAccess>
      }
    />
    <Route
      path="/plano-montado"
      element={
        <RequireAccess>
          <RequireWelcome>
            <RequireProfileConfirmed>
              <RequireAdjustments>
                <PlanReason />
              </RequireAdjustments>
            </RequireProfileConfirmed>
          </RequireWelcome>
        </RequireAccess>
      }
    />

    <Route
      path="/app"
      element={
        <RequireOnboardingComplete>
          <MainAppLayout />
        </RequireOnboardingComplete>
      }
    >
      <Route index element={<Navigate to="hoje" replace />} />
      <Route path="hoje" element={<TodayScreen />} />
      <Route path="hoje/treino" element={<WorkoutSessionScreen />} />
      <Route path="hoje/conclusao" element={<WorkoutCompletionScreen />} />
      <Route path="plano" element={<PlanScreen />} />
      <Route path="biblioteca" element={<LibraryScreen />} />
      <Route path="biblioteca/assistente" element={<AssistantScreen />} />
      <Route path="progresso" element={<ProgressScreen />} />
      <Route path="perfil" element={<ProfileScreen />} />
      <Route path="perfil/suporte" element={<SupportScreen />} />
      <Route path="perfil/reativacao" element={<ReactivationScreen />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
