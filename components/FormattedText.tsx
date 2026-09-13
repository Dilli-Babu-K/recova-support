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

  // Process block by block
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc list-outside pl-4 sm:pl-5 space-y-1.5 my-2.5 text-neutral-700 break-words">
            {currentList.items.map((item, i) => (
              <li key={i} className="break-words">{item}</li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="list-decimal list-outside pl-4 sm:pl-5 space-y-1.5 my-2.5 text-neutral-700 break-words">
            {currentList.items.map((item, i) => (
              <li key={i} className="break-words">{item}</li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushList();
      const quoteText = line.replace(/^>\s*/, '');
      blocks.push(
        <div key={`quote-${index}`} className="border-l-2 border-neutral-300 pl-3 py-1 my-2 text-neutral-600 italic text-xs sm:text-sm bg-neutral-100/50 rounded-r break-words">
          {parseInline(quoteText)}
        </div>
      );
      return;
    }

    // Bullet list: * or -
    const bulletMatch = line.match(/^([*-])\s+(.*)/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(parseInline(bulletMatch[2]));
      return;
    }

    // Numbered list: 1. or 2.
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(parseInline(numMatch[2]));
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
