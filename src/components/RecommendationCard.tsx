'use client';
import { Recommendation } from '../types';
export default function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <h2 style={{ marginTop: '0' }}>{recommendation.title}</h2>
      <p><strong>Why it's a good fit:</strong> {recommendation.reason}</p>
      <p><strong>Key Skills Required:</strong> {recommendation.required_skills.join(', ')}</p>
      <p style={{ color: '#c0392b' }}><strong>Your Skill Gaps:</strong> {recommendation.skill_gaps.join(', ')}</p>
      <p><strong>How to Get Started:</strong> {recommendation.learning_path}</p>
        <a
        href={recommendation.jobSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        style={{ marginTop: '1rem' }}
      >
        Search Live Jobs
      </a>
    </div>
  );
}