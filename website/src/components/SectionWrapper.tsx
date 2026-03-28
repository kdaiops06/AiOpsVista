import React from 'react';
import './SectionWrapper.css';

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, dark, className = '' }) => (
  <section className={`section-wrapper${dark ? ' section-wrapper--dark' : ''} ${className}`.trim()}>
    <div className="section-wrapper__container">{children}</div>
  </section>
);

export default SectionWrapper;
