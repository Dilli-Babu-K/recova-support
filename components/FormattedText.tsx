import React from 'react';

interface FormattedTextProps {
  content: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ content }) => {
  const parseInline = (text: string): React.ReactNode[] => {
    // Splits text with bold (**text**), italics (*text*), and code (`text`)
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-semibold text-neutral-900">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={match.index} className="italic text-neutral-800">
            {token.slice(1, -1)}
          </em>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 rounded bg-neutral-200/60 font-mono text-xs text-neutral-900 break-all inline-block max-w-full">
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  // Process line by line with support for hierarchical lists and sub-items
  interface ListItemData {
    number?: number;
    text: React.ReactNode[];
    subItems?: React.ReactNode[][];
  }

  interface BlockList {
    type: 'ol' | 'ul';
    start?: number;
    items: ListItemData[];
  }

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let activeList: BlockList | null = null;

  const flushList = () => {
    if (activeList) {
      if (activeList.type === 'ul') {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc list-outside pl-4 sm:pl-5 space-y-2 my-2.5 text-neutral-700 break-words">
            {activeList.items.map((item, i) => (
              <li key={i} className="break-words">
                <div>{item.text}</div>
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="list-disc list-outside pl-4 sm:pl-5 space-y-1.5 mt-1.5 text-neutral-600">
                    {item.subItems.map((sub, j) => (
                      <li key={j} className="break-words">{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} start={activeList.start || 1} className="list-decimal list-outside pl-4 sm:pl-5 space-y-3 my-2.5 text-neutral-700 break-words">
            {activeList.items.map((item, i) => (
              <li key={i} value={item.number} className="break-words font-normal">
                <div>{item.text}</div>
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="list-disc list-outside pl-4 sm:pl-5 space-y-1.5 mt-2 text-neutral-600">
                    {item.subItems.map((sub, j) => (
                      <li key={j} className="break-words">{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
      }
      activeList = null;
    }
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      return;
    }

    // Headings (H2 / H3)
    if (line.startsWith('### ')) {
      flushList();
      const headingText = line.replace(/^###\s+/, '');
      const isImportant = headingText.toLowerCase().includes('important');
      blocks.push(
        <h4 
          key={`h3-${index}`} 
          className={`font-bold text-sm sm:text-base mt-4 mb-2 pt-2 border-t border-neutral-200/80 first:border-0 first:mt-1 ${
            isImportant ? 'text-amber-900 bg-amber-50/80 -mx-1 sm:-mx-2 px-2.5 py-1.5 rounded-lg border-l-4 border-l-amber-500 border-t-0' : 'text-neutral-900'
          }`}
        >
          {parseInline(headingText)}
        </h4>
      );
      return;
    }

    if (line.startsWith('## ')) {
      flushList();
      const headingText = line.replace(/^##\s+/, '');
      blocks.push(
        <h3 key={`h2-${index}`} className="font-bold text-neutral-950 text-base sm:text-lg mt-4 mb-2">
          {parseInline(headingText)}
        </h3>
      );
      return;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushList();
      const quoteText = line.replace(/^>\s*/, '');
      blocks.push(
        <div key={`quote-${index}`} className="border-l-2 border-neutral-300 pl-3 py-1 my-2.5 text-neutral-600 italic text-xs sm:text-sm bg-neutral-100/50 rounded-r break-words">
          {parseInline(quoteText)}
        </div>
      );
      return;
    }

    // Numbered list item: 1. or 2.
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const numVal = parseInt(numMatch[1], 10);
      if (!activeList || activeList.type !== 'ol') {
        flushList();
        activeList = { type: 'ol', start: numVal, items: [] };
      }
      activeList.items.push({
        number: numVal,
        text: parseInline(numMatch[2]),
        subItems: [],
      });
      return;
    }

    // Bullet list item: * or -
    const bulletMatch = line.match(/^([*-])\s+(.*)/);
    if (bulletMatch) {
      // If we are currently inside an ordered list, attach this bullet as a subItem to the current numbered item!
      if (activeList && activeList.type === 'ol' && activeList.items.length > 0) {
        const lastIndex = activeList.items.length - 1;
        if (!activeList.items[lastIndex].subItems) {
          activeList.items[lastIndex].subItems = [];
        }
        activeList.items[lastIndex].subItems!.push(parseInline(bulletMatch[2]));
        return;
      }

      if (!activeList || activeList.type !== 'ul') {
        flushList();
        activeList = { type: 'ul', items: [] };
      }
      activeList.items.push({
        text: parseInline(bulletMatch[2]),
        subItems: [],
      });
      return;
    }

    // Regular paragraph
    flushList();
    blocks.push(
      <p key={`p-${index}`} className="my-1.5 leading-relaxed text-neutral-700 break-words">
        {parseInline(line)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1 text-sm md:text-[15px] break-words overflow-hidden w-full max-w-full">{blocks}</div>;
};
