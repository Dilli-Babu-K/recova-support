export interface FaqItem {
  question: string;
  answer: string;
}

export interface SupportCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  items: FaqItem[];
}

export interface TroubleshootingStep {
  issue: string;
  solution: string;
}