'use client'; 

import { saveProfile, uploadResume } from '../../lib/api';
import { useState } from 'react';

export default function ProfilePage() {
  // States for the profile form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  
  // State for the resume file upload
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  // State for showing messages to the user
  const [message, setMessage] = useState('');

  // Function to handle the main profile form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('Saving...');
  const testUid = 'testUser123';
  const profileData = {
    uid: testUid, name, email,
    interests: interests.split(',').map(item => item.trim()),
    skills: skills.split(',').map(item => item.trim()),
    createdAt: new Date().toISOString()
  };
  try {
    await saveProfile(profileData);
    setMessage('Profile saved successfully!');
  } catch (error: any) {
    setMessage(`Error: ${error.message}`);
  }
};

  // Function to handle the resume file upload
const handleResumeUpload = async () => {
  if (!resumeFile) {
    setMessage('Please select a resume file first.');
    return;
  }
  setMessage('Uploading resume...');
  const testUid = 'testUser123';
  try {
    await uploadResume(testUid, resumeFile);
    setMessage('Resume uploaded successfully!');
  } catch (error: any) {
    setMessage(`Error: ${error.message}`);
  }
};


  // This is the JSX that renders the page
  return (
  <div className="page-container">
    <div className="content-card">
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="interests">Your Interests (comma-separated):</label>
          <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="skills">Your Skills (comma-separated):</label>
          <input id="skills" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="form-input" />
        </div>
        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>

      <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
        <h2>Upload Your Resume</h2>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)} 
        />
        <button 
          onClick={handleResumeUpload} 
          disabled={!resumeFile} 
          className="btn btn-primary"
          style={{ marginLeft: '10px' }}
        >
          Upload Resume
        </button>
      </div>
    </div>

    {message && <p style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>{message}</p>}
  </div>
);
}