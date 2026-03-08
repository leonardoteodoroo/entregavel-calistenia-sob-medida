import type { AppState } from "../context/AppContext";

const STORAGE_KEY = "calistenia-sob-medida:v1";

export const loadAppState = (): AppState | undefined => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as AppState;
  } catch {
    return undefined;
  }
};

export const saveAppState = (state: AppState): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // No-op to keep runtime resilient on storage restrictions.
  }
};

export const clearAppState = (): void => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // No-op to keep runtime resilient on storage restrictions.
  }
};
