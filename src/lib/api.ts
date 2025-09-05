
import type { Profile, Recommendation, ComparisonResult } from '../types'; // Add ComparisonResult


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Function to save the main user profile
export const saveProfile = async (profileData: Partial<Profile>) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to save profile');
  }
  return response.json();
};

// Function to update the profile with the assessment score
export const saveAssessmentScore = async (uid: string, score: number) => {
  const response = await fetch(`${API_BASE_URL}/profile/${uid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assessmentScore: score }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to save score');
  }
  return response.json();
};

// Function to handle resume upload
export const uploadResume = async (uid: string, file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch(`${API_BASE_URL}/resume/upload/${uid}`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to upload resume');
    }
    return response.json();
};
// Function to get a comparison from the AI

export const getCareerComparison = async (career1: Recommendation, career2: Recommendation): Promise<ComparisonResult> => {
  
  const response = await fetch(`${API_BASE_URL}/recommendations/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ career1, career2 }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to get comparison');
  }
  return response.json();
};  
export const getQuizSuggestion = async (profile: Profile) => {
  const response = await fetch(`${API_BASE_URL}/recommendations/quiz/suggest-topic`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    throw new Error('Failed to get quiz suggestion');
  }
  return response.json(); // Will return { topic: "Suggested Topic" }
};
// Add this function to your lib/api.ts file

export const getQuizForCareer = async (careerTitle: string) => {
  const response = await fetch(`${API_BASE_URL}/recommendations/quiz/${careerTitle}`);
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to fetch quiz');
  }
  return response.json();
};