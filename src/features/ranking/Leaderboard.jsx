import { useState, useEffect } from 'react';
import { rankingService } from '../../services/rankingService';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    setRankings(rankingService.getGlobalRankings());
  }, []);

  return (
    <div className="glass-card p-10 animate-in">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">Global Leaderboard</h2>
          <p className="text-slate-400">Top performers across all certification tracks</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Total Candidates</span>
          <span className="text-2xl font-bold text-blue-400">{rankings.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {rankings.map((entry) => (
          <div key={entry.email} className={`flex items-center p-6 rounded-2xl border transition-all ${
            entry.rank === 1 ? 'bg-gradient-to-r from-blue-500/20 to-transparent border-blue-500/30' : 'bg-white/5 border-white/5'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 ${
              entry.rank === 1 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              {entry.rank}
            </div>
            
            <div className="flex-1">
              <div className="font-bold text-lg">{entry.name}</div>
              <div className="text-sm text-slate-500">{entry.email}</div>
            </div>

            <div className="text-right mr-8">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</div>
              <div className="font-bold text-green-400">{Math.round(entry.avgAccuracy)}%</div>
            </div>

            <div className="text-right min-w-[100px]">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Points</div>
              <div className="text-xl font-bold text-gradient">{entry.totalPoints}</div>
            </div>
          </div>
        ))}

        {rankings.length === 0 && (
          <div className="py-20 text-center text-slate-500 italic">
            Waiting for more candidates to complete assessments...
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
