import React from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { number: '01', title: 'Choose your role', desc: 'Pick the job role you\'re preparing for — Marketing, Software, Data, HR, and more.' },
  { number: '02', title: 'Face the mock rounds', desc: 'Go through HR screening, technical round, and final round — just like a real interview.' },
  { number: '03', title: 'Answer AI-generated questions', desc: 'Each round has questions tailored to your role, generated live by AI.' },
  { number: '04', title: 'Get instant feedback', desc: 'See your strengths, weak areas, and a score right after each round.' },
  { number: '05', title: 'Track your progress', desc: 'Your dashboard shows every attempt, your score trend, and what to improve.' },
];

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>Interview IQ</h2>
      </nav>
      <div style={styles.content}>
        <h1 style={styles.heading}>How Interview IQ works</h1>
        <p style={styles.subheading}>From picking a role to tracking your growth — here's the full journey.</p>

        <div style={styles.timeline}>
          {steps.map((step, i) => (
            <div key={i} style={styles.stepRow}>
              <div style={styles.stepNumber}>{step.number}</div>
              <div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button style={styles.ctaButton} onClick={() => navigate('/role-select')}>
          Let's get started →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f3ff', fontFamily: 'Segoe UI, sans-serif' },
  navbar: { padding: '18px 40px', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' },
  navBrand: { color: '#4834d4', margin: 0, fontSize: '20px' },
  content: { maxWidth: '650px', margin: '0 auto', padding: '50px 20px' },
  heading: { textAlign: 'center', color: '#2d2d2d', marginBottom: '8px' },
  subheading: { textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '15px' },
  timeline: { display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '40px' },
  stepRow: { display: 'flex', gap: '20px', alignItems: 'flex-start' },
  stepNumber: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepTitle: { margin: '0 0 5px', color: '#2d2d2d', fontSize: '16px' },
  stepDesc: { margin: 0, color: '#666', fontSize: '14px', lineHeight: 1.5 },
  ctaButton: {
    display: 'block',
    margin: '0 auto',
    padding: '13px 35px',
    background: '#6C63FF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default HowItWorks;