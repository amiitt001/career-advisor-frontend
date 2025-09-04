'use client';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function DashboardPage() {
  const { profile } = useUser();

  return (
    <div>
      <header className="mb-8">
        {profile ? (
          <h1>Welcome back, {profile.name}!</h1>
        ) : (
          <h1>Personalized Career & Skills Advisor</h1>
        )}
      </header>

      {profile ? (
        <section>
          <h2 style={{color: '#374151'}}>Your Profile</h2>
          <div className="content-card">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
            <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
          </div>
        </section>
      ) : (
        <section>
          <div className="content-card">
            <h2>Get Started</h2>
            <p>Create a profile to receive personalized career recommendations powered by AI.</p>
            <Link href="/profile" className="btn btn-primary" style={{marginTop: '1rem'}}>Create Your Profile</Link>
          </div>
        </section>
      )}
    </div>
  );
}