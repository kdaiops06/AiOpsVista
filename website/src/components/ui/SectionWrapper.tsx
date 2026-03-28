import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, dark, className = '', style }) => (
  <section
    className={`section${dark ? ' section-alt' : ''} ${className}`.trim()}
    style={{
      background: dark ? '#181C26' : undefined,
      color: dark ? '#fff' : undefined,
      ...style,
    }}
  >
    <div className="container">
      <div className="row">
        <div className="col col--8 col--offset-2">{children}</div>
      </div>
    </div>
  </section>
);

export default SectionWrapper;
