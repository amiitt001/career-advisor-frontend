'use client';
import { saveAssessmentScore } from '../../lib/api';

import { useState } from 'react';
import { quizQuestions } from '../../data/quizData';
import { useRouter } from 'next/navigation';

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        // Calculate score based on number of questions to get a percentage
        calculatedScore += (100 / quizQuestions.length);
      }
    });
    const finalScore = Math.round(calculatedScore);
    setScore(finalScore);

    // --- This is where we save the score to the backend ---
    const testUid = 'testUser123'; // Using the same test user
    try {
      await saveAssessmentScore(testUid, finalScore);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  // This part displays the final score after the quiz is done
  if (score !== null) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h1>Quiz Finished!</h1>
        <h2>Your Score: {score} / 100</h2>
        <button onClick={() => router.push('/profile')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Back to Profile</button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // This part displays the current question and options
  return (
  <div className="content-card">
    <h1>Skills Assessment</h1>

    {score !== null ? (
      <div style={{ textAlign: 'center' }}>
        <h2>Quiz Finished!</h2>
        <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>Your Score: {score} / 100</p>
        <button onClick={() => router.push('/profile')} className="btn btn-primary">
          Back to Profile
        </button>
      </div>
    ) : (
      <div>
        <h3>Question {currentQuestionIndex + 1}/{quizQuestions.length}</h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{quizQuestions[currentQuestionIndex].question}</p>

        <div className="form-group">
          {quizQuestions[currentQuestionIndex].options.map((option: string) => (
            <label key={option} style={{ display: 'block', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '10px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswers[currentQuestionIndex] === option}
                onChange={() => handleAnswerSelect(option)}
                style={{ marginRight: '10px' }}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={{marginTop: '20px'}}>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]} className="btn btn-primary">Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestionIndex]} className="btn btn-primary">Finish & See Score</button>
          )}
        </div>
      </div>
    )}
  </div>
);
}