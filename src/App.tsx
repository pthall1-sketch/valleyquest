import React, { useState, useEffect } from 'react';
import { 
  Shield, Calendar, Users, Droplets, Heart, BookOpen, 
  Award, FlaskConical, Globe, Gamepad2, Plus, Share2, 
  ExternalLink, Search, UserCheck
} from 'lucide-react';

export default function ValleyQuestApp() {
  // State management
  const [userRole, setUserRole] = useState('student'); // 'student' or 'teacher'
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState('');
  
  // Dynamic Date Setup
  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  // Integrated Activity, Hydration & Wellbeing State
  const [wellnessSubTab, setWellnessSubTab] = useState('activities');
  const [activities, setActivities] = useState([
    { id: 1, name: 'PE Soccer Practice', time: '02:00 PM', location: 'School Field', status: 'Safe' },
    { id: 2, name: 'Outdoor Recess', time: '10:15 AM', location: 'Courtyard', status: 'Safe' }
  ]);
  const [newActivity, setNewActivity] = useState({ name: '', time: '' });
  
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [movementMinutes, setMovementMinutes] = useState(20);
  
  const [moodLogs, setMoodLogs] = useState([]);
  const [newMood, setNewMood] = useState('😊 Great');
  const [moodNote, setMoodNote] = useState('');

  // Reading Tracker State
  const [readingGenre, setReadingGenre] = useState('Science Fiction');
  const [userAgeGroup, setUserAgeGroup] = useState('Middle School (11-14)');
  const [readingList, setReadingList] = useState([
    { id: 1, title: 'Ecology of the San Joaquin Valley', pagesRead: 45, totalPages: 120 }
  ]);

  // Recommendations Database
  const bookRecommendations = {
    'Science Fiction': [
      { title: 'The Wild Robot', author: 'Peter Brown', library: 'Kern County Library - Main Branch', online: 'OverDrive / Libby App' },
      { title: 'A Wrinkle in Time', author: 'Madeleine L\'Engle', library: 'Bakersfield City Library', online: 'Project Gutenberg / Internet Archive' }
    ],
    'STEM & Environment': [
      { title: 'The Boy Who Harnessed the Wind', author: 'William Kamkwamba', library: 'Kern County Library - Beale Branch', online: 'Epic! Digital Library' },
      { title: 'Girls Who Code: On the Grid', author: 'Reshma Saujani', library: 'Kern County Library', online: 'Sora App' }
    ]
  };

  // Study Buddy State
  const [studyGroups, setStudyGroups] = useState([
    { id: 1, subject: '8th Grade Science Fair Prep', members: 3, nextSession: 'Tomorrow 4:00 PM', code: 'STUDY-99' }
  ]);

  // STEM Board Events
  const [selectedCounty, setSelectedCounty] = useState('Kern');
  const countyStemWebsites = {
    'Kern': { url: 'https://kern.org/student-events/', events: ['Kern County Science Fair', 'Robotics Showcase', 'Math Bowl'] },
    'Fresno': { url: 'https://www.fcoe.org/student-events', events: ['Central Valley STEM Competition', 'Fresno County Science Olympiad'] },
    'Tulare': { url: 'https://www.tcoe.org/StudentEvents', events: ['Tulare County Science & Engineering Fair'] }
  };

  // Science Fair Coach State
  const [scienceProject, setScienceProject] = useState({
    title: 'Air Quality & Wind Patterns in Bakersfield',
    step: 'Step 2: Collect Air Quality Data',
    notes: 'Gathered sensor logs for September.',
    sharedWithTeacher: true,
    feedback: ['Teacher: Great progress! Make sure to chart morning vs afternoon levels.']
  });
  const [newFeedback, setNewFeedback] = useState('');

  // World Window Language State
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const languageData = {
    Spanish: { greeting: '¡Hola! Resumen del Aire', status: 'Estado Actual: Bueno (Safe for Outdoor Activities / Seguro para actividades al aire libre).' },
    French: { greeting: 'Bonjour! Résumé de l\'air', status: 'Statut Actuel: Bon (Safe for Outdoor Activities / Bon pour les activités de plein air).' },
    Arabic: { greeting: 'مرحبا! ملخص جودة الهواء', status: 'الحالة الحالية: جيد (آمن للأنشطة الخارجية).' },
    Hindi: { greeting: 'नमस्ते! वायु गुणवत्ता सारांश', status: 'वर्तमान स्थिति: अच्छी (बाहरी गतिविधियों के लिए सुरक्षित)।' }
  };

  // Creator Arcade Links
  const [arcadeGames, setArcadeGames] = useState([
    { title: 'Clean Air Hero', url: 'https://scratch.mit.edu/projects/sample1', creator: 'Alex M.' }
  ]);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameUrl, setNewGameUrl] = useState('');

  // Handlers
  const handleAddActivity = () => {
    if (newActivity.name && newActivity.time) {
      setActivities([...activities, { id: Date.now(), name: newActivity.name, time: newActivity.time, location: 'School Grounds', status: 'Safe' }]);
      setNewActivity({ name: '', time: '' });
    }
  };

  const handleAddGame = () => {
    if (newGameTitle && newGameUrl) {
      setArcadeGames([...arcadeGames, { title: newGameTitle, url: newGameUrl, creator: 'Current User' }]);
      setNewGameTitle('');
      setNewGameUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 text-slate-900 font-black px-2 py-1 rounded text-lg">VQ</div>
          <span className="font-bold text-xl tracking-wide">ValleyQuest</span>
          <span className="text-slate-400 text-xs hidden md:inline">| Central Valley Air & STEM Network</span>
        </div>
        
        {/* Role Toggle & Header Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button 
              onClick={() => setUserRole('student')} 
              className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${userRole === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              Student View
            </button>
            <button 
              onClick={() => setUserRole('teacher')} 
              className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${userRole === 'teacher' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              Teacher View
            </button>
          </div>

          <div className="bg-slate-800 text-xs px-3 py-1.5 rounded-md flex items-center space-x-2 border border-slate-700">
            <span>📍 ZIP: Bakersfield (93301)</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-slate-900 text-slate-300 p-4 space-y-2 border-t border-slate-800">
          <button onClick={() => setSelectedTab('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Shield className="w-4 h-4" /> <span>Safe-Day Dashboard</span>
          </button>

          {/* Conditional Screen based on Role */}
          {userRole === 'teacher' ? (
            <button onClick={() => setSelectedTab('teacher_corner')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'teacher_corner' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <Users className="w-4 h-4" /> <span>Teacher's Corner & Invites</span>
            </button>
          ) : (
            <button onClick={() => setSelectedTab('invite_friends')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'invite_friends' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <Share2 className="w-4 h-4" /> <span>Invite Friends</span>
            </button>
          )}

          {/* Merged Activity, Hydration/Movement & Wellbeing Tab */}
          <button onClick={() => setSelectedTab('wellness')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'wellness' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Heart className="w-4 h-4" /> <span>Activity & Wellbeing</span>
          </button>

          <button onClick={() => setSelectedTab('study_buddy')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'study_buddy' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Users className="w-4 h-4" /> <span>Study Buddy</span>
          </button>

          <button onClick={() => setSelectedTab('reading')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'reading' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <BookOpen className="w-4 h-4" /> <span>Reading Tracker</span>
          </button>

          <button onClick={() => setSelectedTab('stem_board')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'stem_board' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Award className="w-4 h-4" /> <span>STEM Board & Events</span>
          </button>

          <button onClick={() => setSelectedTab('science_fair')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'science_fair' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <FlaskConical className="w-4 h-4" /> <span>Science-Fair Coach</span>
          </button>

          <button onClick={() => setSelectedTab('world_window')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'world_window' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Globe className="w-4 h-4" /> <span>World Window</span>
          </button>

          <button onClick={() => setSelectedTab('creator_arcade')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${selectedTab === 'creator_arcade' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
            <Gamepad2 className="w-4 h-4" /> <span>Creator Arcade</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Top Date Banner (Dynamic Current Date) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Central Valley Community (93311)</span>
              <h1 className="text-2xl font-bold text-slate-800">{currentDate}</h1>
            </div>
            <span className="bg-blue-50 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full border border-blue-200">
              Local Central Valley School District
            </span>
          </div>

          {/* 1. Dashboard View */}
          {selectedTab === 'dashboard' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Safe-Day Overview</h2>
              <p className="text-slate-600 text-sm">Real-time air quality metrics and environmental activity recommendations for today.</p>
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
                🌱 Air Quality Index (AQI): 42 - Good. Safe for all outdoor activities today!
              </div>
            </div>
          )}

          {/* 2. Teacher's Corner (Visible ONLY to Teacher Login) */}
          {selectedTab === 'teacher_corner' && userRole === 'teacher' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-1">Teacher's Administration & Roster</h2>
                <p className="text-slate-500 text-sm mb-4">Manage student profiles, view class progress, and generate class sync codes.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h3 className="font-bold text-sm">Classroom Code: CLASS-7B-2026</h3>
                    <p className="text-xs text-slate-500 mt-1">24 Active Students Linked</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h3 className="font-bold text-sm">Pending Guardian Invites</h3>
                    <p className="text-xs text-slate-500 mt-1">3 Invitations Awaiting Approval</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Invite Friends (Student Version of Connections) */}
          {selectedTab === 'invite_friends' && userRole === 'student' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Invite Friends to ValleyQuest</h2>
              <p className="text-slate-500 text-sm mb-6">Connect with classmates to share study sessions and collaborate on projects.</p>
              <div className="flex gap-3 max-w-md">
                <input type="email" placeholder="Enter friend's email address..." className="flex-1 p-2.5 border border-slate-300 rounded-lg text-sm" />
                <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">Send Invite</button>
              </div>
            </div>
          )}

          {/* 4. Merged Tab: Activity Planner, Water & Movement, Wellbeing */}
          {selectedTab === 'wellness' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex space-x-4 border-b">
                <button onClick={() => setWellnessSubTab('activities')} className={`px-4 py-2 text-sm font-bold rounded-lg ${wellnessSubTab === 'activities' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Activity Planner</button>
                <button onClick={() => setWellnessSubTab('hydration')} className={`px-4 py-2 text-sm font-bold rounded-lg ${wellnessSubTab === 'hydration' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Water & Movement</button>
                <button onClick={() => setWellnessSubTab('mood')} className={`px-4 py-2 text-sm font-bold rounded-lg ${wellnessSubTab === 'mood' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Wellbeing & Mood</button>
              </div>

              {/* Sub-section: Activity Planner */}
              {wellnessSubTab === 'activities' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold mb-4">Scheduled Activities</h3>
                    <div className="space-y-3">
                      {activities.map(act => (
                        <div key={act.id} className="p-3 border rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-bold text-sm">{act.name}</p>
                            <p className="text-xs text-slate-500">{act.time} • {act.location}</p>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold">{act.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-sm mb-3">Add New Activity</h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Activity Name" value={newActivity.name} onChange={e => setNewActivity({...newActivity, name: e.target.value})} className="w-full p-2 border rounded text-sm" />
                      <input type="text" placeholder="Time (e.g., 03:30 PM)" value={newActivity.time} onChange={e => setNewActivity({...newActivity, time: e.target.value})} className="w-full p-2 border rounded text-sm" />
                      <button onClick={handleAddActivity} className="w-full bg-slate-900 text-white py-2 rounded text-sm font-semibold flex items-center justify-center space-x-1"><Plus className="w-4 h-4"/> <span>Add Event</span></button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-section: Water & Movement */}
              {wellnessSubTab === 'hydration' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                    <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-800">Hydration Tracker</h3>
                    <p className="text-3xl font-extrabold text-blue-600 my-2">{waterGlasses} / 8</p>
                    <p className="text-xs text-slate-500 mb-4">Glasses of water consumed today (8 oz each)</p>
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => setWaterGlasses(waterGlasses + 1)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Add Glass</button>
                      <button onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold">- Remove</button>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                    <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-800">Movement Target</h3>
                    <p className="text-3xl font-extrabold text-rose-600 my-2">{movementMinutes} / 60 mins</p>
                    <p className="text-xs text-slate-500 mb-4">Daily outdoor active play or exercise</p>
                    <button onClick={() => setMovementMinutes(movementMinutes + 10)} className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ 10 Mins Movement</button>
                  </div>
                </div>
              )}

              {/* Sub-section: Wellbeing & Mood */}
              {wellnessSubTab === 'mood' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4">Daily Mood Check-in</h3>
                  <div className="flex gap-3 mb-4">
                    <select value={newMood} onChange={e => setNewMood(e.target.value)} className="p-2 border rounded-lg text-sm">
                      <option>😊 Great</option>
                      <option>😐 Okay</option>
                      <option>😴 Tired</option>
                      <option>😟 Stressed</option>
                    </select>
                    <input type="text" placeholder="Optional notes on how you feel..." value={moodNote} onChange={e => setMoodNote(e.target.value)} className="flex-1 p-2 border rounded-lg text-sm" />
                    <button onClick={() => { if (moodNote) { setMoodLogs([...moodLogs, { mood: newMood, note: moodNote, time: 'Just now' }]); setMoodNote(''); } }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Log Check-in</button>
                  </div>
                  <div className="space-y-2">
                    {moodLogs.map((log, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border rounded-lg text-sm flex justify-between">
                        <span>{log.mood} - "{log.note}"</span>
                        <span className="text-xs text-slate-400">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Study Buddy */}
          {selectedTab === 'study_buddy' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Study Buddy</h2>
                <p className="text-slate-500 text-sm">Coordinate with friends to share homework help or study for upcoming exams.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyGroups.map(group => (
                  <div key={group.id} className="p-4 border rounded-xl bg-slate-50 space-y-2">
                    <h3 className="font-bold text-slate-800">{group.subject}</h3>
                    <p className="text-xs text-slate-500">Members: {group.members} • Next Session: {group.nextSession}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">Code: {group.code}</span>
                      <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">Join Session</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Reading Tracker */}
          {selectedTab === 'reading' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-4">Reading Tracker & Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Select Age Group</label>
                    <select value={userAgeGroup} onChange={e => setUserAgeGroup(e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                      <option>Elementary School (8-10)</option>
                      <option>Middle School (11-14)</option>
                      <option>High School (15-18)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Select Preferred Genre</label>
                    <select value={readingGenre} onChange={e => setReadingGenre(e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                      <option>Science Fiction</option>
                      <option>STEM & Environment</option>
                    </select>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-700 mb-3">Age-Appropriate Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(bookRecommendations[readingGenre] || []).map((book, idx) => (
                    <div key={idx} className="p-4 border border-blue-100 bg-blue-50/50 rounded-lg space-y-2">
                      <h4 className="font-bold text-blue-900">{book.title}</h4>
                      <p className="text-xs text-slate-600">Author: {book.author}</p>
                      <div className="text-xs space-y-1 text-slate-500 pt-1 border-t border-blue-100">
                        <p>📍 <strong>Local Library:</strong> {book.library}</p>
                        <p>💻 <strong>Online Resource:</strong> {book.online}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. STEM Board & Events */}
          {selectedTab === 'stem_board' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">STEM Board & Local Competitions</h2>
                <p className="text-slate-500 text-sm">Explore regional STEM competitions and events across Central Valley counties.</p>
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500">Select County:</label>
                {Object.keys(countyStemWebsites).map(county => (
                  <button key={county} onClick={() => setSelectedCounty(county)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedCounty === county ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{county} County</button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">{selectedCounty} County STEM Events</h3>
                  <a href={countyStemWebsites[selectedCounty].url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-bold flex items-center space-x-1 hover:underline">
                    <span>Visit Official Portal</span> <ExternalLink className="w-3 h-3"/>
                  </a>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {countyStemWebsites[selectedCounty].events.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 8. Science-Fair Coach */}
          {selectedTab === 'science_fair' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Science-Fair Coach</h2>
                <p className="text-slate-500 text-sm">Share project progress with teachers and classmates for real-time feedback.</p>
              </div>

              <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">{scienceProject.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">{scienceProject.step}</span>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Shared with Teacher</span>
                </div>
                <p className="text-xs text-slate-600"><strong>Project Notes:</strong> {scienceProject.notes}</p>

                <div className="pt-3 border-t space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Teacher & Peer Feedback:</h4>
                  {scienceProject.feedback.map((fb, idx) => (
                    <div key={idx} className="p-2 bg-white rounded border text-xs text-slate-700">{fb}</div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <input type="text" placeholder="Add feedback or response..." value={newFeedback} onChange={e => setNewFeedback(e.target.value)} className="flex-1 p-2 border rounded text-xs" />
                    <button onClick={() => { if (newFeedback) { setScienceProject({...scienceProject, feedback: [...scienceProject.feedback, `User: ${newFeedback}`]}); setNewFeedback(''); } }} className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-bold">Post</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. World Window */}
          {selectedTab === 'world_window' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">World Window (Conversational Practice)</h2>
                <p className="text-slate-500 text-sm">Age-appropriate multilingual air quality reports and conversational learning.</p>
              </div>

              <div className="flex space-x-2">
                {['Spanish', 'French', 'Arabic', 'Hindi'].map(lang => (
                  <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 rounded-lg text-xs font-bold ${selectedLanguage === lang ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{lang}</button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border space-y-2">
                <h3 className="font-bold text-slate-800">{languageData[selectedLanguage].greeting}</h3>
                <p className="text-sm text-slate-600">{languageData[selectedLanguage].status}</p>
              </div>
            </div>
          )}

          {/* 10. Creator Arcade */}
          {selectedTab === 'creator_arcade' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Creator Arcade</h2>
                <p className="text-slate-500 text-sm">Play educational games or submit links to your own created games.</p>
              </div>

              <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Share Your Game Project Link</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input type="text" placeholder="Game Title (e.g., Eco Runner)" value={newGameTitle} onChange={e => setNewGameTitle(e.target.value)} className="p-2 border rounded text-xs" />
                  <input type="url" placeholder="Project Link (Scratch, MakeCode, etc.)" value={newGameUrl} onChange={e => setNewGameUrl(e.target.value)} className="p-2 border rounded text-xs" />
                </div>
                <button onClick={handleAddGame} className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold">Publish Game Link</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arcadeGames.map((game, idx) => (
                  <div key={idx} className="p-4 border rounded-xl space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center justify-between">
                      <span>{game.title}</span>
                      <Gamepad2 className="w-4 h-4 text-purple-600"/>
                    </h4>
                    <p className="text-xs text-slate-500">Created by: {game.creator}</p>
                    <a href={game.url} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-xs text-blue-600 font-bold hover:underline pt-2">
                      <span>Play Game</span> <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

