"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

// Sample arc data for animated flight paths
const arcsData = [
  { startLat: 48.8566, startLng: 2.3522, endLat: 40.7128, endLng: -74.006 },   // Paris → NYC
  { startLat: 35.6762, startLng: 139.6503, endLat: 51.5074, endLng: -0.1278 }, // Tokyo → London
  { startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198 },// Sydney → Singapore
  { startLat: 55.7558, startLng: 37.6176, endLat: 19.076, endLng: 72.8777 },   // Moscow → Mumbai
  { startLat: 37.7749, startLng: -122.4194, endLat: 35.6762, endLng: 139.6503 },// SF → Tokyo
  { startLat: 51.5074, startLng: -0.1278, endLat: -23.5505, endLng: -46.6333 },// London → São Paulo
];

// Glowing point markers on major cities
const pointsData = [
  { lat: 48.8566,  lng: 2.3522,    label: "Paris" },
  { lat: 40.7128,  lng: -74.006,   label: "New York" },
  { lat: 35.6762,  lng: 139.6503,  label: "Tokyo" },
  { lat: 51.5074,  lng: -0.1278,   label: "London" },
  { lat: -33.8688, lng: 151.2093,  label: "Sydney" },
  { lat: 37.7749,  lng: -122.4194, label: "San Francisco" },
  { lat: 1.3521,   lng: 103.8198,  label: "Singapore" },
  { lat: 55.7558,  lng: 37.6176,   label: "Moscow" },
];

export default function GlobeComponent() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = false;
      // Tilt the globe slightly for a dramatic 3D feel
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 0);
    }
  }, []);

  return (
    <div className="w-1/2 flex items-center justify-center relative">

      {/* Layered glow rings */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-blue-500/10 animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-purple-500/5 animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute w-[460px] h-[460px] bg-blue-600 opacity-15 blur-[80px] rounded-full" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-[60px] rounded-full" />

      {/* Floating tech tags */}
      {[
        { label: "React Native", x: "-left-6", y: "top-16", delay: 0 },
        { label: "Next.js",      x: "-right-0", y: "top-24", delay: 0.3 },
        { label: "TypeScript",   x: "-left-6", y: "bottom-28", delay: 0.6 },
        { label: "Node.js",      x: "-right-0", y: "bottom-20", delay: 0.9 },
        { label: "Flutter",      x: "-left-10", y: "top-1/2", delay: 1.2 },
      ].map(({ label, x, y, delay }) => (
        <motion.div
          key={label}
          className={`absolute ${x} ${y} text-xs font-medium px-3 py-1.5 rounded-full
                      bg-gray-900/80 border border-gray-700 text-gray-300
                      backdrop-blur-sm shadow-lg`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { delay, duration: 0.5 },
            scale:   { delay, duration: 0.5 },
            y: {
              delay,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {label}
        </motion.div>
      ))}

      {/* Globe */}
      <motion.div
        suppressHydrationWarning
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: 500,
          height: 500,
          clipPath: "circle(50%)",
          overflow: "hidden",
        }}
      >
        <Globe
          ref={globeRef}
          width={500}
          height={500}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

          // Atmosphere glow
          atmosphereColor="rgba(99,102,241,0.6)"
          atmosphereAltitude={0.25}

          // Animated arcs
          arcsData={arcsData}
          arcColor={() => ["rgba(99,102,241,0.9)", "rgba(168,85,247,0.9)"]}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcStroke={0.5}
          arcAltitude={0.25}

          // City markers
          pointsData={pointsData}
          pointColor={() => "rgba(99,102,241,1)"}
          pointAltitude={0.01}
          pointRadius={0.4}
          pointsMerge={false}
        />
      </motion.div>
    </div>
  );
}