import Hero from "@/components/Hero";
import GlobeComponent from "@/components/Globe";

export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Hero />
      <GlobeComponent /> 
    </div>
  );
}