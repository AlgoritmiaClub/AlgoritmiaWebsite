'use client';

import { useState } from 'react';

export function SubmissionForm() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [biography, setBiography] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/submit-talent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          role,
          linkedinUrl,
          githubUrl,
          skills: skills.split(',').map(s => s.trim()).filter(s => s),
          biography,
          profilePictureUrl,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900">Thank You!</h3>
        <p className="mt-2 text-sm text-gray-600">Your profile has been submitted for review. The Algoritmia team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Current Role (e.g., "Software Engineer")</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          required
        />
      </div>

      {/* Profile Picture URL */}
      <div>
        <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
        <input
          type="url"
          id="profilePictureUrl"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          placeholder="https://linkedin.com/in/your-name/profile.jpg"
          required
        />
         <p className="mt-2 text-xs text-gray-500">Please provide a direct URL to an image. You can often get this from your LinkedIn profile.</p>
      </div>

      {/* LinkedIn URL */}
      <div>
        <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
        <input
          type="url"
          id="linkedinUrl"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          required
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">GitHub Profile URL</label>
        <input
          type="url"
          id="githubUrl"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          required
        />
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          placeholder="TypeScript, React, Next.js, Node.js"
          required
        />
        <p className="mt-2 text-xs text-gray-500">Enter a comma-separated list of your top skills.</p>
      </div>

      {/* Biography */}
      <div>
        <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Short Biography</label>
        <textarea
          id="biography"
          rows={5}
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          required
        />
        <p className="mt-2 text-xs text-gray-500">A brief professional bio. This will be displayed on your profile detail view.</p>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-slate-400"
        >
          {status === 'submitting' ? 'Submitting...' : 'Send to Algoritmia for Review'}
        </button>
        {status === 'error' && <p className="text-sm text-red-600 mt-2 text-center">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
