import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(storedUser?.name || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const handleSave = async () => {
    setError('');
    if (!nameInput.trim()) {
      setError('Name cannot be empty');
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://127.0.0.1:5000/api/profile',
        { name: nameInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>Interview IQ</h2>
        <span style={styles.homeButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </span>
      </nav>

      <div style={styles.content}>
        <div style={styles.coverBanner}></div>
        <div style={styles.profileCard}>
          <div style={styles.avatarLarge}>{initials}</div>

          {!isEditing ? (
            <>
              <h1 style={styles.name}>{user?.name}</h1>
              <p style={styles.email}>{user?.email}</p>
              <span style={styles.badge}>Placement Candidate</span>
              <div>
                <button style={styles.editBtn} onClick={() => { setIsEditing(true); setNameInput(user?.name); }}>
                  ✏️ Edit Profile
                </button>
              </div>
            </>
          ) : (
            <div style={styles.editForm}>
              {error && <p style={styles.error}>{error}</p>}
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <div style={styles.editActions}>
                <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button style={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <p style={styles.infoIcon}>👤</p>
              <p style={styles.infoLabel}>Full Name</p>
              <p style={styles.infoValue}>{user?.name}</p>
            </div>
            <div style={styles.infoBox}>
              <p style={styles.infoIcon}>📧</p>
              <p style={styles.infoLabel}>Email Address</p>
              <p style={styles.infoValue}>{user?.email}</p>
            </div>
            <div style={styles.infoBox}>
              <p style={styles.infoIcon}>📅</p>
              <p style={styles.infoLabel}>Member Since</p>
              <p style={styles.infoValue}>2026</p>
            </div>
            <div style={styles.infoBox}>
              <p style={styles.infoIcon}>✅</p>
              <p style={styles.infoLabel}>Account Status</p>
              <p style={styles.infoValue}>Active</p>
            </div>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Interviews</p>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <p style={styles.statValue}>--</p>
              <p style={styles.statLabel}>Avg Score</p>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Day Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(160deg, #f5f3ff 0%, #e8e4ff 100%)', fontFamily: 'Segoe UI, sans-serif' },
  navbar: {
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 2px 15px rgba(108,99,255,0.25)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBrand: { color: '#fff', margin: 0, fontSize: '19px', fontWeight: 700 },
  homeButton: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
    cursor: 'pointer',
    padding: '6px 14px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.15)',
  },
  content: { maxWidth: '650px', margin: '0 auto', padding: '40px 20px 60px' },
  coverBanner: {
    height: '90px',
    borderRadius: '20px 20px 0 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  profileCard: {
    background: '#fff',
    borderRadius: '0 0 20px 20px',
    padding: '0 40px 40px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
  },
  avatarLarge: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 700,
    margin: '-50px auto 15px',
    border: '5px solid #fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  name: { margin: '0 0 4px', color: '#2d2d2d', fontSize: '24px' },
  email: { margin: '0 0 12px', color: '#888', fontSize: '14px' },
  badge: {
    display: 'inline-block',
    background: '#ece9ff',
    color: '#6C63FF',
    fontSize: '12px',
    fontWeight: 700,
    padding: '5px 16px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  editBtn: {
    display: 'block',
    margin: '0 auto 30px',
    padding: '8px 20px',
    background: 'transparent',
    border: '1px solid #6C63FF',
    color: '#6C63FF',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  editForm: { marginBottom: '30px', textAlign: 'left', maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' },
  error: { color: '#d93025', background: '#fce8e6', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', marginBottom: '12px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: 500 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '12px' },
  editActions: { display: 'flex', gap: '10px' },
  saveBtn: { flex: 1, padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '10px', background: '#f0f0f0', color: '#555', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px', textAlign: 'left' },
  infoBox: { background: '#f8f7ff', borderRadius: '14px', padding: '18px' },
  infoIcon: { margin: '0 0 6px', fontSize: '18px' },
  infoLabel: { margin: '0 0 4px', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 },
  infoValue: { margin: 0, fontSize: '14px', color: '#2d2d2d', fontWeight: 600, wordBreak: 'break-word' },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#f8f7ff',
    borderRadius: '14px',
    padding: '20px',
  },
  statItem: { flex: 1 },
  statValue: { margin: '0 0 4px', fontSize: '22px', fontWeight: 700, color: '#6C63FF' },
  statLabel: { margin: 0, fontSize: '12px', color: '#888' },
  statDivider: { width: '1px', height: '35px', background: '#e0deff' },
};

export default Profile;