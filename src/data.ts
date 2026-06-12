import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Signature & Heritage
  {
    id: 'sarhan_heritage_1897',
    nameAr: 'خُلطة السرحان الخاصة 1897',
    nameEn: 'Al-Sarhan Signature 1897 Blend',
    descriptionAr: 'منذ عام 1897، توليفة سرية تجمع بين حبات البُن العربية المختارة بعناية والهيل النجدي الفاخر، تُحضر ببطء لتقديم رشفة تاريخية أصيلة.',
    descriptionEn: 'Since 1897, a secret blend of hand-selected Arabic beans and premium cardamom, slow-brewed to offer a sip of pure Baghdadi legacy.',
    price: '5,000 د.ع',
    priceNum: 5000,
    category: 'signature',
    popular: true,
    notesAr: 'تقدّم في دلة الفنجان النحاسية التقليدية مع التمر.',
    notesEn: 'Served in a traditional brass Dallah with fresh Iraqi dates.'
  },
  {
    id: 'arabic_cardamom',
    nameAr: 'القهوة العربية الشقراء بالهيل',
    nameEn: 'Traditional Arabic Cardamom Coffee',
    descriptionAr: 'قهوة شقراء فاخرة، تُغلى برفق مع كمية سخية من الهيل الأخضر المطحون طازجاً، تملأ المكان بعبق التراث والضيافة العراقية.',
    descriptionEn: 'Luxury light-roast coffee, gently boiled with freshly ground green cardamom, embodying the essence of Iraqi generosity.',
    price: '3,000 د.ع',
    priceNum: 3000,
    category: 'heritage',
    popular: true,
    notesAr: 'تكفي لصديقين، ضيافة مستمرة.',
    notesEn: 'Perfect for sharing, unlimited warm hospitality.'
  },
  {
    id: 'turkish_sand',
    nameAr: 'القهوة التركية على الرمل الموقد',
    nameEn: 'Sand-Brewed Turkish Coffee',
    descriptionAr: 'قهوة تركية داكنة غنية، تُحضر على رمال الصحراء الساخنة لتُنتج رغوة كثيفة ونكهة مركزة تأسر القلوب.',
    descriptionEn: 'Rich, dark Turkish coffee slow-brewed over heated desert sand, creating a thick, authentic crema and a deep taste.',
    price: '3,500 د.ع',
    priceNum: 3500,
    category: 'heritage',
    notesAr: 'يمكن طلبها سادة، وسط، أو حلوة.',
    notesEn: 'Available plain, medium, or sweet.'
  },
  {
    id: 'iraqi_tea_cardamom',
    nameAr: 'شاي عراقي مُهيّل سنگين',
    nameEn: 'Heavy Iraqi Cardamom Tea (Sangeen)',
    descriptionAr: 'الشاي البغدادي الأصيل على أصولة، مخدّر على الفحم ببطء، غني برائحة الهيل وبلون الياقوت الساحر.',
    descriptionEn: 'Authentic Baghdadi tea, slow-brewed on charcoal, intensely infused with cardamom and served in a traditional Estikan.',
    price: '2,000 د.ع',
    priceNum: 2000,
    category: 'heritage',
    notesAr: 'يُقدم في استكان بغدادي مذهب.',
    notesEn: 'Served in a gilded traditional Iraqi Estikan glasses.'
  },
  
  // Modern Espresso Brews
  {
    id: 'gold_espresso',
    nameAr: 'إسبيريسو السرحان المزدوج',
    nameEn: 'Double Al-Sarhan Espresso',
    descriptionAr: 'جرعتان من الإسبيريسو المركز المحضر من حبوب أرابيكا 100% المحمصة محلياً بدرجة متوسطة ونكهة الشوكولاتة الداكنة والمكسرات.',
    descriptionEn: 'Double shot of rich espresso pulled from 100% single-origin Arabica, medium-roasted with hints of dark chocolate and toasted nuts.',
    price: '3,500 د.ع',
    priceNum: 3500,
    category: 'modern',
    notesAr: 'محمصة السرحان الخاصة.',
    notesEn: 'From our proprietary locally-roasted profile.'
  },
  {
    id: 'cortado_velvet',
    nameAr: 'كورتادو السرحان المخملي',
    nameEn: 'Velvety Cortado',
    descriptionAr: 'توازن دقيق معتدل بين الإسبيريسو القوي والحليب المبخر بقوام مخملي ناعم، لرشفة متناغمة رائعة.',
    descriptionEn: 'A precise, beautiful balance of bold espresso and steamed whole milk, layered with microfoam for a smooth, pleasant texture.',
    price: '4,000 د.ع',
    priceNum: 4000,
    category: 'modern',
    popular: true
  },
  {
    id: 'saffron_iced_latte',
    nameAr: 'سبيشل لاتي بارد بالزعفران الحر',
    nameEn: 'Premium Saffron Iced Latte',
    descriptionAr: 'قهوة باردة فاخرة مضاف إليها الزعفران الإيراني الطبيعي المقطر مع الحليب الطازج وجرعة مزدوجة من الإسبيريسو.',
    descriptionEn: 'An opulent cold latte featuring double espresso over fresh milk infused with natural saffron extracts.',
    price: '5,500 د.ع',
    priceNum: 5500,
    category: 'modern',
    popular: true,
    notesAr: 'مشروب الصيف الأكثر مبيعاً.',
    notesEn: 'Our best-selling summer indulgence.'
  },
  {
    id: 'spanish_iced_latte',
    nameAr: 'سبانيش لاتي مثلج كريمي',
    nameEn: 'Creamy Iced Spanish Latte',
    descriptionAr: 'مزج رائع من حلاوة الحليب المكثف المحلى مضافاً إليه الإسبيريسو القوي وقطع الثلج المنعشة.',
    descriptionEn: 'Creamy condensed milk combined beautifully with rich bold espresso and cooling crushed ice.',
    price: '5,500 د.ع',
    priceNum: 5500,
    category: 'modern'
  },
  {
    id: 'pistachio_cappuccino',
    nameAr: 'كابتشينو الفستق والورد البغدادي',
    nameEn: 'Pistachio & Rose Cappuccino',
    descriptionAr: 'كابتشينو كلاسيكي مطعم بزبدة الفستق الحلبي الطبيعية الفاخرة، مرشوش عليه حبيبات الورد المحمدي البغدادي المجفف.',
    descriptionEn: 'Classic creamy cappuccino infused with smooth pistachio paste, decorated with fragrant dried Iraqi Mohammadi rose petals.',
    price: '6,000 د.ع',
    priceNum: 6000,
    category: 'modern',
    notesAr: 'طعم غني يجمع التراث والعصر الحديث.',
    notesEn: 'A sumptuous fusion of Eastern flavor and modern brewing.'
  },

  // Baghdadi Authentics & Sweets
  {
    id: 'baghdad_kleicha',
    nameAr: 'كليجة السرحان التراثية بالهيل (قطعتين)',
    nameEn: 'Al-Sarhan Traditional Cardamom Kleicha',
    descriptionAr: 'الحلوى الوطنية العراقية الأثيرة، تُحضّر في مخبزنا يدوياً بحشوة التمر العراقي الفاخر أو الجوز الطازج والسمسم، معطرة بماء الورد والهيل العراقي.',
    descriptionEn: 'The beloved national cookie of Iraq. Freshly baked hand-stretched pastry stuffed with premium local dates or crushed walnuts, cardamom, and rose water.',
    price: '4,000 د.ع',
    priceNum: 4000,
    category: 'sweets',
    popular: true,
    notesAr: 'اطلبها دافئة مع الشاي المهيل أو قهوتك المفضلة.',
    notesEn: 'Best enjoyed warm with cardamom tea or signature blend.'
  },
  {
    id: 'shabi_baklava',
    nameAr: 'بقلاوة السرحان البغدادية بالفستق',
    nameEn: 'Al-Sarhan Pistachio Baklava',
    descriptionAr: 'رقائق الجلاش المقرمشة بالزبدة، محشوة بالكامل بأفخر أنواع الفستق الحلبي المقرمش ومستحلب العسل اللذيذ من جبال شمال العراق.',
    descriptionEn: 'Crispy flaky phyllo pastry layers baked in golden butter, packed with premium crushed pistachio, and drizzled with mountain honey syrup.',
    price: '5,000 د.ع',
    priceNum: 5000,
    category: 'sweets',
    notesAr: 'مقرمشة ومثالية مع القهوة المرة.',
    notesEn: 'Lightly sweet and crunchy, a classic companion to black coffee.'
  },
  {
    id: 'kunafa_fajra',
    nameAr: 'كنافة الرافدين النابلسية بالجبن الساخن',
    nameEn: 'Al-Rafidain Hot Cheese Kunafa',
    descriptionAr: 'كنافة بالجبنة النابلسية العكاوي الساخنة المتموجة، مغطاة بألياف الكنافة الذهبية المقرمشة والفستق الأخضر المحمص.',
    descriptionEn: 'Hot, melted Akawi cheese topped with crispy golden pastry strands and roasted pistachios, drizzled with warm orange blossom syrup.',
    price: '6,000 د.ع',
    priceNum: 6000,
    category: 'sweets',
    notesAr: 'تُحضر طازجة عند الطلب وتستغرق 10 دقائق.',
    notesEn: 'Baked fresh to order. Takes 10 minutes but worth every second.'
  },
  {
    id: 'rashi_dates',
    nameAr: 'تمر خلاص بغدادي بالراشي واللوز',
    nameEn: 'Baghdadi Dates with Rashi & Almond',
    descriptionAr: 'تمور خلاص عراقية منتقاة حبة بحبة، محشوة باللوز المحمص ومغمور بصلصة الراشي (طحينة السمسم النقية الموصلية).',
    descriptionEn: 'Choice Iraqi Khalas dates stuffed with toasted almond, generously drizzled with creamy premium sesame tahini (Rashi).',
    price: '3,500 د.ع',
    priceNum: 3500,
    category: 'sweets',
    notesAr: 'مزيج المذاق البدوي العريق والأول من نوعه في التقديم.',
    notesEn: 'A magnificent heritage pairing of natural sweetness and sesame oils.'
  }
];
