"use client";

import dynamic from "next/dynamic";

// tránh lỗi SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobeComponent() {
  return (
    <Globe
      height={500}
      width={500}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    />
  );
}