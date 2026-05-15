import { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';
import AIBuilder from './AIBuilder';

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'ai-architect'

  useEffect(() => {
    setExams(mockApi.getExams());
  }, []);

  const handlePublish = async (generatedExam) => {
    try {
      const res = await fetch('http://localhost:5000/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatedExam)
      });
      if (res.ok) {
        alert('Certification Track Published Successfully!');
        setActiveTab('inventory');
        setExams(mockApi.getExams());
      }
    } catch (err) {
      console.error('Publish failed');
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold mb-2 tracking-tight">Enterprise Management</h2>
          <p className="text-slate-500">Control centers for certification, analytics, and AI architects.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('ai-architect')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'ai-architect' ? 'bg-purple-600 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            ✨ AI Architect
          </button>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-10">
            {/* Inventory table logic ... */}
          </div>
          {/* Quick Create logic ... */}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <AIBuilder onPublish={handlePublish} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
