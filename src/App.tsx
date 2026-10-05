import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// 1. Full Dashboard Component (Your original dashboard UI)
function SafeDayDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <div>
          <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Bakersfield Conditions For</span>
          <h2 className="text-xl font-bold text-slate-800">Wednesday, Sep 30, 2026</h2>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2.5 py-1 rounded-full">
          Verified Source
        </span>
      </div>

      {/* Primary Risk Status Banner */}
      <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-emerald-800/60 px-3 py-1 rounded-full text-xs font-bold">RISK SCORE: 22 / 100</span>
            <span className="bg-emerald-800/60 px-3 py-1 rounded-full text-xs font-bold">Status: GOOD</span>
          </div>
          <h3 className="text-2xl font-bold">Safe for Outdoor Activities!</h3>
          <p className="text-emerald-100 text-sm mt-1">Great day for outdoor activities!</p>
        </div>
        <button className="bg-white text-slate-900 font-bold px-4 py-2 rounded-xl text-sm shadow hover:bg-slate-100">
          Adjust Activity & Details
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-slate-400 font-semibold">AIR QUALITY INDEX</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">42</p>
          <p className="text-xs text-slate-500 mt-1">Pollutant: PM2.5</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-slate-400 font-semibold">TEMPERATURE</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">74°F</p>
          <p className="text-xs text-slate-500 mt-1">Heat Index: 74°F</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-slate-400 font-semibold">HUMIDITY & WIND</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">35%</p>
          <p className="text-xs text-slate-500 mt-1">Wind: 6 mph</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-slate-400 font-semibold">TULE FOG ALERT</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">Clear</p>
          <p className="text-xs text-slate-500 mt-1">Road Visibility: Normal</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h4 className="font-bold text-slate-800">Custom Recommendations for Alex M. (7th Grade)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <p className="font-bold text-xs text-blue-900">HYDRATION TARGET</p>
            <p className="text-xs text-slate-600 mt-1">Drink at least 8 oz of water every 30 minutes during physical activity.</p>
          </div>
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
            <p className="font-bold text-xs text-amber-900">SUN PROTECTION</p>
            <p className="text-xs text-slate-600 mt-1">SPF 30+ sunscreen recommended. Wear wide-brim hat outdoors past 10 AM.</p>
          </div>
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
            <p className="font-bold text-xs text-amber-900">ASTHMA ACTION NOTICE</p>
            <p className="text-xs text-slate-600 mt-1">Keep rescue inhaler in backpack. Take breaks if coughing or chest feels tight.</p>
          </div>
          <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
            <p className="font-bold text-xs text-purple-900">DATA SOURCE VERIFICATION</p>
            <p className="text-xs text-slate-600 mt-1">NOAA Weather Service HNX & AirNow API. Checked: 05:18 PM.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Secondary View Pages
function TeachersView() {
  return (
    <div className="p-6 bg-white rounded-2xl border m-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">Teacher's Corner</h2>
      <p className="text-slate-600 text-sm mt-2">Classroom resources, advisories, and student notifications.</p>
    </div>
  );
}

function InviteView() {
  return (
    <div className="p-6 bg-white rounded-2xl border m-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">Invite & Connections</h2>
      <p className="text-slate-600 text-sm mt-2">Manage connected student profiles, guardian permissions, and invite codes.</p>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  const getNavItemClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-900 text-white shadow-sm' 
        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
    }`;
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="px-3 py-2">
            <h1 className="text-lg font-bold text-white">ValleyQuest</h1>
          </div>
          
          <nav className="space-y-1">
            <Link to="/" className={getNavItemClass('/')}>
              <span>🛡️</span>
              <span>Safe-Day Dashboard</span>
            </Link>
            <Link to="/teachers" className={getNavItemClass('/teachers')}>
              <span>🏫</span>
              <span>Teacher's Corner</span>
            </Link>
            <Link to="/invite" className={getNavItemClass('/invite')}>
              <span>🤝</span>
              <span>Invite & Connections</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main View Panel */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<SafeDayDashboard />} />
          <Route path="/teachers" element={<TeachersView />} />
          <Route path="/invite" element={<InviteView />} />
        </Routes>
      </main>
    </div>
  );
}


