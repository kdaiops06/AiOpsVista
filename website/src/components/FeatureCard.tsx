import React from 'react';
import IconBox from './IconBox';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  dark?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, dark }) => (
  <div className={`feature-card${dark ? ' feature-card--dark' : ''}`}>
    <IconBox>{icon}</IconBox>
    <div className="feature-card__title">{title}</div>
    <div className="feature-card__desc">{description}</div>
  </div>
);

export default FeatureCard;
