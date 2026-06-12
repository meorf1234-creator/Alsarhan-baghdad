import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Clock, Phone, MapPin, Sparkles, Send, Volume2, 
  Moon, Sun, ChevronLeft, X, Check, ShoppingBag, 
  Map, MessageCircle, Star, Info, Share2, Instagram, Award, ShieldAlert
} from 'lucide-react';

import CoffeeAdvisor from './components/CoffeeAdvisor';
import { MENU_ITEMS } from './data';
import { MenuItem } from './types';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isNightMode, setIsNightMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'signature' | 'heritage' | 'modern' | 'sweets'>('all');
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<MenuItem | null>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  // Custom order configuration
  const [sugarLevel, setSugarLevel] = useState<string>('وسط');
  const [cardamomChoice, setCardamomChoice] = useState<string>('هيل موزون');
  const [quantity, setQuantity] = useState<number>(1);
  const [specialRequest, setSpecialRequest] = useState<string>('');

  // Live Baghdad Cafe status (UTC+3)
  const [baghdadStatus, setBaghdadStatus] = useState({ isOpen: true, text: '', timeStr: '' });

  useEffect(() => {
    function checkStatus() {
      const utcDate = new Date();
      const baghdadOffset = 3; // UTC+3
      // Convert current UTC time to Baghdad time
      const bTime = new Date(utcDate.getTime() + (baghdadOffset * 60 * 60 * 1000) + (utcDate.getTimezoneOffset() * 60 * 1000));
      
      const day = bTime.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
      const hour = bTime.getHours();
      
      let open = false;
      let msg = '';
      
      if (day === 5) { // Friday
        if (hour >= 14 && hour < 24) {
          open = true;
          msg = lang === 'ar' 
            ? 'مفتوح الآن عيوني - تفضل بزيارتنا لحضن بغدادي مهيّل' 
            : 'Open Now - Come visit our hospitable Baghdadi corner';
        } else {
          open = false;
          msg = lang === 'ar' 
            ? 'مغلق الآن عيني - نفتح اليوم الجمعة الساعة 2:00 ظهراً' 
            : 'Closed - Opening today Friday at 2:00 PM';
        }
      } else { // Saturday to Thursday
        if (hour >= 10 && hour < 24) {
          open = true;
          msg = lang === 'ar' 
            ? 'مفتوح الآن عيني - ريحة الهيل والضيافة بانتظارك' 
            : 'Open Now - The scent of cardamom coffee awaits you';
        } else {
          open = false;
          msg = lang === 'ar' 
            ? 'مغلق الآن عيوني - نفتتح غداً بتمام الساعة 10:00 صباحاً' 
            : 'Closed - We open tomorrow at 10:00 AM';
        }
      }
      
      setBaghdadStatus({
        isOpen: open,
        text: msg,
        timeStr: bTime.toLocaleTimeString(lang === 'ar' ? 'ar-IQ' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      });
    }

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [lang]);

  // Handle highlighted item selection from Coffee Advisor
  const handleRecommendationMade = (itemId: string) => {
    setHighlightedItemId(itemId);
    // Smoothly scroll to the recommended item
    const el = document.getElementById(`item-${itemId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Build perfect custom WhatsApp order details
  const submitCustomOrder = () => {
    if (!selectedItemForOrder) return;

    const phoneNumber = '9647877710888'; // Al-Sarhan Cafe WhatsApp number
    
    const itemTitle = lang === 'ar' ? selectedItemForOrder.nameAr : selectedItemForOrder.nameEn;
    const priceText = selectedItemForOrder.price;

    const templateAr = `السلام عليكم ورحمة الله عيني، أريد أطلب من قهوة السرحان الحين:
    
🛒 *${itemTitle}*
🔢 العدد: ${quantity} فنجان/حافظة
🍬 درجة السكر: ${sugarLevel}
🌿 خيار الحجم/الهيل: ${cardamomChoice}
${specialRequest ? `📝 ملاحظات خاصة: "${specialRequest}"` : ''}

💵 السعر المقدر: ${selectedItemForOrder.priceNum * quantity} د.ع

أرجو تجهيز الطلب للتوصيل / الاستلام عيني. ربي يرزقكم ويبارك بيكم!`;

    const templateEn = `Hello, I would like to place a quick order:
    
🛒 *${itemTitle}*
🔢 Quantity: ${quantity}
🍬 Sugar Level: ${sugarLevel}
🌿 Cardamom Choice: ${cardamomChoice}
${specialRequest ? `📝 Special Note: "${specialRequest}"` : ''}

💵 Subtotal: ${selectedItemForOrder.priceNum * quantity} IQD

Please confirm receipt and preparation. Thank you!`;

    const text = encodeURIComponent(lang === 'ar' ? templateAr : templateEn);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    setSelectedItemForOrder(null);
  };

  // Filter items matching active Category tab
  const filteredItems = MENU_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isNightMode ? 'bg-[#1b120c] text-gold-100' : 'bg-[#fdfbf7] text-[#3d2b1f]'}`}>
      
      {/* Immersive Top Bar: Branding & Baghdad Live Status Indicator */}
      <header className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-500 border-b ${
        isNightMode 
          ? 'bg-[#1b120c]/85 border-gold-900/30' 
          : 'bg-[#fdfbf7]/85 border-[#3d2b1f]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* Right Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gold-950 border border-gold-400/20">
              <span className="text-xl">☕</span>
            </div>
            <div className="text-right">
              <h1 className={`text-base md:text-lg font-black tracking-wide ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
                {lang === 'ar' ? 'قهوة السرحان 1897' : 'Al-Sarhan Coffee 1897'}
              </h1>
              <p className="text-[#c5a059] text-[10px] md:text-xs font-semibold">
                {lang === 'ar' ? 'بغداد - ريحة الهيل العراقي الأصيل' : 'Baghdad - Authentic Cardamom Heritage'}
              </p>
            </div>
          </div>

          {/* Central Live countdown */}
          <div className={`hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl border backdrop-blur transition-all duration-500 ${
            isNightMode 
              ? 'bg-[#2d1e15]/25 border-[#eedcaf]/10' 
              : 'bg-[#faf6eb]/80 border-[#3d2b1f]/10'
          }`}>
            <span className={`relative flex h-2.5 w-2.5`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${baghdadStatus.isOpen ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${baghdadStatus.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            <span className={`text-xs ${isNightMode ? 'text-[#eedcaf]' : 'text-[#3d2b1f]'}`}>
              <strong className="font-bold">{lang === 'ar' ? 'بغداد الآن: ' : 'Baghdad Time: '}</strong>
              {baghdadStatus.timeStr} - {baghdadStatus.text}
            </span>
          </div>

          {/* Left fast action keys */}
          <div className="flex items-center gap-2.5">
            {/* Lang switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                isNightMode 
                  ? 'border-gold-400/20 hover:border-gold-400 text-[#eedcaf] hover:text-white bg-[#1b120c]/40' 
                  : 'border-[#3d2b1f]/20 hover:border-[#3d2b1f] text-[#3d2b1f]/85 hover:text-[#3d2b1f] bg-[#faf6eb]'
              }`}
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            {/* Direct Dial */}
            <a 
              href="tel:07877710888" 
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isNightMode 
                  ? 'bg-[#1b120c] border-[#3d2b1f]/30 text-[#c5a059] hover:border-gold-400' 
                  : 'bg-[#faf6eb] border-[#3d2b1f]/10 text-[#3d2b1f] hover:bg-[#eedcap]'
              }`}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Mobile Status Strip */}
        <div className={`lg:hidden w-full text-center py-2 px-4 border-t flex justify-center items-center gap-2 text-xs leading-none transition-colors ${
          baghdadStatus.isOpen 
            ? 'bg-emerald-950/10 text-emerald-300 border-emerald-950/20' 
            : 'bg-red-950/10 text-red-300 border-red-950/20'
        }`}>
          <div className={`w-2 h-2 rounded-full ${baghdadStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`} />
          <span>{baghdadStatus.text}</span>
        </div>
      </header>

      {/* Main Single Page Layout Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 pb-24">
        
        {/* SECTION 1: Baghdadi Welcome & Direct Quick Contacts Hero */}
        <section className={`rounded-3xl p-6 md:p-12 text-center relative overflow-hidden border transition-all duration-1000 ${
          isNightMode 
            ? 'border-gold-900/30 bg-radial from-[#2d1e15]/40 to-[#1b120c] text-white' 
            : 'border-[#3d2b1f]/10 bg-[#faf6eb] text-[#3d2b1f]'
        }`}>
          {/* Ambient overlay */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-radial from-gold-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-[#c5a059] text-xs font-bold leading-none">
              <Award className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'تراث بغدادي عريق منذ 1897' : 'Baghdadi Coffee Heritage since 1897'}
            </div>
            
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
              {lang === 'ar' ? 'حياكم الله في قهوة السرحان' : 'Welcome to Al-Sarhan Cafe'}
            </h2>
            
            <p className={`text-sm md:text-base leading-relaxed ${isNightMode ? 'text-stone-350' : 'text-[#5a4634]'}`}>
              {lang === 'ar' 
                ? 'فنجان قهوة السرحان الأصيل يروي حكاية الكرم العراقي المهيل في قلب بغداد. تصفّح قائمتنا واطلب مباشرة عبر الواتساب، أو تابع كواليس ضيافتنا على الإنستغرام عيوني.' 
                : 'The authentic flavor of Al-Sarhan cardamom coffee tells the story of glorious Iraqi hospitality in the heart of Baghdad.'}
            </p>

            {/* Quick Prominent Contact Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {/* WhatsApp Callout */}
              <a 
                href="https://wa.me/9647877710888"
                target="_blank"
                rel="noreferrer referrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-md hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <div className="text-right">
                  <span className="block text-[9px] font-normal opacity-85 leading-none">{lang === 'ar' ? 'اطلب وتواصل معنا فورا' : 'Order/Chat Direct'}</span>
                  <span className="block mt-0.5 leading-none">0787 771 0888 (واتساب)</span>
                </div>
              </a>

              {/* Instagram Callout */}
              <a 
                href="https://instagram.com/alsarhan_baghdad"
                target="_blank"
                rel="noreferrer referrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-md hover:scale-[1.02] transition-all"
              >
                <Instagram className="w-4.5 h-4.5" />
                <div className="text-right">
                  <span className="block text-[9px] font-normal opacity-85 leading-[#0px]" style={{ lineHeight: '1' }}>{lang === 'ar' ? 'تابعنا على إنستغرام' : 'Instagram Official'}</span>
                  <span className="block mt-0.5 leading-none" dir="ltr">@alsarhan_baghdad</span>
                </div>
              </a>
            </div>

            {/* Ambient Day/Night Toggler embedded elegantly */}
            <div className="pt-2 flex justify-center">
              <button 
                onClick={() => setIsNightMode(!isNightMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  isNightMode 
                    ? 'border-gold-900/30 bg-gold-950/20 hover:border-gold-400 text-[#eedcap]' 
                    : 'border-[#3d2b1f]/15 bg-[#faf6eb] hover:bg-[#eedcap] text-[#3d2b1f]'
                }`}
              >
                {isNightMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ar' ? 'تفعيل الوضع المضيء' : 'Switch to Light Mood'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{lang === 'ar' ? 'تفعيل الوضع المسائي البغدادي' : 'Switch to Night Mood'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2: AI Coffee Butler Interactive section */}
        <section id="ai-advisor" className="scroll-mt-24">
          <CoffeeAdvisor lang={lang} onRecommendationMade={handleRecommendationMade} isNightMode={isNightMode} />
        </section>

        {/* SECTION 3: The Digital Menu Board */}
        <section id="menu-board" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gold-900/10 pb-4">
            <div className="text-right">
              <h3 className={`text-2xl font-black ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
                {lang === 'ar' ? 'قائمة الضيافة والملذّات' : 'Al-Sarhan Hospitality Menu'}
              </h3>
              <p className={`text-xs mt-1 font-serif ${isNightMode ? 'text-[#c5a059]' : 'text-[#7d5b23]'}`}>
                {lang === 'ar' ? 'اختر ضيافتك المفضلة وسنقوم بربط طلبك بالواتساب فوراً عيوني' : 'Order custom treats and we will send them on WhatsApp'}
              </p>
            </div>

            {/* Category Selectors / Filter bar */}
            <div className={`flex flex-wrap gap-1.5 p-1 rounded-2xl border backdrop-blur-md ${
              isNightMode ? 'bg-[#1b120c]/60 border-[#eedcaf]/10' : 'bg-[#faf6eb] border-[#3d2b1f]/10'
            }`}>
              {[
                { id: 'all', arName: 'الكل', enName: 'All' },
                { id: 'signature', arName: 'خاص السرحان', enName: 'Signature' },
                { id: 'heritage', arName: 'تراث أصيل', enName: 'Heritage' },
                { id: 'modern', arName: 'إسبيريسو وبارد', enName: 'Modern' },
                { id: 'sweets', arName: 'الحلويات البغدادية', enName: 'Sweets' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`text-xs px-3.5 py-2 rounded-xl transition-all font-bold cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#c5a059] text-white shadow-md'
                      : isNightMode 
                        ? 'text-[#eedcaf]/75 hover:text-white' 
                        : 'text-[#3d2b1f]/60 hover:text-[#3d2b1f]'
                  }`}
                >
                  {lang === 'ar' ? cat.arName : cat.enName}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => {
                const isRecommended = item.id === highlightedItemId;
                return (
                  <motion.div
                    key={item.id}
                    id={`item-${item.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
                      isRecommended 
                        ? 'border-[#c5a059] bg-[#c5a059]/10 shadow-[0_10px_35px_rgba(197,160,89,0.25)] ring-2 ring-[#c5a059]/50 scale-[1.03]' 
                        : isNightMode 
                          ? 'border-[#3d2b1f]/20 bg-[#1b120c] hover:border-[#c5a059]/40' 
                          : 'border-[#3d2b1f]/10 bg-white hover:border-[#c5a059]/30 shadow-sm'
                    }`}
                  >
                    {/* Upper decorative elements */}
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        {/* Title and tags */}
                        <div className="text-right">
                          <h4 className={`text-base font-extrabold flex items-center gap-1.5 ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
                            {lang === 'ar' ? item.nameAr : item.nameEn}
                            {item.popular && (
                              <span className="text-[9px] bg-red-600/20 text-red-300 border border-red-500/30 px-1.5 py-0.5 rounded-full font-bold">
                                الأكثر طلباً
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest font-mono">
                            {item.category}
                          </span>
                        </div>

                        {/* Price badge */}
                        <div className="px-3 py-1.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 font-mono text-sm font-bold shrink-0">
                          {item.price}
                        </div>
                      </div>

                      {/* Brief Description */}
                      <p className={`text-xs leading-relaxed text-right ${isNightMode ? 'text-[#eedcaf]/90' : 'text-[#5a4634]'}`}>
                        {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                      </p>

                      {/* Ingredient Notes */}
                      {(item.notesAr || item.notesEn) && (
                        <div className="flex items-center gap-1.5 text-[10px] bg-amber-950/20 p-2 rounded-lg text-amber-300 border border-amber-900/10">
                          <Info className="w-3 h-3 shrink-0" />
                          <span className="text-right">{lang === 'ar' ? item.notesAr : item.notesEn}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Order Panel */}
                    <div className={`p-4 border-t flex justify-between items-center gap-2 ${
                      isNightMode ? 'border-gold-900/30 bg-[#1b120c]/60' : 'border-[#3d2b1f]/5 bg-[#fdfbf7]/50'
                    }`}>
                      {isRecommended && (
                        <span className="text-[10px] text-gold-400 font-bold flex items-center gap-1 animate-pulse">
                          💡 نصيحة مستشارك المخصصة!
                        </span>
                      )}
                      
                      <button
                        onClick={() => {
                          setSelectedItemForOrder(item);
                          setQuantity(1);
                          setSugarLevel('وسط');
                          setCardamomChoice('هيل موزون');
                          setSpecialRequest('');
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          isRecommended 
                            ? 'bg-[#c5a059] hover:bg-[#a17d3b] text-white' 
                            : isNightMode 
                              ? 'bg-[#2d1e15] hover:bg-[#5a4634] hover:text-[#eedcaf] text-[#faf6eb] border border-[#3d2b1f]/40' 
                              : 'bg-[#faf6eb] hover:bg-[#eedcap] text-[#3d2b1f]'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'طلب ضيافة سريع' : 'Quick Order'}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 4: Heritage & Custom Image generated showcase (قورية فنجان الفخار العراقي) */}
        <section className={`rounded-3xl overflow-hidden p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10 border transition-all duration-1000 ${
          isNightMode 
            ? 'border-gold-900/20 bg-[#1b120c]' 
            : 'border-[#3d2b1f]/10 bg-white shadow-sm shadow-[#3d2b1f]/5'
        }`}>
          {/* Text and history details */}
          <div className="flex-1 space-y-5 text-right lg:order-last">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[#c5a059]">☕</span>
              <h3 className={`text-2xl font-black ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
                قصة دلة السرحان العريقة منذ 1897
              </h3>
            </div>
            
            <p className={`text-sm leading-relaxed ${isNightMode ? 'text-[#eedcaf]/90' : 'text-[#5a4634]'}`}>
              بدأت السالفة في حارات بغداد القديمة قبل ما يقارب القرن والربع، عندما امتهنت عائلة السرحان تحميص البن على الجمر المتوهج، منتقين أفضل حبات الأرابيكا والبن اليمني الخولاني لتقديمه للوجهاء والضيوف. تلاقت أجيالنا جيل بعد جيل على مبدأ كرم الضيافة والترحيب البغدادي النبيل &quot;ضيف عسولة بريحة الهيل عيوني&quot;.
            </p>

            <blockquote className="border-r-2 border-gold-400 pr-4 italic text-xs text-[#eedcaf]/70 font-serif leading-relaxed">
              &quot;كل فنجان قهوة نغليه على دلة النحاس نرسخ فيه عهداً لجدودنا؛ بالبشاشة وحسن الترحيب لكل خطار يعبر باب قهوة السرحان في بغداد عيوني.&quot;
            </blockquote>

            <div className="pt-2 flex flex-wrap gap-4 justify-end">
              <div className={`text-center p-3 rounded-lg border ${
                isNightMode ? 'bg-[#2d1e15]/40 border-gold-900/10' : 'bg-[#faf6eb] border-[#3d2b1f]/10'
              }`}>
                <span className="block text-[#c5a059] font-mono font-bold text-lg">129+</span>
                <span className={`text-[10px] ${isNightMode ? 'text-[#eedcaf]/70' : 'text-[#5a4634]'}`}>{lang === 'ar' ? 'سنة من الضيافة' : 'Years of Heritage'}</span>
              </div>
              <div className={`text-center p-3 rounded-lg border ${
                isNightMode ? 'bg-[#2d1e15]/40 border-gold-900/10' : 'bg-[#faf6eb] border-[#3d2b1f]/10'
              }`}>
                <span className="block text-[#c5a059] font-mono font-bold text-lg">100%</span>
                <span className={`text-[10px] ${isNightMode ? 'text-[#eedcaf]/70' : 'text-[#5a4634]'}`}>{lang === 'ar' ? 'بُر ونحاس أصيل' : 'Pure Copper Pots'}</span>
              </div>
            </div>
          </div>

          {/* Image placeholder with absolute path referring to our freshly generated image - with JSX referrerPolicy="no-referrer" */}
          <div className="w-full lg:w-96 rounded-2xl overflow-hidden shadow-2xl relative aspect-4/3 group border border-gold-900/20">
            <img 
              src="/src/assets/images/al_sarhan_hero_1781261930297.jpg" 
              alt="صناعة قهوة السرحان التقليدية في بغداد" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-750 group-hover:scale-105"
            />
            {/* Soft gold color cast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 text-right">
              <span className="text-[#c5a059] font-mono text-[10px] uppercase tracking-wider block">فخر البارحة ومذاق اليوم</span>
              <strong className="text-white text-xs">رائحة كليجة السرحان العراقية بالتمر المعتت</strong>
            </div>
          </div>
        </section>

        {/* SECTION 5: Customer Reviews section */}
        <section className="space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className={`text-xl font-bold ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>
              ماذا يقول أهل بغداد الطيبين عنا؟
            </h3>
            <p className={`text-xs mt-1 font-serif ${isNightMode ? 'text-[#c5a059]' : 'text-[#5a4634]'}`}>آراء حقيقية لزبائن عشقوا مذاق الهيل والأصالة في مقهانا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'صادق العبيدي - الأعظمية',
                comment: 'قهوتكم الخاصة 1897 تجنن يا بعد عيني! ريحة الهيل ترجع للرأس توازنها فوراً، والكليجة دافية تذوب بالحلك. الله يبارك برقمكم الطيب وبشغلكم المتقن.',
                stars: 5,
                tag: 'زبون دائم'
              },
              {
                name: 'دكتورة هالة المشهداني - المنصور',
                comment: 'المحل بتصميمه الخارجي والداخلي تحفة بغدادية فخمة، واللاتي بارد بالزعفران الحر هو مشروبي الوحيد بالصيف. أحسن كوفي شوب ببغداد من غير نقاش عيوني.',
                stars: 5,
                tag: 'أنصح به بشدة'
              },
              {
                name: 'الحاج أبو فرات - الكرادة',
                comment: 'القهوة العربية الشقراء مالتهم على الأصول النجفية والبغدادية المظبوطة تطلع دافية وتدقدق الراس، فنجانها يلوق لمجلس شيوخ. كملوا على هذا الكرم.',
                stars: 5,
                tag: 'عاشق القهوة التراثية'
              }
            ].map((review, i) => (
              <div 
                key={i} 
                className={`p-5 rounded-2xl border transition-all duration-1000 ${
                  isNightMode 
                    ? 'border-dashed border-gold-900/50 bg-[#1b120c]' 
                    : 'border-[#3d2b1f]/10 bg-white shadow-sm shadow-[#3d2b1f]/5'
                } space-y-3 relative text-right flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center sm:flex-row-reverse">
                    <span className="text-[10px] bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full text-[#c5a059] font-bold">
                      {review.tag}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(review.stars)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                      ))}
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed ${isNightMode ? 'text-[#eedcap]' : 'text-[#3d2b1f]/90'}`}>
                    &quot;{review.comment}&quot;
                  </p>
                </div>
                <div className="pt-2 border-t border-[#3d2b1f]/10">
                  <strong className={`text-xs block font-bold ${isNightMode ? 'text-[#eedcaf]' : 'text-[#3d2b1f]'}`}>
                    {review.name}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Store Contact Details & Working Hours */}
        <section id="contact-details" className={`rounded-3xl border overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24 transition-all duration-1000 ${
          isNightMode 
            ? 'border-gold-900/20 bg-[#1b120c]' 
            : 'border-[#3d2b1f]/15 bg-white shadow-sm shadow-[#3d2b1f]/5'
        }`}>
          {/* Working Hours Display */}
          <div className="space-y-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <Clock className="w-5 h-5 text-gold-400" />
              <h4 className="text-white text-lg font-black">{lang === 'ar' ? 'ساعات وأوقات العمل الرسمية' : 'Al-Sarhan Working Hours'}</h4>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { day: 'Friday | الجمعة', hours: '12:00 AM - 02:00 PM | ٢:٠٠ م - ١٢:٠٠ ص' },
                { day: 'Saturday | السبت', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' },
                { day: 'Sunday | الأحد', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' },
                { day: 'Monday | الاثنين', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' },
                { day: 'Tuesday | الثلاثاء', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' },
                { day: 'Wednesday | الأربعاء', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' },
                { day: 'Thursday | الخميس', hours: '12:00 AM - 10:00 AM | ١٠:٠٠ ص - ١٢:٠٠ ص' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center py-2.5 px-3 border-b border-gold-900/5 ${
                    idx === 0 
                      ? 'bg-[#c5a059]/15 rounded-lg text-[#c5a059] font-bold' 
                      : isNightMode ? 'text-[#eedcaf]' : 'text-[#3d2b1f]'
                  }`}
                >
                  <span className="text-right tracking-tight">{item.hours}</span>
                  <strong className={`text-[10px] shrink-0 font-sans ${isNightMode ? 'text-[#a17d3b]' : 'text-[#3d2b1f]/70'}`}>{item.day}</strong>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-amber-500/80 leading-relaxed font-serif text-right pr-2">
              ⚠️ تنويه: قد تختلف ساعات العمل طيلة فترة عطلة نهاية وجلسات رأس السنة الهجرية المباركة أو ليلة الأعياد الوطنية.
            </p>
          </div>

          {/* Interactive Mock Address & Map details */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4 text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="w-5 h-5 text-gold-400" />
                <h4 className="text-white text-lg font-black">{lang === 'ar' ? 'مقر ضيافتنا الأصلي' : 'Our Baghdad Address'}</h4>
              </div>

              <div className={`p-4 rounded-xl border transition-all duration-1000 ${
                isNightMode 
                  ? 'border-gold-900/10 bg-[#2d1e15]/40 text-[#eedcaf]' 
                  : 'border-[#3d2b1f]/10 bg-[#faf6eb]/60 text-[#3d2b1f]'
              } space-y-2`}>
                <p className="text-xs leading-relaxed">
                  📍 <strong>العراق - بغداد العاصمة</strong>
                  <br />
                  بغداد - حي الجامعة، قرب جامع حي الجامعة
                </p>
                <p className={`text-xs font-semibold ${isNightMode ? 'text-gold-400' : 'text-[#a17d3b]'}`}>
                  📞 {lang === 'ar' ? 'الخط الساخن والحجوزات' : 'Hotline & Whatsapp'}: 0787 771 0888
                </p>
              </div>
            </div>

            {/* Fast Action WhatsApp Chat / Maps keys */}
            <div className="space-y-3.5">
              <a 
                href="https://wa.me/9647877710888?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%B9%D9%8A%D9%86%D9%8A%20%D9%8A%D8%A7%20%D8%A3%D9%87%D9%84%20%D8%A7%D9%84%D8%B3%D8%B1%D8%AD%D8%A7%D9%86%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9"
                target="_blank"
                rel="noreferrer referrer"
                className="w-full py-4 bg-[#075e54] hover:bg-[#128c7e] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>دردشة مباشرة مع كاشير السرحان عيوني</span>
              </a>

              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent('بغداد حي الجامعة قرب جامع حي الجامعة')}`}
                target="_blank"
                rel="noreferrer referrer"
                className="w-full py-4 bg-[#2d1e15] border border-[#3d2b1f]/30 hover:bg-[#3d2b1f] text-[#eedcaf] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Map className="w-4 h-4" />
                <span>عرض موقع جامع حي الجامعة على خرائط Google</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className={`border-t py-8 text-center text-xs space-y-4 transition-all duration-1000 ${
        isNightMode ? 'bg-[#120c08] border-gold-950 text-stone-400' : 'bg-[#faf6eb] border-[#3d2b1f]/15 text-[#3d2b1f]/70'
      }`}>
        <p className="font-serif">
          جميع الحقوق محفوظة © قهوة السرحان التراثية ٢٠٢٦. تأسست عام ١٨٩٧ في بغداد العروبة.
        </p>
        <p className="font-mono text-[10px] opacity-70">
          Crafted with love for Al-Sarhan Cafe • Baghdad, Iraq • Zain Call: 0787 771 0888
        </p>
      </footer>

      {/* QUICK CUSTOM ORDER MODAL OVERLAY */}
      <AnimatePresence>
        {selectedItemForOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemForOrder(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal popup details */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative w-full max-w-lg rounded-2xl p-6 md:p-8 text-right overflow-hidden shadow-2xl z-20 border ${
                isNightMode ? 'bg-[#1b120c] border-gold-900/40 text-white' : 'bg-white border-[#3d2b1f]/15 text-[#3d2b1f]'
              }`}
            >
              {/* Closing cross */}
              <button 
                onClick={() => setSelectedItemForOrder(null)}
                className={`absolute top-4 left-4 p-2 rounded-full cursor-pointer transition-all ${
                  isNightMode 
                    ? 'text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800' 
                    : 'text-[#3d2b1f]/60 hover:text-[#3d2b1f] bg-[#faf6eb] hover:bg-[#eedcap]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4 justify-end">
                <span className="text-2xl">⚡</span>
                <h3 className={`text-lg font-black ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>تخصيص ضيافة السرحان السريعة</h3>
              </div>

              {/* Item Preview */}
              <div className={`p-4 rounded-xl mb-6 border ${
                isNightMode ? 'bg-[#c5a059]/10 border-[#c5a059]/20' : 'bg-[#faf6eb] border-[#3d2b1f]/10'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[#c5a059] font-mono text-sm font-semibold">{selectedItemForOrder.price}</span>
                  <strong className={`text-sm font-bold ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>{selectedItemForOrder.nameAr}</strong>
                </div>
                <p className={`text-[10px] mt-1 pr-1 ${isNightMode ? 'text-stone-400' : 'text-[#5a4634]'}`}>{selectedItemForOrder.descriptionAr}</p>
              </div>

              {/* Customizers fields */}
              <div className="space-y-4">
                
                {/* Sugar Level */}
                {selectedItemForOrder.category !== 'sweets' && (
                  <div>
                    <label className={`block text-xs font-bold mb-2 ${isNightMode ? 'text-stone-300' : 'text-[#3d2b1f]/90'}`}>درجة حلاوة وسكر الفنجان:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['سادة (مرّ)', 'وسط (مظبوط)', 'حلو كامل'].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => setSugarLevel(lvl)}
                          className={`text-xs py-2 rounded-xl border font-semibold transition-all cursor-pointer ${
                            sugarLevel === lvl
                              ? 'bg-[#c5a059] border-transparent text-white shadow-md'
                              : isNightMode
                                ? 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                                : 'bg-[#faf6eb] border-[#3d2b1f]/10 text-[#3d2b1f] hover:bg-[#eedcap]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cardamom option */}
                {selectedItemForOrder.category !== 'sweets' && (
                  <div>
                    <label className={`block text-xs font-bold mb-2 ${isNightMode ? 'text-stone-300' : 'text-[#3d2b1f]/90'}`}>رائحة وهيل الفنجان:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['هيل خفيف', 'هيل موزون', 'هيل ثقيل (سنگين)'].map(choice => (
                        <button
                          key={choice}
                          onClick={() => setCardamomChoice(choice)}
                          className={`text-xs py-2 rounded-xl border font-semibold transition-all cursor-pointer ${
                            cardamomChoice === choice
                              ? 'bg-[#c5a059] border-transparent text-white shadow-md'
                              : isNightMode
                                ? 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                                : 'bg-[#faf6eb] border-[#3d2b1f]/10 text-[#3d2b1f] hover:bg-[#eedcap]'
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity counter */}
                <div className={`flex justify-between items-center py-2 border-y ${
                  isNightMode ? 'border-gold-900/20' : 'border-[#3d2b1f]/10'
                }`}>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer font-bold border transition-all duration-300 ${
                        isNightMode 
                          ? 'bg-[#2d1e15] border-gold-900/20 text-white hover:bg-[#5a4634]' 
                          : 'bg-[#faf6eb] border-[#3d2b1f]/10 text-[#3d2b1f] hover:bg-[#eedcap]'
                      }`}
                    >
                      -
                    </button>
                    <span className={`text-base font-bold font-mono w-6 text-center ${isNightMode ? 'text-white' : 'text-[#3d2b1f]'}`}>{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-[#c5a059] flex items-center justify-center text-white cursor-pointer hover:bg-[#a17d3b] text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                  <strong className={`text-xs font-bold ${isNightMode ? 'text-stone-300' : 'text-[#3d2b1f]'}`}>عدد الفناجين والمقدار:</strong>
                </div>

                {/* Special Request */}
                <div>
                  <label className={`block text-xs font-bold mb-2 font-serif ${isNightMode ? 'text-stone-300' : 'text-[#3d2b1f]/90'}`}>توصيات مخصصة للتحضير (اختياري عيني):</label>
                  <textarea
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="مثال: الشاي مخدّر على الفحم، أو الكليجة أريدها دافية كلّش من فضلك..."
                    rows={2}
                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none text-right transition-all ${
                      isNightMode 
                        ? 'bg-[#1b120c] border-[#3d2b1f]/40 text-white placeholder-stone-600 focus:border-[#c5a059]' 
                        : 'bg-white border-[#3d2b1f]/15 text-[#3d2b1f] placeholder-[#3d2b1f]/40 focus:border-[#c5a059]'
                    }`}
                  />
                </div>
              </div>

              {/* Subtotal & Call to order button */}
              <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between gap-4 ${
                isNightMode ? 'border-[#3d2b1f]/40' : 'border-[#3d2b1f]/10'
              }`}>
                <div className="text-right">
                  <span className={`text-[10px] block font-mono ${isNightMode ? 'text-stone-400' : 'text-[#5a4634]'}`}>الكلفة الإجمالية المقدرة:</span>
                  <strong className="text-[#c5a059] text-lg font-mono font-black">
                    {(selectedItemForOrder.priceNum * quantity).toLocaleString()} د.ع
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={submitCustomOrder}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>انتقل لإتمام الطلب على الواتساب عيوني</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Sticky Social Contacts */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5 pointer-events-auto max-w-[280px]">
        <a 
          href="https://wa.me/9647877710888"
          target="_blank"
          rel="noreferrer referrer"
          title="تواصل واتساب مباشر"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-bold"
        >
          <MessageCircle className="w-4 h-4 shrink-0 fill-current text-white" />
          <span dir="ltr">0787 771 0888</span>
        </a>

        <a 
          href="https://instagram.com/alsarhan_baghdad"
          target="_blank"
          rel="noreferrer referrer"
          title="تابعنا على الإنستغرام"
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-bold"
        >
          <Instagram className="w-4 h-4 shrink-0" />
          <span dir="ltr">@alsarhan_baghdad</span>
        </a>
      </div>
    </div>
  );
}
