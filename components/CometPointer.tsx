"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./CometPointer.module.css";

// Set to false to return to the system cursor without removing the design.
const COMET_POINTER_ENABLED = true;
// The rounded upper-left tip is the click hotspot, independent of the glow.
const POINTER_HOTSPOT = { x: 4, y: 3 };
// Reuse the approved silhouette for the body, clipping and rim.
const POINTER_SHAPE = "M3 4.3C3 2.5 4.5 1.8 6 2.8L20.2 12.1C22 13.3 21.7 15.4 19.5 15.8L12.6 16.9C11.4 17.1 10.6 17.5 9.9 18.5L6.6 23.3C5.4 25.1 3.4 24.5 3.3 22.3Z";
const NATIVE_CURSOR_TARGETS = "input, textarea, select, [contenteditable]:not([contenteditable='false']), [disabled], [aria-disabled='true'], iframe, nextjs-portal";
const INTERACTIVE_TARGETS = "a[href], button, [role='button'], [role='link'], summary";

export default function CometPointer() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const gradientId = `comet-edge-${useId()}`;

  useEffect(() => {
    const pointer = pointerRef.current;
    if (!COMET_POINTER_ENABLED || !pointer) return;

    const desktopMouse = window.matchMedia("(min-width: 640px) and (hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = false;
    let x = 0;
    let y = 0;

    const hide = () => {
      visible = false;
      pointer.dataset.visible = "false";
      document.body.classList.remove(styles.enabled);
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const updateTarget = (target: Element | null) => {
      if (!target || target.closest(NATIVE_CURSOR_TARGETS)) {
        hide();
        return false;
      }
      pointer.dataset.mode = target.closest(INTERACTIVE_TARGETS) ? "interactive" : "default";
      return true;
    };

    const draw = () => {
      frame = 0;
      if (!visible) return;
      // Track directly so the visible tip never trails behind the click position.
      pointer.style.transform = `translate3d(${x - POINTER_HOTSPOT.x}px, ${y - POINTER_HOTSPOT.y}px, 0)`;
    };

    const handlePointer = (event: PointerEvent) => {
      if (!desktopMouse.matches || event.pointerType !== "mouse"
        || event.clientX >= document.documentElement.clientWidth
        || event.clientY >= document.documentElement.clientHeight) {
        hide();
        return;
      }
      if (!updateTarget(event.target instanceof Element ? event.target : null)) return;

      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        pointer.style.transform = `translate3d(${x - POINTER_HOTSPOT.x}px, ${y - POINTER_HOTSPOT.y}px, 0)`;
        pointer.dataset.visible = "true";
        visible = true;
        // Hide the native cursor only after the replacement has a valid position.
        document.body.classList.add(styles.enabled);
      }
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handleExit = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const handleScroll = () => {
      if (visible) updateTarget(document.elementFromPoint(x, y));
    };
    const handleVisibility = () => {
      if (document.hidden) hide();
    };
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide();
    };

    document.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("pointerover", handlePointer, { passive: true });
    document.addEventListener("pointerout", handleExit, { passive: true });
    document.addEventListener("pointercancel", hide, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("keydown", handleKeyboard);
    window.addEventListener("blur", hide);
    window.addEventListener("resize", hide);
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    desktopMouse.addEventListener("change", hide);

    return () => {
      hide();
      document.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("pointerover", handlePointer);
      document.removeEventListener("pointerout", handleExit);
      document.removeEventListener("pointercancel", hide);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", hide);
      window.removeEventListener("scroll", handleScroll, true);
      desktopMouse.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div ref={pointerRef} className={styles.pointer} data-comet-pointer data-visible="false" data-mode="default" aria-hidden="true">
      <svg className={styles.arrow} width="24" height="28" viewBox="0 0 24 28" fill="none" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="3" y1="3" x2="20" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ede9fe" />
            <stop offset="0.5" stopColor="#c4b5fd" />
            <stop offset="1" stopColor="#a5b4fc" />
          </linearGradient>
          <linearGradient id={`${gradientId}-left`} x1="3" y1="4" x2="10" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42424e" />
            <stop offset="1" stopColor="#15151d" />
          </linearGradient>
          <linearGradient id={`${gradientId}-right`} x1="6" y1="3" x2="20" y2="15" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17171f" />
            <stop offset="1" stopColor="#020307" />
          </linearGradient>
          <linearGradient id={`${gradientId}-lower`} x1="8" y1="14" x2="11" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06070b" />
            <stop offset="1" stopColor="#30303b" />
          </linearGradient>
          <clipPath id={`${gradientId}-clip`}>
            <path d={POINTER_SHAPE} />
          </clipPath>
        </defs>
        <path className={styles.arrowBody} d={POINTER_SHAPE} />
        <g clipPath={`url(#${gradientId}-clip)`}>
          <g className={styles.facets}>
            <path d="M2 1H4.7L9.8 13.2L2 18.8Z" fill={`url(#${gradientId}-left)`} />
            <path d="M4.7 1H24V14.7L9.8 13.2Z" fill={`url(#${gradientId}-right)`} />
            <path d="M2 18.8L9.8 13.2L24 14.7V28H2Z" fill={`url(#${gradientId}-lower)`} />
          </g>
          <path className={styles.bevel} d={POINTER_SHAPE} fill="none" stroke="#bcb9ce" strokeWidth="2.4" />
          <path className={styles.facetSeams} d="M4.7 3.2L9.8 13.2L20.6 14.2M9.8 13.2L4.7 23.5" fill="none" strokeWidth="0.6" strokeLinecap="round" />
          <circle className={styles.junction} cx="9.8" cy="13.2" r="0.45" />
        </g>
        <path d={POINTER_SHAPE} stroke={`url(#${gradientId})`} strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
