import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// ==========================================
// 1. SAFE-DAY DASHBOARD
// ==========================================
function SafeDayDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">📅</div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">BAKERSFIELD CONDITIONS FOR</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Wednesday, Sep 30, 2026</h2>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Verified Source
          </span>
          <p className="text-xs text-slate-400 mt-1">Updated at 05:18 PM</p>
        </div>
      </div>

      <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-emerald-700/50 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">RISK SCORE: 22 / 100</span>
            <span className="bg-emerald-700/50 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">Status: GOOD</span>
          </div>
          <h3 className="text-3xl font-extrabold">Safe for Outdoor Activities!</h3>
          <p className="text-emerald-100 text-sm mt-1">Great day for outdoor activities!</p>
        </div>
        <button className="bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow hover:bg-slate-50 transition">
          Adjust Activity & Details
        </button>
      </div>

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

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">🛡️</span>
          <h4 className="font-bold text-slate-900 text-lg">Custom Recommendations for Alex M. (7th Grade)</h4>
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

// ==========================================
// 2. ACTIVITY PLANNER
// ==========================================
function ActivityPlanner() {
  const [activities, setActivities] = useState([
    { id: 1, name: 'PE Soccer Practice', time: '02:00 PM', location: 'School Field', safety: 'Safe' },
    { id: 2, name: 'Outdoor Recess', time: '10:15 AM', location: 'Courtyard', safety: 'Safe' },
  ]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const addActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setActivities([...activities, { id: Date.now(), name: title, time: time || '12:00 PM', location: 'Campus', safety: 'Safe' }]);
    setTitle('');
    setTime('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Activity Planner</h2>
        <p className="text-slate-500 text-sm mt-1">Schedule outdoor events synced with real-time air quality forecasts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Scheduled Activities</h3>
            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="flex justify-between items-center p-4 bg-slate-50 border rounded-xl">
                  <div>
                    <p className="font-bold text-slate-900">{act.name}</p>
                    <p className="text-xs text-slate-500">{act.time} • {act.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">{act.safety}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Add New Activity</h3>
          <form onSubmit={addActivity} className="space-y-3">
            <input
              type="text"
              placeholder="Activity Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-sm"
            />
            <input
              type="text"
              placeholder="Time (e.g. 03:30 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-sm"
            />
            <button type="submit" className="w-full bg-[#1b365d] text-white py-2 rounded-xl text-sm font-semibold">
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. INVITE & CONNECTIONS (FULLY EXPANDED)
// ==========================================
function InviteView() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex M.', grade: '7th Grade', school: 'Bakersfield Middle School', code: 'VQ-8842-CA', status: 'Active Account' },
    { id: 2, name: 'Maya M.', grade: '5th Grade', school: 'Bakersfield Elementary', code: 'VQ-3109-CA', status: 'Active Account' },
  ]);
  
  const [teacherCode, setTeacherCode] = useState('');
  const [teacherConnected, setTeacherConnected] = useState(false);
  const [connectedTeacherName, setConnectedTeacherName] = useState('Mrs. Davis (Science)');

  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('7th Grade');
  const [newUsername, setNewUsername] = useState('');
  const [newPass, setNewPass] = useState('');

  const [guardianEmail, setGuardianEmail] = useState('');
  const [invitedGuardians, setInvitedGuardians] = useState(['parent@valleyquest.org']);

  const handleCreateStudentAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const code = `VQ-${Math.floor(1000 + Math.random() * 9000)}-CA`;
    setStudents([...students, { id: Date.now(), name: newName, grade: newGrade, school: 'Bakersfield Unified', code, status: 'Active Account' }]);
    setNewName('');
    setNewUsername('');
    setNewPass('');
  };

  const handleConnectTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherCode.trim()) return;
    setTeacherConnected(true);
  };

  const handleInviteGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianEmail.trim()) return;
    setInvitedGuardians([...invitedGuardians, guardianEmail]);
    setGuardianEmail('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Invite & Connections</h2>
          <p className="text-slate-500 text-sm mt-1">
            Create individual student accounts, link teacher invite codes, and grant guardian access.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
          SAFE MODE ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Student Profiles */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span>🎓</span>
              <span>Connected Individual Student Profiles</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {students.map((st) => (
                <div key={st.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{st.name}</p>
                      <p className="text-xs text-slate-500">{st.grade} • {st.school}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      {st.status}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Student Sync Code:</span>
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 border rounded">
                      {st.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Individual Student Account */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span>👤</span>
              <span>Create Individual Student Account</span>
            </h3>
            <form onSubmit={handleCreateStudentAccount} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Student Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Jordan Smith"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Grade Level</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm"
                  >
                    <option>5th Grade</option>
                    <option>6th Grade</option>
                    <option>7th Grade</option>
                    <option>8th Grade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Username / Login ID</label>
                  <input
                    type="text"
                    placeholder="jordan_vq2026"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Passcode</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1b365d] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-800 transition"
              >
                Create Account & Generate Sync Code
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Column */}
        <div className="space-y-6">
          {/* Connect to Teacher Code */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span>🏫</span>
              <span>Connect to Teacher</span>
            </h3>
            <p className="text-xs text-slate-500">
              Enter a classroom code given by a teacher to share environmental safety updates.
            </p>
            {teacherConnected ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs space-y-1">
                <p className="font-bold">Connected!</p>
                <p>Classroom: {connectedTeacherName}</p>
                <button
                  onClick={() => setTeacherConnected(false)}
                  className="text-emerald-900 underline mt-1 text-[11px]"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <form onSubmit={handleConnectTeacher} className="space-y-3">
                <input
                  type="text"
                  placeholder="e.g. CLASS-7B-2026"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl text-sm uppercase font-mono tracking-wider"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-xl text-sm hover:bg-emerald-700 transition"
                >
                  Link Teacher Code
                </button>
              </form>
            )}
          </div>

          {/* Guardian Invites */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span>✉️</span>
              <span>Invite Family / Guardian</span>
            </h3>
            <p className="text-xs text-slate-500">
              Grant view privileges to parent email addresses.
            </p>
            <form onSubmit={handleInviteGuardian} className="space-y-2">
              <input
                type="email"
                placeholder="guardian@example.com"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full bg-slate-800 text-white font-semibold py-2 rounded-xl text-sm hover:bg-slate-900 transition"
              >
                Send Invite
              </button>
            </form>
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-600 mb-1">Invited Guardians:</p>
              <ul className="text-xs text-slate-500 space-y-1">
                {invitedGuardians.map((email, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{email}</span>
                    <span className="text-emerald-600 font-bold">✓ Sent</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. TEACHER'S CORNER
// ==========================================
function TeachersCorner() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Teacher's Corner</h2>
        <p className="text-slate-500 text-sm mt-1">Classroom environmental advisory tools and outdoor safety logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Classroom Roster Protection Status</h3>
          <p className="text-xs text-slate-500">24 students active in Bakersfield Middle School (Period 3 Science).</p>
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold">
            All 24 students cleared for normal outdoor recess today.
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Generate Class Invite Code</h3>
          <p className="text-xs text-slate-500">Share this code with students or parents to join your class view.</p>
          <div className="p-3 bg-slate-100 font-mono text-center font-bold text-lg rounded-xl tracking-widest text-slate-800">
            CLASS-7B-2026
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. WATER & MOVEMENT
// ==========================================
function WaterMovement() {
  const [glasses, setGlasses] = useState(4);
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Water & Movement</h2>
        <p className="text-slate-500 text-sm mt-1">Track hydration targets and daily physical movement exercises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4">
          <h3 className="font-bold text-slate-800">Hydration Tracker</h3>
          <div className="text-5xl font-black text-blue-600">{glasses} / 8</div>
          <p className="text-xs text-slate-500">Glasses of water consumed today (8 oz each)</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setGlasses(Math.min(8, glasses + 1))}
              className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm"
            >
              + Add Glass
            </button>
            <button
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm"
            >
              - Remove
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Recommended Movement Breaks</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span>🏃 10-Min Outdoor Walk</span>
              <span className="font-bold text-emerald-600">Recommended Now</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span>🧘 Indoor Light Stretch</span>
              <span className="font-bold text-slate-400">Completed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. STUDY BUDDY
// ==========================================
function StudyBuddy() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Study Buddy</h2>
        <p className="text-slate-500 text-sm mt-1">AI-assisted study prompts tailored for Central Valley science topics.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800">Quick Review Topics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 border rounded-xl bg-blue-50/30">
            <p className="font-bold text-slate-800 text-sm">Particulate Matter (PM2.5)</p>
            <p className="text-xs text-slate-500 mt-1">Learn how fine particles affect respiratory health in agricultural valleys.</p>
          </div>
          <div className="p-4 border rounded-xl bg-emerald-50/30">
            <p className="font-bold text-slate-800 text-sm">Tule Fog Science</p>
            <p className="text-xs text-slate-500 mt-1">Understand humidity, temperature inversions, and valley fog formation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. READING TRACKER
// ==========================================
function ReadingTracker() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Reading Tracker</h2>
        <p className="text-slate-500 text-sm mt-1">Log reading minutes and outdoor science articles.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800">Current Reading List</h3>
        <div className="p-4 border rounded-xl flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-900 text-sm">Ecology of the San Joaquin Valley</p>
            <p className="text-xs text-slate-500">Pages read: 45 / 120</p>
          </div>
          <button className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Log Minutes</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. STEM BOARD
// ==========================================
function STEMBoard() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">STEM Board</h2>
        <p className="text-slate-500 text-sm mt-1">Interactive STEM challenges and environmental engineering activities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-blue-600 uppercase">Challenge #1</span>
          <h4 className="font-bold text-slate-800 mt-1">Build a DIY Air Filter</h4>
          <p className="text-xs text-slate-500 mt-1">Construct a box-fan filter using HEPA materials to measure particulate collection.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase">Challenge #2</span>
          <h4 className="font-bold text-slate-800 mt-1">Solar Evaporation Test</h4>
          <p className="text-xs text-slate-500 mt-1">Measure temperature impact on water loss using solar collectors.</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. SCIENCE-FAIR COACH
// ==========================================
function ScienceFairCoach() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Science-Fair Coach</h2>
        <p className="text-slate-500 text-sm mt-1">Step-by-step hypothesis builder and project organizer.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800">Project Timeline</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl font-medium">✓ Step 1: Formulate Hypothesis</div>
          <div className="p-3 bg-blue-50 text-blue-900 rounded-xl font-bold">👉 Step 2: Collect Air Quality & Wind Data (In Progress)</div>
          <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">Step 3: Analyze Data & Plot Graphs</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. WORLD WINDOW (SPANISH)
// ==========================================
function WorldWindow() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">World Window (Español)</h2>
        <p className="text-slate-500 text-sm mt-1">Bilingual air quality reports and vocabulary builders.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800">Resumen del Aire en Español</h3>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm">
          <strong>Estado Actual:</strong> Bueno (Safe for Outdoor Activities / Seguro para actividades al aire libre).
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. WELLBEING & MOOD
// ==========================================
function WellbeingMood() {
  const [mood, setMood] = useState('😊 Energetic');
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Wellbeing & Mood</h2>
        <p className="text-slate-500 text-sm mt-1">Daily mental check-in and wellness log.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800">How are you feeling today?</h3>
        <div className="flex space-x-3">
          {['😊 Energetic', '🙂 Calm', '😐 Tired', '😷 Sensitive'].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                mood === m ? 'bg-blue-800 text-white border-blue-800' : 'bg-slate-50 text-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. CREATOR ARCADE
// ==========================================
function CreatorArcade() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Creator Arcade</h2>
        <p className="text-slate-500 text-sm mt-1">Educational mini-games on air quality and environmental stewardship.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-2xl mb-2">🎮</p>
          <h4 className="font-bold text-slate-800">Clean Air Hero</h4>
          <p className="text-xs text-slate-500 mt-1">Clear the valley fog and collect solar panels in this mini arcade game.</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. GUARDIAN & CAC TESTS
// ==========================================
function GuardianCAC() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Guardian & CAC Tests</h2>
        <p className="text-slate-500 text-sm mt-1">Compliance, access control tests, and safety audit logs.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
        <h3 className="font-bold text-slate-800">Security Audit Log</h3>
        <p className="text-xs text-emerald-700 font-semibold">✓ Parent Permission Verification: PASS</p>
        <p className="text-xs text-emerald-700 font-semibold">✓ Student Data Encryption Standard: AES-256 ACTIVE</p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT & SIDEBAR
// ==========================================
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
      {/* Top Header matching original mockup (Fig 1) */}
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
          <span className="bg-amber-500 text-slate-900 font-bold px-2 py-1 rounded">Scenario: Normal</span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Excessive</span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Unhealthy</span>
          <span className="text-slate-300 px-2 py-1 hover:bg-slate-700/50 rounded cursor-pointer">Dense</span>
          <span className="bg-blue-600/60 px-2.5 py-1 rounded text-white flex items-center space-x-1">
            <span>🔄</span> <span>Live API</span>
          </span>
        </div>
      </header>

      {/* Main Layout with White Sidebar */}
      <div className="flex flex-1">
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
                      isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<SafeDayDashboard />} />
            <Route path="/activity" element={<ActivityPlanner />} />
            <Route path="/invite" element={<InviteView />} />
            <Route path="/teachers" element={<TeachersCorner />} />
            <Route path="/water" element={<WaterMovement />} />
            <Route path="/study" element={<StudyBuddy />} />
            <Route path="/reading" element={<ReadingTracker />} />
            <Route path="/stem" element={<STEMBoard />} />
            <Route path="/science" element={<ScienceFairCoach />} />
            <Route path="/world" element={<WorldWindow />} />
            <Route path="/wellbeing" element={<WellbeingMood />} />
            <Route path="/creator" element={<CreatorArcade />} />
            <Route path="/guardian" element={<GuardianCAC />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}




