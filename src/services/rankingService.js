import { mockApi } from './mockApi';

export const rankingService = {
  getGlobalRankings: () => {
    const results = mockApi.getResults();
    
    // Group by user and take their best score per exam or total score
    const userScores = results.reduce((acc, res) => {
      const userId = res.userEmail;
      if (!acc[userId]) {
        acc[userId] = { 
          name: res.userName, 
          email: userId, 
          totalPoints: 0, 
          examsTaken: 0, 
          avgAccuracy: 0 
        };
      }
      acc[userId].totalPoints += res.weightedScore || 0;
      acc[userId].examsTaken += 1;
      acc[userId].avgAccuracy = (acc[userId].avgAccuracy * (acc[userId].examsTaken - 1) + res.accuracy) / acc[userId].examsTaken;
      return acc;
    }, {});

    return Object.values(userScores)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));
  },

  getPercentile: (score, examId) => {
    const results = mockApi.getResults().filter(r => r.examId === examId);
    if (results.length === 0) return 100;
    
    const lowerScores = results.filter(r => r.score < score).length;
    return Math.round((lowerScores / results.length) * 100);
  }
};
