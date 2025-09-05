'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { saveAssessmentScore, getQuizForCareer, getQuizSuggestion } from '@/lib/api';
import type { Question } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const { profile } = useUser();

  const [stage, setStage] = useState('selection'); 
  const [careerTitle, setCareerTitle] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  // --- NEW: Automatically suggest a topic ---
  useEffect(() => {
    if (profile) {
      setIsSuggesting(true);
      getQuizSuggestion(profile)
        .then(data => {
          setCareerTitle(data.topic);
        })
        .catch(err => {
          console.error("Could not fetch suggestion:", err);
        })
        .finally(() => {
          setIsSuggesting(false);
        });
    }
  }, [profile]); // This effect runs when the profile is loaded

  const handleStartQuiz = async () => {
    if (!careerTitle) {
      setErrorMessage('Please enter a career title.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const questions = await getQuizForCareer(careerTitle);
      if (questions.length === 0) throw new Error("The AI did not return any questions.");
      setQuizQuestions(questions);
      setStage('quiz');
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

  // ... other handler functions (handleAnswerSelect, handleNext, handleSubmit) remain the same ...
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;
    let calculatedScore = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore += (100 / quizQuestions.length);
      }
    });
    const finalScore = Math.round(calculatedScore);
    setScore(finalScore);
    setStage('finished');
    try {
      await saveAssessmentScore(profile.uid, finalScore);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };


  // --- RENDER LOGIC ---
  if (stage === 'selection') {
    return (
      <div className="content-card">
        <h1>Skills Assessment</h1>
        <p>Based on your profile, we suggest an assessment for the following career. You can also enter your own.</p>
        <div className="form-group">
          <label htmlFor="careerTitle" className="form-label">Career Title</label>
          <input 
            id="careerTitle"
            type="text"
            value={careerTitle}
            onChange={(e) => setCareerTitle(e.target.value)}
            className="form-input"
            placeholder={isSuggesting ? "Generating suggestion..." : "e.g., DevOps Engineer"}
          />
        </div>
        <button onClick={handleStartQuiz} disabled={isLoading || isSuggesting} className="btn btn-primary">
          {isLoading ? 'Generating Quiz...' : 'Start Quiz'}
        </button>
        {errorMessage && <p style={{color: 'red', marginTop: '1rem'}}>{errorMessage}</p>}
      </div>
    );
  }

  // ... the rest of the render logic (for 'quiz' and 'finished' stages) remains the same ...
  if (stage === 'finished') {
    return (
      <div className="content-card" style={{ textAlign: 'center' }}>
        <h1>Quiz Finished for {careerTitle}!</h1>
        <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>Your Score: {score} / 100</p>
        <button onClick={() => router.push('/profile')} className="btn btn-primary">
          Back to Profile
        </button>
      </div>
    );
  }

  if (stage === 'quiz' && quizQuestions.length > 0) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    return (
      <div className="content-card">
        <h1>Skills Assessment: {careerTitle}</h1>
        <h3>Question {currentQuestionIndex + 1}/{quizQuestions.length}</h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{currentQuestion.question}</p>
        <div className="form-group">
          {currentQuestion.options.map((option: string) => (
            <label key={option} style={{ display: 'block', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '10px', cursor: 'pointer' }}>
              <input type="radio" name="answer" value={option} checked={selectedAnswers[currentQuestionIndex] === option} onChange={() => handleAnswerSelect(option)} style={{ marginRight: '10px' }} />
              {option}
            </label>
          ))}
        </div>
        <div>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]} className="btn btn-primary">Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestionIndex]} className="btn btn-primary">Finish & See Score</button>
          )}
        </div>
      </div>
    );
  }

}