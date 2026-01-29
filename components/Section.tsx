import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6 tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};