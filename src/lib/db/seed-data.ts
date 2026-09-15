// Seed data for Jivhala - Avatars, Categories, and Multi-language Caring Messages

export const SEED_AVATARS = [
  {
    id: 'aaisarkhi',
    key: 'aaisarkhi',
    name: 'आईसारखी',
    personality: 'मायाळू, धीर देणारी आणि अखंड काळजी घेणारी',
    description: 'जशी आई प्रत्येक छोट्या गोष्टीची चौकशी करते, तशी ही साथ देईल.',
    icon: 'heart'
  },
  {
    id: 'premal',
    key: 'premal',
    name: 'प्रेमळ',
    personality: 'गोड, आपुलकीने विचारपूस करणारी आणि जवळीक साधणारी',
    description: 'प्रत्येक क्षणात प्रेम आणि आत्मीयतेची भावना निर्माण करेल.',
    icon: 'smile'
  },
  {
    id: 'majeshir',
    key: 'majeshir',
    name: 'मजेशीर',
    personality: 'हसतमुख, हलकी-फुलकी आणि मूड फ्रेश करणारी',
    description: 'कामाच्या तणावात एक गोड हास्य आणि हलके क्षण आणेल.',
    icon: 'sparkles'
  },
  {
    id: 'preranadayi',
    key: 'preranadayi',
    name: 'प्रेरणादायी',
    personality: 'उत्साही, खंबीर आणि आत्मविश्वास वाढवणारी',
    description: 'कठीण दिवसातही तुझ्या पाठीशी उभी राहून तुला पुढे नेईल.',
    icon: 'zap'
  },
  {
    id: 'shant',
    key: 'shant',
    name: 'शांत',
    personality: 'संयमी, शांतता देणारी आणि मन हलके करणारी',
    description: 'धकाधकीच्या आयुष्यात शांत श्वास घेण्याची आठवण करेल.',
    icon: 'feather'
  },
  {
    id: 'mitrasarkhi',
    key: 'mitrasarkhi',
    name: 'मित्रासारखी',
    personality: 'खरीखुरी, जवळची आणि बिनधास्त मैत्रीण',
    description: 'कोणत्याही संकोचाशिवाय तुझ्या सोबत मनमोकळा संवाद साधेल.',
    icon: 'users'
  }
];

export const SEED_CATEGORIES = [
  {
    id: 'morning',
    key: 'morning',
    name: 'सकाळची आठवण',
    icon: '🌅',
    defaultTime: '08:30',
    enabledByDefault: true
  },
  {
    id: 'food',
    key: 'food',
    name: 'जेवणाची आठवण',
    icon: '🍱',
    defaultTime: '13:00',
    enabledByDefault: true
  },
  {
    id: 'water',
    key: 'water',
    name: 'पाणी',
    icon: '💧',
    defaultTime: '16:30',
    enabledByDefault: true
  },
  {
    id: 'break',
    key: 'break',
    name: 'ब्रेक',
    icon: '☕',
    defaultTime: '18:00',
    enabledByDefault: true
  },
  {
    id: 'sleep',
    key: 'sleep',
    name: 'झोप',
    icon: '🌙',
    defaultTime: '22:30',
    enabledByDefault: true
  },
  {
    id: 'self_care',
    key: 'self_care',
    name: 'स्वतःची काळजी',
    icon: '❤️',
    defaultTime: '11:30',
    enabledByDefault: true
  },
  {
    id: 'motivation',
    key: 'motivation',
    name: 'प्रेरणा',
    icon: '💪',
    defaultTime: '15:00',
    enabledByDefault: true
  }
];

export interface SeedMessage {
  categoryId: string;
  language: 'mr' | 'hi' | 'en' | 'hinglish';
  text: string;
  secondaryText?: string;
  expression: 'happy' | 'caring' | 'concerned' | 'sleepy' | 'playful' | 'motivational' | 'neutral';
}

export const SEED_MESSAGES: SeedMessage[] = [
  // ================= MORNING =================
  // Marathi
  { categoryId: 'morning', language: 'mr', text: 'सुप्रभात! 🌅 आजचा दिवस छान जाऊ दे. ❤️', secondaryText: 'एक छान स्मितहास्य कर आणि दिवसाची गोड सुरुवात कर.', expression: 'happy' },
  { categoryId: 'morning', language: 'mr', text: 'शुभ सकाळ! नवीन दिवस, नवीन ऊर्जा. ☀️', secondaryText: 'आज तुझ्यासाठी काहीतरी सुंदर नक्की घडेल.', expression: 'happy' },
  { categoryId: 'morning', language: 'mr', text: 'उठलास का? चहा किंवा कोमट पाणी घे आधी. ☕', secondaryText: 'दिवसाची सुरुवात शांतपणे कर, गडबड नको.', expression: 'caring' },
  { categoryId: 'morning', language: 'mr', text: 'सुप्रभात! आज स्वतःवर विश्वास ठेव. ✨', secondaryText: 'तू जे ठरवशील ते नक्की पूर्ण करू शकशील.', expression: 'motivational' },
  { categoryId: 'morning', language: 'mr', text: 'गुड मॉर्निंग! खिडकीबाहेरची ताजी हवा घे थोडी. 🌿', secondaryText: 'आजचा दिवस तुझ्यासाठी खूप खास असणार आहे.', expression: 'playful' },

  // Hindi
  { categoryId: 'morning', language: 'hi', text: 'सुप्रभात! 🌅 आज का दिन आपके लिए मंगलमय हो. ❤️', secondaryText: 'एक प्यारी सी मुस्कान के साथ दिन की शुरुआत करें.', expression: 'happy' },
  { categoryId: 'morning', language: 'hi', text: 'शुभ प्रभात! नई सुबह, नई उम्मीदें लेकर आई है. ☀️', secondaryText: 'आज का दिन बहुत खास और प्यारा होगा.', expression: 'happy' },
  { categoryId: 'morning', language: 'hi', text: 'उठ गए ना? पहले गुनगुना पानी या चाय ले लो. ☕', secondaryText: 'आराम से शुरुआत करो, कोई जल्दबाजी नहीं.', expression: 'caring' },
  { categoryId: 'morning', language: 'hi', text: 'सुप्रभात! खुद पर भरोसा रखो, सब अच्छा होगा. ✨', secondaryText: 'आप बहुत कुछ अच्छा करने की ताकत रखते हैं.', expression: 'motivational' },
  { categoryId: 'morning', language: 'hi', text: 'गुड मॉर्निंग! थोड़ी ताजी हवा लो और मुस्कुराओ. 🌿', secondaryText: 'आज का दिन आपका है!', expression: 'playful' },

  // English
  { categoryId: 'morning', language: 'en', text: 'Good morning! 🌅 Have a wonderful day ahead. ❤️', secondaryText: 'Start your morning with a deep breath and a warm smile.', expression: 'happy' },
  { categoryId: 'morning', language: 'en', text: 'Rise and shine! A fresh new day awaits you. ☀️', secondaryText: 'Take it one gentle step at a time.', expression: 'happy' },
  { categoryId: 'morning', language: 'en', text: 'Morning! Grab a glass of water or warm tea first. ☕', secondaryText: 'Be kind to yourself as you wake up.', expression: 'caring' },
  { categoryId: 'morning', language: 'en', text: 'Good morning! Believe in yourself today. ✨', secondaryText: 'You have everything you need to handle today.', expression: 'motivational' },
  { categoryId: 'morning', language: 'en', text: 'Good morning sunshine! Let today surprise you. 🌿', secondaryText: 'I am right here cheering for you!', expression: 'playful' },

  // Hinglish
  { categoryId: 'morning', language: 'hinglish', text: 'Good morning! 🌅 Aaj ka din mast jaye tumhara. ❤️', secondaryText: 'Ek sweet si smile ke saath start karo.', expression: 'happy' },
  { categoryId: 'morning', language: 'hinglish', text: 'Uth gaye? Pehle thoda paani ya chai pee lo. ☕', secondaryText: 'Aaram se din start karo, koi rush nahi.', expression: 'caring' },
  { categoryId: 'morning', language: 'hinglish', text: 'Good morning! Aaj ka din productive aur chill rahega. ☀️', secondaryText: 'Apne upar pura bharosa rakho.', expression: 'motivational' },
  { categoryId: 'morning', language: 'hinglish', text: 'Subah ho gayi! Thoda stretch karo aur fresh ho jao. 🌿', secondaryText: 'Aaj ka din tumhara hai boss!', expression: 'playful' },
  { categoryId: 'morning', language: 'hinglish', text: 'Shubh prabhat! Smile karo aur ready ho jao. ✨', secondaryText: 'Main hu na tumhare saath.', expression: 'happy' },

  // ================= FOOD =================
  // Marathi
  { categoryId: 'food', language: 'mr', text: 'जेवण झालं का? 🍱 कामासाठी जेवण skip करू नकोस.', secondaryText: 'पोट भरलेलं असेल तरच मन आणि शरीर नीट काम करतं.', expression: 'concerned' },
  { categoryId: 'food', language: 'mr', text: 'दुपारचे एक वाजलेत... जेवून घे आधी! ❤️', secondaryText: 'काम थांबव १० मिनिटांसाठी. तू महत्वाचा आहेस.', expression: 'caring' },
  { categoryId: 'food', language: 'mr', text: 'पोटाला पण थोडं प्रेम दे 😄 लंच केलास का?', secondaryText: 'गरमागरम जेवून घे, फोन बाजूला ठेव.', expression: 'playful' },
  { categoryId: 'food', language: 'mr', text: 'जेवणाची वेळ झाली! भूक मारू नकोस अजिबात.', secondaryText: 'निरोगी जेवण घे आणि स्वतःची काळजी घे.', expression: 'concerned' },
  { categoryId: 'food', language: 'mr', text: 'आज जेवणात काय आहे? मनसोक्त जेव! 🥗', secondaryText: 'जेवण शांतपणे चावून खा, कामाची घाई नको.', expression: 'caring' },

  // Hindi
  { categoryId: 'food', language: 'hi', text: 'खाना खाया क्या? 🍱 काम के चक्कर में खाना मत छोड़ना.', secondaryText: 'सेहत सबसे पहले आती है, खाना समय पर खाओ.', expression: 'concerned' },
  { categoryId: 'food', language: 'hi', text: 'दोपहर का खाना खा लो! ❤️', secondaryText: 'काम कुछ देर रुक सकता है, पहले पेट पूजा कर लो.', expression: 'caring' },
  { categoryId: 'food', language: 'hi', text: 'लंच का टाइम हो गया! 😄 भूख तो लगी होगी?', secondaryText: 'आराम से बैठकर सुकून से खाना खाओ.', expression: 'playful' },
  { categoryId: 'food', language: 'hi', text: 'आज लंच स्किप नहीं करना है बिल्कुल! 🥗', secondaryText: 'शरीर को ताकत चाहिए, अच्छा खाना खाओ.', expression: 'concerned' },
  { categoryId: 'food', language: 'hi', text: 'खाना खा लिया? मीठे में कुछ मिला क्या? ❤️', secondaryText: 'अपने पोषण का पूरा ध्यान रखो.', expression: 'caring' },

  // English
  { categoryId: 'food', language: 'en', text: 'Did you have lunch? 🍱 Please don’t skip meals for work.', secondaryText: 'You matter more than any deadline. Take time to eat.', expression: 'concerned' },
  { categoryId: 'food', language: 'en', text: 'Lunchtime! Put the work aside for 15 minutes. ❤️', secondaryText: 'Nourish your body and recharge your focus.', expression: 'caring' },
  { categoryId: 'food', language: 'en', text: 'Give your stomach some love 😄 Time to eat!', secondaryText: 'Grab something wholesome and delicious.', expression: 'playful' },
  { categoryId: 'food', language: 'en', text: 'Meal reminder: Have you eaten yet? 🥗', secondaryText: 'Food is energy. Don’t starve yourself.', expression: 'concerned' },
  { categoryId: 'food', language: 'en', text: 'Eat peacefully today. Put your phone away while eating. ❤️', secondaryText: 'Mindful meals bring peace and energy.', expression: 'caring' },

  // Hinglish
  { categoryId: 'food', language: 'hinglish', text: 'Khaana khaya kya? 🍱 Kaam ke chakkar me lunch skip mat karna.', secondaryText: 'Pehle pet pooja, fir kaam dooja!', expression: 'concerned' },
  { categoryId: 'food', language: 'hinglish', text: 'Lunch kar lo jaldi! ❤️ Kaam to chalta rahega.', secondaryText: 'Apni body ko fuel do, thoda break lo.', expression: 'caring' },
  { categoryId: 'food', language: 'hinglish', text: 'Bhookh lagi hogi na? Time pe khao 😄', secondaryText: 'Healthy khana khao aur thoda relax karo.', expression: 'playful' },
  { categoryId: 'food', language: 'hinglish', text: 'Lunch skip kiya toh daant padegi! 🥗 Khao abhi.', secondaryText: 'Tumhari tabiyat sabse important hai.', expression: 'concerned' },
  { categoryId: 'food', language: 'hinglish', text: 'Lunch time ho gaya dost! Phone side me rakh ke khao. ❤️', secondaryText: 'Aaram se enjoy karo lunch.', expression: 'caring' },

  // ================= WATER =================
  // Marathi
  { categoryId: 'water', language: 'mr', text: 'पाणी प्यायलास का? 💧 एक ग्लास पाणी घे आधी.', secondaryText: 'शरीराला पाण्याची खूप गरज असते, विसरू नकोस.', expression: 'playful' },
  { categoryId: 'water', language: 'mr', text: 'थोडं पाणी पी! घसा सुकला असेल. 🥤', secondaryText: 'उठ आणि ताजेतवाने होण्यासाठी पाणी घे.', expression: 'caring' },
  { categoryId: 'water', language: 'mr', text: 'हायड्रेटेड राहा! 💧 पाण्याची आठवण करून देतोय.', secondaryText: 'पाणी प्यायल्याने डोकेदुखी कमी होते आणि ताजेतवाने वाटते.', expression: 'happy' },
  { categoryId: 'water', language: 'mr', text: 'पाणी पिण्याची छोटीशी आठवण! 💧', secondaryText: 'कामात तल्लीन होऊन पाणी प्यायला विसरू नकोस.', expression: 'caring' },
  { categoryId: 'water', language: 'mr', text: 'एक ग्लास पाणी पिऊन घे ना... माझ्यासाठी! ❤️💧', secondaryText: 'तुझी तब्येत चांगली राहणे गरजेचे आहे.', expression: 'playful' },

  // Hindi
  { categoryId: 'water', language: 'hi', text: 'पानी पिया क्या? 💧 पहले एक ग्लास पानी पी लो.', secondaryText: 'हाइड्रेटेड रहना बहुत जरूरी है, भूलना मत.', expression: 'playful' },
  { categoryId: 'water', language: 'hi', text: 'थोड़ा पानी पी लो! गला सूख गया होगा. 🥤', secondaryText: 'उठो और ताज़ा पानी पियो.', expression: 'caring' },
  { categoryId: 'water', language: 'hi', text: 'पानी पीने का प्यारा सा रिमाइंडर! 💧', secondaryText: 'काम के बीच पानी पीना मत भूलो.', expression: 'happy' },
  { categoryId: 'water', language: 'hi', text: 'एक ग्लास ठंडा या सादा पानी ले लो ❤️💧', secondaryText: 'तरोताज़ा महसूस होगा.', expression: 'playful' },
  { categoryId: 'water', language: 'hi', text: 'शरीर को पानी की जरूरत है, तुरंत पियो! 💧', secondaryText: 'सेहतमंद रहो और मुस्कुराते रहो.', expression: 'caring' },

  // English
  { categoryId: 'water', language: 'en', text: 'Did you drink water? 💧 Grab a glass right now.', secondaryText: 'Stay hydrated to keep your mind clear and skin fresh.', expression: 'playful' },
  { categoryId: 'water', language: 'en', text: 'Gentle hydration check! 🥤 Sip some water.', secondaryText: 'It’s so easy to forget when you’re busy.', expression: 'caring' },
  { categoryId: 'water', language: 'en', text: 'Water break! 💧 Drink a tall glass of water.', secondaryText: 'Your body will thank you right away.', expression: 'happy' },
  { categoryId: 'water', language: 'en', text: 'Drink some water for me, will you? ❤️💧', secondaryText: 'Keep a bottle nearby and sip regularly.', expression: 'playful' },
  { categoryId: 'water', language: 'en', text: 'Hydration time! Take 3 deep gulps of water. 💧', secondaryText: 'Small habits create big health benefits.', expression: 'caring' },

  // Hinglish
  { categoryId: 'water', language: 'hinglish', text: 'Paani piya kya? 💧 Ek glass paani pi lo pehle.', secondaryText: 'Kaam ke chakkar me paani bhool jate ho.', expression: 'playful' },
  { categoryId: 'water', language: 'hinglish', text: 'Hydration check! 🥤 Utho aur thoda paani piyo.', secondaryText: 'Fresh feel hoga aur energy aayegi.', expression: 'caring' },
  { categoryId: 'water', language: 'hinglish', text: 'Paani ka reminder! 💧 Bottle khatam hui kya?', secondaryText: 'Refill karo aur do ghoont piyo.', expression: 'happy' },
  { categoryId: 'water', language: 'hinglish', text: 'Ek glass paani pee lo mere kehne pe ❤️💧', secondaryText: 'Gala sookh gaya hoga kaam karte karte.', expression: 'playful' },
  { categoryId: 'water', language: 'hinglish', text: 'Stay hydrated boss! Paani peena compulsory hai. 💧', secondaryText: 'Health first, hamesha.', expression: 'caring' },

  // ================= BREAK =================
  // Marathi
  { categoryId: 'break', language: 'mr', text: 'खूप वेळ झाला... थोडा ब्रेक घे ना. ☕', secondaryText: 'स्क्रीनवरून नजर बाजूला कर आणि थोडं स्ट्रेच कर.', expression: 'concerned' },
  { categoryId: 'break', language: 'mr', text: 'चहा किंवा कॉफीची वेळ झाली! ☕ थोडा विरंगुळा कर.', secondaryText: 'सतत काम केल्याने मेंदू थकतो, ५ मिनिटे शांत बस.', expression: 'caring' },
  { categoryId: 'break', language: 'mr', text: 'डोळ्यांना थोडी विश्रांती दे. 🌿 खिडकीबाहेर पाहा.', secondaryText: '२०-२०-२० नियम आठवतोय ना? डोळे बंद कर थोडावेळ.', expression: 'caring' },
  { categoryId: 'break', language: 'mr', text: 'उठ जरा! थोडे चालून ये किंवा हातपाय सैल कर. 🚶‍♂️', secondaryText: 'एका जागी बसून राहू नकोस.', expression: 'motivational' },
  { categoryId: 'break', language: 'mr', text: '५ मिनिटांचा ब्रेक घे! तू रोबोट नाहीस. ❤️', secondaryText: 'स्वतःला थोडा वेळ दे, मग पुन्हा कामाला लाग.', expression: 'playful' },

  // Hindi
  { categoryId: 'break', language: 'hi', text: 'काफी देर हो गई... थोड़ा ब्रेक ले लो ना. ☕', secondaryText: 'स्क्रीन से आंखें हटाओ और थोड़ा टहलो.', expression: 'concerned' },
  { categoryId: 'break', language: 'hi', text: 'चाय-कॉफी का वक्त हो गया! ☕ थोड़ा रिलैक्स करो.', secondaryText: 'लगातार काम करने से थकान बढ़ती है.', expression: 'caring' },
  { categoryId: 'break', language: 'hi', text: 'आंखों को थोड़ा आराम दो. 🌿 खिड़की से बाहर देखो.', secondaryText: 'कुछ पल गहरी सांस लो.', expression: 'caring' },
  { categoryId: 'break', language: 'hi', text: 'उठो और थोड़ा स्ट्रेच करो! 🚶‍♂️', secondaryText: 'शरीर को हिलना-डुलना चाहिए.', expression: 'motivational' },
  { categoryId: 'break', language: 'hi', text: '5 मिनट का ब्रेक बनता है! ❤️', secondaryText: 'आप मशीन नहीं हैं, थोड़ा सांस लीजिये.', expression: 'playful' },

  // English
  { categoryId: 'break', language: 'en', text: 'It’s been a while... take a little break. ☕', secondaryText: 'Rest your eyes from screens and stretch your arms.', expression: 'concerned' },
  { categoryId: 'break', language: 'en', text: 'Coffee/tea pause! ☕ You’ve been working hard.', secondaryText: 'Step away for five minutes to breathe peacefully.', expression: 'caring' },
  { categoryId: 'break', language: 'en', text: 'Rest your eyes for a moment. 🌿 Look far outside.', secondaryText: 'Give your mind a quiet reset.', expression: 'caring' },
  { categoryId: 'break', language: 'en', text: 'Stand up and move around! 🚶‍♂️ Shake off stiffness.', secondaryText: 'A 2-minute walk does wonders.', expression: 'motivational' },
  { categoryId: 'break', language: 'en', text: 'You are not a machine! Take 5 minutes for yourself. ❤️', secondaryText: 'Recharge before continuing your day.', expression: 'playful' },

  // Hinglish
  { categoryId: 'break', language: 'hinglish', text: 'Bahut der ho gayi... thoda break le lo na. ☕', secondaryText: 'Screen se nazar hatao aur stretch karo.', expression: 'concerned' },
  { categoryId: 'break', language: 'hinglish', text: 'Chai ya coffee ka time! ☕ Thoda relax ho jao.', secondaryText: 'Kaam thodi der ruko, fresh feel hoga.', expression: 'caring' },
  { categoryId: 'break', language: 'hinglish', text: 'Aankhon ko aaram do thoda. 🌿 Khidki se bahar dekho.', secondaryText: 'Deep breath lo teen baar.', expression: 'caring' },
  { categoryId: 'break', language: 'hinglish', text: 'Utho chair se aur thoda tahal lo! 🚶‍♂️', secondaryText: 'Ek jagah baithe rehna accha nahi.', expression: 'motivational' },
  { categoryId: 'break', language: 'hinglish', text: '5 minute ka chill break banta hai boss! ❤️', secondaryText: 'Tum robot nahi ho, rest lo thoda.', expression: 'playful' },

  // ================= SLEEP =================
  // Marathi
  { categoryId: 'sleep', language: 'mr', text: 'आता झोपायची वेळ झाली. 🌙 उद्या पुन्हा सुरुवात करूया. ❤️', secondaryText: 'दिवसभराचा ताण सोडून दे, सुखद झोप घे.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'mr', text: 'खूप रात्र झाली... फोन बाजूला ठेव आता. 😴', secondaryText: 'चांगली झोप ही उद्याच्या चांगल्या दिवसाची गुरुकिल्ली आहे.', expression: 'caring' },
  { categoryId: 'sleep', language: 'mr', text: 'आज तू खूप छान काम केलंस! आता शांत झोप. ✨', secondaryText: 'सर्व काळजी उद्यावर सोपव आणि आराम कर.', expression: 'motivational' },
  { categoryId: 'sleep', language: 'mr', text: 'शुभ रात्री! गोड स्वप्ने पाहा. 🌙💤', secondaryText: 'उद्या एक नवीन, सुंदर सकाळ तुझी वाट पाहत आहे.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'mr', text: 'डोळे मिट आणि शांत श्वास घे... आता विश्रांतीची वेळ. 🛌', secondaryText: 'स्वतःच्या शरीराला आणि मनाला आराम दे.', expression: 'caring' },

  // Hindi
  { categoryId: 'sleep', language: 'hi', text: 'अब सोने का वक्त हो गया. 🌙 कल फिर से शुरुआत करेंगे. ❤️', secondaryText: 'दिन भर की चिंता छोड़ो, मीठी नींद लो.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'hi', text: 'काफी रात हो गई... फोन साइड में रख दो. 😴', secondaryText: 'अच्छी नींद सबसे जरूरी दवा है.', expression: 'caring' },
  { categoryId: 'sleep', language: 'hi', text: 'आज आपने बहुत अच्छा किया! अब आराम करो. ✨', secondaryText: 'सुकून से सो जाओ.', expression: 'motivational' },
  { categoryId: 'sleep', language: 'hi', text: 'शुभ रात्रि! प्यारे-प्यारे सपने देखो. 🌙💤', secondaryText: 'कल एक नई सुबह आपका इंतजार करेगी.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'hi', text: 'आंखें बंद करो और गहरी सांस लो... शुभ रात्रि. 🛌', secondaryText: 'अपने मन और शरीर को शांत होने दो.', expression: 'caring' },

  // English
  { categoryId: 'sleep', language: 'en', text: 'Time to rest now. 🌙 Let’s start fresh tomorrow. ❤️', secondaryText: 'Let go of today’s stress and sleep peacefully.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'en', text: 'It’s getting late... put the phone away. 😴', secondaryText: 'Your body needs healing sleep tonight.', expression: 'caring' },
  { categoryId: 'sleep', language: 'en', text: 'You did great today! Now get some peaceful sleep. ✨', secondaryText: 'Tomorrow is another chance to shine.', expression: 'motivational' },
  { categoryId: 'sleep', language: 'en', text: 'Good night! Sweet dreams and gentle rest. 🌙💤', secondaryText: 'A beautiful morning awaits you tomorrow.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'en', text: 'Close your eyes and breathe softly... rest well. 🛌', secondaryText: 'You deserve restful, quiet sleep.', expression: 'caring' },

  // Hinglish
  { categoryId: 'sleep', language: 'hinglish', text: 'Ab sone ka time ho gaya. 🌙 Kal fresh start karenge. ❤️', secondaryText: 'Saari tension bhool jao aur so jao.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'hinglish', text: 'Kaafi late ho gaya... phone rakh do abhi. 😴', secondaryText: 'Screen band karo aur aankhon ko rest do.', expression: 'caring' },
  { categoryId: 'sleep', language: 'hinglish', text: 'Aaj tumne bohot accha kaam kiya! Ab chill karo. ✨', secondaryText: 'Achhi neend lo aur sapne dekho.', expression: 'motivational' },
  { categoryId: 'sleep', language: 'hinglish', text: 'Good night dost! Sweet dreams. 🌙💤', secondaryText: 'Kal subah fresh energy ke saath milenge.', expression: 'sleepy' },
  { categoryId: 'sleep', language: 'hinglish', text: 'Aankhein band karo aur aaram se so jao. 🛌', secondaryText: 'Subah time pe uthna hai na, so jao.', expression: 'caring' },

  // ================= SELF CARE =================
  // Marathi
  { categoryId: 'self_care', language: 'mr', text: 'आज स्वतःची काळजी घेतलीस का? ❤️', secondaryText: 'इतरांची काळजी घेताना स्वतःला विसरू नकोस.', expression: 'caring' },
  { categoryId: 'self_care', language: 'mr', text: 'तू स्वतःसाठीही तितकाच महत्वाचा आहेस! ✨', secondaryText: 'दिवसातून काही क्षण फक्त स्वतःसाठी बाजूला ठेव.', expression: 'motivational' },
  { categoryId: 'self_care', language: 'mr', text: 'थोडं मन शांत कर... एक दीर्घ श्वास घे. 🌿', secondaryText: 'सर्व काही जागेवर येईल, चिंता नको करू.', expression: 'neutral' },
  { categoryId: 'self_care', language: 'mr', text: 'स्वतःशी प्रेमाने बोल आज. तू खूप छान करतोयस. 🌸', secondaryText: 'स्वतःच्या प्रयत्नांचे कौतुक करायला शिक.', expression: 'happy' },
  { categoryId: 'self_care', language: 'mr', text: 'तुझं मन आणि शरीर आज कसं वाटतंय? ❤️', secondaryText: 'त्यांच्या हाकेला ओ दे, जबरदस्ती नको.', expression: 'concerned' },

  // Hindi
  { categoryId: 'self_care', language: 'hi', text: 'आज खुद का ख्याल रखा क्या? ❤️', secondaryText: 'औरों का ध्यान रखते-रखते खुद को मत भूलो.', expression: 'caring' },
  { categoryId: 'self_care', language: 'hi', text: 'आप खुद के लिए भी बहुत अनमोल हैं! ✨', secondaryText: 'दिन में कुछ पल सिर्फ अपने सुकून के लिए निकालो.', expression: 'motivational' },
  { categoryId: 'self_care', language: 'hi', text: 'एक गहरी सांस लो... सब ठीक हो जाएगा. 🌿', secondaryText: 'ज्यादा तनाव मत लो, धीरे-धीरे आगे बढ़ो.', expression: 'neutral' },
  { categoryId: 'self_care', language: 'hi', text: 'खुद से प्यार से बात करो. आप बहुत प्यारे हैं. 🌸', secondaryText: 'अपनी छोटी-छोटी सफलताओं की सराहना करो.', expression: 'happy' },
  { categoryId: 'self_care', language: 'hi', text: 'आपका मन आज कैसा महसूस कर रहा है? ❤️', secondaryText: 'खुद की भावनाओं को समझो और सम्मान दो.', expression: 'concerned' },

  // English
  { categoryId: 'self_care', language: 'en', text: 'Did you take care of yourself today? ❤️', secondaryText: 'In caring for everyone else, never forget yourself.', expression: 'caring' },
  { categoryId: 'self_care', language: 'en', text: 'You are precious and worthy of gentle care! ✨', secondaryText: 'Set aside a few quiet moments just for your soul.', expression: 'motivational' },
  { categoryId: 'self_care', language: 'en', text: 'Take a slow, deep breath... everything will be okay. 🌿', secondaryText: 'Release the tension from your shoulders.', expression: 'neutral' },
  { categoryId: 'self_care', language: 'en', text: 'Be gentle with yourself today. You are doing well. 🌸', secondaryText: 'Celebrate how far you have already come.', expression: 'happy' },
  { categoryId: 'self_care', language: 'en', text: 'How are you feeling inside right now? ❤️', secondaryText: 'Listen to your body and honor its needs.', expression: 'concerned' },

  // Hinglish
  { categoryId: 'self_care', language: 'hinglish', text: 'Aaj apna khayal rakha kya? ❤️', secondaryText: 'Sabka sochte sochte khud ko mat bhool jana.', expression: 'caring' },
  { categoryId: 'self_care', language: 'hinglish', text: 'Tum bhi utne hi important ho jitna tumhara kaam! ✨', secondaryText: 'Apne liye thoda time zaroor nikalo.', expression: 'motivational' },
  { categoryId: 'self_care', language: 'hinglish', text: 'Ek deep breath lo... relax ho jao. 🌿', secondaryText: 'Sab smoothly solve ho jayega.', expression: 'neutral' },
  { categoryId: 'self_care', language: 'hinglish', text: 'Apne aap ko appreciate karo aaj. You are doing great! 🌸', secondaryText: 'Tum bohot strong ho.', expression: 'happy' },
  { categoryId: 'self_care', language: 'hinglish', text: 'Dil kaisa hai aaj? Sab theek na? ❤️', secondaryText: 'Kabhi kabhi aaram karna bhi productive hota hai.', expression: 'concerned' },

  // ================= MOTIVATION =================
  // Marathi
  { categoryId: 'motivation', language: 'mr', text: 'तू खूप काही manage करतोयस... स्वतःचा अभिमान बाळग. 💪', secondaryText: 'प्रत्येक लहान पाऊल तुला ध्येयाकडे घेऊन जात आहे.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'mr', text: 'हार मानू नकोस! तू वाटतं त्यापेक्षा जास्त खंबीर आहेस. 🔥', secondaryText: 'माझा तुझ्यावर पूर्ण विश्वास आहे.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'mr', text: 'कठीण प्रसंग कायम राहत नाहीत, पण कणखर माणसं राहतात! 🌟', secondaryText: 'आजचा दिवस जिंकण्यासाठी सज्ज हो.', expression: 'happy' },
  { categoryId: 'motivation', language: 'mr', text: 'थोडा थकलास तरी थांब, पण मागे फिरू नकोस. 🌈', secondaryText: 'मी सदैव तुझ्या पाठीशी आहे.', expression: 'caring' },
  { categoryId: 'motivation', language: 'mr', text: 'स्वतःवर विश्वास ठेव! तू हे नक्की करू शकतोस. ❤️', secondaryText: 'तुझ्यातली ताकद ओळखा आणि पुढे जा.', expression: 'motivational' },

  // Hindi
  { categoryId: 'motivation', language: 'hi', text: 'आप बहुत कुछ संभाल रहे हैं... खुद पर गर्व करो. 💪', secondaryText: 'हर छोटा कदम आपको आपकी मंजिल के करीब लाता है.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'hi', text: 'हिम्मत मत हारो! आप जितना सोचते हैं उससे कहीं ज्यादा मजबूत हैं. 🔥', secondaryText: 'मुझे आप पर पूरा भरोसा है.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'hi', text: 'मुश्किल वक्त ज्यादा देर नहीं टिकता, मजबूत लोग टिकते हैं! 🌟', secondaryText: 'आज का दिन आपका है, आगे बढ़ो.', expression: 'happy' },
  { categoryId: 'motivation', language: 'hi', text: 'थक गए हो तो थोड़ा रुक जाओ, पर छोड़ना मत. 🌈', secondaryText: 'मैं हमेशा आपके साथ हूं.', expression: 'caring' },
  { categoryId: 'motivation', language: 'hi', text: 'खुद पर विश्वास रखो! आप ये जरूर कर सकते हैं. ❤️', secondaryText: 'अपनी क्षमता को पहचानो.', expression: 'motivational' },

  // English
  { categoryId: 'motivation', language: 'en', text: 'You are juggling so much... be proud of yourself. 💪', secondaryText: 'Every little effort counts toward your growth.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'en', text: 'Don’t give up! You are stronger than you think. 🔥', secondaryText: 'I believe in your strength and heart.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'en', text: 'Tough times never last, but tough people do! 🌟', secondaryText: 'Keep walking forward with head held high.', expression: 'happy' },
  { categoryId: 'motivation', language: 'en', text: 'If you get tired, learn to rest, not to quit. 🌈', secondaryText: 'I am right here with you all the way.', expression: 'caring' },
  { categoryId: 'motivation', language: 'en', text: 'Believe in yourself! You’ve got this. ❤️', secondaryText: 'Your potential is boundless.', expression: 'motivational' },

  // Hinglish
  { categoryId: 'motivation', language: 'hinglish', text: 'Tum bohot kuch handle kar rahe ho, proud of you! 💪', secondaryText: 'Har din thoda thoda improve ho rahe ho.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'hinglish', text: 'Give up mat karna dost! You are stronger than you know. 🔥', secondaryText: 'Mera full trust hai tum par.', expression: 'motivational' },
  { categoryId: 'motivation', language: 'hinglish', text: 'Mushkil waqt dhal jayega, par tum jeet jaoge! 🌟', secondaryText: 'Josh ke saath aage badho.', expression: 'happy' },
  { categoryId: 'motivation', language: 'hinglish', text: 'Thak gaye ho toh thoda rest lo, quit nahi karna. 🌈', secondaryText: 'Main hamesha tumhare support me hu.', expression: 'caring' },
  { categoryId: 'motivation', language: 'hinglish', text: 'Khud pe bharosa rakho! You can definitely do it. ❤️', secondaryText: 'Chalo smile karo aur aage badho.', expression: 'motivational' }
];
