import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// --- MAIN DASHBOARD VIEW (Fig 1 matching) ---
function SafeDayDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Conditions Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            📅
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              BAKERSFIELD CONDITIONS FOR
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
              Wednesday, Sep 30, 2026
            </h2>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Verified Source
          </span>
          <p className="text-xs text-slate-400 mt-1">Updated at 05:18 PM</p>
        </div>
      </div>

      {/* Risk Banner */}
      <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-emerald-700/50 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">
              RISK SCORE: 22 / 100
            </span>
            <span className="bg-emerald-700/50 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">
              Status: GOOD
            </span>
          </div>
          <h3 className="text-3xl font-extrabold">Safe for Outdoor Activities!</h3>
          <p className="text-emerald-100 text-sm mt-1">Great day for outdoor activities!</p>
        </div>
        <button className="bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow hover:bg-slate-50 transition">
          Adjust Activity & Details
        </button>
      </div>

      {/* Weather/AQI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">AIR QUALITY INDEX</span>
            <span>💨</span>
          </div>
          <p className="text-4xl font-black text-slate-900 mt-2">42</p>
          <p className="text-xs text-slate-500 mt-1">Pollutant: <span className="font-semibold text-slate-700">PM2.5</span></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">TEMPERATURE</span>
            <span>🌡️</span>
          </div>
          <p className="text-4xl font-black text-slate-900 mt-2">74°F</p>
          <p className="text-xs text-slate-500 mt-1">Heat Index: <span className="font-semibold text-slate-700">74°F</span></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">HUMIDITY & WIND</span>
            <span>💧</span>
          </div>
          <p className="text-4xl font-black text-slate-900 mt-2">35%</p>
          <p className="text-xs text-slate-500 mt-1">Wind: <span className="font-semibold text-slate-700">6 mph</span></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">TULE FOG ALERT</span>
            <span>👁️</span>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">Clear</p>
          <p className="text-xs text-slate-500 mt-1">Road Visibility: <span className="font-semibold text-slate-700">Normal</span></p>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">🛡️</span>
          <h4 className="font-bold text-slate-900 text-lg">
            Custom Recommendations for Alex M. (7th Grade)
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-blue-900 uppercase tracking-wider">HYDRATION TARGET</p>
            <p className="text-xs text-slate-600 mt-1">Drink at least 8 oz of water every 30 minutes during physical activity.</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-amber-900 uppercase tracking-wider">SUN PROTECTION</p>
            <p className="text-xs text-slate-600 mt-1">SPF 30+ sunscreen recommended. Wear wide-brim hat outdoors past 10 AM.</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-amber-900 uppercase tracking-wider">ASTHMA ACTION NOTICE</p>
            <p className="text-xs text-slate-600 mt-1">Keep rescue inhaler in backpack. Take breaks if coughing or chest feels tight.</p>
          </div>
          <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-purple-900 uppercase tracking-wider">DATA SOURCE VERIFICATION</p>
            <p className="text-xs text-slate-600 mt-1">NOAA Weather Service HNX & AirNow API. Checked: 05:18 PM.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- INVITE & CONNECTIONS VIEW (Full functionality for Fig 3) ---
function InviteView() {
  const [inviteCode, setInviteCode] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex M.', grade: '7th Grade', school: 'Bakersfield Middle School', status: 'Connected', code: 'VQ-8842-CA' }
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('7th Grade');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newEntry = {
      id: Date.now(),
      name: newStudentName,
      grade: newStudentGrade,
      school: 'Bakersfield Middle School',
      status: 'Connected',
      code: `VQ-${Math.floor(1000 + Math.random() * 9000)}-CA`
    };
    setStudents([...students, newEntry]);
    setNewStudentName('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Invite & Connections</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage connected student profiles, guardian permissions, and link accounts with teacher invites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Profiles List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <span>🎓</span>
              <span>Connected Student Accounts</span>
            </h3>
            
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-xl bg-slate-50/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.grade} • {student.school}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {student.status}
                    </span>
                    <p className="text-xs text-slate-400 font-mono mt-1">Code: {student.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Student Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center space-x-2">
              <span>➕</span>
              <span>Add New Student Connection</span>
            </h3>
            <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Student Name (e.g. Maya M.)"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 sm:col-span-2"
              />
              <button
                type="submit"
                className="bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-blue-900 transition"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>

        {/* Join Class/Teacher Invite Code Card */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center space-x-2">
              <span>🔑</span>
              <span>Redeem Teacher Invite Code</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the 6-character classroom code provided by your teacher to sync outdoor safety recommendations.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="e.g. CLASS-2026"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-xl text-sm uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => {
                  if (inviteCode.trim()) {
                    alert(`Successfully connected using code: ${inviteCode}`);
                    setInviteCode('');
                  }
                }}
                className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-emerald-700 transition"
              >
                Connect to Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PLACEHOLDER VIEWS FOR OTHER NAV ITEMS ---
function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">This section is currently under development.</p>
      </div>
    </div>
  );
}

// --- MAIN LAYOUT (Matches Fig 1 Header and Sidebar) ---
export default function App() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Safe-Day Dashboard', icon: '🛡️', badge: null },
    { path: '/activity', label: 'Activity Planner', icon: '📅', badge: null },
    { path: '/invite', label: 'Invite & Connections', icon: '🤝', badge: 'SAFE' },
    { path: '/teachers', label: "Teacher's Corner", icon: '🏫', badge: null },
    { path: '/water', label: 'Water & Movement', icon: '💧', badge: null },
    { path: '/study', label: 'Study Buddy', icon: '🧠', badge: null },
    { path: '/reading', label: 'Reading Tracker', icon: '📖', badge: null },
    { path: '/stem', label: 'STEM Board', icon: '⚛️', badge: null },
    { path: '/science', label: 'Science-Fair Coach', icon: '💡', badge: null },
    { path: '/world', label: 'World Window (Spanish)', icon: '🌐', badge: null },
    { path: '/wellbeing', label: 'Wellbeing & Mood', icon: '😊', badge: null },
    { path: '/creator', label: 'Creator Arcade', icon: '🎮', badge: null },
    { path: '/guardian', label: 'Guardian & CAC Tests', icon: '🔒', badge: null },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* 1. Top Navy Navigation Bar (Matching Fig 1) */}
      <header className="bg-[#1b365d] text-white px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 text-slate-900 font-black px-2 py-1 rounded text-sm tracking-tight">
            VQ
          </div>
          <span className="font-bold text-lg tracking-wide">ValleyQuest</span>
          <span className="text-xs text-slate-300 ml-4 hidden sm:inline">
            📅 Wednesday, Sep 30, 2026 • 05:18 PM
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-amber-500 text-slate-900 font-bold px-2 py-1 rounded">
            Scenario: Normal
          </span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Excessive</span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Unhealthy</span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Dense</span>
          <span className="bg-blue-600/60 px-2.5 py-1 rounded text-white flex items-center space-x-1">
            <span>🔄</span> <span>Live API</span>
          </span>
        </div>
      </header>

      {/* 2. Main Body with White Sidebar and Dynamic Content */}
      <div className="flex flex-1">
        {/* White Left Sidebar (Matching Fig 1) */}
        <aside className="w-64 bg-white border-r border-slate-200/80 p-4 space-y-1 shrink-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1b365d] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      isActive
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </aside>

        {/* 3. Main Content Panel */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<SafeDayDashboard />} />
            <Route path="/activity" element={<PlaceholderView title="Activity Planner" />} />
            <Route path="/invite" element={<InviteView />} />
            <Route path="/teachers" element={<PlaceholderView title="Teacher's Corner" />} />
            <Route path="/water" element={<PlaceholderView title="Water & Movement" />} />
            <Route path="/study" element={<PlaceholderView title="Study Buddy" />} />
            <Route path="/reading" element={<PlaceholderView title="Reading Tracker" />} />
            <Route path="/stem" element={<PlaceholderView title="STEM Board" />} />
            <Route path="/science" element={<PlaceholderView title="Science-Fair Coach" />} />
            <Route path="/world" element={<PlaceholderView title="World Window (Spanish)" />} />
            <Route path="/wellbeing" element={<PlaceholderView title="Wellbeing & Mood" />} />
            <Route path="/creator" element={<PlaceholderView title="Creator Arcade" />} />
            <Route path="/guardian" element={<PlaceholderView title="Guardian & CAC Tests" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}



