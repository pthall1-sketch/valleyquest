import React, { useState } from 'react';
import {
  ShieldAlert,
  Calendar,
  UserPlus,
  GraduationCap,
  Droplet,
  HeartHandshake,
  BookOpen,
  Atom,
  Lightbulb,
  Globe,
  Smile,
  Gamepad2,
  Lock,
  Wind,
  Thermometer,
  Eye,
  Sun,
  AlertCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const [scenario, setScenario] = useState('Normal');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* Top Header Navigation */}
      <header className="bg-[#1e3a8a] text-white px-6 py-3 flex flex-wrap items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 text-blue-950 font-black text-xl px-2.5 py-1 rounded-lg tracking-wider">
            VQ
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-tight">
              ValleyQuest
            </h1>
            <p className="text-xs text-blue-200 flex items-center gap-1">
              <span>📅 Wednesday, Sep 30, 2026</span>
              <span>•</span>
              <span>05:18 PM</span>
            </p>
          </div>
        </div>

        {/* Scenario Selectors */}
        <div className="flex items-center bg-blue-950/60 p-1 rounded-lg border border-blue-800/50 text-xs mt-2 sm:mt-0">
          <span className="text-blue-300 font-semibold px-2 flex items-center gap-1">
            <span className="text-sm">🥞</span> Scenario:
          </span>
          {['Normal', 'Excessive', 'Unhealthy', 'Dense'].map((item) => (
            <button
              key={item}
              onClick={() => setScenario(item)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                scenario === item
                  ? 'bg-amber-400 text-slate-900 font-bold shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 py-1 text-blue-200 hover:text-white font-medium border-l border-blue-800 ml-1">
            <RefreshCw className="w-3 h-3" /> Live API
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar Menu */}
        <aside className="md:col-span-3 bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 space-y-1">
          {[
            { name: 'Safe-Day Dashboard', icon: ShieldAlert, active: true },
            { name: 'Activity Planner', icon: Calendar },
            { name: 'Invite & Connections', icon: UserPlus, badge: 'SAFE' },
            { name: "Teacher's Corner", icon: GraduationCap },
            { name: 'Water & Movement', icon: Droplet },
            { name: 'Study Buddy', icon: HeartHandshake },
            { name: 'Reading Tracker', icon: BookOpen },
            { name: 'STEM Board', icon: Atom },
            { name: 'Science-Fair Coach', icon: Lightbulb },
            { name: 'World Window (Spanish)', icon: Globe },
            { name: 'Wellbeing & Mood', icon: Smile },
            { name: 'Creator Arcade', icon: Gamepad2 },
            { name: 'Guardian & CAC Tests', icon: Lock },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  item.active
                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      item.active ? 'text-white' : 'text-slate-500'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Dashboard Panel */}
        <main className="md:col-span-9 space-y-5">
          {/* Header Metadata */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  Bakersfield Conditions For
                </p>
                <h2 className="text-lg font-extrabold text-slate-800">
                  Wednesday, Sep 30, 2026
                </h2>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                Verified Source
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Updated at 05:18 PM
              </p>
            </div>
          </div>

          {/* Safe Activity Banner */}
          <div className="bg-emerald-500 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-emerald-600/60 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  RISK SCORE: 22 / 100
                </span>
                <span className="bg-emerald-600/60 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Status: GOOD
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                Safe for Outdoor Activities!
              </h3>
              <p className="text-emerald-100 text-sm mt-0.5">
                Great day for outdoor activities!
              </p>
            </div>
            <button className="bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition self-start sm:self-auto text-sm">
              Adjust Activity & Details
            </button>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Air Quality Index
                </span>
                <Wind className="w-4 h-4 text-cyan-500" />
              </div>
              <p className="text-3xl font-black text-slate-800">42</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Pollutant: <strong className="text-slate-700">PM2.5</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Temperature
                </span>
                <Thermometer className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-slate-800">74°F</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Heat Index: <strong className="text-slate-700">74°F</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Humidity & Wind
                </span>
                <Droplet className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-slate-800">35%</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Wind: <strong className="text-slate-700">6 mph</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Tule Fog Alert
                </span>
                <Eye className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-black text-slate-800">Clear</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Road Visibility:{' '}
                <strong className="text-slate-700">Normal</strong>
              </p>
            </div>
          </div>

          {/* Recommendations Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-sm">
              <span className="text-emerald-500">🛡️️</span> Custom
              Recommendations for Alex M. (7th Grade)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start space-x-3">
                <Droplet className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase">
                    Hydration Target
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Drink at least 8 oz of water every 30 minutes during
                    physical activity.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-start space-x-3">
                <Sun className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase">
                    Sun Protection
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    SPF 30+ sunscreen recommended. Wear wide-brim hat if
                    outdoors past 10 AM.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase">
                    Asthma Action Notice
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Keep rescue inhaler in backpack. Take breaks if coughing or
                    chest feels tight.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase">
                    Data Source Verification
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    NOAA Weather Service HNX & AirNow API. Checked: 05:18 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

