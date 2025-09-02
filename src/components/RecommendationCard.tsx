'use client';
import type { Recommendation } from '@/types';

type RecommendationCardProps = {
  recommendation: Recommendation;
  isSelected: boolean;
  onSelect: () => void;
};

export default function RecommendationCard({ recommendation, isSelected, onSelect }: RecommendationCardProps) {
  return (
    <div className={`content-card mb-6 ${isSelected ? 'border-blue-500 border-2' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{recommendation.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor={`compare-${recommendation.title}`} className="mr-2 text-sm text-gray-600">Compare</label>
          <input
            id={`compare-${recommendation.title}`}
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            style={{ width: '1.2rem', height: '1.2rem' }}
          />
        </div>
      </div>

      <p><strong>Why it's a good fit:</strong> {recommendation.reason}</p>
      <p><strong>Key Skills Required:</strong> {recommendation.required_skills.join(', ')}</p>
      <p style={{ color: '#c0392b' }}><strong>Your Skill Gaps:</strong> {recommendation.skill_gaps.join(', ')}</p>
      <p><strong>How to Get Started:</strong> {recommendation.learning_path}</p>
    </div>
  );
}