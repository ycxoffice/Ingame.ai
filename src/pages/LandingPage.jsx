import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Search,
  Brain,
  Cpu,
  Globe,
  Gamepad,
  Zap,
  Code,
  Trophy,
  DollarSign,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setGlowPosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    setIsLoaded(true);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const companies = [
    "Riot Games",
    "Epic Games",
    "Blizzard",
    "EA",
    "Ubisoft",
    "Valve",
    "Activision",
    "Nintendo",
    "Sony",
    "Microsoft",
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Dynamic Cursor Glow */}
      <div
        className="fixed pointer-events-none w-[200vmax] h-[200vmax] -translate-x-1/2 -translate-y-1/2 opacity-20 transition-transform duration-1000"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(139, 92, 246, 0.15), transparent 20%)`,
          left: cursor.x + "px",
          top: cursor.y + "px",
        }}
      />

      {/* Cyberpunk-style Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/50 via-transparent to-black/80" />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <div
            className={`space-y-8 text-center transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Animated Logo */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <div className="relative px-7 py-4 bg-black rounded-lg leading-none">
                <span className="text-6xl md:text-8xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  InGame.ai
                </span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto px-4">
              The Ultimate AI-Powered Gaming Industry Intelligence Platform
            </h2>

            {/* Animated CTA Button */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
              <Link
                to={"/CompanyList"}
                className="group relative px-8 py-4 overflow-hidden rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 transform-gpu group-hover:scale-110" />
                <span className="relative flex items-center gap-2 text-lg font-semibold">
                  Access Database{" "}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Floating Company Names */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {companies.map((company, index) => (
              <div
                key={company}
                className="absolute text-gray-800 text-opacity-20 whitespace-nowrap text-2xl font-bold"
                style={{
                  left: `${(index * 200) % window.innerWidth}px`,
                  top: `${(index * 150) % window.innerHeight}px`,
                  transform: `rotate(${index * 45}deg)`,
                  animation: `float ${5 + index}s infinite ease-in-out`,
                }}
              >
                {company}
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Comprehensive Gaming Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "AI Analysis",
                  desc: "Deep learning insights on gaming trends",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Market Data",
                  desc: "Global gaming market intelligence",
                },
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Tech Stack",
                  desc: "Game engine & technology tracking",
                },
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: "Revenue Analysis",
                  desc: "Monetization & financial metrics",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-violet-950/30 to-indigo-950/30 p-6 rounded-xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-violet-400 mb-4 transform group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Glowing Numbers */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "10K+", label: "Games Analyzed" },
                { number: "500+", label: "Companies Tracked" },
                { number: "24/7", label: "Real-time Updates" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-block">
                    <div className="absolute -inset-2 bg-violet-600/20 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                    <div className="relative text-5xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Database Preview Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-950/30 to-indigo-950/30 border border-violet-500/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">
                    Access Comprehensive Gaming Data
                  </h3>
                  <p className="text-gray-400">
                    Track game development, player analytics, and AI
                    implementation across the industry.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: <Gamepad />, text: "Game Engine Analytics" },
                      { icon: <Zap />, text: "Performance Metrics" },
                      { icon: <Code />, text: "Technology Stack Data" },
                      { icon: <Trophy />, text: "Success Metrics" },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="text-violet-400">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Animated Database Preview */}
                <div className="relative h-64 rounded-xl bg-black/50 border border-violet-500/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-violet-500">
                      <Database className="w-16 h-16" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Add animations
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
    50% { transform: translateY(-20px) rotate(var(--rotation, 0deg)); }
  }
  
  @keyframes tilt {
    0%, 100% { transform: rotate(-1deg); }
    50% { transform: rotate(1deg); }
  }
  
  .animate-tilt {
    animation: tilt 10s infinite linear;
  }
`;
document.head.appendChild(style);

export default LandingPage;
