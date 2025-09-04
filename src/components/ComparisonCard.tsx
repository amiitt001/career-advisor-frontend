'use client';
import type { ComparisonResult } from '@/types';

// Update the props to allow the result to be null
export default function ComparisonCard({ result }: { result: ComparisonResult | null }) {

  // --- ADD THIS SAFETY CHECK ---
  // If there's no result, or the result is missing the 'comparisonPoints' array,
  // show a safe message instead of crashing.
  if (!result || !result.comparisonPoints) {
    return (
      <div className="content-card">
        <h2>Career Comparison</h2>
        <p>There was an issue loading the comparison data from the AI.</p>
      </div>
    );
  }

  return (
    <div className="content-card">
      <h2>Career Comparison</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ width: '25%', padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563' }}>Metric</th>
            <th style={{ width: '37.5%', padding: '0.75rem 1rem', textAlign: 'left', fontSize: '1.125rem', fontWeight: 'bold' }}>{result.career1_title}</th>
            <th style={{ width: '37.5%', padding: '0.75rem 1rem', textAlign: 'left', fontSize: '1.125rem', fontWeight: 'bold' }}>{result.career2_title}</th>
          </tr>
        </thead>
        <tbody>
          {result.comparisonPoints.map((point, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '1rem', fontWeight: '600', verticalAlign: 'top', color: '#374151' }}>{point.metric}</td>
              <td style={{ padding: '1rem', verticalAlign: 'top', color: '#6b7280' }}>{point.career1_details}</td>
              <td style={{ padding: '1rem', verticalAlign: 'top', color: '#6b7280' }}>{point.career2_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}