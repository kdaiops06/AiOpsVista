import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({ children, columns = 3, gap = '1.5rem', style }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
      gap,
      justifyContent: 'center',
      margin: '2rem 0',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Grid;
