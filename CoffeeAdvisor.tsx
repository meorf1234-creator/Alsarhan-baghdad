import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Coffee, ThumbsUp, RotateCcw, AlertCircle, ShoppingBag } from 'lucide-react';
import { MenuItem, RecommendationResponse } from '../types';
import { MENU_ITEMS } from '../data';

interface CoffeeAdvisorProps {
  onRecommendationMade: (itemId: string) => void;
  lang: 'ar' | 'en';
  isNightMode?: boolean;
}

const MOOD_SUGGESTIONS = [
  { textAr: 'تعبان ومصدّع محتاج مصحصح', textEn: 'Tired, need a strong focus brew', icon: '⚡' },
  { textAr: 'مروق وهادئ وأدور نكهة أصيلة', textEn: 'Relaxed, looking for rich heritage', icon: '🌾' },
  { textAr: 'بردان وأبي شي دافئ يدفي كلبي', textEn: 'Cold, want a warm comforting tea', icon: '🔥' },
  { textAr: 'مشتهي حلا تراثي تذوب بالحلق وي القهوة', textEn: 'Craving an Iraqi sweet to melt in my mouth', icon: '🍩' },
  { textAr: 'حميّان من الشمس وأبي شي يبرد علي', textEn: 'Hot from sun, looking for iced drinks', icon: '❄️' },
];

export default function CoffeeAdvisor({ onRecommendationMade, lang, isNightMode = true }: CoffeeAdvisorProps) {
  const [mood, setMood] = useState('');
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Suggestions for rapid choice
  const handleSuggestionClick = (suggestion: typeof MOOD_SUGGESTIONS[0]) => {
    setMood(suggestion.textAr);
    setPreference(suggestion.textEn);
    triggerSearch(suggestion.textAr, suggestion.textEn);
  };

  const triggerSearch = async (targetMood: string, targetPref: string) => {
    if (!targetMood.trim() && !targetPref.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: targetMood,
          preference: targetPref,
          timeOfDay: new Date().toLocaleTimeString('ar-IQ'),
        }),
      });

      if (!response.ok) {
        throw new Error('فشل جلب التوصية من المضيف');
      }

      const data: RecommendationResponse = await response.json();
      setResult(data);
      if (data.recommendedItemId) {
        onRecommendationMade(data.recommendedItemId);
      }
    } catch (err: any) {
      console.error(err);
      setError('عذراً عيوني، واجهنا شوية غبار على شبكة المقهى. يرجى إعادة المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(mood, preference);
  };

  const handleReset = () => {
    setMood('');
    setPreference('');
    setResult(null);
    setError(null);
  };

  // Find recommended item from menu data
  const recommendedItem = result 
    ? MENU_ITEMS.find(item => item.id === result.recommendedItemId) 
    : null;

  // Build perfect WhatsApp prefilled order message link
  const buildWhatsAppLink = (item: MenuItem, advisorText: string) => {
    const phoneNumber = '9647877710888'; // Format based on user screenshot: 0787 771 0888 -> +964 787 771 0888
    
    const intro = lang === 'ar' 
      ? `السلام عليكم ورحمة الله عيني، قرأت توصية مستشار السرحان الذكي وأريد طلب الضيافة التالية:\n\n`
      : `Hello, I received a personalized recommendation from your AI Coffee Butler and would like to order:\n\n`;

    const details = lang === 'ar'
      ? `👈 *${item.nameAr}* (${item.price})\n`
      : `👈 *${item.nameEn}* (${item.price})\n`;

    const customMsg = lang === 'ar'
      ? `\nوقد نصحني المساعد بـ: "${advisorText.slice(0, 80)}..."`
      : `\nBased on recommendation: "${advisorText.slice(0, 80)}..."`;

    const outro = lang === 'ar'
      ? `\nأرجو إعداد الطلب وتأكيد كلفة التوصيل، ربي يبارك بيكم عيوني وبشغلكم الطيّب!`
      : `\nPlease prepare this order and confirm delivery cost. Thank you!`;

    const text = encodeURIComponent(intro + details + customMsg + outro);
    return `https://wa.me/${phoneNumber}?text=${text}`;
  };

  return (
    <div className={`w-full relative rounded-3xl overflow-hidden shadow-xl border p-6 md:p-8 transition-colors duration-1000 ${
      isNightMode ? 'border-gold-900/40 bg-[#1b120c] text-white' : 'border-gold-800/15 bg-white text-[#3d2b1f]'
    }`} id="coffee-advisor-session">
      
      {/* Decorative Traditional Arabic coffee steam animation style */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-radial from-gold-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-radial from-red-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-gold-500/20 to-gold-700/30 rounded-2xl border border-gold-400/30">
          <Coffee className="w-6 h-6 text-gold-400" />
        </div>
        <div>
          <h2 className={`text-xl md:text-2xl font-black flex items-center gap-2 ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
            مستشار قهوة السرحان الذكي
            <span className="text-[10px] bg-red-600/30 text-red-100 px-2 py-0.5 rounded-full border border-red-500/40 animate-pulse">
              ذكي بامتياز
            </span>
          </h2>
          <p className={`text-xs mt-1 font-serif ${isNightMode ? 'text-[#c5a059]' : 'text-[#5a4634]'}`}>
            أوصف مزاجك أو رغبتك، ومستشارنا البغدادي الأصيل بيقترحلك فنجان القهوة اللي يطبطب على قلبك اليوم
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="advisor-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Quick Chips suggestions */}
            <div>
              <p className={`text-xs font-semibold mb-3 ${isNightMode ? 'text-[#eedcaf]/80' : 'text-[#3d2b1f]/75'}`}>اختر حالة جاهزة أو صِف لنا بنفسك:</p>
              <div className="flex flex-wrap gap-2.5">
                {MOOD_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all duration-300 cursor-pointer ${
                      isNightMode 
                        ? 'bg-[#2d1e15] hover:bg-[#5a4634] hover:text-white text-[#eedcaf] border border-gold-900/30' 
                        : 'bg-[#faf6eb] hover:bg-[#eedcap] hover:text-[#3d2b1f] text-[#3d2b1f] border border-[#3d2b1f]/10'
                    }`}
                  >
                    <span>{suggestion.icon}</span>
                    <span>{lang === 'ar' ? suggestion.textAr : suggestion.textEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Combined Chat Input Custom form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 text-right ${isNightMode ? 'text-[#eedcaf]' : 'text-[#3d2b1f]'}`}>
                    بماذا تشعر الآن؟ (المزاج أو الحالة):
                  </label>
                  <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="مثال: تعبان كلش ومحتاج طاقة لتكملة اليوم..."
                    className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-right ${
                      isNightMode 
                        ? 'bg-[#1b120c] border-[#3d2b1f]/50 hover:border-gold-400 focus:border-gold-500 text-white placeholder-stone-600' 
                        : 'bg-[#faf6eb]/30 border-[#3d2b1f]/15 hover:border-gold-400 focus:border-gold-500 text-[#3d2b1f] placeholder-[#3d2b1f]/40'
                    }`}
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 text-right ${isNightMode ? 'text-[#eedcaf]' : 'text-[#3d2b1f]'}`}>
                    تفضيل المذاق المفضل حالياً (أو الأكل):
                  </label>
                  <input
                    type="text"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    placeholder="مثال: أريد طعم هيل ثقيل، شي دافئ وتراثي..."
                    className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-right ${
                      isNightMode 
                        ? 'bg-[#1b120c] border-[#3d2b1f]/50 hover:border-gold-400 focus:border-gold-500 text-white placeholder-stone-600' 
                        : 'bg-[#faf6eb]/30 border-[#3d2b1f]/15 hover:border-gold-400 focus:border-gold-500 text-[#3d2b1f] placeholder-[#3d2b1f]/40'
                    }`}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading || (!mood.trim() && !preference.trim())}
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    loading || (!mood.trim() && !preference.trim())
                      ? 'bg-[#2d1e15] text-[#eedcaf]/40 border border-[#3d2b1f]/40 cursor-not-allowed'
                      : 'bg-[#c5a059] hover:bg-[#a17d3b] text-[#1b120c] border border-gold-300/20 shadow-md hover:scale-[1.02]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1b120c] border-t-transparent rounded-full animate-spin" />
                      <span>دا يحضر الفنجان لقلبك الترف...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 rotate-180" />
                      <span>طلب الاستشارة الفاخرة</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Recommendation Output card representing a hospitable greeting */
          <motion.div
            key="advisor-output"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* The Baghdadi host speech bubble */}
            <div className={`relative border-l-2 md:border-l-0 md:border-r-2 border-[#c5a059] p-5 rounded-2xl border ${
              isNightMode ? 'bg-[#1b120c] border-gold-900/30 text-white' : 'bg-[#faf6eb]/50 border-[#3d2b1f]/10 text-[#3d2b1f]'
            }`}>
              
              {/* Traditional welcoming top greeting */}
              <p className="text-[#c5a059] font-serif text-sm font-bold tracking-wide mb-2 italic">
                &quot;{result.hospitalityPhrase}&quot;
              </p>
              
              {/* Detailed recommended sensory text description */}
              <p className={`text-sm leading-relaxed font-sans mb-4 whitespace-pre-wrap ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
                {result.recommendationAr}
              </p>

              {/* Display recommended product preview card */}
              {recommendedItem && (
                <div className={`mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  isNightMode 
                    ? 'border-gold-500/20 bg-[#2d1e15]/90 hover:border-gold-500/40 text-white' 
                    : 'border-[#3d2b1f]/10 bg-white hover:border-gold-400 text-[#3d2b1f]'
                }`}>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-3xl">☕</span>
                    <div>
                      <h4 className={`text-xs font-bold ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>{recommendedItem.nameAr}</h4>
                      <p className={`text-[10px] mt-0.5 line-clamp-1 ${isNightMode ? 'text-[#eedcaf]' : 'text-[#5a4634]'}`}>{recommendedItem.descriptionAr}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#c5a059] font-mono text-xs font-semibold">{recommendedItem.price}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Error notifications */}
            {error && (
              <div className="flex items-start gap-2 p-3.5 rounded-xl bg-red-950/40 border border-red-900/30 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <p>{error}</p>
              </div>
            )}

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {recommendedItem && (
                <a
                  href={buildWhatsAppLink(recommendedItem, result.recommendationAr)}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>أرسل هذا الطلب فوراً للواتساب</span>
                </a>
              )}
              
              <button
                onClick={handleReset}
                className={`px-5 py-3.5 border rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  isNightMode 
                    ? 'border-[#3d2b1f]/55 bg-[#2d1e15] hover:bg-[#3d2b1f] text-[#eedcaf]' 
                    : 'border-[#3d2b1f]/20 bg-white hover:bg-[#faf6eb] text-[#3d2b1f]'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>جرّب مزاجاً آخر</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
