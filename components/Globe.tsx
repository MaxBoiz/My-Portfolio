"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const arcsData = [
  { startLat: 48.8566, startLng: 2.3522, endLat: 40.7128, endLng: -74.006 },
  { startLat: 35.6762, startLng: 139.6503, endLat: 51.5074, endLng: -0.1278 },
  { startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198 },
  { startLat: 55.7558, startLng: 37.6176, endLat: 19.076, endLng: 72.8777 },
  { startLat: 37.7749, startLng: -122.4194, endLat: 35.6762, endLng: 139.6503 },
  { startLat: 51.5074, startLng: -0.1278, endLat: -23.5505, endLng: -46.6333 },
];

const pointsData = [
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 55.7558, lng: 37.6176, label: "Moscow" },
  { lat: 21.0285, lng: 105.8542, label: "Hà Nội City - Việt Nam" },
  { lat: 10.8231, lng: 106.6297, label: "Hồ Chí Minh City - Việt Nam" },
];

const ringsData = [
  { lat: 21.0285, lng: 105.8542 },
  { lat: 10.8231, lng: 106.6297 },
];

const stackSignals = [
  { label: "React Native", code: "MOB-01", x: "-left-4", y: "top-16", side: "left", delay: 0 },
  { label: "Next.js", code: "WEB-02", x: "right-10", y: "top-24", side: "right", delay: 0.3 },
  { label: "TypeScript", code: "TYP-03", x: "-left-4", y: "bottom-28", side: "left", delay: 0.6 },
  { label: "Node.js", code: "SYS-04", x: "right-10", y: "bottom-20", side: "right", delay: 0.9 },
  { label: "Flutter", code: "MOB-05", x: "-left-4", y: "top-1/2", side: "left", delay: 1.2 },
] as const;

export default function GlobeComponent() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  // 🔥 NEW: auto size
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isZoomed, setIsZoomed] = useState(false);

  // 🔥 AUTO FIT
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      // 👇 giữ max 500 để không phá desktop
      const newSize = Math.floor(Math.min(width, 500));

      if (newSize > 0) setSize(newSize);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
    };
  }, []);

  // Chỉ khởi tạo controls sau khi WebGL globe thực sự sẵn sàng.
  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    globeRef.current.pointOfView(
      { lat: 16, lng: 108, altitude: 2.15 },
      1500
    );
  }, []);

  // 🔥 CLICK ZOOM
  const handleClick = () => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate = false;

    if (!isZoomed) {
      globeRef.current.pointOfView(
        { lat: 16, lng: 108, altitude: 1.9 },
        2000
      );
    } else {
      globeRef.current.pointOfView(
        { lat: 0, lng: 0, altitude: 2.4 },
        2000
      );
    }

    if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = setTimeout(() => {
      controls.autoRotate = true;
      controls.autoRotateSpeed = isZoomed ? 0.6 : 0.3;
    }, 2000);

    setIsZoomed(!isZoomed);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[260px] w-full items-center justify-center py-6 sm:min-h-[500px] sm:py-8 lg:py-0"
    >
      {/* Glow */}
      <div className="absolute scale-75 sm:scale-90 lg:scale-100 w-[520px] h-[520px] rounded-full border border-blue-500/10 animate-[spin_20s_linear_infinite]" />
      <div className="absolute scale-75 sm:scale-90 lg:scale-100 w-[560px] h-[560px] rounded-full border border-purple-500/5 animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute scale-75 sm:scale-90 lg:scale-100 w-[460px] h-[460px] bg-blue-600 opacity-15 blur-[80px] rounded-full" />
      <div className="absolute scale-75 sm:scale-90 lg:scale-100 w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-[60px] rounded-full" />

      {/* LABELS */}
      <div className="hidden sm:block">
        {stackSignals.map(({ label, code, x, y, side, delay }) => (
          <motion.div
            key={label}
            className={`globe-tech-label globe-tech-label-${side} absolute ${x} ${y} text-xs font-medium px-4 py-1.5 rounded-full
              bg-gray-900/80 border border-gray-700 text-gray-300
              backdrop-blur-sm shadow-lg`}
            tabIndex={0}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { delay, duration: 0.5 },
              scale: { delay, duration: 0.5 },
              y: {
                delay,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <span className="globe-tech-name">{label}</span>
            <span className="globe-tech-telemetry" aria-hidden="true">
              <span>Stack detected</span>
              <strong><i />{code} · Active</strong>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Globe */}
      {size > 0 && (
        <motion.div
          onClick={handleClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleClick();
            }
          }}
          className="globe-interaction flex cursor-pointer items-center justify-center"
          role="button"
          tabIndex={0}
          aria-label={isZoomed ? "Zoom globe out" : "Zoom globe in"}
          aria-pressed={isZoomed}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: size,
            height: size,
            clipPath: "circle(50%)",
            overflow: "hidden",
          }}
        >
          <Globe
            ref={globeRef}
            onGlobeReady={handleGlobeReady}
            width={size}
            height={size}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="#6366f1"
            atmosphereAltitude={0.25}
            arcsData={arcsData}
            arcColor={() => ["rgba(99,102,241,0.9)", "rgba(168,85,247,0.9)"]}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            arcAltitude={0.25}
            pointsData={pointsData}
            pointLabel="label"
            pointColor={() => "rgba(99,102,241,1)"}
            pointAltitude={0.01}
            pointRadius={0.4}
            pointsMerge={false}
            ringsData={ringsData}
            ringColor={() => "rgba(99,102,241,0.6)"}
            ringMaxRadius={3}
            ringPropagationSpeed={2}
            ringRepeatPeriod={1500}
          />
        </motion.div>
      )}
    </div>
  );
}
