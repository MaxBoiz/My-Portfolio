"use client";

import { createContext, useCallback, useContext, useMemo, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";

export type SignalChannel = "mobile" | "web" | "systems";
type Signal = { source: string; channel: SignalChannel };
type SignalMode = "pointer" | "focus";
type SignalContext = {
  activeSignal: SignalChannel | null;
  activate: (source: string, channel: SignalChannel, mode: SignalMode) => void;
  release: (source: string, mode: SignalMode) => void;
};

const ConnectedSignalContext = createContext<SignalContext | null>(null);

// One shared channel links the existing cards and globe labels, without extra DOM.
export default function ConnectedSignals({ children }: { children: ReactNode }) {
  const [pointerSignal, setPointerSignal] = useState<Signal | null>(null);
  const [focusSignal, setFocusSignal] = useState<Signal | null>(null);

  const activate = useCallback((source: string, channel: SignalChannel, mode: SignalMode) => {
    // A keyboard move wins over a mouse cursor left resting on another element.
    if (mode === "focus") setPointerSignal(null);
    const setSignal = mode === "pointer" ? setPointerSignal : setFocusSignal;
    setSignal({ source, channel });
  }, []);

  const release = useCallback((source: string, mode: SignalMode) => {
    const setSignal = mode === "pointer" ? setPointerSignal : setFocusSignal;
    setSignal((current) => current?.source === source ? null : current);
  }, []);

  const activeSignal = pointerSignal?.channel ?? focusSignal?.channel ?? null;
  const value = useMemo(() => ({ activeSignal, activate, release }), [activeSignal, activate, release]);

  return <ConnectedSignalContext.Provider value={value}>{children}</ConnectedSignalContext.Provider>;
}

export function useConnectedSignals() {
  const context = useContext(ConnectedSignalContext);
  if (!context) throw new Error("Connected signal controls require ConnectedSignals.");
  return context;
}

export function useSignalInteraction() {
  const { activeSignal, activate, release } = useConnectedSignals();

  const signalInteraction = (channel: SignalChannel, source: string) => ({
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      // Touch devices retain their current tap/scroll behavior, without sticky hover.
      if (event.pointerType !== "touch") activate(source, channel, "pointer");
    },
    onPointerLeave: () => release(source, "pointer"),
    onPointerCancel: () => release(source, "pointer"),
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") activate(source, channel, "pointer");
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") release(source, "pointer");
    },
    onFocusCapture: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(":focus-visible")) activate(source, channel, "focus");
      else release(source, "focus");
    },
    onBlurCapture: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) release(source, "focus");
    },
  });

  return { activeSignal, signalInteraction };
}
