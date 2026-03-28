import React from 'react';
import './CTABox.css';

interface CTABoxProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
  children?: React.ReactNode;
}

const CTABox: React.FC<CTABoxProps> = ({ headline, buttonText, buttonHref, children }) => (
  <div className="cta-box">
    <h2 className="cta-box__headline">{headline}</h2>
    {children && <div className="cta-box__desc">{children}</div>}
    <a className="cta-box__button" href={buttonHref}>{buttonText}</a>
  </div>
);

export default CTABox;
