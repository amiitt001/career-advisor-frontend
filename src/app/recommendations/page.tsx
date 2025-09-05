'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import RecommendationCard from '@/components/RecommendationCard';
import type { Recommendation, ComparisonResult } from '@/types';
import { getCareerComparison } from '@/lib/api';
// We will now get recommendations directly from the live AI
// No more mock data needed

export default function RecommendationsPage() {
  const { profile } = useUser(); // Get the active user
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // All the comparison state and functions can remain the same
  const [selectedForComparison, setSelectedForComparison] = useState<Recommendation[]>([]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);


  const handleGetRecommendations = async () => {
    if (!profile) {
      setErrorMessage('Please create a profile first to get recommendations.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:5000/recommendations/${profile.uid}`);
      if (!response.ok) {
        throw new Error('The AI service is not responding. Please check the backend server or your GCP account status.');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
  // We can check if it's an error object before accessing the message
  if (error instanceof Error) {
    setErrorMessage(`Error: ${error.message}`);
  } else {
    setErrorMessage('An unknown error occurred.');
  }
} finally {
      setIsLoading(false);
    }
  };

  const handleCardSelect = (recToToggle: Recommendation) => {
    setSelectedForComparison(prev => {
      const isAlreadySelected = prev.some(r => r.title === recToToggle.title);
      if (isAlreadySelected) {
        return prev.filter(r => r.title !== recToToggle.title);
      }
      return prev.length < 2 ? [...prev, recToToggle] : prev;
    });
  };

  const handleCompare = async () => {
    if (selectedForComparison.length !== 2) return;
    setIsComparing(true);
    setErrorMessage('');
    setComparisonResult(null);
    try {
      const result = await getCareerComparison(selectedForComparison[0], selectedForComparison[1]);
      setComparisonResult(result);
    } catch (error) {
  // We can check if it's an error object before accessing the message
  if (error instanceof Error) {
    setErrorMessage(`Error: ${error.message}`);
  } else {
    setErrorMessage('An unknown error occurred.');
  }
} finally {
      setIsComparing(false);
    }
  };

  return (
    <div>
      <h1>Your Personalized Career Recommendations</h1>

      <div className="content-card" style={{ textAlign: 'center' }}>
        {profile ? (
          <p style={{fontSize: '1.1rem'}}>Ready to discover your path, {profile.name}? Click the button below.</p>
        ) : (
          <p style={{fontSize: '1.1rem'}}>Please create a profile first.</p>
        )}
        <button 
          onClick={handleGetRecommendations} 
          className="btn btn-primary" 
          style={{ padding: '15px 25px', fontSize: '1.2em' }}
          disabled={!profile || isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate My Career Paths'}
        </button>
      </div>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{errorMessage}</p>}

      {recommendations.length > 0 && (
         <div>
          {/* Comparison UI (remains the same) */}
          {selectedForComparison.length === 2 && (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <button onClick={handleCompare} disabled={isComparing} className="btn btn-primary">
                {isComparing ? 'Comparing...' : `Compare: ${selectedForComparison[0].title} vs ${selectedForComparison[1].title}`}
              </button>
            </div>
          )}
          {isComparing && <p style={{textAlign: 'center'}}>AI is generating your comparison...</p>}
          {comparisonResult && (
            <div className="content-card">
              <h2>Career Comparison</h2>
              {/* ... Table to display comparison ... */}
            </div>
          )}

          {/* Recommendation Cards */}
          <div>
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