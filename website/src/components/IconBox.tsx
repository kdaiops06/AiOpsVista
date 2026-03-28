import React from 'react';
import './IconBox.css';

interface IconBoxProps {
  children: React.ReactNode;
  color?: string;
}

const IconBox: React.FC<IconBoxProps> = ({ children, color }) => (
  <div className="icon-box" style={{ background: color || 'rgba(99,102,241,0.10)' }}>
    {children}
  </div>
);

export default IconBox;
