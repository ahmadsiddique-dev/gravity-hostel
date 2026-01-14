import React from "react";
import {
  Building2,
  Shield,
  Zap,
  BarChart3,
  Smartphone,
  Clock,
  Users,
  Wifi,
  CheckCircle,
} from "lucide-react";

const BentoGrids = () => {
  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 overflow-x-hidden bg-linear-to-b from-black via-zinc-900 to-black">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            Everything You Need.
            <br />
            <span className="text-gray-500 mt-3">Leave on us.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for modern campus living with AI technology
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Large featured card */}
          <div className="sm:col-span-2 lg:col-span-4 lg:row-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-600/20 rounded-full blur-[100px] group-hover:bg-indigo-600/30 transition-all" />

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-indigo-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Intelligent Room Management
              </h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                AI-powered room allocation that matches students with perfect roommates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Smart Allocation",
                  "Roommate Matching",
                  "Instant Assignments",
                  "Vacancy Tracking",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Security */}
          <div className="sm:col-span-1 lg:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Full Security</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Security Contract with Ababeel Security (24/7).
            </p>
          </div>

          {/* Lightning Fast */}
          <div className="sm:col-span-1 lg:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-green-500/50 transition-all duration-500">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Lightning Fast</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Lightening fast internet with the speed of 100Mbps
            </p>
          </div>

          {/* Real-time Analytics */}
          <div className="sm:col-span-2 lg:col-span-3 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  Real-time Analytics
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Live insights into occupancy, revenue, and trends
                </p>
              </div>

              <div className="flex gap-1.5 sm:gap-2 items-end h-16 sm:h-20 lg:h-24">
                {[60, 80, 65, 90, 75, 95, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 sm:w-2 bg-linear-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile First */}
          <div className="sm:col-span-2 lg:col-span-3 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              Mobile First Design
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
              Modern web design to fullfill the need of all different devices
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-black/30 rounded-lg p-2 sm:p-3 border border-white/5">
                <div className="text-[10px] sm:text-xs text-gray-500">Active Users</div>
                <div className="text-lg sm:text-2xl font-bold">700+</div>
              </div>
              <div className="bg-black/30 rounded-lg p-2 sm:p-3 border border-white/5">
                <div className="text-[10px] sm:text-xs text-gray-500">Web App Rating</div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">
                  4.9★
                </div>
              </div>
            </div>
          </div>

          {/* Small cards */}
          <div className="sm:col-span-1 lg:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group hover:border-yellow-500/50 transition-all">
            <Clock className="w-6 h-6 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Automated Billing</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Smart invoicing with automatic reminders
            </p>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group hover:border-cyan-500/50 transition-all">
            <Users className="w-6 h-6 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Staff Portal</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Dedicated interface for wardens and staff
            </p>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group hover:border-orange-500/50 transition-all">
            <Wifi className="w-6 h-6 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">IoT Ready</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Smart AI based model and automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrids;
