import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      <div style={styles.card}>
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <span style={styles.logo}>🎯 Interview IQ</span>
            <h1 style={styles.brand}>Welcome back to your interview prep journey</h1>
            <p style={styles.tagline}>Practice smarter with AI-generated questions, get instant feedback, and walk into every interview with confidence.</p>
            <div style={styles.featureList}>
              <div style={styles.featureItem}>✓ 20+ job roles covered</div>
              <div style={styles.featureItem}>✓ Instant AI feedback</div>
              <div style={styles.featureItem}>✓ Track your progress</div>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.formWrap}>
            <h2 style={styles.heading}>Login to your account</h2>
            <p style={styles.subheading}>Enter your details to continue</p>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
                  onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
                  onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                />
              </div>
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Logging in...' : 'Login →'}
              </button>
            </form>

            <p style={styles.linkText}>
              Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f6fd',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  bgBlob1: {
    position: 'absolute', top: '-120px', right: '-100px', width: '450px', height: '450px',
    borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
  },
  bgBlob2: {
    position: 'absolute', bottom: '-150px', left: '-120px', width: '450px', height: '450px',
    borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,52,212,0.1) 0%, transparent 70%)',
  },
  card: {
    display: 'flex',
    width: '920px',
    maxWidth: '100%',
    background: '#fff',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 70px rgba(72,52,212,0.18)',
    position: 'relative',
    zIndex: 1,
  },
  leftPanel: {
    flex: '1',
    background: 'linear-gradient(160deg, #6C63FF 0%, #4834d4 100%)',
    padding: '55px 45px',
    display: 'flex',
    alignItems: 'center',
  },
  leftContent: { color: '#fff' },
  logo: { fontSize: '15px', fontWeight: 700, opacity: 0.9, display: 'block', marginBottom: '30px' },
  brand: { fontSize: '26px', fontWeight: 800, lineHeight: 1.35, margin: '0 0 16px' },
  tagline: { fontSize: '14px', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px' },
  featureList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  featureItem: { fontSize: '13px', opacity: 0.95, fontWeight: 500 },
  rightPanel: { flex: '1.1', padding: '55px 50px', display: 'flex', alignItems: 'center' },
  formWrap: { width: '100%' },
  heading: { margin: '0 0 6px', color: '#2d2d2d', fontSize: '24px', fontWeight: 800 },
  subheading: { margin: '0 0 28px', color: '#888', fontSize: '14px' },
  error: { color: '#d93025', background: '#fce8e6', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '18px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '7px', fontSize: '13px', color: '#444', fontWeight: 600 },
  input: {
    width: '100%', padding: '13px 15px', border: '2px solid #e0e0e0', borderRadius: '10px',
    fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s',
  },
  button: {
    width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6C63FF, #4834d4)',
    color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700,
    cursor: 'pointer', marginTop: '8px', boxShadow: '0 8px 20px rgba(108,99,255,0.35)',
  },
  linkText: { textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#666' },
  link: { color: '#6C63FF', fontWeight: 700, textDecoration: 'none' },
};

export default Login;