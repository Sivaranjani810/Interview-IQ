import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isStrong = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isStrong) {
      setError('Password must have 8+ characters, an uppercase letter, a number, and a symbol.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/api/signup', { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 7000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successHeading}>You're in, {name.split(' ')[0]}!</h2>
          <p style={styles.successText}>You've signed up for Interview IQ. Let's create your journey to placement success together.</p>
          <p style={styles.successSub}>Taking you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.leftPanel}>
          <h1 style={styles.brand}>Interview IQ</h1>
          <p style={styles.tagline}>Your AI-powered mock interview coach. Practice, get feedback, and walk into placements with confidence.</p>
        </div>
        <div style={styles.rightPanel}>
          <h2 style={styles.heading}>Create account</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input style={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {password.length > 0 && (
                <div style={styles.checklist}>
                  <span style={passwordChecks.length ? styles.checkOk : styles.checkFail}>8+ chars</span>
                  <span style={passwordChecks.upper ? styles.checkOk : styles.checkFail}>Uppercase</span>
                  <span style={passwordChecks.number ? styles.checkOk : styles.checkFail}>Number</span>
                  <span style={passwordChecks.symbol ? styles.checkOk : styles.checkFail}>Symbol</span>
                </div>
              )}
            </div>
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.linkText}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    display: 'flex',
    width: '800px',
    maxWidth: '90%',
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  leftPanel: {
    flex: '1',
    background: 'linear-gradient(160deg, #6C63FF, #4834d4)',
    color: '#fff',
    padding: '50px 35px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brand: { fontSize: '28px', marginBottom: '12px', fontWeight: 700 },
  tagline: { fontSize: '15px', opacity: 0.9, lineHeight: 1.6 },
  rightPanel: { flex: '1.2', padding: '50px 40px' },
  heading: { marginBottom: '20px', color: '#2d2d2d' },
  error: { color: '#d93025', background: '#fce8e6', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', marginBottom: '15px' },
  formGroup: { marginBottom: '18px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555', fontWeight: 500 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  checklist: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' },
  checkOk: { fontSize: '12px', color: '#1a7a3c', background: '#e6f4ea', padding: '3px 8px', borderRadius: '12px' },
  checkFail: { fontSize: '12px', color: '#888', background: '#f1f1f1', padding: '3px 8px', borderRadius: '12px' },
  button: { width: '100%', padding: '12px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', marginTop: '5px' },
  linkText: { textAlign: 'center', marginTop: '18px', fontSize: '14px', color: '#555' },
  link: { color: '#6C63FF', fontWeight: 600, textDecoration: 'none' },
  successCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '60px 50px',
    textAlign: 'center',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#e6f4ea',
    color: '#1a7a3c',
    fontSize: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  successHeading: { color: '#2d2d2d', marginBottom: '12px' },
  successText: { color: '#555', lineHeight: 1.6, marginBottom: '10px' },
  successSub: { color: '#999', fontSize: '13px' },
};

export default Signup;