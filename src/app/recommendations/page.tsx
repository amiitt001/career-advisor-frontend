'use client';

import { useState } from 'react';
import RecommendationCard from '@/components/RecommendationCard';
import { getCareerComparison } from '@/lib/api';
import type { Recommendation, ComparisonResult } from '@/types'; // Import new type
import { mockRecommendations } from '@/data/mockRecommendations'; // We still use this for the initial cards

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<Recommendation[]>([]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null); // UPDATED STATE
  const [isComparing, setIsComparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);
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
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message}. (Note: This requires the live AI to be working).`);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div>
      <h1>Your Personalized Career Recommendations</h1>

      {recommendations.length === 0 && !isLoading && (
        <div className="content-card" style={{ textAlign: 'center' }}>
          <p style={{fontSize: '1.1rem'}}>Click the button below to generate your career paths based on your profile.</p>
          <button onClick={handleGetRecommendations} className="btn btn-primary" style={{ padding: '15px 25px', fontSize: '1.2em' }}>
            Generate My Career Paths
          </button>
        </div>
      )}

      {isLoading && <p>Generating recommendations...</p>}

      {recommendations.length > 0 && (
        <div>
          {selectedForComparison.length === 2 && (
            <div style={{ marginBottom: '20px' }}>
              <button onClick={handleCompare} disabled={isComparing} className="btn btn-primary">
                {isComparing ? 'Comparing...' : `Compare Selected Careers`}
              </button>
            </div>
          )}

          {isComparing && <p>AI is generating your comparison...</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* --- UPDATED COMPARISON SECTION --- */}
          {comparisonResult && comparisonResult.comparisonPoints && (
            <div className="content-card">
              <h2>Career Comparison</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ width: '25%', padding: '8px', textAlign: 'left' }}>Metric</th>
                    <th style={{ width: '37.5%', padding: '8px', textAlign: 'left' }}>{comparisonResult.career1_title}</th>
                    <th style={{ width: '37.5%', padding: '8px', textAlign: 'left' }}>{comparisonResult.career2_title}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonResult.comparisonPoints.map((point, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 'bold', verticalAlign: 'top' }}>{point.metric}</td>
                      <td style={{ padding: '12px 8px', verticalAlign: 'top' }}>{point.career1_details}</td>
                      <td style={{ padding: '12px 8px', verticalAlign: 'top' }}>{point.career2_details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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