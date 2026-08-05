import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <span style={styles.logoIcon}>🎯</span>
          Interview IQ
        </div>
        <div style={styles.navRightGroup}>
          <span style={styles.navLink} onClick={() => navigate('/how-it-works')}>How It Works</span>
          <span style={styles.navDividerText}>|</span>
          <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
          </div>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Your AI Interview Coach,<br />
          <span style={styles.highlight}>Anytime</span>
        </h1>
        <p style={styles.heroSubtext}>
          Practice with an AI-powered mock interview coach. Get role-specific questions,
          instant feedback, and track your progress — all in one place.
        </p>
        <div style={styles.heroActions}>
          <button style={styles.primaryBtn} onClick={() => navigate('/signup')}>
            Get Started Free →
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/login')}>
            I have an account
          </button>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>20+</p>
            <p style={styles.statLabel}>Job Roles</p>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>AI</p>
            <p style={styles.statLabel}>Powered Questions</p>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>Instant</p>
            <p style={styles.statLabel}>Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0e1a', fontFamily: 'Segoe UI, sans-serif' },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 70px',
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '20px', fontWeight: 700 },
  logoIcon: { fontSize: '20px' },
  navLinks: { display: 'flex', gap: '35px' },
  navLink: { color: '#b8bfd1', fontSize: '14px', cursor: 'pointer' },
  loginBtn: {
    padding: '9px 22px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  hero: { maxWidth: '800px', margin: '0 auto', padding: '90px 30px 70px', textAlign: 'center' },
  heroTitle: { fontSize: '48px', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 25px' },
  highlight: { color: '#6C9FFF' },
  heroSubtext: { fontSize: '17px', color: '#b8bfd1', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 35px' },
  heroActions: { display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '15px 32px',
    background: '#3fd0e0',
    color: '#0a0e1a',
    border: 'none',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '15px 32px',
    background: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    padding: '25px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  statItem: { textAlign: 'center' },
  statNumber: { fontSize: '22px', fontWeight: 700, color: '#3fd0e0', margin: '0 0 4px' },
  statLabel: { fontSize: '12px', color: '#b8bfd1', margin: 0 },
  statDivider: { width: '1px', height: '35px', background: 'rgba(255,255,255,0.1)' },
};

export default Landing;