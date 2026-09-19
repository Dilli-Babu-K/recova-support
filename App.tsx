import React, { useState } from 'react';
import { Accordion } from './components/Accordion';
import { SupportCategory } from './types';
import { 
  Search, 
  Mail, 
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { motion } from 'motion/react';

const supportData: SupportCategory[] = [
  {
    id: "readiness-score",
    title: "Daily Recovery Readiness Score & Color Indicators",
    iconName: "Activity",
    description: "Understand how your daily 0–100% readiness score and color zones are determined.",
    items: [
      {
        question: "How does Recova calculate my daily Recovery Readiness Score?",
        answer: "Your daily Recovery Score is computed on a **0–100% scale** every morning. Recova blends two fundamental physiological indicators:\n\n* **Training Load Strain (Yesterday):** The subjective intensity and duration of your previous workout session (*\"Hard\"*, *\"Moderate\"*, or *\"Rest\"*), modeled against your acute-to-chronic workload baseline.\n* **Sleep Quality & Restoration (Overnight):** Your total sleep duration, subjective sleep quality (*\"Poor\"*, *\"Okay\"*, *\"Good\"*), and nocturnal awakenings (WASO).\n\nThe resulting score reflects your physical readiness for physical strain today:\n* **High Readiness (Green Zone | 80%–100%):** Your central nervous system and muscles are well-rested. Optimal day for heavy strength training, high-intensity intervals, or peak athletic output.\n* **Moderate Readiness (Yellow Zone | 50%–79%):** Moderate physical fatigue detected. Suitable for steady-state training, moderate loads, technique drills, or maintenance work.\n* **Low Readiness / Elevated Strain (Red Zone | 0%–49%):** Significant training fatigue or accumulated sleep debt detected. We recommend prioritizing active recovery, mobility work, light walking, or full rest."
      }
    ]
  },
  {
    id: "training-workload",
    title: "Training Workload & Exercise Logging",
    iconName: "Activity",
    description: "Learn how to record workout sessions and catch up on missed logs.",
    items: [
      {
        question: "How do I log my training sessions?",
        answer: "Each evening or during your morning check-in, Recova prompts you to record your training workload:\n1. **Select your training category** (e.g., Strength/Weightlifting, Endurance/Running, Calisthenics/Bodyweight, Combat Sports, or Functional Fitness).\n2. **Rate your subjective training intensity:**\n   * **Hard:** Heavy compound lifts, exhaustive intervals, or high muscular fatigue.\n   * **Moderate:** Standard training session, steady pace, controlled effort.\n   * **Rest / Recovery:** Light mobility, restorative walk, or complete rest day."
      },
      {
        question: "What happens if I forget to log yesterday's training?",
        answer: "When you open Recova in the morning, the app will gently display a training catch-up prompt first. Once you confirm yesterday's training intensity, your Recovery Score for today is calculated immediately."
      }
    ]
  },
  {
    id: "sleep-tracking",
    title: "Sleep Duration Tracking & Sensor Setup",
    iconName: "Moon",
    description: "Guidance for phone sensor placement, accuracy best practices, and aligning sleep times.",
    items: [
      {
        question: "How does automatic sleep tracking work without a wearable?",
        answer: "Recova uses your phone's movement and surrounding-light signals to automatically estimate your sleep and wake times. Just keep your phone nearby while you sleep — no smartwatch, ring, or wearable is required."
      },
      {
        question: "How to get the most reliable sleep duration estimate:",
        answer: "For the best automated rest detection, follow these simple best practices:\n* **Bedside Placement:** Place your phone on a stable surface beside your bed (such as a nightstand or bedside table) within arm's reach of where you sleep.\n* **Avoid Obstructions:** Avoid placing your phone under pillows, heavy blankets, or where it can be bumped during the night.\n* **Morning Phone Use:** Upon waking up, pick up and use your phone normally for a few minutes so the sensors recognize that your active day has begun.\n* **What to Avoid:** Sleep estimates may be less reliable when travelling (e.g., overnight trains, flights, cars) or in environments with continuous external motion.\n\n> *Note on Estimates & Trends:* Recova provides an algorithmic estimate based on phone sensor data to track your personal 7-day and 30-day recovery baseline. It is not a clinical sleep study (polysomnography)."
      },
      {
        question: "Updating & Aligning Your Sleep Times",
        answer: "You always retain full control. Because phone-based tracking provides an estimate, quiet time resting awake in bed before falling asleep or using your phone after waking can occasionally lead to an overestimate or underestimate. You can easily adjust and align your bedtime and wake time during your morning check-in to ensure your daily log reflects your actual sleep."
      }
    ]
  },
  {
    id: "analyzing-sleep",
    title: "Understanding \"Analyzing Sleep...\" & Morning Updates",
    iconName: "Moon",
    description: "Why the morning evaluation phase appears and when your sleep summary updates.",
    items: [
      {
        question: "Why is Recova showing \"Analysing\" but not showing my sleep result?",
        answer: "Recova needs to run in the background to receive and process your sleep data. Some Android phones restrict background activity to save battery, which can prevent Recova from completing your sleep analysis.\n\n1. **Allow Recova to run without background power restrictions:**\n   * Open your phone's *Settings → Battery → Background power consumption / Background power management / Background activity*\n   * Find **Recova** and change its setting to: **Don't restrict background power usage** (or *No restrictions / Unrestricted*).\n   * *Note:* This setting is important because some phones use a separate background power-management system that can restrict Recova even when its App Battery setting is unrestricted.\n\n2. **Remove battery restrictions from Recova:**\n   * Open *Settings → Apps → Recova → Battery*\n   * Choose: **Unrestricted** (or *Allow background activity / Don't optimize*).\n\n3. **Allow Auto-start when available:**\n   * Some phones have *Auto-start* or *Auto-launch* settings. Make sure **Recova** is enabled.\n\n> **Important:** The exact settings and menu names vary depending on your phone brand, model, and Android version. You may see *Background power consumption*, *Background activity*, *Battery optimization*, *Battery usage*, *Auto-start*, or similar options. For the most reliable sleep analysis, make sure Recova is not restricted by either the phone's Background Power Management or its individual App Battery settings."
      },
      {
        question: "Why does Recova show \"Analysing\" in the morning, and when will it update?",
        answer: "* **Why it appears:** When you first wake up, Recova takes a brief window to confirm that your sleep period has genuinely concluded and that you are up for the day, rather than just shifting in bed or briefly checking the clock.\n* **Automatic Morning Update:** Typically within 15 to 60 minutes of normal morning phone activity, your sleep duration estimate and morning Recovery Score are published.\n* **Noon Cutoff:** If no overnight rest window was detected, the status clears automatically at 12:00 PM (noon)."
      }
    ]
  },
  {
    id: "dual-card",
    title: "The Dual-Card Science Engine (Card 1 Benchmarks & Card 2 Protocols)",
    iconName: "Sliders",
    description: "Comparative sleep duration benchmarks and actionable non-medical recovery protocols.",
    items: [
      {
        question: "What is Card 1 (Comparative Sleep Benchmarks)?",
        answer: "Card 1 contextualizes your overnight sleep duration against curated biological, elite athletic, and aerospace baselines:\n* **Athletic & Exploration Benchmarks:** Compares your rest against targets such as Pro Footballer, Space Station Crew Schedule, Grand Prix Driver, Grand Slam Athlete, World Record Sprinter, and animal circadian baselines.\n* **Smart Rotation:** Rotates dynamically every morning so you see fresh, engaging comparative benchmarks every day."
      },
      {
        question: "What is Card 2 (Science Recovery Protocols)?",
        answer: "Card 2 detects specific patterns in your recovery (such as night awakenings, acute sleep debt, or circadian shifts) and provides actionable, non-medical recovery protocols:\n* **Examples:** Thermoregulatory room cooling guidance, nutrition supporting natural relaxation, evening screen light management, or circadian morning light walks."
      }
    ]
  },
  {
    id: "streaks-history",
    title: "Streaks, History Graphs & Data Syncing",
    iconName: "Activity",
    description: "Track consistency, 7-day and 30-day trends, and secure cloud synchronization.",
    items: [
      {
        question: "How do streaks and history tracking work?",
        answer: "* **Logging Streaks:** Every consecutive day you log your training and sleep, your daily streak increases.\n* **History Trends:** View 7-day and 30-day recovery baselines, training strain patterns, and sleep consistency trends to identify overreaching before burnout occurs.\n* **Cloud Sync:** When signed in with your Google Account, your daily recovery summaries, streaks, and training logs are encrypted and synchronized via Firebase Firestore."
      }
    ]
  },
  {
    id: "security-privacy",
    title: "Account Security, Device Permissions & Local Privacy",
    iconName: "ShieldCheck",
    description: "Physical Activity permissions, battery-efficient design, and on-device privacy.",
    items: [
      {
        question: "Why does Recova ask for Physical Activity permission?",
        answer: "Physical activity permission allows Android's on-device sensor framework to detect stillness and wake times locally on your phone's processor."
      },
      {
        question: "How does Recova impact my phone's battery life?",
        answer: "Recova has **virtually zero impact on battery life**. Instead of running heavy continuous background services, Recova uses Android's built-in low-power sensor framework and battery-efficient scheduled tasks. You do not need to disable standard battery optimization or keep the app open overnight."
      },
      {
        question: "Is my raw sensor data uploaded to the cloud or sold?",
        answer: "**NO.** Continuous raw accelerometer motion and light readings are evaluated 100% locally on your phone's CPU and are **NEVER** uploaded to cloud servers or sold to third parties. Only your final confirmed daily summary (total hours, bedtime, wake time) is saved in Google Firebase Firestore under your private, authenticated account."
      }
    ]
  },
  {
    id: "account-deletion",
    title: "Account & Data Deletion Guide",
    iconName: "User",
    description: "Instant in-app account deletion and web email deletion requests.",
    items: [
      {
        question: "How do I permanently delete my account and data?",
        answer: "You have full ownership of your data:\n* **In-App Deletion (Instant):** Go to **More > Privacy & Data > Delete Account** in Recova, and verify your Google Account. Your account profile, workout logs, and historical sleep records are immediately purged from our servers.\n* **Web / Email Deletion Request:** Email `recova.app0@gmail.com` with the subject *\"Account Deletion Request\"* from your registered Google email address. Deletion is processed within **48 hours**."
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Complete Technical Troubleshooting",
    iconName: "Sliders",
    description: "Step-by-step diagnostic solutions for sleep updates, notifications, and offline mode.",
    items: [
      {
        question: "Issue: Sleep prediction did not appear in the morning.",
        answer: "**Solution:**\n\n1. Ensure **Physical Activity** permission is set to “Allow” in your phone's *Settings → Apps → Recova → Permissions*.\n2. Pick up and use your phone normally for a few minutes in the morning so your device registers that you are awake.\n3. Make sure Recova is allowed to run without background restrictions. Go to your phone's **Battery** settings and look for *Background power consumption / Background activity / Background app management*. Find **Recova** and select **“Don't restrict,” “No restrictions,”** or **“Unrestricted,”** depending on your device.\n4. Also check *Settings → Apps → Recova → Battery* and select **“Unrestricted”** or the equivalent option, if available.\n\n> **Note:** Battery and background settings can have different names and locations depending on your phone brand and Android version."
      },
      {
        question: "Issue: Notification reminders are silent or not triggering.",
        answer: "**Solution:** Check **Android Settings > Notifications > Recova** and ensure notification channels are enabled."
      },
      {
        question: "Issue: App shows offline mode.",
        answer: "**Solution:** Recova features full offline capability! You can log sleep and view recovery scores offline. Your logs will automatically sync to Firebase Firestore once an internet connection is restored."
      }
    ]
  }
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackState, setFeedbackState] = useState<'none' | 'helpful' | 'not-helpful'>('none');

  const allItems = supportData.flatMap(cat => cat.items);

  const filteredItems = searchQuery.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-neutral-50/70 text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-neutral-800 via-neutral-950 to-neutral-800"></div>

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        
        {/* Header */}
        <header className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
            Recova Support
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-2.5 sm:mb-3.5 tracking-tight break-words">
            Comprehensive Help & Support Center
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2.5 sm:mb-3">
            Official Master Help Desk, User Guide & FAQ Portal
          </p>
          <p className="text-xs sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Welcome to the Recova Support Center. Below is the complete user guide and technical reference covering every feature, recovery metric, and user setting in the Recova app.
          </p>
        </header>

        {/* Dynamic Search Box */}
        <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-neutral-900 transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="text"
              placeholder="Search questions, keywords, sleep sync..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 pl-10 sm:pl-12 pr-14 sm:pr-16 py-3 sm:py-3.5 bg-white border border-neutral-200 rounded-xl sm:rounded-2xl shadow-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 focus:border-neutral-900 transition-all text-xs sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-xs text-neutral-500 pl-1 break-words">
              Showing matching results for <span className="font-semibold text-neutral-800">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* FAQ Accordion Section */}
        <div className="mb-12 sm:mb-16 w-full max-w-full">
          <div className="bg-white/80 border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-sm w-full max-w-full overflow-hidden">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-neutral-900 tracking-tight break-words">
                {searchQuery ? "Search Results" : "Frequently Asked Questions"}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 break-words leading-normal">
                {searchQuery 
                  ? `Found ${filteredItems.length} matching answer(s)`
                  : "Browse our complete athlete guide and technical reference below."
                }
              </p>
            </div>

            {/* FAQs Container */}
            <div className="w-full max-w-full overflow-hidden">
              <Accordion items={filteredItems} searchQuery={searchQuery} />
            </div>

            {/* Was this helpful? Feedback Section */}
            <div className="mt-8 sm:mt-12 pt-5 sm:pt-7 border-t border-neutral-100 w-full max-w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-neutral-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-200/60 w-full text-center sm:text-left">
                <div>
                  <h4 className="font-semibold text-neutral-950 text-xs sm:text-sm">Was this page helpful to you?</h4>
                  <p className="text-[11px] text-neutral-500">We appreciate your anonymous feedback.</p>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto justify-center">
                  {feedbackState === 'none' ? (
                    <>
                      <button
                        onClick={() => setFeedbackState('helpful')}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-neutral-500" />
                        Yes
                      </button>
                      <button
                        onClick={() => setFeedbackState('not-helpful')}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                      >
                        <ThumbsDown className="w-3.5 h-3.5 text-neutral-500" />
                        No
                      </button>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-semibold bg-neutral-900 text-white px-3 sm:px-4 py-1.5 rounded-lg text-center"
                    >
                      {feedbackState === 'helpful' ? "Thank you for your feedback!" : "Send your feedback via email below."}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Direct Support Contact */}
        <section id="contact-support" className="py-2 sm:py-4 w-full max-w-full">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-neutral-200 shadow-sm relative overflow-hidden w-full max-w-full">
            <div className="relative z-10 max-w-xl mx-auto text-center px-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-neutral-100 text-neutral-800 mb-2.5 sm:mb-3">
                <Mail className="w-3 h-3 flex-shrink-0" />
                Direct Support Contact
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 mb-2 sm:mb-3 tracking-tight break-words">
                Need Direct Support?
              </h2>
              <p className="text-neutral-600 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                Our support team is dedicated to assisting you with account inquiries, recovery metric questions, or feedback.
              </p>
              
              <div className="p-3 sm:p-5 bg-neutral-50 rounded-xl sm:rounded-2xl border border-neutral-200/80 w-full max-w-md mx-auto">
                <p className="text-[10px] sm:text-xs text-neutral-500 mb-1.5 uppercase tracking-widest font-black">Official Support Email</p>
                
                <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-neutral-200 flex justify-center items-center overflow-hidden">
                  <a 
                    href="mailto:recova.app0@gmail.com?subject=Recova%20App%20Support" 
                    className="text-xs sm:text-base md:text-lg font-bold text-neutral-950 hover:text-neutral-700 transition-colors break-all block text-center"
                  >
                    recova.app0@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with medical disclaimer */}
        <footer className="text-center border-t border-neutral-200/80 pt-8 sm:pt-10 mt-10 sm:mt-14 pb-6 w-full max-w-full">
          <p className="text-[11px] sm:text-xs text-neutral-500 max-w-2xl mx-auto leading-relaxed px-1 break-words">
            <strong className="text-neutral-700">Medical Disclaimer:</strong> Recova is an athletic tracking and recovery wellness tool. It is not a medical device. Data provided by Recova supports training decisions but does not replace professional medical advice, clinical diagnosis, or polysomnography sleep studies. Always consult a physician or qualified healthcare provider before beginning any new exercise or fitness program.
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-medium mt-4">
            &copy; 2026 Recova. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;
