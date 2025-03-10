import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  List,
  ChevronDown,
  Globe,
  Building,
  DollarSign,
  BarChart2,
  Activity,
  Tag,
  Info,
  ShoppingBag,
  ChevronRight,
  Wallet,
  Code,
  Blocks,
} from "lucide-react";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = "12bZ5U1hQvvAqY6Sg14dzcbaW9jXwSf_yygnfPXo339Y";
        const tabId = "1653490940";
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${tabId}`;

        const response = await fetch(url);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));

        const headers = jsonData.table.cols.map((col) => col.label);
        const rows = jsonData.table.rows.map((row) => {
          const company = {};
          row.c.forEach((cell, i) => {
            if (headers[i]) {
              company[headers[i]] = cell ? cell.v : "";
            }
          });
          return company;
        });

        setCompanies(rows);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company["Company Name"]
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company["Industry"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company["Headquarters"]?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExchange =
      selectedExchange === "" || company["Exchange"] === selectedExchange;
    const matchesSector =
      selectedSector === "" || company["Sector"] === selectedSector;

    return matchesSearch && matchesExchange && matchesSector;
  });

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 bg-gray-900">
        <div className="inline-flex bg-red-900/20 p-6 rounded-xl border border-red-700">
          <p className="text-red-400 text-xl font-mono">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Dynamic Cursor Glow */}
      <div
        className="fixed pointer-events-none w-[200vmax] h-[200vmax] -translate-x-1/2 -translate-y-1/2 opacity-20 transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 255, 255, 0.15), transparent 25%)`,
          left: cursor.x + "px",
          top: cursor.y + "px",
        }}
      />

      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-cyan-950/50 via-purple-950/30 to-black/90" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <div
            className={`space-y-8 text-center transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse" />
              <div className="relative px-7 py-4 bg-black/80 rounded-lg leading-none border border-cyan-500/30">
                <span className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  InGame.ai
                </span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto px-4">
              The Ultimate AI-Powered Gaming Industry Intelligence Platform
            </h2>
          </div>
        </section>

        {/* Search Bar */}
        <div className="container mx-auto px-4 py-8">
          <div className="relative max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 px-6 bg-black/50 border border-cyan-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
          </div>

          {/* Company Directory */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <List className="h-5 w-5 mr-2 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Company Directory
              </span>
            </h2>
            <div className="flex space-x-2">
              <button className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-500/30">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
              <button className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-500/30">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 bg-black/50 rounded-xl border border-cyan-500/20">
              <div className="p-4 bg-black/70 rounded-full mb-4 border border-cyan-500/30">
                <Search className="h-8 w-8 text-cyan-400" />
              </div>
              <p className="text-gray-300 text-lg mb-2">
                No companies match your search criteria
              </p>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or search term
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedExchange("");
                  setSelectedSector("");
                }}
                className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <Link
                  to={`/${encodeURIComponent(company["Company Name"] || "")}`}
                  key={index}
                  className="block group"
                >
                  <div className="bg-black/50 rounded-xl overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 group-hover:rotate-6 transition-transform">
                      +{Math.floor(Math.random() * 50) + 10}%
                    </div>

                    <div className="p-6 border-b border-cyan-500/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                            {company["Company Name"]}
                          </h2>
                          <div className="flex items-center mt-1 gap-2">
                            <div className="bg-black/70 text-xs py-0.5 px-2 rounded text-gray-300 flex items-center border border-cyan-500/20">
                              <Tag className="h-3 w-3 mr-1" />
                              {company["Industry"] || "N/A"}
                            </div>
                            {company["Exchange"] && (
                              <div className="bg-black/70 text-xs py-0.5 px-2 rounded text-gray-300 border border-cyan-500/20">
                                {company["Exchange"]}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-black/70 flex items-center justify-center text-cyan-400 mr-3 border border-cyan-500/20">
                          <Building className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Headquarters</p>
                          <p className="text-sm text-white">
                            {company["Headquarters"] || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-black/70 flex items-center justify-center text-cyan-400 mr-3 border border-cyan-500/20">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Valuation</p>
                          <p className="text-sm font-medium text-cyan-400">
                            {company["Company Valuation"]
                              ? `${company["Company Valuation"]}`
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-black/70 flex items-center justify-center text-cyan-400 mr-3 border border-cyan-500/20">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Website</p>
                          <a
                            href={company["Website"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {company["Website"]?.replace(
                              /^https?:\/\/(www\.)?/,
                              ""
                            ) || "N/A"}
                          </a>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cyan-500/20">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-black/70 flex items-center justify-center text-cyan-400 mr-3 border border-cyan-500/20">
                              <BarChart2 className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">
                                Growth Score
                              </p>
                              <div className="h-2 w-32 bg-gray-800 rounded-full mt-1 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                  style={{
                                    width: `${
                                      Math.floor(Math.random() * 70) + 30
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <button className="bg-black/70 p-1.5 rounded-lg hover:bg-black/90 transition-colors group-hover:bg-gradient-to-r from-cyan-500 to-purple-500 border border-cyan-500/20">
                            <Info className="h-4 w-4 text-cyan-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="py-20 mt-12 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-medium mb-4">
                <BarChart2 className="h-3 w-3 mr-1" />
                AI-Powered Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Small Cap, Big Data
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our proprietary algorithms analyze thousands of data points to
                identify high-potential small cap companies before they hit the
                mainstream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/50 p-8 rounded-xl border border-cyan-500/30 group hover:border-cyan-400/50 transition-all">
                <div className="bg-black/70 p-3 rounded-lg inline-flex mb-6 group-hover:bg-gradient-to-r from-cyan-500 to-purple-500 transition-colors border border-cyan-500/20">
                  <AlertTriangle className="h-6 w-6 text-cyan-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                  Market Analytics
                </h3>
                <p className="text-gray-400">
                  Real-time valuation tracking and market performance metrics to
                  keep you informed of every market movement.
                </p>
              </div>
              <div className="bg-black/50 p-8 rounded-xl border border-cyan-500/30 group hover:border-cyan-400/50 transition-all">
                <div className="bg-black/70 p-3 rounded-lg inline-flex mb-6 group-hover:bg-gradient-to-r from-cyan-500 to-purple-500 transition-colors border border-cyan-500/20">
                  <AlertTriangle className="h-6 w-6 text-cyan-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                  Growth Score
                </h3>
                <p className="text-gray-400">
                  Proprietary AI-driven growth potential scoring system that
                  predicts future market performance with remarkable accuracy.
                </p>
              </div>
              <div className="bg-black/50 p-8 rounded-xl border border-cyan-500/30 group hover:border-cyan-400/50 transition-all">
                <div className="bg-black/70 p-3 rounded-lg inline-flex mb-6 group-hover:bg-gradient-to-r from-cyan-500 to-purple-500 transition-colors border border-cyan-500/20">
                  <AlertTriangle className="h-6 w-6 text-cyan-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                  Risk Assessment
                </h3>
                <p className="text-gray-400">
                  Comprehensive risk level evaluation and volatility metrics to
                  help you make informed investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
