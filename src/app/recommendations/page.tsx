'use client';

import { useState } from 'react';
import RecommendationCard from '@/components/RecommendationCard';
import { mockRecommendations } from '@/data/mockRecommendations';
import { getCareerComparison } from '@/lib/api';
import type { Recommendation } from '@/types';
import ReactMarkdown from 'react-markdown';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<Recommendation[]>([]);
  const [comparisonResult, setComparisonResult] = useState<string>('');
  const [isComparing, setIsComparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

const handleGetRecommendations = async () => {
    setIsLoading(true);
   const testUid = 'testUser123';
try {
  setErrorMessage(''); // Clear previous messages
  const response = await fetch(`http://localhost:5000/recommendations/${testUid}`);
  if (!response.ok) {
    throw new Error('The AI service is not responding. Please check the backend server.');
  }
  const data = await response.json();
  setRecommendations(data);
} catch (error: any) {
  setErrorMessage(`Error: ${error.message}`);
} finally {
  setIsLoading(false);
}
  };

  const handleCardSelect = (recToToggle: Recommendation) => {
    setSelectedForComparison(prev => {
      const isAlreadySelected = prev.some(r => r.title === recToToggle.title);
      if (isAlreadySelected) {
        return prev.filter(r => r.title !== recToToggle.title);
      } else {
        if (prev.length < 2) {
          return [...prev, recToToggle];
        }
      }
      return prev; // Return previous state if trying to select more than 2
    });
  };

  const handleCompare = async () => {
    if (selectedForComparison.length !== 2) return;
    setIsComparing(true);
    setErrorMessage('');
    try {
      const result = await getCareerComparison(selectedForComparison[0], selectedForComparison[1]);
      setComparisonResult(result.comparisonText);
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message}. (Note: This feature requires the live AI to be working).`);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Your Personalized Career Recommendations</h1>

      {recommendations.length === 0 && !isLoading && (
        <button onClick={handleGetRecommendations} className="btn btn-primary" style={{ padding: '15px 25px', fontSize: '1.2em' }}>
          Generate My Career Paths
        </button>
      )}

      {isLoading && <p>Generating your recommendations using AI...</p>}

      {recommendations.length > 0 && (
        <div>
          {selectedForComparison.length === 2 && (
            <div style={{ marginBottom: '20px' }}>
              <button onClick={handleCompare} disabled={isComparing} className="btn btn-primary">
                {isComparing ? 'Comparing...' : `Compare ${selectedForComparison[0].title} & ${selectedForComparison[1].title}`}
              </button>
            </div>
          )}

          {isComparing && <p>AI is generating your comparison...</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {comparisonResult && (
            <div className="content-card">
              <h2>Career Comparison</h2>
              <ReactMarkdown>{comparisonResult}</ReactMarkdown>
            </div>
          )}

          <div style={{ marginTop: '30px' }}>
            {recommendations.map((rec, index) => (
              <RecommendationCard 
                key={index} 
                recommendation={rec}
                isSelected={selectedForComparison.some(r => r.title === rec.title)}
                onSelect={() => handleCardSelect(rec)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}