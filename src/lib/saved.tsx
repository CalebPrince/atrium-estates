"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "atrium:saved-properties";

/**
 * The shortlist lives in localStorage and is read through `useSyncExternalStore`,
 * which is the React primitive for subscribing to a store outside React. It
 * gives us hydration safety for free: the server snapshot is always empty, so
 * the server HTML and the first client render agree, and React swaps in the
 * real value immediately after hydration.
 */

const EMPTY: string[] = [];

let snapshot: string[] = EMPTY;
let snapshotSource: string | null = null;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode or storage disabled.
    return null;
  }
}

/**
 * Must return a stable reference while the underlying data is unchanged,
 * otherwise React re-renders forever — hence the cached snapshot.
 */
function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== snapshotSource) {
    snapshotSource = raw;
    snapshot = parse(raw);
  }
  return snapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Keeps two tabs belonging to the same visitor in step.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function write(next: string[]) {
  snapshot = next;
  snapshotSource = JSON.stringify(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, snapshotSource);
  } catch {
    // Storage unavailable — the shortlist stays in memory for this session.
  }
  emit();
}

/** False during SSR and the hydration render, true once mounted on the client. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useSaved() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    write(
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const clear = useCallback(() => write([]), []);

  return useMemo(
    () => ({
      saved,
      isSaved: (slug: string) => saved.includes(slug),
      toggle,
      clear,
      ready,
    }),
    [saved, toggle, clear, ready],
  );
}
