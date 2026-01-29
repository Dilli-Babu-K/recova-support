import React, { useState } from 'react';
import { FaqItem } from '../types';

interface AccordionProps {
  items: FaqItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border border-neutral-200 rounded-lg bg-white overflow-hidden transition-colors hover:border-neutral-300 shadow-sm"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-neutral-400/50"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-neutral-900">{item.question}</span>
              <span className={`ml-4 transform transition-transform duration-200 text-neutral-400 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-4 pt-0 text-neutral-600 leading-relaxed border-t border-neutral-100">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};