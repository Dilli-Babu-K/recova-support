import React, { useState } from 'react';
import { FaqItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FormattedText } from './FormattedText';

interface AccordionProps {
  items: FaqItem[];
  searchQuery?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, searchQuery = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredItems = items.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400 font-medium px-4">
        No answers match your search term. Try another word.
      </div>
    );
  }

  return (
    <div className="space-y-2.5 sm:space-y-3 w-full max-w-full">
      {filteredItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border border-neutral-200/80 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-sm w-full max-w-full min-w-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-3.5 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-neutral-400/30 font-medium text-neutral-800 hover:text-neutral-900 transition-colors cursor-pointer gap-2 sm:gap-3"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-neutral-900 leading-snug text-[14px] sm:text-base break-words flex-1 min-w-0">
                {item.question}
              </span>
              <motion.span 
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-shrink-0 text-neutral-400 p-0.5"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden w-full max-w-full"
                >
                  <div className="p-3.5 sm:p-5 pt-0 text-neutral-600 leading-relaxed border-t border-neutral-100/60 bg-neutral-50/50 break-words w-full max-w-full overflow-hidden">
                    <FormattedText content={item.answer} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
