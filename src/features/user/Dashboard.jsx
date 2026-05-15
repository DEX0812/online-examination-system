import { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';

const UserDashboard = ({ onStartExam }) => {
  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({ totalTaken: 0, avgScore: 0 });

  useEffect(() => {
    setExams(mockApi.getExams());
    // Simulate fetching user stats
    setStats({ totalTaken: 4, avgScore: 78 });
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 glass-card p-8">
          <div className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-1">Welcome back,</div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">Candidate One</h2>
          <p className="text-slate-400">You have 2 pending assignments and 1 certification expiring soon.</p>
        </div>
        
        <div className="w-full lg:w-72 glass-card p-8 flex flex-col justify-center text-center">
          <div className="text-4xl font-bold text-blue-400">{stats.avgScore}%</div>
          <div className="text-slate-500 text-xs uppercase font-bold">Average Score</div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-8">Active Examinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map(exam => (
            <div key={exam.id} className="glass-card p-8 group hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-500 text-blue-400 group-hover:text-white transition-all">
                  📝
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{exam.difficulty}</div>
              </div>
              <h4 className="text-xl font-bold mb-2">{exam.title}</h4>
              <p className="text-slate-400 text-sm mb-6">{exam.duration} Minutes • {exam.questions} Questions</p>
              <button 
                onClick={() => onStartExam(exam)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-blue-600 font-bold transition-all border border-white/10 hover:border-transparent"
              >
                Access Portal
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
