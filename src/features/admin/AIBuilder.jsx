import { useState } from 'react';

const AIBuilder = ({ onPublish }) => {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count, difficulty })
      });
      const data = await res.json();
      setPreview(data);
    } catch (err) {
      console.error('AI Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-10 space-y-8">
      <div>
        <h3 className="text-3xl font-bold mb-2">AI Question Architect</h3>
        <p className="text-slate-500">Generate professional assessments on any topic in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Subject / Topic</label>
          <input 
            value={topic} 
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. AWS Cloud Architecture, React Hooks, Cyber Security..."
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Complexity</label>
          <select 
            value={difficulty} 
            onChange={e => setDifficulty(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Expert</option>
          </select>
        </div>
      </div>

      <div className="flex items-end gap-6">
        <div className="w-48">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Questions</label>
          <input 
            type="number" 
            value={count} 
            onChange={e => setCount(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl outline-none"
          />
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="flex-1 btn-primary py-4 rounded-xl disabled:opacity-50"
        >
          {loading ? 'Consulting AI Intelligence...' : 'Generate Certification Track'}
        </button>
      </div>

      {preview && (
        <div className="mt-12 animate-in border-t border-white/10 pt-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold">{preview.title}</h4>
              <p className="text-slate-500">{preview.questionsCount} Questions • {preview.points} Total Points</p>
            </div>
            <button 
              onClick={() => onPublish(preview)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20"
            >
              Publish to Public Portal
            </button>
          </div>
          
          <div className="space-y-4 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
            {preview.questions.slice(0, 3).map((q, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm">
                <span className="text-blue-400 font-bold mr-2">Q{i+1}:</span> {q.q}
              </div>
            ))}
            <div className="text-center text-slate-500 text-xs italic">... and {preview.questionsCount - 3} more questions generated ...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBuilder;
