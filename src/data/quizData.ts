
import { Question } from '../types';

// This is the array that holds all of our quiz questions
export const quizQuestions: Question[] = [
  {
    question: "Which of the following is a backend programming language?",
    options: ["HTML", "CSS", "Python", "React"],
    correctAnswer: "Python",
  },
  {
    question: "What does 'SQL' stand for?",
    options: [
      "Structured Query Language",
      "Simple Question Language",
      "Scripted Query Language",
      "Standard Query List",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    question: "Which of these is a popular version control system?",
    options: ["Docker", "Git", "Jira", "Slack"],
    correctAnswer: "Git",
  },
  // You can add more questions here later to make a total of 10
];