import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { allPlans } from "../data/plans";
import { quizProfileMock } from "../data/quizProfile";
import { deriveProfile } from "../lib/profileRules";
import { buildProgressSnapshot } from "../lib/progress";
import { loadAppState, saveAppState } from "../lib/storage";
import { getPlanDayByNumber, getTodayDayNumber } from "../lib/planRules";
import { computeNextStreak, mergeCompletedDays } from "../lib/workoutState";
import type { PlanDay } from "../types/plan";
import type {
  DerivedProfile,
  OnboardingAdjustments,
  QuizProfileInput,
} from "../types/profile";
import type { ProgressSnapshot } from "../types/progress";
import type { WorkoutFeedback } from "../types/workout";

interface OnboardingState {
  accessGranted: boolean;
  welcomeSeen: boolean;
  profileConfirmed: boolean;
  adjustments?: OnboardingAdjustments;
  planReasonSeen: boolean;
}

export interface AppState {
  quizProfile: QuizProfileInput;
  activePlanId: keyof typeof allPlans;
  onboarding: OnboardingState;
  derivedProfile?: DerivedProfile;
  completedDays: number[];
  workoutFeedbackByDay: Record<number, WorkoutFeedback>;
  streak: number;
  lastCompletedAt?: string;
}

interface AppContextValue {
  state: AppState;
  isOnboardingComplete: boolean;
  todayDayNumber: number;
  todayPlanDay?: PlanDay;
  progressSnapshot: ProgressSnapshot;
  planDays: PlanDay[];
  grantAccess: () => void;
  markWelcomeSeen: () => void;
  confirmProfile: () => void;
  applyAdjustments: (adjustments: OnboardingAdjustments) => void;
  markPlanReasonSeen: () => void;
  completeWorkoutDay: (dayNumber: number, feedback: WorkoutFeedback) => void;
  resetProgress: () => void;
  switchPlan: (planId: keyof typeof allPlans) => void;
}

const initialState: AppState = {
  quizProfile: quizProfileMock,
  activePlanId: "default",
  onboarding: {
    accessGranted: false,
    welcomeSeen: false,
    profileConfirmed: false,
    adjustments: undefined,
    planReasonSeen: false,
  },
  derivedProfile: undefined,
  completedDays: [],
  workoutFeedbackByDay: {},
  streak: 0,
  lastCompletedAt: undefined,
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = loadAppState();
    if (!saved) return initialState;
    // Merge to ensure new fields like activePlanId exist even on old saved states
    return {
      ...initialState,
      ...saved,
      activePlanId: saved.activePlanId ?? initialState.activePlanId,
      onboarding: { ...initialState.onboarding, ...saved.onboarding },
    };
  });

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const planDays = useMemo(
    () => allPlans[state.activePlanId],
    [state.activePlanId],
  );

  const isOnboardingComplete =
    state.onboarding.accessGranted &&
    state.onboarding.welcomeSeen &&
    state.onboarding.profileConfirmed &&
    Boolean(state.onboarding.adjustments) &&
    state.onboarding.planReasonSeen;

  const todayDayNumber = getTodayDayNumber(state.completedDays);
  const todayPlanDay = getPlanDayByNumber(planDays, todayDayNumber);

  const progressSnapshot = useMemo(
    () =>
      buildProgressSnapshot(
        state.completedDays,
        state.streak,
        state.lastCompletedAt,
      ),
    [state.completedDays, state.streak, state.lastCompletedAt],
  );

  const grantAccess = () => {
    setState((previous) => ({
      ...previous,
      onboarding: { ...previous.onboarding, accessGranted: true },
    }));
  };

  const markWelcomeSeen = () => {
    setState((previous) => ({
      ...previous,
      onboarding: { ...previous.onboarding, welcomeSeen: true },
    }));
  };

  const confirmProfile = () => {
    setState((previous) => ({
      ...previous,
      onboarding: { ...previous.onboarding, profileConfirmed: true },
    }));
  };

  const applyAdjustments = (adjustments: OnboardingAdjustments) => {
    setState((previous) => ({
      ...previous,
      onboarding: { ...previous.onboarding, adjustments },
      derivedProfile: deriveProfile(previous.quizProfile, adjustments),
    }));
  };

  const markPlanReasonSeen = () => {
    setState((previous) => ({
      ...previous,
      onboarding: { ...previous.onboarding, planReasonSeen: true },
    }));
  };

  const completeWorkoutDay = (dayNumber: number, feedback: WorkoutFeedback) => {
    const nowIso = new Date().toISOString();

    setState((previous) => {
      const completedDays = mergeCompletedDays(
        previous.completedDays,
        dayNumber,
      );
      const streak = computeNextStreak(
        previous.streak,
        previous.lastCompletedAt,
        new Date(nowIso),
      );

      return {
        ...previous,
        completedDays,
        streak,
        lastCompletedAt: nowIso,
        workoutFeedbackByDay: {
          ...previous.workoutFeedbackByDay,
          [dayNumber]: feedback,
        },
      };
    });
  };

  const resetProgress = () => {
    setState((previous) => ({
      ...previous,
      completedDays: [],
      streak: 0,
      lastCompletedAt: undefined,
      workoutFeedbackByDay: {},
    }));
  };

  const switchPlan = (planId: keyof typeof allPlans) => {
    setState((previous) => ({
      ...previous,
      activePlanId: planId,
      completedDays: [],
      streak: 0,
    }));
  };

  const value: AppContextValue = {
    state,
    isOnboardingComplete,
    todayDayNumber,
    todayPlanDay,
    progressSnapshot,
    planDays,
    grantAccess,
    markWelcomeSeen,
    confirmProfile,
    applyAdjustments,
    markPlanReasonSeen,
    completeWorkoutDay,
    resetProgress,
    switchPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
