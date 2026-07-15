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
    title: "General Recovery Questions",
    iconName: "Activity",
    description: "Understand your score and baseline calculations.",
    items: [
      {
        question: "How is my Recovery Score calculated?",
        answer: "Your Recovery Score evaluates three main daily pillars:\n\n1.  **Subjective Sleep Quality:** How rested you feel (Poor, Okay, Good).\n2.  **Training Intensity:** The cardiovascular or muscle stress logged from yesterday's training.\n3.  **Chronic Load Baseline:** Your physical adaptations over time, calculated continuously."
      },
      {
        question: "Why is my recovery baseline locked?",
        answer: "If you are a new user, you will enter a **Calibration Phase** for your first day. You must log at least one physical training session to establish your starting baseline before the active Recovery Score calculations begin."
      }
    ]
  },
  {
    id: "syncing",
    title: "Automatic Sleep Syncing",
    iconName: "Moon",
    description: "Connect devices & understand automation.",
    items: [
      {
        question: "How does automatic Sleep Sync work?",
        answer: "When you opt in to \"Devices & Sync\" (under the More tab), Recova requests physical activity permissions. It connects to your device's on-device movement sensors and Google Play Services Sleep API to detect when your body fell asleep and woke up, eliminating the need to log sleep hours manually."
      },
      {
        question: "Why does my sleep display show \"Analyzing...\"?",
        answer: "Your phone syncs and processes your activity profile during the morning hours. If the system is still compiling your motion data, Recova displays \"Analyzing...\" to prevent displaying incorrect empty results. If the data is still loading, it will unlock to manual entry at **10:00 AM local time**."
      },
      {
        question: "Why did my first sleep sync take 24 hours?",
        answer: "On-device sensor tracking needs a full 24-hour baseline cycle of movement monitoring to calibrate your wake and bedtime predictions. Once your phone records this initial cycle, automated syncs will occur daily in the morning."
      }
    ]
  },
  {
    id: "entry-limits",
    title: "Manual Entry & Edit Limits",
    iconName: "Sliders",
    description: "Adjust bedtime and track parameters.",
    items: [
      {
        question: "How do I adjust incorrect sleep times?",
        answer: "If the automatic prediction or your manual entry is slightly off, tap the **\"Incorrect? Adjust sleep times\"** link underneath the sleep card on your dashboard. This lets you enter manual bedtimes and waketimes."
      },
      {
        question: "Why did the \"Adjust sleep times\" button disappear?",
        answer: "To maintain database consistency and prevent redundant server writes, manual sleep duration changes are limited:\n\n*   **If starting from Google Sleep API:** You can adjust the times **2 times** per day.\n*   **If starting from Empty (`--`):** You can log your initial times, and then adjust those times **2 times** per day.\n*   Once you save your second adjustment, the edit button hides for the remainder of the day."
      }
    ]
  },
  {
    id: "account-data",
    title: "Account & Data Support",
    iconName: "User",
    description: "Sync devices and manage records safely.",
    items: [
      {
        question: "Will my sleep duration affect my Recovery Score?",
        answer: "No. Your Recovery Score is calculated using your subjective sleep *quality* (Poor/Okay/Good) and training workloads. Sleep *duration* (hours/minutes) is tracked as historical metadata to help you visualize sleep schedules, but it will never override your core recovery math."
      },
      {
        question: "How do I sync data across multiple devices?",
        answer: "Data syncs automatically through the cloud. As long as you log into the App using the same Google Account on both devices, your logs, streaks, and recovery scores will sync instantly."
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
            Recova Support
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
            Help & Support
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Find answers to common questions about using Recova, tracking your training, and managing your Sleep Sync connection.
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
