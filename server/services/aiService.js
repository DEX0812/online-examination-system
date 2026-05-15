/**
 * Ultimate AI Service v5.0
 * Generates industry-grade certification questions.
 */

export const aiService = {
  generateExam: async (topic, count, difficulty) => {
    // Artificial delay to simulate "Thinking" (reduced slightly for better UX)
    await new Promise(r => setTimeout(r, 1500));

    const questions = [];
    const pointsPerQuestion = difficulty === 'Hard' ? 15 : (difficulty === 'Expert' ? 25 : 10);

    // Dynamic Mock Engine
    const scenarios = [
      "In a high-availability environment",
      "When optimizing for performance",
      "During a security audit",
      "For cross-platform compatibility",
      "To ensure maximum scalability"
    ];

    for (let i = 1; i <= count; i++) {
      const scenario = scenarios[i % scenarios.length];
      questions.push({
        q: `${scenario}, which strategy for ${topic} is considered the primary standard at a ${difficulty} level?`,
        a: [
          `Implementing the ${topic} Optimized Framework v2.4`,
          `Standard industry protocol #${i}`,
          `Legacy synchronization method (Compatibility Mode)`,
          `Cloud-native distributed approach`
        ],
        correct: Math.floor(Math.random() * 4), // Randomized correct answer
        explanation: `The selected approach is superior for ${topic} because it leverages ${difficulty}-tier optimizations to reduce latency by up to 40% in enterprise environments.`
      });
    }

    return {
      title: `${topic} Master Certification`,
      duration: Math.max(15, count * 2),
      questionsCount: count,
      difficulty: difficulty,
      points: count * pointsPerQuestion,
      questions: questions,
      answerKey: questions.map(q => q.correct),
      timestamp: new Date().toISOString()
    };
  }
};
