const LIBRARY_FOCUS_STORAGE_KEY = "cfsm:library-focus";

export function setPendingLibraryFocus(exerciseId: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LIBRARY_FOCUS_STORAGE_KEY, exerciseId);
}

export function readPendingLibraryFocus(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(LIBRARY_FOCUS_STORAGE_KEY);
}

export function clearPendingLibraryFocus(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(LIBRARY_FOCUS_STORAGE_KEY);
}
