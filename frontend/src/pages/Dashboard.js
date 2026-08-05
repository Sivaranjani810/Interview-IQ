import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: null });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/api/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const firstName = user?.name?.split(' ')[0] || 'there';
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>Interview IQ</h2>
        <div style={styles.navLinks}>
        </div>
        <div style={styles.navRightGroup}>
          <div style={{ position: 'relative' }}>
            <div style={styles.profileWrap} onClick={() => { setDropdownOpen(!dropdownOpen); setShowProfile(false); }}>
              <div style={styles.profileAvatar}>{initials}</div>
              <span style={styles.profileNameNav}>{firstName}</span>
            </div>
            {dropdownOpen && (
              <div style={styles.dropdown}>
                {!showProfile ? (
                  <>
                    <p style={styles.dropdownItem} onClick={() => setShowProfile(true)}>👤 My Profile</p>
                    <p style={styles.dropdownItem} onClick={handleLogout}>🚪 Logout</p>
                  </>
                ) : (
                  <>
                    <div style={styles.dropdownProfileView}>
                      <div style={styles.dropdownAvatar}>{initials}</div>
                      <p style={styles.dropdownName}>{user?.name}</p>
                      <p style={styles.dropdownEmail}>{user?.email}</p>
                    </div>
                    <p style={styles.dropdownItem} onClick={() => setShowProfile(false)}>← Back</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.heroCard}>
          <div style={styles.heroLeft}>
            <p style={styles.heroGreeting}>{greeting},</p>
            <h1 style={styles.heroName}>{firstName}! 👋</h1>
            <p style={styles.heroSubtext}>Ready to sharpen your interview skills today?</p>
            <button style={styles.heroButton} onClick={() => navigate('/role-select')}>
              Start a mock interview →
            </button>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.heroCircle}>{initials}</div>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <p style={styles.statValue}>0</p>
            <p style={styles.statLabel}>Interviews Taken</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <p style={styles.statValue}>--</p>
            <p style={styles.statLabel}>Average Score</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔥</div>
            <p style={styles.statValue}>0</p>
            <p style={styles.statLabel}>Day Streak</p>
          </div>
        </div>

        <div style={styles.bottomGrid}>
          <div style={styles.actionCard} onClick={() => navigate('/role-select')}>
            <div style={styles.actionIcon}>🎤</div>
            <div>
              <h3 style={styles.actionTitle}>Start Interview</h3>
              <p style={styles.actionDesc}>Pick a role and practice with AI-generated questions.</p>
            </div>
          </div>
          <div style={styles.actionCard} onClick={() => navigate('/how-it-works')}>
            <div style={styles.actionIcon}>📖</div>
            <div>
              <h3 style={styles.actionTitle}>How It Works</h3>
              <p style={styles.actionDesc}>New here? See the full journey from start to finish.</p>
            </div>
          </div>
          <div style={styles.actionCard} onClick={() => navigate('/profile')}>
            <div style={styles.actionIcon}>👤</div>
            <div>
              <h3 style={styles.actionTitle}>My Profile</h3>
              <p style={styles.actionDesc}>View and update your account details.</p>
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
    gap: '20px',
  },
  navBrand: { color: '#fff', margin: 0, fontSize: '19px', fontWeight: 700 },
  navLinks: { display: 'flex', alignItems: 'center', gap: '28px', flex: 1, marginLeft: '40px' },
  navLink: { color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: 0.9 },
  navRightGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  practiceBtn: {
    padding: '9px 20px',
    background: '#fff',
    color: '#6C63FF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  profileWrap: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '8px' },
  profileAvatar: { width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 },
  profileNameNav: { color: '#fff', fontSize: '13px', fontWeight: 600 },
  dropdown: {
    position: 'absolute', top: '46px', right: 0, background: '#fff', borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)', minWidth: '170px', overflow: 'hidden', zIndex: 10,
  },
  dropdownItem: { margin: 0, padding: '12px 18px', fontSize: '13px', color: '#333', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' },
  dropdownProfileView: { padding: '22px 18px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' },
  dropdownAvatar: {
    width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, margin: '0 auto 10px',
  },
  dropdownName: { margin: '0 0 3px', fontSize: '14px', fontWeight: 700, color: '#2d2d2d' },
  dropdownEmail: { margin: 0, fontSize: '11px', color: '#888' },
  content: { maxWidth: '900px', margin: '0 auto', padding: '40px 20px 60px' },
  topLink: { textAlign: 'center', color: '#6C63FF', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '20px' },
  heroCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '24px',
    padding: '45px 45px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    boxShadow: '0 10px 40px rgba(108,99,255,0.3)',
  },
  heroLeft: { color: '#fff' },
  heroGreeting: { margin: '0 0 2px', fontSize: '15px', opacity: 0.85 },
  heroName: { margin: '0 0 10px', fontSize: '28px' },
  heroSubtext: { margin: '0 0 22px', fontSize: '14px', opacity: 0.9, maxWidth: '320px' },
  heroButton: {
    padding: '12px 26px', background: '#fff', color: '#6C63FF', border: 'none',
    borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
  },
  heroRight: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  heroCircle: {
    width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
    border: '3px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '38px', fontWeight: 700, color: '#fff',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' },
  statCard: { background: '#fff', borderRadius: '16px', padding: '22px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  statIcon: { fontSize: '22px', marginBottom: '8px' },
  statValue: { fontSize: '24px', fontWeight: 700, color: '#4834d4', margin: '0 0 4px' },
  statLabel: { fontSize: '12px', color: '#888', margin: 0 },
  bottomGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' },
  actionCard: {
    background: '#fff', borderRadius: '16px', padding: '22px', display: 'flex', gap: '15px',
    alignItems: 'flex-start', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s',
  },
  actionIcon: { fontSize: '26px' },
  actionTitle: { margin: '0 0 4px', fontSize: '15px', color: '#2d2d2d' },
  actionDesc: { margin: 0, fontSize: '12px', color: '#888', lineHeight: 1.4 },
};

export default Dashboard;