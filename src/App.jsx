import { useState, useEffect } from 'react';
import { mockApi } from './services/mockApi';
import UserDashboard from './features/user/Dashboard';
import AdminDashboard from './features/admin/Dashboard';
import ExamTaker from './features/exam/ExamTaker'; // (Assumed modular component)
import './styles/design-tokens.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'user-dash', 'admin-dash', 'exam'
  const [activeExam, setActiveExam] = useState(null);

  useEffect(() => {
    mockApi.init();
    const savedUser = localStorage.getItem('eps_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('user-dash');
    }
  }, []);

  const handleLogin = async (role) => {
    const mockUser = await mockApi.login(role === 'admin' ? 'admin@examproui.com' : 'user@examproui.com');
    setUser({...mockUser, role});
    setView(role === 'admin' ? 'admin-dash' : 'user-dash');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setView('login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Outfit']">
      {/* Navigation */}
      {view !== 'login' && view !== 'exam' && (
        <nav className="glass-card m-6 p-4 flex justify-between items-center sticky top-6 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">E</div>
            <span className="text-xl font-bold">Exams<span className="text-blue-400">Pro</span></span>
          </div>
          <div className="flex gap-8 items-center">
            <button onClick={() => setView('user-dash')} className="hover:text-blue-400">Dashboard</button>
            {user?.role === 'admin' && <button onClick={() => setView('admin-dash')} className="hover:text-blue-400">Admin</button>}
            <button onClick={logout} className="text-slate-400 hover:text-white">Logout</button>
          </div>
        </nav>
      )}

      <main className="container mx-auto px-6 py-8">
        {view === 'login' && <LoginScreen onLogin={handleLogin} />}
        {view === 'user-dash' && <UserDashboard onStartExam={(e) => { setActiveExam(e); setView('exam'); }} />}
        {view === 'admin-dash' && <AdminDashboard />}
        {view === 'exam' && <ExamTaker exam={activeExam} onFinish={() => setView('user-dash')} />}
      </main>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="glass-card p-12 max-w-md w-full text-center">
      <h1 className="text-4xl font-bold mb-8">Access Portal</h1>
      <div className="space-y-4">
        <button onClick={() => onLogin('student')} className="w-full btn-primary py-4">Student Login</button>
        <button onClick={() => onLogin('admin')} className="w-full bg-white/5 hover:bg-white/10 py-4 rounded-xl border border-white/10 font-bold">Admin Panel Access</button>
      </div>
      <p className="mt-8 text-slate-500 text-sm">Enterprise Identity Service Protected</p>
    </div>
  </div>
);

export default App;
