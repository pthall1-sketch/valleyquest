import { Routes, Route, Link } from 'react-router-dom';

// Placeholder view components (or import your existing ones)
function DashboardView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Activity Planner</h1>
    </div>
  );
}

function TeachersView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher's Corner</h1>
    </div>
  );
}

function InviteView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Invite & Connections</h1>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        <nav className="space-y-2">
          <Link className="block p-2 hover:bg-slate-800 rounded" to="/">
            📊 Activity Planner
          </Link>
          <Link className="block p-2 hover:bg-slate-800 rounded" to="/teachers">
            🏫 Teacher's Corner
          </Link>
          <Link className="block p-2 hover:bg-slate-800 rounded" to="/invite">
            🤝 Invite & Connections
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/teachers" element={<TeachersView />} />
          <Route path="/invite" element={<InviteView />} />
        </Routes>
      </main>
    </div>
  );
}


