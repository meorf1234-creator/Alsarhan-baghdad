import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Define port and host
const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize Gemini client lazily to avoid crashing on startup if the API key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn('⚡ Warning: GEMINI_API_KEY is not defined or is placeholder. Using elegant fallback generator.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fallback logic for coffee recommendations when API key is missing
function generateFallbackRecommendation(mood: string, preference: string) {
  const normalizedMood = mood.toLowerCase();
  const normalizedPref = preference.toLowerCase();

  if (normalizedPref.includes('حلو') || normalizedPref.includes('حلوى') || normalizedPref.includes('اكل') || normalizedMood.includes('جائع')) {
    return {
      recommendationAr: "يا بعد روحي، بما إنك مشتهي شي حلو يسعد كلبك، أنصحك تجرب كليجة السرحان التراثية بالتمر والجوز مالتنا؛ دافية وتوها طالعة من الفرن، ريحتها هيل وماي ورد وتذوب بالحلق، وتناسب كلش فنجان قهوة السرحان الخاصة 1897 عشان تعدل المزاج على أصوله البغدادية عيوني.",
      recommendedItemId: "baghdad_kleicha",
      hospitalityPhrase: "ألف مليون هلا بيك عيني وتدلل علينا!"
    };
  }

  if (normalizedPref.includes('بارد') || normalizedPref.includes('مثلج') || normalizedMood.includes('تعبان') || normalizedMood.includes('نعسان')) {
    return {
      recommendationAr: "يا مية هلا بيك عيني! دتشعر بالحر وتبي شي ينعش روحك ويصحصحك؟ لعد ماكو أحسن من 'سبيشل لاتي بارد بالزعفران الحر'. حبات الهيل مع حليب بارد ونكهة الزعفران الطبيعي المقطر وي جرعة إسبريسو مزدوج ممتازة مالتنا، حتنزل على كلبك وتبرد عليك حرارة الصيف عيوني.",
      recommendedItemId: "saffron_iced_latte",
      hospitalityPhrase: "يا هلا بريحتك وبحضورك الغالي يا بعد قلبي."
    };
  }

  if (normalizedPref.includes('كلاسيك') || normalizedPref.includes('اسبريسو') || normalizedPref.includes('قوي')) {
    return {
      recommendationAr: "على راسي يا عيني عيوني! تحب الطعم القوي الأصيل اللي يعدل الراس فوراً؟ أنصحك تطلب 'كورتادو السرحان المخملي' أو 'إسبيريسو السرحان المزدوج'. حبات الأرابيكا الفاخرة المحمصة بفرننا الخاص تنطيك نكهة شكولاتة ومكسرات مركزة تخليك مصحصح ومبتسم طول اليوم.",
      recommendedItemId: "cortado_velvet",
      hospitalityPhrase: "قدم السعد والهنا ب جيتك الغالية علينا."
    };
  }

  // Default recommendation
  return {
    recommendationAr: "يا عيني يا عيوني، أنصحك بـ 'خلطة السرحان الخاصة 1897'. هذي خلطة جدودنا السرية اللي نحضرها بحب وهيل نجدي دافئ ومستكة تركية، تنزل بالفنجان ذهب صافي وتعدل كل خلية براسك، خاصة ويّا كليجة دافية تذوب بحلقك يا بعد روحي.",
    recommendedItemId: "sarhan_heritage_1897",
    hospitalityPhrase: "نورت ديرتنا وقهوتنا يا هلا وكل الهلا بيك وبأهلك الطيبين."
  };
}

// API Routes
app.post('/api/recommend', async (req, res) => {
  const { mood = '', preference = '', timeOfDay = '' } = req.body;

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Return beautiful fallback recommendation immediately
      const fallback = generateFallbackRecommendation(mood, preference);
      return res.json(fallback);
    }

    const systemPrompt = `أنت 'مستشار قهوة السرحان'، خبير قهوة وضيافة بغدادي أصيل من 'قهوة السرحان' (تأسست عام 1897 في بغداد).
لغتك هي اللهجة العراقية البغدادية الدافئة الراقية المليئة بالحب والترحيب البغدادي الأصيل (استخدم عبارات مثل: 'عيوني'، 'عيني'، 'يا بعد روحي'، 'تدلل'، 'على راسي'، 'يا مية هلا').
مهمتك هي مراجعة حالة العميل المزاجية ورغبته، وتوصيته بأفضل خيار من قائمة 'قهوة السرحان' بكل شغف وحب.

قائمة معرفات الأصناف المتاحة لديك هي:
- 'sarhan_heritage_1897': خلطة السرحان الخاصة 1897 (قهوة وهيل نجدي ومستكة)
- 'arabic_cardamom': القهوة العربية الشقراء بالهيل
- 'turkish_sand': القهوة التركية على الرمل الموقد
- 'iraqi_tea_cardamom': شاي عراقي مهيل سنگين (في استكان بغدادي)
- 'gold_espresso': إسبيريسو السرحان المزدوج
- 'cortado_velvet': كورتادو السرحان المخملي
- 'saffron_iced_latte': سبيشل لاتي بارد بالزعفران الحر
- 'spanish_iced_latte': سبانيش لاتي مثلج كريمي
- 'pistachio_cappuccino': كابتشينو الفستق والورد البغدادي
- 'baghdad_kleicha': كليجة السرحان التراثية بالهيل (الحلوى الوطنية بالتمر)
- 'shabi_baklava': بقلاوة السرحان البغدادية بالفستق
- 'kunafa_fajra': كنافة الرافدين النابلسية بالجبن الساخن
- 'rashi_dates': تمر خلاص بغدادي بالراشي واللوز

يجب أن تقوم بإرجاع استجابة بتنسيق JSON حصراً يحتوي على الخصائص التالية وتكون القيم مكتوبة باللهجة البغدادية الدافئة جداً:
{
  "recommendationAr": "وصف دافئ وشرح شهي باللهجة البغدادية لماذا يعتبر هذا الصنف بالذات مثالياً لحالتهم، وحبذا لو تقترح مشاركته مع تمر أو كليجة دافية من قائمة السرحان وتكتب ذلك في التوصية بأسلوب مغرٍ وصديق عيوني.",
  "recommendedItemId": "أحد رموز معرّفات القائمة السابقة بدقة متناهية",
  "hospitalityPhrase": "ترحيب بغدادي حار للغاية مخصص للعميل."
}`;

    const promptText = `العميل يمر بالمزاج التالي: "${mood}"
رغبته أو مذاقه المفضل حالياً: "${preference}"
الوقت الحالي لزيارته للموقع: "${timeOfDay}"

أعطه أفضل نصيحة وتوصية تليق بكرم السرحان. أجب بالـ JSON المطلوب تماماً.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendationAr: {
              type: Type.STRING,
              description: 'The recommendation text in warm Iraqi-style Arabic explaining why the choice is perfect.',
            },
            recommendedItemId: {
              type: Type.STRING,
              description: 'The product ID recommended from the allowed list.',
            },
            hospitalityPhrase: {
              type: Type.STRING,
              description: 'A genuine warm Iraqi greeting phrase.',
            },
          },
          required: ['recommendationAr', 'recommendedItemId', 'hospitalityPhrase'],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response from Gemini');
    }

    const parsed = JSON.parse(responseText.trim());
    res.json(parsed);

  } catch (error) {
    console.error('Error with Gemini API:', error);
    // Return graceful fallback so user experience is smooth and unbroken
    const fallback = generateFallbackRecommendation(mood, preference);
    res.json(fallback);
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[قهوة السرحان] Server running on port ${PORT}`);
  });
}

startServer();
