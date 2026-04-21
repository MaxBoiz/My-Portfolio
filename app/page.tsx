import Hero from "@/components/Hero";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="
      flex flex-col lg:flex-row 
      min-h-screen 
      text-white 
      bg-gradient-to-br from-black via-gray-900 to-black 
      overflow-hidden">
      <Hero />
      <Globe />
    </main>
  );
}