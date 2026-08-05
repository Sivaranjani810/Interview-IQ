import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

function RoundSelect() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const roleName = roleNames[roleId] || roleId;
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoundSelect = (roundType) => {
    navigate(`/interview/${roleId}/${roundType}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>Interview IQ</h2>
        <div style={styles.navRightGroup}>
          <span style={styles.homeButton} onClick={() => navigate('/dashboard')}>Home</span>
          <div style={{ position: 'relative' }}>
            <div style={styles.profileWrap} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div style={styles.profileAvatar}>{initials}</div>
              <span style={styles.profileNameNav}>{user?.name?.split(' ')[0]}</span>
            </div>
            {dropdownOpen && (
              <div style={styles.dropdown}>
                <p style={styles.dropdownItem} onClick={() => navigate('/profile')}>👤 My Profile</p>
                <p style={styles.dropdownItem} onClick={handleLogout}>🚪 Logout</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div style={styles.heroBanner}>
        <button style={styles.backButton} onClick={() => navigate('/role-select')}>
          ← Back to roles
        </button>
        <span style={styles.roleLabel}>{roleName}</span>
        <h1 style={styles.heroTitle}>Choose your round</h1>
        <p style={styles.heroSubtext}>Which round would you like to practice today?</p>
      </div>

      <div style={styles.content}>
        <div style={styles.grid}>
          <div
            style={{ ...styles.card, ...styles.technicalCard }}
            onClick={() => handleRoundSelect('technical')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
          >
            <div style={styles.iconCircleTech}>🧩</div>
            <h3 style={styles.cardTitle}>Technical Round</h3>
            <p style={styles.cardDesc}>Role-specific technical and skill-based questions.</p>
            <span style={styles.cardActionTech}>Start Technical →</span>
          </div>

          <div
            style={{ ...styles.card, ...styles.hrCard }}
            onClick={() => handleRoundSelect('hr')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
          >
            <div style={styles.iconCircleHr}>🗣️</div>
            <h3 style={styles.cardTitle}>HR Round</h3>
            <p style={styles.cardDesc}>Behavioral, communication, and situational questions.</p>
            <span style={styles.cardActionHr}>Start HR →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f3ff', fontFamily: 'Segoe UI, sans-serif', display: 'flex', flexDirection: 'column' },
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
  navRightGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  homeButton: {
    fontSize: '13px', fontWeight: 600, color: '#4834d4', cursor: 'pointer',
    padding: '7px 16px', borderRadius: '8px', background: '#ece9ff',
  },
  profileWrap: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px', borderRadius: '8px' },
  profileAvatar: {
    width: '34px', height: '34px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700,
  },
  profileNameNav: { color: '#2d2d2d', fontSize: '13px', fontWeight: 600 },
  dropdown: {
    position: 'absolute', top: '46px', right: 0, background: '#fff', borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)', minWidth: '150px', overflow: 'hidden', zIndex: 10,
  },
  dropdownItem: { margin: 0, padding: '12px 18px', fontSize: '13px', color: '#333', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' },
  heroBanner: {
    background: 'linear-gradient(160deg, #6C63FF 0%, #4834d4 100%)',
    padding: '55px 20px 45px',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '30px',
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '20px',
  },
  roleLabel: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    padding: '5px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '15px',
  },
  heroTitle: { fontSize: '30px', margin: '0 0 10px', fontWeight: 700 },
  heroSubtext: { fontSize: '15px', opacity: 0.9, margin: 0 },
  content: { maxWidth: '700px', margin: '-30px auto 0', padding: '0 20px 20px', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  card: {
    background: '#fff', borderRadius: '18px', padding: '35px 25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease', textAlign: 'center',
  },
  technicalCard: { borderTop: '4px solid #6C63FF' },
  hrCard: { borderTop: '4px solid #ff9f43' },
  iconCircleTech: {
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '26px', margin: '0 auto 18px', color: '#fff',
  },
  iconCircleHr: {
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff9f43, #ee5a24)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '26px', margin: '0 auto 18px', color: '#fff',
  },
  cardTitle: { margin: '0 0 8px', color: '#2d2d2d', fontSize: '17px' },
  cardDesc: { color: '#666', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px' },
  cardActionTech: { color: '#6C63FF', fontWeight: 700, fontSize: '13px' },
  cardActionHr: { color: '#ee5a24', fontWeight: 700, fontSize: '13px' },
};

export default RoundSelect;