import React, { useState } from 'react';
import { Accordion } from './components/Accordion';
import { SupportCategory } from './types';
import { 
  Activity, 
  Moon, 
  Sliders, 
  User, 
  Search, 
  Mail, 
  Copy, 
  Check, 
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const supportData: SupportCategory[] = [
  {
    id: "general",
    title: "Daily Recovery Readiness Score & Color Indicators",
    iconName: "Activity",
    description: "Understand your score and baseline calculations.",
    items: [
      {
        question: "How does Recova calculate my daily Recovery Readiness Score?",
        answer: "Your daily Recovery Score is computed on a 0–100% scale every morning. Recova's engine blends two fundamental biological signals:\n\n*   **Training Load Strain (Yesterday):** The subjective intensity and duration of your previous workout session (\"Hard\", \"Moderate\", or \"Rest\").\n*   **Sleep Quality & Restoration (Overnight):** Your total net sleep hours, subjective sleep quality (\"Poor\", \"Okay\", \"Good\"), and night awakenings (WASO).\n\nThe resulting score reflects your physical readiness for strain today:\n\n*   **High Readiness (Green Zone | 80%–100%):** Your central nervous system and muscles are well-rested. Optimal day for heavy strength training, high-intensity intervals, or peak athletic performance.\n*   **Moderate Readiness (Yellow Zone | 50%–79%):** Moderate fatigue detected. Suitable for steady-state training, moderate weights, or skill practice.\n*   **Low Readiness / High Strain (Red Zone | 0%–49%):** Significant fatigue or sleep debt detected. Recommended to prioritize active recovery, mobility work, light walking, or full rest."
      }
    ]
  },
  {
    id: "training",
    title: "Training Workload & Exercise Logging",
    iconName: "Activity",
    description: "Learn how to record and manage your training sessions.",
    items: [
      {
        question: "How do I log my training sessions?",
        answer: "Each evening or during your morning check-in, Recova prompts you to record your training workload for the day:\n\n1.  **Select your primary training category** (e.g., Strength/Weightlifting, Endurance/Running, Calisthenics/Bodyweight, Combat Sports, or Functional Fitness).\n2.  **Rate your subjective training intensity:**\n    *   **Hard:** Heavy compound lifting, exhaustive cardio, or high muscular fatigue.\n    *   **Moderate:** Standard gym session, moderate pace, controlled effort.\n    *   **Rest / Recovery:** Light mobility, active walking, or complete rest day."
      },
      {
        question: "What happens if I forget to log yesterday's training?",
        answer: "When you open Recova in the morning, the app will gently display a training catch-up prompt first. Once you confirm yesterday's training intensity, your Recovery Score for today is calculated instantly."
      }
    ]
  },
  {
    id: "sleep-tracking",
    title: "Sleep Duration Tracking & Google Sleep API Setup",
    iconName: "Moon",
    description: "Understand automatic sleep predictions and manual adjustments.",
    items: [
      {
        question: "How does automatic sleep tracking work without a smartwatch or wearable?",
        answer: "Recova utilizes Google Play Services Sleep API fused with an on-device 5-Layer Algorithmic Engine. By evaluating local phone motion micro-epochs and ambient light levels, Recova detects when you fall asleep and when you wake up—with zero uncomfortable chest straps or wearable devices required."
      },
      {
        question: "Best practices for 100% accurate automatic sleep predictions:",
        answer: "*   **Bedside Phone Placement:** Place your mobile phone stationary on a nightstand, bedside table, or mattress edge within arm's reach of where you sleep. (Avoid leaving your phone in another room or on a far desk while watching TV).\n*   **Single Consistent Room:** Sleep in a consistent, dark, quiet room.\n*   **Screen Face Down:** Turn off your phone screen or place it face down. Dark environments allow the light sensors to lock onto bedtime onset significantly faster.\n*   **Morning Phone Interaction:** Upon waking up, pick up or unlock your phone. Recova requires approximately 5 to 15 minutes of continuous morning motion to verify that your sleep segment has officially ended."
      },
      {
        question: "Manual Sleep Confirmation & Edit Limits",
        answer: "You always retain full control. Every morning, you can review, adjust, or manually input your bedtime and waketime before saving. To prevent database desynchronization and log corruption, manual adjustments to a saved daily sleep session are limited to **TWO (2) manual edits per calendar day**."
      }
    ]
  },
  {
    id: "prediction-timing",
    title: "Understanding \"Analyzing Sleep...\" & Prediction Timing",
    iconName: "Moon",
    description: "Learn about the morning analysis phase.",
    items: [
      {
        question: "Why does my app show \"Analyzing Sleep...\" in the morning, and when will it vanish?",
        answer: "**Why it appears:** Google Sleep API evaluates sleep in 10-minute micro-epochs. When you first wake up, Recova's 5-Layer Engine enters an evaluation phase to verify that your sleep segment meets minimum gross duration guidelines (3.0+ hours) and falls within the valid morning wake window (Solar Gate).\n\n**When it vanishes:**\n*   **Prediction Publication:** As soon as the 5-Layer Engine verifies your sleep prediction (typically 5 to 15 minutes after you wake up and move your phone), your Recovery Score is published and the status updates to your Sleep Summary.\n*   **Manual Confirmation:** Tapping the card to manually confirm your sleep times clears \"Analyzing Sleep...\" immediately.\n*   **Automatic Noon Cutoff:** If no valid sleep event is detected, the status clears automatically at 12:00 PM (noon)."
      }
    ]
  },
  {
    id: "dual-card",
    title: "The Dual-Card Science Engine",
    iconName: "Sliders",
    description: "Explore the insights on Cards 1 & 2.",
    items: [
      {
        question: "What is Card 1 (Comparative Sleep Benchmarks)?",
        answer: "Card 1 compares your overnight sleep duration against curated biological, athletic, and space-science baselines:\n\n*   **Mammalian & Athletic Entities:** Compares your rest against baselines (e.g. Professional Footballer, NASA Astronaut, Lion, Sloth, Kiwi, Panda, Ronaldo).\n*   **Smart Rotation System:** Uses a 4-day anti-repetition rotation guard so you see fresh, engaging comparative benchmarks every morning."
      },
      {
        question: "What is Card 2 (Science Recovery Protocols)?",
        answer: "Card 2 detects specific sleep anomalies in your telemetry (such as high night awakenings/WASO, acute sleep debt, or circadian phase shift) and automatically prescribes actionable recovery protocols:\n\n*   **Examples:** Thermoregulatory room cooling protocols, GABA precursor nutritional guidance, photic blue-light shields, or circadian anchor walks."
      }
    ]
  },
  {
    id: "history-sync",
    title: "Streaks, History Graphs & Data Syncing",
    iconName: "Activity",
    description: "Track your progress and sync across devices.",
    items: [
      {
        question: "How do streaks and history tracking work?",
        answer: "*   **Logging Streaks:** Every consecutive day you log your training and sleep, your daily streak increases.\n*   **History Trends:** View monthly sleep averages, training load patterns, and recovery readiness trends over time to identify overtraining or chronic fatigue.\n*   **Multi-Device Sync:** When logged into your Google Account, your daily recovery summaries, streaks, and training logs are encrypted and synchronized via Firebase Firestore."
      }
    ]
  },
  {
    id: "security",
    title: "Account Security, Permissions & Battery",
    iconName: "ShieldCheck",
    description: "Manage permissions and ensure background tracking.",
    items: [
      {
        question: "Why does Recova ask for Physical Activity permission?",
        answer: "Physical activity permission allows Android's Google Sleep API to access local motion sensors to detect bedtime and wake times 100% locally on your phone's processor."
      },
      {
        question: "STEP-BY-STEP BATTERY OPTIMIZATION GUIDE (Crucial for Android Users)",
        answer: "Android manufacturers (Samsung, Xiaomi, OnePlus, Pixel, Huawei) enforce background battery optimization that can freeze Recova's background sleep receivers.\n\nTo ensure fast, reliable sleep notifications every morning:\n\n1.  Open phone **System Settings > Apps > See All Apps > Recova**.\n2.  Select **Battery** (or Battery Usage / Battery Saver).\n3.  Change the setting from \"Optimized\" or \"Restricted\" to **\"Unrestricted\"** (or \"Don't Optimize\" / \"No Restrictions\").\n4.  Verify Physical Activity is set to \"Allow\" under **Settings > Apps > Recova > Permissions**."
      },
      {
        question: "Is my raw sensor data uploaded to the cloud or sold?",
        answer: "**NO.** Continuous raw accelerometer motion and light readings are evaluated 100% locally on your phone's CPU and are NEVER uploaded to cloud servers or sold to third parties. Only your final confirmed daily summary (total hours, bedtime, wake time) is saved in Google Firebase Firestore under your private account."
      }
    ]
  },
  {
    id: "account-deletion",
    title: "Account & Data Deletion Guide",
    iconName: "User",
    description: "How to manage your account status.",
    items: [
      {
        question: "How do I permanently delete my account and data?",
        answer: "You have full control over your data:\n\n*   **In-App Deletion (Instant):** Go to **More > Privacy & Data > Delete Account** in Recova, and verify your Google Account. Your account profile, workout logs, and historical sleep records are immediately purged from our servers.\n*   **Web Email Deletion Request:** Email recova.app0@gmail.com with subject \"Account Deletion Request\" from your registered Google email address. Deletion is completed within 48 hours."
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Complete Technical Troubleshooting",
    iconName: "Sliders",
    description: "Solutions to common technical issues.",
    items: [
      {
        question: "Sleep prediction notification did not appear in the morning.",
        answer: "1. Confirm Battery Optimization is set to \"Unrestricted\".\n2. Ensure Physical Activity permission is granted.\n3. Pick up/unlock your phone in the morning to trigger the wake-up motion event."
      },
      {
        question: "Notification alarms are silent or not triggering.",
        answer: "Check **Android Settings > Notifications > Recova** and ensure notification channels are enabled."
      },
      {
        question: "App shows offline mode.",
        answer: "Recova features full offline capability! You can log sleep and view recovery scores offline. Logs will automatically sync to Firebase Firestore once an internet connection is restored."
      }
    ]
  }
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'none' | 'helpful' | 'not-helpful'>('none');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('recova.app0@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFilteredItems = () => {
    if (searchQuery.trim() !== '') {
      return supportData.flatMap(cat => cat.items).filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory === 'all') {
      return supportData.flatMap(cat => cat.items);
    }
    
    const category = supportData.find(cat => cat.id === activeCategory);
    return category ? category.items : [];
  };

  const getIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Activity': return <Activity className={className} />;
      case 'Moon': return <Moon className={className} />;
      case 'Sliders': return <Sliders className={className} />;
      case 'User': return <User className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  const currentItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-neutral-50/70 text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-neutral-800 via-neutral-950 to-neutral-800"></div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
            Recova Support Center
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
            Comprehensive Help & Support
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Official Master Help Desk, User Guide & FAQ Portal. Below is the complete user guide and technical support reference covering every feature, algorithm, and setting in the Recova app.
          </p>
        </header>

        {/* Dynamic Search Box */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-neutral-900 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search questions, keywords, sleep sync..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 focus:border-neutral-900 transition-all text-[15px] sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-3 text-xs text-neutral-500 pl-2">
              Showing matching results for <span className="font-semibold text-neutral-800">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Two Column Layout (Tabs & content) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Navigation Tabs - Left Side (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold text-neutral-400 tracking-wider uppercase px-1 mb-1">
              Categories
            </div>
            
            <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-1.5 pb-2 lg:pb-0">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === 'all' && searchQuery === ''
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/60 shadow-sm'
                }`}
              >
                <span className="flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span>All FAQs</span>
              </button>

              {supportData.map((category) => {
                const isActive = activeCategory === category.id && searchQuery === '';
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-left lg:w-full ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/60 shadow-sm'
                    }`}
                  >
                    <span className="flex-shrink-0">
                      {getIcon(category.iconName, "w-4 h-4")}
                    </span>
                    <span className="block truncate">{category.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Helper Tip card */}
            <div className="hidden lg:block bg-neutral-100/80 border border-neutral-200/80 rounded-2xl p-5 mt-6">
              <div className="flex gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider mb-2">
                <InfoIcon className="w-4 h-4 text-neutral-600" />
                Pro-Tip
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                If sleep data shows "Analyzing...", manual overrides unlock at <strong className="text-neutral-900">10:00 AM local time</strong>.
              </p>
            </div>
          </div>

          {/* Accordion Content - Right Side (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white/40 border border-neutral-200/60 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                  {searchQuery ? "Search Results" : activeCategory === 'all' ? "All Frequently Asked Questions" : supportData.find(c => c.id === activeCategory)?.title}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {searchQuery 
                    ? `Found ${currentItems.length} matching answer(s)`
                    : activeCategory === 'all' 
                      ? "Browse our complete database of help guides." 
                      : supportData.find(c => c.id === activeCategory)?.description
                  }
                </p>
              </div>

              {/* FAQs Container */}
              <div className="min-h-[250px]">
                <Accordion items={currentItems} searchQuery={searchQuery} />
              </div>

              {/* Was this helpful? Interactive Form */}
              <div className="mt-12 pt-8 border-t border-neutral-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/50">
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-neutral-950 text-sm">Was this page helpful to you?</h4>
                    <p className="text-xs text-neutral-500">We appreciate your anonymous feedback.</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {feedbackState === 'none' ? (
                      <>
                        <button
                          onClick={() => setFeedbackState('helpful')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-neutral-500" />
                          Yes
                        </button>
                        <button
                          onClick={() => setFeedbackState('not-helpful')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                        >
                          <ThumbsDown className="w-3.5 h-3.5 text-neutral-500" />
                          No
                        </button>
                      </>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-xs font-semibold text-neutral-900 bg-neutral-900 text-white px-4 py-1.5 rounded-lg"
                      >
                        {feedbackState === 'helpful' ? "🎉 Thank you for your feedback!" : "✉️ Let us know how we can improve support below!"}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Contact Help Section */}
        <section className="text-center py-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-sm relative overflow-hidden">
            {/* Ambient visual mesh */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-neutral-100 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none opacity-50"></div>

            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 mb-4">
                <Mail className="w-3 h-3" />
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-4 tracking-tight">
                Still need further help?
              </h2>
              <p className="text-neutral-600 mb-8 leading-relaxed text-sm sm:text-base">
                Our support team is here for you. If you are experiencing bug reports, account synchronization issues, or have custom suggestions, reach out directly.
              </p>
              
              <div className="p-4 sm:p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 inline-block w-full max-w-md">
                <p className="text-xs text-neutral-500 mb-2.5 uppercase tracking-widest font-black">Direct Email Support</p>
                
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 flex justify-center items-center">
                  <a 
                    href="mailto:recova.app0@gmail.com?subject=Recova%20App%20Support" 
                    className="text-lg sm:text-xl font-bold text-neutral-950 hover:text-neutral-700 transition-colors break-all block text-center"
                  >
                    recova.app0@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-neutral-200/80 pt-10 mt-16 pb-6">
          <p className="text-xs text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Note: Recova is a tool for tracking training and recovery trends. It is not a medical device. 
            Data provided by Recova supports training decisions but does not replace professional medical advice or diagnosis. 
            Always consult a physician before beginning any new exercise program.
          </p>
          <p className="text-xs text-neutral-400 font-medium mt-6">
            &copy; 2026 Recova. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
};

// Helper SVG Icon Component
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
};

export default App;
