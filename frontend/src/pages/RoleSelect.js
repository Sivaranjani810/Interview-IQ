import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const roles = [
  { id: 'general', title: 'General Interview', desc: 'Common HR and behavioral questions.', category: 'General', icon: '💬' },
  { id: 'digital-marketing', title: 'Digital Marketing Executive', desc: 'SEO, SEM, social media, campaigns.', category: 'Marketing', icon: '📱' },
  { id: 'content-marketing', title: 'Content Marketing', desc: 'Content strategy, copywriting, brand voice.', category: 'Marketing', icon: '✍️' },
  { id: 'social-media', title: 'Social Media Manager', desc: 'Platform strategy, engagement, analytics.', category: 'Marketing', icon: '📣' },
  { id: 'brand-marketing', title: 'Brand Marketing', desc: 'Brand positioning, campaigns, research.', category: 'Marketing', icon: '🎯' },
  { id: 'marketing-analyst', title: 'Marketing Analyst', desc: 'Data analysis, ROI tracking, reporting.', category: 'Marketing', icon: '📊' },
  { id: 'product-marketing', title: 'Product Marketing', desc: 'Go-to-market strategy, positioning.', category: 'Marketing', icon: '🚀' },
  { id: 'email-marketing', title: 'Email/CRM Marketing', desc: 'Automation, segmentation, performance.', category: 'Marketing', icon: '📧' },
  { id: 'growth-marketing', title: 'Growth Marketing', desc: 'A/B testing, funnels, acquisition.', category: 'Marketing', icon: '📈' },
  { id: 'influencer-marketing', title: 'Influencer Marketing', desc: 'Creator partnerships, campaign ROI.', category: 'Marketing', icon: '🌟' },
  { id: 'market-research', title: 'Market Research Analyst', desc: 'Consumer insights, surveys, analysis.', category: 'Marketing', icon: '🔍' },
  { id: 'pr-communications', title: 'PR & Communications', desc: 'Media relations, press, reputation.', category: 'Marketing', icon: '📰' },
  { id: 'events-marketing', title: 'Events & Field Marketing', desc: 'Event planning, sponsorships.', category: 'Marketing', icon: '🎪' },
  { id: 'web-development', title: 'Web Development', desc: 'HTML, CSS, JS, frameworks, deployment.', category: 'Tech', icon: '💻' },
  { id: 'mobile-development', title: 'Mobile App Development', desc: 'Android/iOS, app architecture, UI/UX.', category: 'Tech', icon: '📱' },
  { id: 'ai-engineer', title: 'AI Engineer', desc: 'AI systems design, LLMs, integration.', category: 'Tech', icon: '🤖' },
  { id: 'ml-engineer', title: 'Machine Learning Engineer', desc: 'Model training, algorithms, pipelines.', category: 'Tech', icon: '🧠' },
  { id: 'cybersecurity', title: 'Cybersecurity Analyst', desc: 'Threat detection, network security.', category: 'Tech', icon: '🔒' },
  { id: 'cloud-engineer', title: 'Cloud Engineer (AWS/Azure)', desc: 'Cloud architecture, deployment.', category: 'Tech', icon: '☁️' },
  { id: 'system-admin', title: 'System Administrator', desc: 'Server management, networking.', category: 'Tech', icon: '🖥️' },
];

const categories = ['All', 'General', 'Marketing', 'Tech'];

function RoleSelect() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSelect = (roleId) => navigate(`/round-select/${roleId}`);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const filteredRoles = activeCategory === 'All' ? roles : roles.filter((r) => r.category === activeCategory);

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navBrand}>🎯 Interview IQ</h2>
        <div style={styles.navRightGroup}>
          <span style={styles.homeButton} onClick={() => navigate('/dashboard')}>Home</span>
          <div style={{ position: 'relative' }}>
            <div style={styles.profileWrap} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div style={styles.profileAvatar}>{initials}</div>
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
        <div style={styles.heroPattern}></div>
        <span style={styles.heroBadge}>🎯 Choose Your Path</span>
        <h1 style={styles.heroTitle}>Which role are you preparing for?</h1>
        <p style={styles.heroSubtext}>Pick a role below — we'll tailor every question specifically to it.</p>
        <Link to="/how-it-works" style={styles.introLink}>New here? See how it works →</Link>
      </div>

      <div style={styles.content}>
        <div style={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat ? styles.tabActive : styles.tab}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              style={{
                ...styles.card,
                background: role.category === 'Marketing' ? '#e0d4ff' : role.category === 'Tech' ? '#d4c4ff' : '#c9b3ff',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onClick={() => handleSelect(role.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 25px 45px rgba(108,99,255,0.4)';
                const iconWrap = e.currentTarget.querySelector('.icon-wrap');
                if (iconWrap) iconWrap.style.transform = 'rotate(-8deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                const iconWrap = e.currentTarget.querySelector('.icon-wrap');
                if (iconWrap) iconWrap.style.transform = 'rotate(0deg) scale(1)';
              }}
            >
              <div style={styles.cardIconWrap} className="icon-wrap">
                <span style={styles.cardIcon}>{role.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{role.title}</h3>
              <p style={styles.cardDesc}>{role.desc}</p>
              <span style={styles.cardAction}>
                Start practicing <span style={styles.arrow}>→</span>
              </span>
            </div>
          ))}
        </div>
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
  navRightGroup: { display: 'flex', alignItems: 'center', gap: '14px' },
  homeButton: {
    fontSize: '13px', fontWeight: 600, color: '#4834d4', cursor: 'pointer',
    padding: '7px 16px', borderRadius: '8px', background: '#ece9ff',
  },
  profileWrap: { cursor: 'pointer' },
  profileAvatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: 700,
  },
  dropdown: {
    position: 'absolute', top: '46px', right: 0, background: '#fff', borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)', minWidth: '160px', overflow: 'hidden', zIndex: 10,
  },
  dropdownItem: { margin: 0, padding: '13px 18px', fontSize: '13px', color: '#333', cursor: 'pointer', borderBottom: '1px solid #f5f5f5' },
  heroBanner: {
    background: 'linear-gradient(135deg, #6C63FF 0%, #4834d4 60%, #3b1f8f 100%)',
    padding: '60px 20px 50px',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  heroPattern: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(4px)',
    padding: '7px 18px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.3px',
    marginBottom: '18px',
    position: 'relative',
  },
  heroTitle: { fontSize: '32px', margin: '0 0 10px', fontWeight: 800, position: 'relative' },
  heroSubtext: { fontSize: '15px', opacity: 0.9, margin: '0 0 16px', position: 'relative' },
  introLink: { color: '#fff', fontSize: '13px', textDecoration: 'underline', fontWeight: 500, position: 'relative' },
  content: { maxWidth: '1050px', margin: '-32px auto 0', padding: '0 20px 60px', position: 'relative' },
  tabs: {
    display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '35px', flexWrap: 'wrap',
    background: '#fff', padding: '12px', borderRadius: '18px', boxShadow: '0 10px 35px rgba(72,52,212,0.12)',
  },
  tab: { padding: '9px 22px', borderRadius: '20px', border: 'none', background: 'transparent', color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  tabActive: { padding: '9px 22px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(108,99,255,0.35)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '22px' },
  card: {
    background: '#fff', borderRadius: '18px', padding: '28px', cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.06)', transition: 'all 0.25s ease',
    borderTop: '4px solid #6C63FF', border: 'none',
  },
  cardIconWrap: {
    width: '52px', height: '52px', borderRadius: '14px',
    background: 'linear-gradient(135deg, #ece9ff, #ddd6ff)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
  },
  cardIcon: { fontSize: '24px' },
  cardTitle: { margin: '0 0 8px', color: '#2d2d2d', fontSize: '16px', fontWeight: 700 },
  cardDesc: { color: '#888', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px', minHeight: '40px' },
  cardAction: { color: '#6C63FF', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px' },
  arrow: { transition: 'transform 0.2s' },
};

export default RoleSelect;