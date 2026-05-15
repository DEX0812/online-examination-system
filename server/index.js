import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'database.json');

// Initialize database
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({
    users: [],
    exams: [
      { 
        _id: 'e1', 
        title: 'Quantum Computing Foundations', 
        duration: 45, 
        questionsCount: 2, 
        difficulty: 'Hard', 
        points: 200, 
        questions: [
          { q: 'What is a Qubit?', a: ['A quantum bit', 'A binary bit', 'A logic gate', 'A processor'], correct: 0, explanation: 'A qubit is the basic unit of quantum information.' },
          { q: 'Which principle allows qubits to be in multiple states?', a: ['Entanglement', 'Superposition', 'Decoherence', 'Interference'], correct: 1, explanation: 'Superposition allows multiple states simultaneously.' }
        ], 
        answerKey: [0, 1] 
      }
    ],
    results: []
  }, null, 2));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const server = http.createServer(async (req, res) => {
  // Simple CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Body parser
  let body = '';
  if (req.method === 'POST') {
    for await (const chunk of req) body += chunk;
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const url = req.url;
  const db = getDB();

  // ROUTER
  if (url === '/api/exams' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.exams));
  } 
  
  else if (url === '/api/exams' && req.method === 'POST') {
    const newExam = { ...body, _id: 'ex_' + Date.now() };
    db.exams.push(newExam);
    saveDB(db);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newExam));
  }

  else if (url === '/api/auth/login' && req.method === 'POST') {
    const { name, email, role, studentClass, password } = body;
    
    // Security Layer: Basic password check for admins
    if (role === 'admin' && (name !== 'Harsh' || password !== '0...DeX...9')) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid Administrator Credentials' }));
      return;
    }

    let user = db.users.find(u => u.email === email);
    if (!user) {
      user = { 
        name, 
        email, 
        role, 
        _id: 'u_' + Date.now(),
        ...(role === 'student' && { class: studentClass }),
        score: 0,
        totalPoints: 0
      };
      db.users.push(user);
      saveDB(db);
    } else {
      // Update metadata on login
      if (role === 'student') user.class = studentClass;
      saveDB(db);
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }

  else if (url === '/api/results' && req.method === 'POST') {
    const result = { ...body, _id: 'res_' + Date.now(), timestamp: new Date().toISOString() };
    db.results.push(result);
    saveDB(db);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  }

  else if (url === '/api/rankings' && req.method === 'GET') {
    // Basic aggregation
    const userMap = {};
    db.results.forEach(r => {
      const u = db.users.find(user => user._id === r.userId);
      if (!u) return;
      if (!userMap[u.email]) {
        userMap[u.email] = { name: u.name, email: u.email, totalPoints: 0, avgAccuracy: 0, count: 0 };
      }
      userMap[u.email].totalPoints += r.weightedPoints || 0;
      userMap[u.email].avgAccuracy = (userMap[u.email].avgAccuracy * userMap[u.email].count + r.accuracy) / (userMap[u.email].count + 1);
      userMap[u.email].count++;
    });
    const rankings = Object.values(userMap).sort((a,b) => b.totalPoints - a.totalPoints);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rankings));
  }

  else if (url === '/api/ai/generate' && req.method === 'POST') {
    const { topic, count, difficulty } = body;
    const pts = difficulty === 'Hard' ? 15 : (difficulty === 'Expert' ? 25 : 10);
    
    // Standalone AI logic
    const questions = Array.from({ length: count }).map((_, i) => ({
      q: `[${topic}] Neural Validation ${i+1}: What is the primary architectural principle for ${topic} at ${difficulty} level?`,
      a: [
        `Scalable ${topic} Micro-protocol`,
        `Standard industry baseline`,
        `Legacy compatibility layer`,
        `Distributed AI optimization`
      ],
      correct: Math.floor(Math.random() * 4),
      explanation: `The AI Architect confirmed that this specific approach ensures maximum structural integrity for ${topic}.`
    }));

    const generated = {
      title: `${topic} Master Certification`,
      duration: count * 2,
      questionsCount: count,
      difficulty,
      points: count * pts,
      questions,
      answerKey: questions.map(q => q.correct)
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(generated));
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
    console.log(`\n🚀 ExamsPro Ultimate Server is running!`);
    console.log(`🌍 Endpoint: http://localhost:${PORT}`);
    console.log(`📂 Database: server/database.json\n`);
    console.log(`✅ Zero dependencies required. Direct Node.js execution.\n`);
});
