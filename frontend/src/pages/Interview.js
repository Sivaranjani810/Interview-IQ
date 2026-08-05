import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const roleNames = {
  'general': 'General Interview',
  'digital-marketing': 'Digital Marketing Executive',
  'content-marketing': 'Content Marketing',
  'social-media': 'Social Media Manager',
  'brand-marketing': 'Brand Marketing',
  'marketing-analyst': 'Marketing Analyst',
  'product-marketing': 'Product Marketing',
  'email-marketing': 'Email/CRM Marketing',
  'growth-marketing': 'Growth Marketing',
  'influencer-marketing': 'Influencer Marketing',
  'market-research': 'Market Research Analyst',
  'pr-communications': 'PR & Communications',
  'events-marketing': 'Events & Field Marketing',
  'web-development': 'Web Development',
  'mobile-development': 'Mobile App Development',
  'ai-engineer': 'AI Engineer',
  'ml-engineer': 'Machine Learning Engineer',
  'cybersecurity': 'Cybersecurity Analyst',
  'cloud-engineer': 'Cloud Engineer (AWS/Azure)',
  'system-admin': 'System Administrator',
};

function Interview() {
  const { roleId, roundType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";
  const roleName = roleNames[roleId] || roleId;
  const hasFetched = useRef(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    setError('');
    setAnswer('');
    setFeedback('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:5000/api/generate-question',
        { role: roleName, roundType, difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestion(response.data.question);
    } catch (err) {
      setError('Failed to load question. Make sure Ollama is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchQuestion();
    }
    // eslint-disable-next-line
  }, [roleId, roundType]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setFeedback('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:5000/api/evaluate-answer',
        { question, answer, role: roleName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback(response.data.feedback);
    } catch (err) {
      setFeedback('Could not evaluate answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isHR = roundType === 'hr';

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>🎯 Interview IQ</h2>
        <span style={styles.exitButton} onClick={() => navigate('/role-select')}>
          ← Exit Interview
        </span>
      </nav>

      <div style={styles.heroBanner}>
        <span style={styles.roleLabel}>{roleName}</span>
        <h1 style={styles.heroTitle}>{isHR ? '🗣️ HR Round' : '🧩 Technical Round'}</h1>
        <p style={styles.heroSubtext}>Take your time and answer as if this were the real interview.</p>
      </div>

      <div style={styles.content}>
        <div style={styles.questionCard}>
          {loading ? (
            <div style={styles.loadingWrap}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Generating your question...</p>
            </div>
          ) : error ? (
            <p style={styles.errorText}>{error}</p>
          ) : (
            <>
              <p style={styles.questionLabel}>💭 Question</p>
              <h2 style={styles.questionText}>{question}</h2>
            </>
          )}
        </div>

        {!loading && !error && (
          <div style={styles.answerCard}>
            <label style={styles.label}>✍️ Your Answer</label>
            <textarea
              style={styles.textarea}
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
            <div style={styles.actions}>
              <button style={styles.nextBtn} onClick={fetchQuestion}>
                ↻ Skip / Next Question
              </button>
              <button style={styles.submitBtn} disabled={!answer.trim() || submitting} onClick={handleSubmit}>
                {submitting ? 'Evaluating...' : 'Submit Answer →'}
              </button>
            </div>

            {feedback && (
              <div style={styles.feedbackBox}>
                <p style={styles.feedbackLabel}>⭐ Feedback</p>
                <p style={styles.feedbackText}>{feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f7f6fd', fontFamily: 'Segoe UI, sans-serif' },
  navbar: {
    padding: '16px 40px',
    background: '#ffffff',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  },
  navBrand: { color: '#2d2d2d', margin: 0, fontSize: '18px', fontWeight: 800 },
  exitButton: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#d93025',
    cursor: 'pointer',
    padding: '7px 16px',
    borderRadius: '8px',
    background: '#fce8e6',
  },
  heroBanner: {
    background: 'linear-gradient(135deg, #6C63FF 0%, #4834d4 100%)',
    padding: '40px 20px 45px',
    textAlign: 'center',
    color: '#fff',
  },
  roleLabel: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    padding: '5px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  heroTitle: { fontSize: '26px', margin: '0 0 8px', fontWeight: 800 },
  heroSubtext: { fontSize: '14px', opacity: 0.9, margin: 0 },
  content: { maxWidth: '650px', margin: '-25px auto 0', padding: '0 20px 60px', position: 'relative' },
  questionCard: {
    background: '#fff',
    borderRadius: '18px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(72,52,212,0.12)',
    marginBottom: '20px',
    minHeight: '80px',
  },
  loadingWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '10px 0' },
  spinner: {
    width: '28px', height: '28px', borderRadius: '50%',
    border: '3px solid #ece9ff', borderTopColor: '#6C63FF',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: { textAlign: 'center', color: '#888', margin: 0, fontSize: '14px' },
  errorText: { textAlign: 'center', color: '#d93025', margin: 0 },
  questionLabel: { margin: '0 0 10px', fontSize: '11px', color: '#6C63FF', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' },
  questionText: { margin: 0, color: '#2d2d2d', fontSize: '19px', lineHeight: 1.5, fontWeight: 600 },
  answerCard: {
    background: '#fff',
    borderRadius: '18px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  label: { display: 'block', marginBottom: '10px', fontSize: '13px', color: '#555', fontWeight: 700 },
  textarea: {
    width: '100%',
    padding: '14px',
    border: '2px solid #ddd',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical',
    marginBottom: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  actions: { display: 'flex', gap: '10px' },
  nextBtn: {
    flex: 1,
    padding: '12px',
    background: '#f5f3ff',
    border: 'none',
    color: '#6C63FF',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  submitBtn: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #6C63FF, #4834d4)',
    border: 'none',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(108,99,255,0.3)',
  },
  feedbackBox: { marginTop: '20px', padding: '20px', background: 'linear-gradient(160deg, #f5f3ff, #ece9ff)', borderRadius: '14px', border: '1px solid #e0d9ff' },
  feedbackLabel: { margin: '0 0 8px', fontSize: '11px', color: '#6C63FF', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' },
  feedbackText: { margin: 0, fontSize: '14px', color: '#333', whiteSpace: 'pre-line', lineHeight: 1.7 },
};

export default Interview;