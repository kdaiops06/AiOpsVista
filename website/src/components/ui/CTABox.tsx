import React from 'react';

interface CTABoxProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const CTABox: React.FC<CTABoxProps> = ({ children, style, className = '' }) => (
  <div
    className={`cta-box ${className}`.trim()}
    style={{
      background: 'linear-gradient(90deg, #4F8CFF 0%, #6A82FB 100%)',
      color: '#fff',
      borderRadius: 12,
      padding: '2rem',
      textAlign: 'center',
      margin: '2rem 0',
      ...style,
    }}
  >
    {children}
  </div>
);

export default CTABox;
