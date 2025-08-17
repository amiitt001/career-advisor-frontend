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
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Your Interests (comma-separated):</label><br />
          <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Your Skills (comma-separated):</label><br />
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Save Profile</button>
      </form>
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
        <h2>Upload Your Resume</h2>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)} 
        />
        <button 
          onClick={handleResumeUpload} 
          disabled={!resumeFile}
          style={{ marginLeft: '10px', padding: '10px 20px' }}
        >
          Upload Resume
        </button>
      </div>

      {message && <p style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>{message}</p>}
    </div>
  );
}