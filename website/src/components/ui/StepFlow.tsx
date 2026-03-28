import React from 'react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepFlowProps {
  steps: Step[];
  style?: React.CSSProperties;
}

const StepFlow: React.FC<StepFlowProps> = ({ steps, style }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', ...style }}>
    {steps.map((step, idx) => (
      <div key={idx} style={{ minWidth: 200, maxWidth: 320, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{step.icon}</div>
        <h3 style={{ marginBottom: 8 }}>{step.title}</h3>
        <p style={{ color: '#4B5563' }}>{step.description}</p>
      </div>
    ))}
  </div>
);

export default StepFlow;
