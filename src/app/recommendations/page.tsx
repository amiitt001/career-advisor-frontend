'use client';

import { useState } from 'react';
import RecommendationCard from '../../components/RecommendationCard';
import { mockRecommendations } from '../../data/mockRecommendations';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = () => {
    setIsLoading(true);
    // In the future, you will replace this with a real API call.
    // For now, we simulate a network delay with setTimeout.
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Your Personalized Career Recommendations</h1>

      {recommendations.length === 0 && !isLoading && (
        <button onClick={handleGetRecommendations} style={{ padding: '15px 25px', fontSize: '1.2em', cursor: 'pointer' }}>
          Generate My Career Paths
        </button>
      )}

      {isLoading && <p>Generating your recommendations using AI...</p>}

      <div style={{ marginTop: '30px' }}>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}