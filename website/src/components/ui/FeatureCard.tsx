import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  dark?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, dark }) => (
  <div
    className="feature-card"
    style={{
      background: dark ? '#23283A' : '#fff',
      borderRadius: 12,
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.2s',
      boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.08)',
      border: '1.5px solid',
      borderColor: dark ? 'transparent' : '#E5E7EB',
      color: dark ? '#fff' : '#23283A',
      cursor: 'default',
    }}
    onMouseOver={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = dark
        ? '0 6px 24px rgba(0,0,0,0.18)'
        : '0 6px 24px rgba(79,140,255,0.12)';
      (e.currentTarget as HTMLDivElement).style.borderColor = '#4F8CFF';
    }}
    onMouseOut={e => {
      (e.currentTarget as HTMLDivElement).style.transform = '';
      (e.currentTarget as HTMLDivElement).style.boxShadow = dark
        ? '0 2px 8px rgba(0,0,0,0.10)'
        : '0 2px 8px rgba(0,0,0,0.08)';
      (e.currentTarget as HTMLDivElement).style.borderColor = dark ? 'transparent' : '#E5E7EB';
    }}
  >
    <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
    <h3 style={{ marginBottom: 8 }}>{title}</h3>
    <p style={{ color: dark ? '#B3B8C5' : '#4B5563' }}>{description}</p>
  </div>
);

export default FeatureCard;
