/**
 * Mock API Service with LocalStorage Persistence
 */
const STORAGE_KEYS = {
  EXAMS: 'eps_exams',
  SESSIONS: 'eps_sessions',
  RESULTS: 'eps_results',
  USER: 'eps_current_user'
};

const INITIAL_EXAMS = [
  { 
    id: 'ex-1', title: 'React Performance optimization', duration: 45, questions: 25, difficulty: 'Expert',
    points: 100,
    answerKey: [1, 2, 0, 3, 1] // Mock keys for existing questions
  },
  { 
    id: 'ex-2', title: 'System Design Interview', duration: 60, questions: 30, difficulty: 'Hard',
    points: 150,
    answerKey: [0, 3, 2, 1, 0]
  }
];

export const mockApi = {
  // Initialization
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.EXAMS)) {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(INITIAL_EXAMS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
    }
  },

  // Auth ... (rest of service)
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const user = { email, name: email.split('@')[0], role: 'student', id: 'u-' + Math.random() };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  getExams: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.EXAMS) || '[]'),

  saveExam: (exam) => {
    const exams = mockApi.getExams();
    const index = exams.findIndex(e => e.id === exam.id);
    const newExam = { 
      ...exam, 
      id: exam.id || 'ex-' + Date.now(),
      points: exam.difficulty === 'Hard' ? 150 : (exam.difficulty === 'Expert' ? 200 : 100),
      answerKey: exam.answerKey || new Array(exam.questions).fill(0).map(() => Math.floor(Math.random() * 4))
    };
    if (index > -1) exams[index] = newExam;
    else exams.push(newExam);
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  },

  getResults: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || '[]'),

  submitExam: (submission) => {
    const results = mockApi.getResults();
    const result = {
      ...submission,
      id: 'res-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    results.push(result);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    return result;
  }
};

