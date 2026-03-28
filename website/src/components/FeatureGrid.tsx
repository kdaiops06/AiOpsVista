import React from 'react';
import './FeatureGrid.css';

interface FeatureGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ children, columns = 4, className = '' }) => (
  <div className={`feature-grid feature-grid--cols-${columns} ${className}`.trim()}>
    {children}
  </div>
);

export default FeatureGrid;
