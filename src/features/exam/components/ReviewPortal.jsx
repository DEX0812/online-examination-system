import { useState } from 'react';

const ReviewPortal = ({ exam, submission, onBack }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Mock explanations - in a real app, these would come from the exam data
  const explanations = [
    "The Virtual DOM is used to minimize direct manipulation of the browser's DOM for efficiency.",
    "Hooks must be called at the top level of a React functional component.",
    "JSX is a syntax extension to JavaScript often used with React to describe UI."
  ];

  return (
    <div className="animate-in space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-blue-400 hover:text-blue-300 font-bold mb-2 flex items-center gap-2">
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold">Review: {exam.title}</h2>
        </div>
        <div className="text-right glass-card px-6 py-4">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Score</div>
          <div className="text-2xl font-bold text-gradient">{submission.score}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {activeIdx + 1}</span>
              {submission.answers[activeIdx] === exam.answerKey[activeIdx] ? (
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">Correct</span>
              ) : (
                <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/20">Incorrect</span>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-8">Sample Question {activeIdx + 1}?</h3>

            <div className="space-y-4">
              {[0, 1, 2, 3].map((idx) => {
                const isCorrect = exam.answerKey[activeIdx] === idx;
                const isSelected = submission.answers[activeIdx] === idx;
                
                let borderClass = "border-white/10";
                let bgClass = "bg-white/5";
                let textClass = "text-slate-400";

                if (isCorrect) {
                  borderClass = "border-green-500/50";
                  bgClass = "bg-green-500/10";
                  textClass = "text-green-400";
                } else if (isSelected && !isCorrect) {
                  borderClass = "border-red-500/50";
                  bgClass = "bg-red-500/10";
                  textClass = "text-red-400";
                }

                return (
                  <div key={idx} className={`p-6 rounded-2xl border ${borderClass} ${bgClass} ${textClass} font-medium`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 bg-black/20`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>Option {idx + 1} Description</span>
                      {isCorrect && <span className="ml-auto text-xs font-bold">CORRECT ANSWER</span>}
                      {isSelected && !isCorrect && <span className="ml-auto text-xs font-bold">YOUR CHOICE</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
              <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Pedagogical Insight</h4>
              <p className="text-slate-400 leading-relaxed">{explanations[activeIdx % explanations.length]}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 h-fit">
          <h3 className="font-bold mb-6">Navigation Grid</h3>
          <div className="grid grid-cols-5 gap-3">
            {submission.answers.map((ans, i) => (
              <button 
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-full aspect-square rounded-xl text-xs font-bold transition-all border ${
                  i === activeIdx ? 'ring-2 ring-blue-400' : ''
                } ${ans === exam.answerKey[i] ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPortal;
