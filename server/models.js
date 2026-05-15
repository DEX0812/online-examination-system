import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  avatar: String
}, { timestamps: true });

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  questionsCount: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Medium' },
  points: { type: Number, required: true },
  answerKey: [Number], // Index of correct answer for each question
  category: String
}, { timestamps: true });

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  weightedPoints: { type: Number, required: true },
  answers: [Number],
  timeSpent: Number,
  timestamp: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Exam = mongoose.model('Exam', examSchema);
export const Result = mongoose.model('Result', resultSchema);
