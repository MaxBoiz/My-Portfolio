"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobeComponent() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current?.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
      }
    }
  }, []);

  return (
    <div className="w-1/2 flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        <Globe
          ref={globeRef}
          width={450}
          height={450}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        />
      </div>
    </div>
  );
}