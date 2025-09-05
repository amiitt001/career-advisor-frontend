'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { saveProfile } from '@/lib/api';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');
  const { setProfile } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');

    // Generate a new unique ID for each submission
    const newUid = `user_${Date.now()}`;

    const profileData = {
      uid: newUid, name, email,
      interests: interests.split(',').map(item => item.trim()),
      skills: skills.split(',').map(item => item.trim()),
      createdAt: new Date().toISOString()
    };

    try {
      await saveProfile(profileData);
      setProfile(profileData); // Set this as the active user
      setMessage('Profile saved successfully! Redirecting to dashboard...');
      router.push('/'); // Redirect to the dashboard
    } catch (error) {
  if (error instanceof Error) {
    setMessage(`Error: ${error.message}`);
  } else {
    setMessage('An unknown error occurred.');
  }
}
  };

  // The JSX for the form remains the same as before
  return (
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
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}