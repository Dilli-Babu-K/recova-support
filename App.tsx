import React from 'react';
import { Accordion } from './components/Accordion';
import { Section } from './components/Section';
import { FaqItem, TroubleshootingStep } from './types';

const faqData: FaqItem[] = [
  {
    question: "Why is my recovery hidden or masked?",
    answer: "Recova requires a complete dataset to calculate an accurate biological baseline. If you see a hidden state, it means the app is missing either a sleep log or a training log for the current cycle. Once the data is entered, your recovery score will reveal itself."
  },
  {
    question: "Why does Recova need both sleep and training logs?",
    answer: "Your body is a system of stress and recovery. Training provides the stress stimulus, while sleep provides the biological repair. Recova cannot calculate your readiness without balancing the equation: Stress (Training) vs. Repair (Sleep)."
  },
  {
    question: "What happens if I miss a day?",
    answer: "Consistency is key to the algorithm. If you miss a day, Recova may pause your trends or require a new calibration period to re-establish your baseline. We recommend logging even rest days to maintain accuracy."
  },
  {
    question: "Why didn’t I receive a notification?",
    answer: "Notifications are designed to be minimal. If you have already logged your data, or if your recovery is stable, the app may not send an alert. Please check your device settings to ensure Recova has permission to send notifications."
  },
  {
    question: "Why does recovery sometimes show calibration or learning?",
    answer: "When you first join or after a break, Recova needs 3-5 days of consistent data to learn your unique physiology. During this phase, scores are withheld to prevent providing inaccurate guidance."
  },
  {
    question: "Does soreness affect recovery?",
    answer: "Subjective soreness is a factor, but Recova prioritizes objective data. While you may feel sore, your physiological systems (nervous system, heart rate variability) might be fully recovered. Listen to your body, but trust the data for systemic readiness."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. Your health data is stored locally on your device or securely within your private account. We do not sell your personal health metrics to third-party advertisers."
  }
];

const troubleshootingData: TroubleshootingStep[] = [
  {
    issue: "Recovery shows 'Hidden' or '0'",
    solution: "Ensure you have logged both sleep duration and yesterday's activity strain. Check if today is a calibration day."
  },
  {
    issue: "Notifications not appearing",
    solution: "Go to your phone Settings > Apps > Recova > Notifications. Ensure 'Allow Notifications' is toggled on."
  },
  {
    issue: "Logs feel out of sync",
    solution: "Verify that your time zone settings are correct. Recova calculates cycles based on a standard 24-hour day starting at midnight."
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-600 font-sans selection:bg-neutral-200 selection:text-black">
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            Recova Support
          </h1>
          <div className="h-1 w-20 bg-neutral-900 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Recova is a recovery tracking app that estimates perceived recovery readiness.
          </p>
        </header>

        {/* Calculation Logic */}
        <Section title="How Recova Calculates Recovery" className="border-b border-neutral-200">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-neutral-900 font-medium mb-2">1. Strain</h3>
              <p className="text-sm text-neutral-600">
                We analyze yesterday's training load and daily stress accumulation to understand the stress placed on your body.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-neutral-900 font-medium mb-2">2. Repair</h3>
              <p className="text-sm text-neutral-600">
                We measure last night's sleep quantity and quality to determine how much of that accumulated stress was cleared.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-neutral-900 font-medium mb-2">3. Baseline</h3>
              <p className="text-sm text-neutral-600">
                Your daily readiness is compared against your long-term baseline, not a generic average, to ensure personalized guidance.
              </p>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section title="Frequently Asked Questions">
          <Accordion items={faqData} />
        </Section>

        {/* Troubleshooting */}
        <Section title="Troubleshooting" className="border-t border-neutral-200">
          <div className="space-y-4">
            {troubleshootingData.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6 bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
                <div className="md:w-1/3">
                  <span className="text-neutral-900 font-medium block">{step.issue}</span>
                </div>
                <div className="md:w-2/3">
                  <p className="text-neutral-600 text-sm">{step.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section className="text-center py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200 shadow-sm">
            <h2 class="text-2xl font-semibold text-neutral-900 mb-4">Still need help?</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              If you are experiencing issues not covered above, please reach out to our support team. 
              We aim to review all inquiries promptly.
            </p>
            
            <div className="mt-4 p-6 bg-neutral-100 rounded-xl border border-neutral-200 inline-block w-full max-w-lg">
              <p className="text-xs text-neutral-500 mb-3 uppercase tracking-widest font-bold">Direct Email</p>
              <a href="mailto:recova.app0@gmail.com?subject=Recova%20App%20Support" className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight hover:text-neutral-600 transition-colors break-all block">
                recova.app0@gmail.com
              </a>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="text-center border-t border-neutral-200 pt-8 mt-8">
          <p className="text-xs text-neutral-500 max-w-lg mx-auto leading-normal">
            Note: Recova is a tool for tracking training and recovery trends. It is not a medical device. 
            Data provided by Recova supports training decisions but does not replace professional medical advice or diagnosis. 
            Always consult a physician before beginning any new exercise program.
          </p>
          <p className="text-xs text-neutral-500 mt-4">
            &copy; 2026 Recova. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;