'use client';
import type { Recommendation } from '@/types';

type RecommendationCardProps = {
  recommendation: Recommendation;
  isSelected: boolean;
  onSelect: () => void;
};

export default function RecommendationCard({ recommendation, isSelected, onSelect }: RecommendationCardProps) {
  return (
    <div className={`content-card ${isSelected ? 'border-blue-500 border-2' : ''}`}>
      {/* --- Card Header --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ color: '#1E40AF', marginBottom: '0.25rem' }}>{recommendation.title}</h2>
          <p style={{ margin: 0, color: '#6B7280' }}>{recommendation.overview}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: '1rem' }}>
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

      {/* --- Main Content Grid --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

        <div style={{ backgroundColor: '#EFF6FF', padding: '1rem', borderRadius: '8px' }}>
          <h3>Why It&apos;s a Good Fit</h3>
          <p>{recommendation.whyGoodFit}</p>
        </div>

        <div style={{ backgroundColor: '#EFF6FF', padding: '1rem', borderRadius: '8px' }}>
          <h3>Key Skills Required</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
            {recommendation.keySkillsRequired.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>

        <div style={{ backgroundColor: '#FEFCE8', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#A16207' }}>Your Skill Gaps</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
            {recommendation.skillGapsForUser.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>

        <div style={{ backgroundColor: '#F0FDF4', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#166534' }}>How to Get Started</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
            {recommendation.howToGetStarted.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </div>

      </div>

      {/* --- Footer Info --- */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1.5rem' }}>
         <h3>A Day in the Life</h3>
         <p style={{fontStyle: 'italic', color: '#4B5563'}}>{recommendation.dayInTheLifeSummary}</p>
         <p style={{marginTop: '1rem'}}><strong>Average Starting Salary (India):</strong> {recommendation.averageSalaryIndiaLPA}</p>
      </div>

    </div>
  );
}