import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// ==========================================
// CENTRAL VALLEY ZIP CODE DATABASE & HELPER
// ==========================================
interface LocationContext {
  zip: string;
  city: string;
  county: string;
  airDistrict: string;
  monitoringStation: string;
  schoolDistrict: string;
  aqi: number;
  temp: number;
  pm25: number;
  fogRisk: string;
  stemEvents: { title: string; date: string; venue: string; description: string }[];
  districtAnnouncements: string[];
}

const CENTRAL_VALLEY_ZIP_DB: Record<string, LocationContext> = {
  '93301': {
    zip: '93301',
    city: 'Bakersfield',
    county: 'Kern County',
    airDistrict: 'SJVAPCD - Southern Region',
    monitoringStation: 'Bakersfield - California Ave Station',
    schoolDistrict: 'Bakersfield City SD / Kern High',
    aqi: 42,
    temp: 74,
    pm25: 10.2,
    fogRisk: 'Normal / Clear',
    stemEvents: [
      { title: 'Kern County Regional STEM Expo', date: 'Oct 14, 2026', venue: 'CSUB Science II Hall', description: 'Hands-on solar and water conservation exhibits for 5th-8th graders.' },
      { title: 'Bakersfield Youth Robotics Challenge', date: 'Nov 02, 2026', venue: 'Kern County Fairgrounds', description: 'Build autonomous field bots designed for local agriculture.' },
    ],
    districtAnnouncements: [
      'Bakersfield City SD: Early dismissal next Tuesday for staff buyback day.',
      'Kern High School District: CTE Science Fair registration closes October 25.',
    ],
  },
  '93721': {
    zip: '93721',
    city: 'Fresno',
    county: 'Fresno County',
    airDistrict: 'SJVAPCD - Central Region',
    monitoringStation: 'Fresno - Garland Station',
    schoolDistrict: 'Fresno Unified School District',
    aqi: 58,
    temp: 71,
    pm25: 15.6,
    fogRisk: 'Moderate Morning Fog',
    stemEvents: [
      { title: 'Fresno State Young Scientists Night', date: 'Oct 18, 2026', venue: 'Downing Planetarium (Fresno State)', description: 'Stargazing and air quality satellite data mapping workshops.' },
      { title: 'San Joaquin River Ecology Lab', date: 'Nov 05, 2026', venue: 'River Parkway Trust', description: 'Water quality sampling and native riparian ecosystem study.' },
    ],
    districtAnnouncements: [
      'Fresno Unified SD: Period 1 ends Oct 16. Ensure all STEM lab reports are submitted.',
      'Fresno County Superintendent of Schools: Air Quality Advisory active for morning PE.',
    ],
  },
  '93291': {
    zip: '93291',
    city: 'Visalia',
    county: 'Tulare County',
    airDistrict: 'SJVAPCD - Southern Region',
    monitoringStation: 'Visalia - N Church St Station',
    schoolDistrict: 'Visalia Unified School District',
    aqi: 38,
    temp: 72,
    pm25: 9.1,
    fogRisk: 'Normal / Clear',
    stemEvents: [
      { title: 'Tulare County Science Olympiad Prep', date: 'Oct 21, 2026', venue: 'Mooney Grove Park Learning Center', description: 'Field biology and environmental engineering trial events.' },
      { title: 'Ag-Tech Youth Innovation Lab', date: 'Nov 12, 2026', venue: 'Tulare Ag Center', description: 'Precision irrigation sensors and weather telemetry for students.' },
    ],
    districtAnnouncements: [
      'Visalia Unified SD: Outdoor Recess guidelines updated per SJVAPCD Flag Program.',
      'VUSD Science Department: High School Lab safety audits scheduled for next week.',
    ],
  },
  '95354': {
    zip: '95354',
    city: 'Modesto',
    county: 'Stanislaus County',
    airDistrict: 'SJVAPCD - Northern Region',
    monitoringStation: 'Modesto - 14th St Station',
    schoolDistrict: 'Modesto City Schools',
    aqi: 49,
    temp: 69,
    pm25: 12.0,
    fogRisk: 'Normal / Clear',
    stemEvents: [
      { title: 'Stanislaus County Youth Tech Summit', date: 'Oct 25, 2026', venue: 'Modesto Junior College West Campus', description: 'Coding air pollution sensors using microcontrollers.' },
      { title: 'Tuolumne River STEM Field Day', date: 'Nov 08, 2026', venue: 'Tuolumne River Regional Park', description: 'Soil sampling and microplastic filtration testing.' },
    ],
    districtAnnouncements: [
      'Modesto City Schools: STEM Fair project proposals due October 30.',
      'Stanislaus COE: Teacher workshop on Real-Time Air Advisory Network (RAAN) tools.',
    ],
  },
  '95202': {
    zip: '95202',
    city: 'Stockton',
    county: 'San Joaquin County',
    airDistrict: 'SJVAPCD - Northern Region',
    monitoringStation: 'Stockton - Hazelton St Station',
    schoolDistrict: 'Stockton Unified School District',
    aqi: 52,
    temp: 68,
    pm25: 13.4,
    fogRisk: 'Low Fog Advisory',
    stemEvents: [
      { title: 'Delta Science Student Symposium', date: 'Oct 29, 2026', venue: 'University of the Pacific (UOP)', description: 'Exploring Sacramento-San Joaquin Delta hydraulics and aquatic life.' },
      { title: 'Stockton Clean Energy Student Challenge', date: 'Nov 15, 2026', venue: 'Stockton Civic Center', description: 'Design wind turbine and solar collector prototypes.' },
    ],
    districtAnnouncements: [
      'Stockton Unified SD: District-wide Science & Math Night on November 4.',
      'SUSD Health Services: Air Quality index alerts synced with campus flag systems.',
    ],
  },
};

// Default fallback for unlisted Central Valley ZIP codes
const getDefaultLocationData = (zip: string): LocationContext => ({
  zip,
  city: 'Central Valley Community',
  county: 'San Joaquin Valley',
  airDistrict: 'SJVAPCD - Valley Basin',
  monitoringStation: `Station Near ${zip}`,
  schoolDistrict: 'Local Central Valley School District',
  aqi: 45,
  temp: 73,
  pm25: 11.0,
  fogRisk: 'Normal / Clear',
  stemEvents: [
    { title: 'Regional Central Valley STEM Challenge', date: 'Oct 20, 2026', venue: 'Regional Education Center', description: 'Hands-on environmental science and agricultural tech projects.' },
  ],
  districtAnnouncements: [
    'Local District Advisory: Outdoor activity recommendations based on SJVAPCD guidelines.',
  ],
});

// User Profile Type definition
interface UserProfile {
  name: string;
  grade: string;
  school: string;
  username: string;
}

// ==========================================
// LOGIN & SIGN UP PAGE COMPONENT
// ==========================================
function AuthPage({ onLogin }: { onLogin: (user: UserProfile) => void }) {
  const [isSignUp, setIsSignUp] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('alex_m');
  const [loginPassword, setLoginPassword] = useState('valley2026');

  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('7th Grade');
  const [school, setSchool] = useState('Central Valley Middle School');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername.trim().toLowerCase() === 'alex_m' && loginPassword === 'valley2026') {
      onLogin({
        name: 'Alex M.',
        grade: '7th Grade',
        school: 'Bakersfield Middle School',
        username: 'alex_m',
      });
    } else {
      setError('Invalid username or password. (Hint: Use demo login or create a new account)');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !regUsername.trim() || !regPassword) {
      setError('Please fill out all required fields.');
      return;
    }

    onLogin({
      name: fullName.trim(),
      grade: grade,
      school: school.trim() || 'Central Valley Middle School',
      username: regUsername.trim().toLowerCase(),
    });
  };

  const handleQuickLogin = (student: UserProfile) => {
    onLogin(student);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      {/* App Branding */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 text-slate-900 font-black text-2xl rounded-2xl shadow-lg">
          VQ
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-wide">ValleyQuest</h1>
        <p className="text-slate-400 text-sm">Central Valley Environmental & Learning Portal</p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 space-y-6">
        {/* Toggle Mode Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create New Account
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 text-center">
            {isSignUp ? 'Create Student Account' : 'Student Portal Sign In'}
          </h2>
          <p className="text-xs text-slate-500 text-center mt-1">
            {isSignUp
              ? 'Register to track ZIP-specific air quality, hydration, and science activities'
              : 'Enter your credentials to access your Safe-Day Dashboard'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {!isSignUp ? (
          /* SIGN IN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Username / Sync ID
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => {
                  setLoginUsername(e.target.value);
                  setError('');
                }}
                placeholder="e.g. alex_m"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Passcode
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b365d] hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex M."
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Grade Level
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium"
                >
                  <option>5th Grade</option>
                  <option>6th Grade</option>
                  <option>7th Grade</option>
                  <option>8th Grade</option>
                  <option>High School</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. Fresno Middle"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Choose Username
              </label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="e.g. alex_m"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Create Passcode
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md mt-2"
            >
              Create Account & Launch Portal
            </button>
          </form>
        )}

        {/* Quick Demo Login Profiles */}
        {!isSignUp && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-semibold text-center mb-3 uppercase tracking-wider">
              Quick Demo Login Profiles
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    name: 'Alex M.',
                    grade: '7th Grade',
                    school: 'Bakersfield Middle School',
                    username: 'alex_m',
                  })
                }
                className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-blue-50/50 transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                    AM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-900">Alex M.</p>
                    <p className="text-[10px] text-slate-400">7th Grade • Bakersfield Middle School</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600 font-bold">Sign In →</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    name: 'Maya M.',
                    grade: '5th Grade',
                    school: 'Fresno Unified School',
                    username: 'maya_m',
                  })
                }
                className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-emerald-50/50 transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    MM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Maya M.</p>
                    <p className="text-[10px] text-slate-400">5th Grade • Fresno Unified</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 font-bold">Sign In →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 1. SAFE-DAY DASHBOARD (ZIP CODE AWARE)
// ==========================================
function SafeDayDashboard({
  currentUser,
  locationData,
}: {
  currentUser: UserProfile;
  locationData: LocationContext;
}) {
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'GOOD', color: 'bg-emerald-500', text: 'Safe for Outdoor Activities!' };
    if (aqi <= 100) return { label: 'MODERATE', color: 'bg-amber-500', text: 'Acceptable; sensitive students limit outdoor strain.' };
    return { label: 'UNHEALTHY', color: 'bg-red-500', text: 'Move activities indoors or reduce exertion.' };
  };

  const status = getAQIStatus(locationData.aqi);

  return (
    <div className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">📍</div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                {locationData.city.toUpperCase()} ({locationData.zip}) • {locationData.county.toUpperCase()}
              </p>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                {locationData.schoolDistrict}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
              Wednesday, Sep 30, 2026
            </h2>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Station: {locationData.monitoringStation}
          </span>
          <p className="text-xs text-slate-400 mt-1">Air Basin: {locationData.airDistrict}</p>
        </div>
      </div>

      {/* Main Alert Card */}
      <div className={`${status.color} text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-black/20 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">
              ZIP {locationData.zip} AIR QUALITY STATUS
            </span>
            <span className="bg-black/20 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide">
              Status: {status.label}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold">{status.text}</h3>
          <p className="text-white/90 text-sm mt-1">
            Real-Time Air Advisory Network (RAAN) synced for {locationData.city}, CA.
          </p>
        </div>
        <button className="bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow hover:bg-slate-50 transition shrink-0">
          Adjust Activity & Details
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">LOCAL AQI</span>
            <span>💨</span>
          </div>
          <p className="text-4xl font-black text-slate-900 mt-2">{locationData.aqi}</p>
          <p className="text-xs text-slate-500 mt-1">
            Pollutant: <span className="font-semibold text-slate-700">PM2.5 ({locationData.pm25} µg/m³)</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">TEMPERATURE</span>
            <span>🌡️</span>
          </div>
          <p className="text-4xl font-black text-slate-900 mt-2">{locationData.temp}°F</p>
          <p className="text-xs text-slate-500 mt-1">
            Heat Index: <span className="font-semibold text-slate-700">{locationData.temp}°F</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">TULE FOG RISK</span>
            <span>👁️</span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{locationData.fogRisk}</p>
          <p className="text-xs text-slate-500 mt-1">
            Road Visibility: <span className="font-semibold text-slate-700">Normal</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">SCHOOL DISTRICT</span>
            <span>🏫</span>
          </div>
          <p className="text-base font-bold text-slate-900 mt-2 line-clamp-1">{locationData.schoolDistrict}</p>
          <p className="text-xs text-slate-500 mt-1">
            County: <span className="font-semibold text-slate-700">{locationData.county}</span>
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">🛡️</span>
          <h4 className="font-bold text-slate-900 text-lg">
            Custom Recommendations for {currentUser.name} ({currentUser.grade}) in ZIP {locationData.zip}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-blue-900 uppercase tracking-wider">HYDRATION TARGET</p>
            <p className="text-xs text-slate-600 mt-1">
              Drink at least 8 oz of water every 30 minutes during physical activity in {locationData.city}.
            </p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-amber-900 uppercase tracking-wider">DISTRICT ADVISORY</p>
            <p className="text-xs text-slate-600 mt-1">
              Follow {locationData.schoolDistrict} air quality flag protocols for outdoor PE & recess.
            </p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-amber-900 uppercase tracking-wider">ASTHMA ACTION NOTICE</p>
            <p className="text-xs text-slate-600 mt-1">
              Keep rescue inhaler in backpack. Take breaks if coughing or chest feels tight.
            </p>
          </div>
          <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-xl">
            <p className="font-bold text-xs text-purple-900 uppercase tracking-wider">DATA SOURCE VERIFICATION</p>
            <p className="text-xs text-slate-600 mt-1">
              {locationData.airDistrict} ({locationData.monitoringStation}). Checked: 05:18 PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. ACTIVITY PLANNER
// ==========================================
function ActivityPlanner({ locationData }: { locationData: LocationContext }) {
  const [activities, setActivities] = useState([
    { id: 1, name: 'PE Field Activity', time: '02:00 PM', location: locationData.schoolDistrict, safety: 'Safe' },
    { id: 2, name: 'Outdoor Recess', time: '10:15 AM', location: 'Campus Courtyard', safety: 'Safe' },
  ]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const addActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setActivities([
      ...activities,
      { id: Date.now(), name: title, time: time || '12:00 PM', location: `${locationData.city} Campus`, safety: 'Safe' },
    ]);
    setTitle('');
    setTime('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Activity Planner - {locationData.city}</h2>
        <p className="text-slate-500 text-sm mt-1">
          Schedule outdoor events synced with real-time air quality forecasts for ZIP {locationData.zip}.
        </p>
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
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {act.safety}
                  </span>
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
// 3. STEM BOARD (ZIP / REGION TAILORED)
// ==========================================
function STEMBoard({ locationData }: { locationData: LocationContext }) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">STEM Board & Local Events</h2>
          <p className="text-slate-500 text-sm mt-1">
            Science, Technology, Engineering, and Math challenges tailored for {locationData.city} ({locationData.county}).
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
          ZIP {locationData.zip} MATCH
        </span>
      </div>

      {/* Local STEM Events */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center space-x-2">
          <span>📅</span>
          <span>Upcoming STEM Events in {locationData.city} & {locationData.county}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationData.stemEvents.map((evt, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 text-sm">{evt.title}</h4>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                  {evt.date}
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-800">📍 {evt.venue}</p>
              <p className="text-xs text-slate-600">{evt.description}</p>
              <button className="mt-2 w-full bg-slate-800 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-slate-900 transition">
                Register Student
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hands-on Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-blue-600 uppercase">Valley Challenge #1</span>
          <h4 className="font-bold text-slate-800 mt-1">Build a DIY Air Filter</h4>
          <p className="text-xs text-slate-500 mt-1">Construct a box-fan filter using MERV 13 materials to measure particulate collection in {locationData.city}.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase">Valley Challenge #2</span>
          <h4 className="font-bold text-slate-800 mt-1">Agricultural Irrigation Sensor</h4>
          <p className="text-xs text-slate-500 mt-1">Design a soil moisture telemetry sensor for Central Valley farm water conservation.</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. TEACHER'S CORNER (DISTRICT TAILORED)
// ==========================================
function TeachersCorner({ locationData }: { locationData: LocationContext }) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Teacher's Corner</h2>
        <p className="text-slate-500 text-sm mt-1">
          Classroom environmental advisory tools for <strong className="text-slate-800">{locationData.schoolDistrict}</strong> ({locationData.zip}).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Local District Calendar Notices</h3>
          <ul className="space-y-2">
            {locationData.districtAnnouncements.map((note, i) => (
              <li key={i} className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 font-medium">
                📢 {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Generate Class Invite Code</h3>
          <p className="text-xs text-slate-500">Share this code with students or parents to join your class view.</p>
          <div className="p-3 bg-slate-100 font-mono text-center font-bold text-lg rounded-xl tracking-widest text-slate-800">
            CLASS-{locationData.zip}-2026
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. INVITE & CONNECTIONS
// ==========================================
function InviteView() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex M.', grade: '7th Grade', school: 'Bakersfield Middle School', code: 'VQ-8842-CA', status: 'Active Account' },
    { id: 2, name: 'Maya M.', grade: '5th Grade', school: 'Fresno Unified', code: 'VQ-3109-CA', status: 'Active Account' },
  ]);

  const [teacherCode, setTeacherCode] = useState('');
  const [teacherConnected, setTeacherConnected] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('7th Grade');

  const handleCreateStudentAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const code = `VQ-${Math.floor(1000 + Math.random() * 9000)}-CA`;
    setStudents([...students, { id: Date.now(), name: newName, grade: newGrade, school: 'Central Valley School', code, status: 'Active Account' }]);
    setNewName('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Invite & Connections</h2>
        <p className="text-slate-500 text-sm mt-1">
          Create student accounts, link teacher invite codes, and grant guardian access across Central Valley districts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Connected Student Profiles</h3>
          <div className="space-y-3">
            {students.map((st) => (
              <div key={st.id} className="p-4 border rounded-xl bg-slate-50/50 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{st.name}</p>
                  <p className="text-xs text-slate-500">{st.grade} • {st.school}</p>
                </div>
                <span className="font-mono text-xs font-bold bg-white px-2 py-1 border rounded">{st.code}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800">Add New Student</h3>
          <form onSubmit={handleCreateStudentAccount} className="space-y-3">
            <input
              type="text"
              placeholder="Student Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm"
            />
            <button type="submit" className="w-full bg-[#1b365d] text-white py-2 rounded-xl text-sm font-semibold">
              Create Student Sync ID
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// OTHER VIEWS
// ==========================================
function WaterMovement() {
  const [glasses, setGlasses] = useState(4);
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Water & Movement</h2>
        <p className="text-slate-500 text-sm mt-1">Track hydration targets and daily physical movement exercises.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4 max-w-md mx-auto">
        <h3 className="font-bold text-slate-800">Hydration Tracker</h3>
        <div className="text-5xl font-black text-blue-600">{glasses} / 8</div>
        <p className="text-xs text-slate-500">Glasses of water consumed today (8 oz each)</p>
        <div className="flex justify-center space-x-3">
          <button onClick={() => setGlasses(Math.min(8, glasses + 1))} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm">
            + Add Glass
          </button>
          <button onClick={() => setGlasses(Math.max(0, glasses - 1))} className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm">
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function StudyBuddy() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Study Buddy</h2>
        <p className="text-slate-500 text-sm mt-1">AI-assisted study prompts tailored for Central Valley science topics.</p>
      </div>
    </div>
  );
}

function ReadingTracker() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Reading Tracker</h2>
        <p className="text-slate-500 text-sm mt-1">Log reading minutes and outdoor science articles.</p>
      </div>
    </div>
  );
}

function ScienceFairCoach() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Science-Fair Coach</h2>
        <p className="text-slate-500 text-sm mt-1">Step-by-step hypothesis builder and project organizer.</p>
      </div>
    </div>
  );
}

function WorldWindow() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">World Window (Español)</h2>
        <p className="text-slate-500 text-sm mt-1">Bilingual air quality reports and vocabulary builders.</p>
      </div>
    </div>
  );
}

function WellbeingMood() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Wellbeing & Mood</h2>
        <p className="text-slate-500 text-sm mt-1">Daily mental check-in and wellness log.</p>
      </div>
    </div>
  );
}

function CreatorArcade() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Creator Arcade</h2>
        <p className="text-slate-500 text-sm mt-1">Educational mini-games on air quality and environmental stewardship.</p>
      </div>
    </div>
  );
}

function GuardianCAC() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Guardian & CAC Tests</h2>
        <p className="text-slate-500 text-sm mt-1">Compliance, access control tests, and safety audit logs.</p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentZip, setCurrentZip] = useState('93301');
  const [customZipInput, setCustomZipInput] = useState('');
  const location = useLocation();

  if (!user) {
    return <AuthPage onLogin={(loggedUser) => setUser(loggedUser)} />;
  }

  // Retrieve ZIP location context
  const locationData = CENTRAL_VALLEY_ZIP_DB[currentZip] || getDefaultLocationData(currentZip);

  const handleCustomZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customZipInput.trim().length === 5) {
      setCurrentZip(customZipInput.trim());
      setCustomZipInput('');
    }
  };

  const navItems = [
    { path: '/', label: 'Safe-Day Dashboard', icon: '🛡️', badge: null },
    { path: '/activity', label: 'Activity Planner', icon: '📅', badge: null },
    { path: '/invite', label: 'Invite & Connections', icon: '🤝', badge: 'SAFE' },
    { path: '/teachers', label: "Teacher's Corner", icon: '🏫', badge: null },
    { path: '/water', label: 'Water & Movement', icon: '💧', badge: null },
    { path: '/study', label: 'Study Buddy', icon: '🧠', badge: null },
    { path: '/reading', label: 'Reading Tracker', icon: '📖', badge: null },
    { path: '/stem', label: 'STEM Board & Events', icon: '⚛️', badge: 'ZIP' },
    { path: '/science', label: 'Science-Fair Coach', icon: '💡', badge: null },
    { path: '/world', label: 'World Window (Spanish)', icon: '🌐', badge: null },
    { path: '/wellbeing', label: 'Wellbeing & Mood', icon: '😊', badge: null },
    { path: '/creator', label: 'Creator Arcade', icon: '🎮', badge: null },
    { path: '/guardian', label: 'Guardian & CAC Tests', icon: '🔒', badge: null },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#1b365d] text-white px-6 py-3 flex flex-wrap justify-between items-center gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 text-slate-900 font-black px-2 py-1 rounded text-sm tracking-tight">
            VQ
          </div>
          <span className="font-bold text-lg tracking-wide">ValleyQuest</span>
          <span className="text-xs text-slate-300 hidden lg:inline border-l border-slate-700 pl-3">
            Central Valley Air & STEM Network
          </span>
        </div>

        {/* Central Valley ZIP Selector Switcher */}
        <div className="flex items-center bg-slate-800/90 p-1.5 rounded-xl border border-slate-700 space-x-2 text-xs">
          <span className="text-amber-400 font-bold px-1 flex items-center space-x-1">
            <span>📍</span> <span>ZIP:</span>
          </span>
          <select
            value={currentZip}
            onChange={(e) => setCurrentZip(e.target.value)}
            className="bg-slate-900 text-white font-bold px-2 py-1 rounded border border-slate-700 focus:outline-none"
          >
            <option value="93301">Bakersfield (93301)</option>
            <option value="93721">Fresno (93721)</option>
            <option value="93291">Visalia (93291)</option>
            <option value="95354">Modesto (95354)</option>
            <option value="95202">Stockton (95202)</option>
          </select>

          <form onSubmit={handleCustomZipSubmit} className="hidden sm:flex items-center space-x-1">
            <input
              type="text"
              placeholder="Other ZIP"
              maxLength={5}
              value={customZipInput}
              onChange={(e) => setCustomZipInput(e.target.value)}
              className="w-16 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-700 placeholder-slate-500 font-mono"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded text-[11px]"
            >
              Set
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="border-l border-slate-700 pl-4 flex items-center space-x-3">
            <div className="text-right">
              <p className="font-bold text-white text-xs">{user.name}</p>
              <p className="text-[10px] text-slate-300">{user.grade}</p>
            </div>
            <button
              onClick={() => setUser(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs font-semibold border border-slate-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
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
            <Route path="/" element={<SafeDayDashboard currentUser={user} locationData={locationData} />} />
            <Route path="/activity" element={<ActivityPlanner locationData={locationData} />} />
            <Route path="/invite" element={<InviteView />} />
            <Route path="/teachers" element={<TeachersCorner locationData={locationData} />} />
            <Route path="/water" element={<WaterMovement />} />
            <Route path="/study" element={<StudyBuddy />} />
            <Route path="/reading" element={<ReadingTracker />} />
            <Route path="/stem" element={<STEMBoard locationData={locationData} />} />
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







