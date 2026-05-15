import { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeUp]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${String(rs).padStart(2, '0')}`;
  };

  const isLow = seconds < 60;

  return (
    <div className={`text-2xl font-mono font-bold ${isLow ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;
