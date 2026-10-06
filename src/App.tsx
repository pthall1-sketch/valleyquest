import React, { useState, useEffect } from 'react';
import {
  Shield,
  Share2,
  Heart,
  Users,
  BookOpen,
  Award,
  FlaskConical,
  Globe,
  Gamepad2,
  MapPin,
  Droplet,
  Activity,
  Footprints,
  Sun,
  CloudFog,
  Wind,
  Plus,
  Mail,
  Key,
  LogIn,
  LogOut,
  Library,
  CheckCircle2,
  CloudRain,
  Glasses,
  UserPlus,
  ExternalLink,
  BookMarked,
  MessageSquare,
  Sparkles,
  Send,
  HelpCircle,
  FileCheck,
  User,
  Filter,
  Search,
  Calendar
} from 'lucide-react';

// ==========================================
// LOCATION & DISTRICT DATA
// ==========================================
interface LocationInfo {
  county: string;
  city: string;
  community: string;
  district: string;
  aqi: number;
  aqiStatus: string;
  temp: string;
  rainForecast: boolean;
  heatAlert: string | null;
  fogAlert: string | null;
  libraries: string[];
  eventsUrl: string;
}

const CENTRAL_VALLEY_DATA: Record<string, LocationInfo> = {
  '93301': {
    county: 'Kern County',
    city: 'Bakersfield',
    community: 'DOWNTOWN BAKERSFIELD',
    district: 'Bakersfield City School District',
    aqi: 112,
    aqiStatus: 'Unhealthy for Sensitive Groups',
    temp: '98°F',
    rainForecast: false,
    heatAlert: 'Excessive Heat Warning in effect until 8 PM.',
    fogAlert: 'Dense Tule Fog Advisory in early morning hours.',
    libraries: ['Beale Memorial Library (Bakersfield)', 'Baker Branch Library'],
    eventsUrl: 'https://kern.org/student-events/'
  },
  '93311': {
    county: 'Kern County',
    city: 'Bakersfield',
    community: 'CENTRAL VALLEY COMMUNITY',
    district: 'Panama-Buena Vista Union School District',
    aqi: 95,
    aqiStatus: 'Moderate',
    temp: '96°F',
    rainForecast: true,
    heatAlert: 'Heat Advisory active for Kern River Valley.',
    fogAlert: null,
    libraries: ['Southwest Branch Library (Bakersfield)', 'Beale Memorial Library'],
    eventsUrl: 'https://kern.org/student-events/'
  },
  '93721': {
    county: 'Fresno County',
    city: 'Fresno',
    community: 'DOWNTOWN FRESNO',
    district: 'Fresno Unified School District',
    aqi: 135,
    aqiStatus: 'Unhealthy for Sensitive Groups',
    temp: '101°F',
    rainForecast: false,
    heatAlert: 'Extreme Heat Warning: Limit outdoor activities 12 PM - 6 PM.',
    fogAlert: null,
    libraries: ['Fresno County Public Library (Central)', 'Politi Branch Library'],
    eventsUrl: 'https://www.fcoe.org/'
  },
  '95202': {
    county: 'San Joaquin County',
    city: 'Stockton',
    community: 'STOCKTON METRO',
    district: 'Stockton Unified School District',
    aqi: 72,
    aqiStatus: 'Moderate',
    temp: '68°F',
    rainForecast: true,
    heatAlert: null,
    fogAlert: 'Patchy morning fog impacting Valley commuters.',
    libraries: ['Cesar Chavez Central Library (Stockton)', 'Maya Angelou Library'],
    eventsUrl: 'https://www.sjcoe.org/services-and-support/studentevents'
  },
  '95350': {
    county: 'Stanislaus County',
    city: 'Modesto',
    community: 'NORTH MODESTO',
    district: 'Modesto City Schools',
    aqi: 84,
    aqiStatus: 'Moderate',
    temp: '91°F',
    rainForecast: false,
    heatAlert: null,
    fogAlert: null,
    libraries: ['Modesto Library (Stanislaus County)', 'Salida Regional Library'],
    eventsUrl: 'https://www.stancoe.org/'
  }
};

const DEFAULT_LOCATION: LocationInfo = {
  county: 'Kern County',
  city: 'Bakersfield',
  community: 'CENTRAL VALLEY DISTRICT',
  district: 'Central Valley Joint School District',
  aqi: 80,
  aqiStatus: 'Moderate',
  temp: '90°F',
  rainForecast: false,
  heatAlert: null,
  fogAlert: null,
  libraries: ['Central Valley Public Library System'],
  eventsUrl: 'https://kern.org/student-events/'
};

// ==========================================
// REGIONAL EVENTS DATABASE (BY COUNTY)
// ==========================================
interface EventItem {
  county: string;
  category: string;
  name: string;
  venue: string;
}

const REGIONAL_STEM_EVENTS: EventItem[] = [
  // Kern County Events
  { county: 'Kern County', category: 'Science & Math', name: 'Kern County Regional Science Fair', venue: 'Dignity Health Convention Center' },
  { county: 'Kern County', category: 'Science & Math', name: 'STEAM Olympiad Competition', venue: 'Liberty High School' },
  { county: 'Kern County', category: 'Science & Math', name: 'IgniteHER – STEM for Girls', venue: 'Bakersfield College' },
  { county: 'Kern County', category: 'Science & Math', name: 'Kern Codes: Skoolcade', venue: 'Virtual' },
  { county: 'Kern County', category: 'English Language Arts', name: 'Bank of America Speech/Essay Contest', venue: 'Bell Tower Plaza' },
  { county: 'Kern County', category: 'English Language Arts', name: 'Oral Language Festival', venue: 'Stonecreek Junior High' },
  { county: 'Kern County', category: 'History & Social Science', name: 'Kern County History Day', venue: 'Bell Tower Plaza' },
  { county: 'Kern County', category: 'Arts & Music', name: 'Honor Music Festival', venue: 'Dignity Health Convention Center' },
  { county: 'Kern County', category: 'Future Readiness', name: 'Career and STEM Expo', venue: 'Career & Technical Education Center' },

  // Fresno County Events
  { county: 'Fresno County', category: 'Science & Math', name: 'Central Valley Science & Engineering Fair', venue: 'Fresno Convention Center' },
  { county: 'Fresno County', category: 'Science & Math', name: 'Fresno County STEM Challenge', venue: 'Fresno State University' },
  { county: 'Fresno County', category: 'Future Readiness', name: 'Fresno Unified Robotics League', venue: 'Edison High School' },
  { county: 'Fresno County', category: 'Arts & Music', name: 'Fresno County Student Art Showcase', venue: 'Fresno Art Museum' },

  // San Joaquin County Events
  { county: 'San Joaquin County', category: 'Science & Math', name: 'San Joaquin Science Olympiad', venue: 'University of the Pacific' },
  { county: 'San Joaquin County', category: 'Future Readiness', name: 'SJCOE Coding & AI Expo', venue: 'Stockton Tech Hub' },
  { county: 'San Joaquin County', category: 'History & Social Science', name: 'San Joaquin Academic Decathlon', venue: 'Chavez High School' },

  // Stanislaus County Events
  { county: 'Stanislaus County', category: 'Science & Math', name: 'Stanislaus Regional Science Olympiad', venue: 'CSU Stanislaus' },
  { county: 'Stanislaus County', category: 'Science & Math', name: 'Modesto STEM & Robotics Showcase', venue: 'Modesto Junior College' },
  { county: 'Stanislaus County', category: 'English Language Arts', name: 'Stanislaus County Spelling Bee', venue: 'Stanislaus Office of Education' }
];

// ==========================================
// WORLD WINDOW PRACTICE DATA (5 LANGUAGES x 3 LEVELS)
// ==========================================
type SkillLevel = 'Beginner' | 'Moderate' | 'Expert';
type Language = 'Spanish' | 'French' | 'Arabic' | 'Japanese' | 'Hindi';

interface LanguageLesson {
  scenario: string;
  phrases: Array<{ original: string; translation: string; phonetic: string }>;
  dialogue: { speakerA: string; speakerB: string; translation: string };
  travelTip: string;
}

const WORLD_WINDOW_DATA: Record<Language, Record<SkillLevel, LanguageLesson>> = {
  Spanish: {
    Beginner: {
      scenario: 'Ordering Food at a Local Cafe',
      phrases: [
        { original: 'Hola, ¿puedo pedir un café?', translation: 'Hello, can I order a coffee?', phonetic: 'OH-lah, pway-doo peh-DEER oon kah-FEH' },
        { original: 'Por favor y gracias.', translation: 'Please and thank you.', phonetic: 'por fah-VOR ee GRAH-syahs' }
      ],
      dialogue: { speakerA: '¡Buenos días! ¿Qué desea ordenar?', speakerB: 'Un jugo de naranja, por favor.', translation: 'Good morning! What would you like to order? / An orange juice, please.' },
      travelTip: 'Always greet shopkeepers with "Buenos días" before ordering in Mexico or Spain.'
    },
    Moderate: {
      scenario: 'Asking for Train Station Directions',
      phrases: [
        { original: 'Disculpe, ¿dónde está la estación de trenes más cercana?', translation: 'Excuse me, where is the nearest train station?', phonetic: 'dees-KOOL-peh, DON-deh ehs-TAH lah ehs-tah-SYON' }
      ],
      dialogue: { speakerA: '¿Sabe a qué hora sale el próximo tren?', speakerB: 'Sale a las tres en punto de la plataforma dos.', translation: 'Do you know what time the next train leaves? / It leaves at three oclock from platform two.' },
      travelTip: 'When using public transit in South America, keep small cash denominations for tickets.'
    },
    Expert: {
      scenario: 'Debating Environmental Topics in Class',
      phrases: [
        { original: 'Es fundamental reducir las emisiones de carbono en la agricultura.', translation: 'It is fundamental to reduce carbon emissions in agriculture.', phonetic: 'ehs foon-dah-men-TAL reh-doo-SEER' }
      ],
      dialogue: { speakerA: '¿Cuál es su opinión sobre la energía solar renovable?', speakerB: 'Creo que es la inversión más sostenible para el Valle Central.', translation: 'What is your opinion on renewable solar energy? / I believe it is the most sustainable investment for the Central Valley.' },
      travelTip: 'In formal debates, use subjunctive mood constructions to express nuanced hypotheses.'
    }
  },
  French: {
    Beginner: {
      scenario: 'Greeting Peers in Paris',
      phrases: [
        { original: 'Bonjour, comment allez-vous?', translation: 'Hello, how are you?', phonetic: 'bon-ZHOOR, koh-mohn tah-lay VOO' }
      ],
      dialogue: { speakerA: 'Bonjour! Je m’appelle Pierre.', speakerB: 'Enchanté Pierre, je suis Marie.', translation: 'Hello! My name is Pierre. / Nice to meet you Pierre, I am Marie.' },
      travelTip: 'Always say "Bonjour" when entering any store or bakery in France.'
    },
    Moderate: {
      scenario: 'Navigating a Museum in Lyon',
      phrases: [
        { original: 'Où se trouve la billetterie, s’il vous plaît?', translation: 'Where is the ticket office, please?', phonetic: 'oo suh TROO-vuh lah bee-yeh-TREE' }
      ],
      dialogue: { speakerA: 'Avez-vous des tarifs étudiants?', speakerB: 'Oui, présentation de la carte d’étudiant obligatoire.', translation: 'Do you have student rates? / Yes, student ID card required.' },
      travelTip: 'Many national museums in France offer free admission to students with valid ID.'
    },
    Expert: {
      scenario: 'Discussing Literary Classics',
      phrases: [
        { original: 'Ce roman explore la complexité des relations humaines au XIXe siècle.', translation: 'This novel explores human relationship complexity in the 19th century.', phonetic: 'suh roh-MAHN ex-PLOR' }
      ],
      dialogue: { speakerA: 'Que pensez-vous du style narratif de l’auteur?', speakerB: 'Son utilisation de la métaphore est captivante et profonde.', translation: 'What do you think of the author narrative style? / Their use of metaphor is captivating and profound.' },
      travelTip: 'Literary discussions in French often favor precise abstract vocabulary.'
    }
  },
  Arabic: {
    Beginner: {
      scenario: 'Simple Daily Greetings',
      phrases: [
        { original: 'مرحباً، كيف حالك؟ (Marhaban, kayfa halak?)', translation: 'Hello, how are you?', phonetic: 'mar-ha-ban kay-fa ha-lak' }
      ],
      dialogue: { speakerA: 'أهلاً وسهلاً! (Ahlan wa sahlan!)', speakerB: 'شكراً جزيلاً! (Shukran jazeelan!)', translation: 'Welcome! / Thank you very much!' },
      travelTip: 'Placing your right hand over your heart after greeting is a sign of warmth and respect.'
    },
    Moderate: {
      scenario: 'Buying Items at a Souk Market',
      phrases: [
        { original: 'كم سعر هذا، من فضلك؟ (Kam si’r hadha, min fadlik?)', translation: 'How much is this, please?', phonetic: 'kam seer ha-dha min fad-lik' }
      ],
      dialogue: { speakerA: 'هذا بمائة درهم. (Hadha bi-mi’at dirham.)', speakerB: 'هل يمكن تخفيض السعر؟ (Hal yumkin takhfeedh as-si’r?)', translation: 'This is 100 dirhams. / Can you lower the price?' },
      travelTip: 'Polite bargaining is customary in traditional open-air markets across the Middle East.'
    },
    Expert: {
      scenario: 'Academic Exchange on History',
      phrases: [
        { original: 'تعتبر الأندلس مركزاً تاريخياً للتبادل العلمي. (Tu’tabar al-Andalus markazan...)', translation: 'Al-Andalus is considered a historical center for scientific exchange.', phonetic: 'tu-ta-bar al-an-da-lus' }
      ],
      dialogue: { speakerA: 'كيف أثرت الترجمة في العصر العباسي؟', speakerB: 'لقد حفظت العلوم القديمة وطورت الفلسفة العالمية.', translation: 'How did translation affect the Abbasid era? / It preserved ancient sciences and developed global philosophy.' },
      travelTip: 'Formal Arabic (Fusha) is recognized across all 22 Arabic-speaking nations.'
    }
  },
  Japanese: {
    Beginner: {
      scenario: 'Polite Expresses in Tokyo',
      phrases: [
        { original: 'こんにちは、はじめまして。 (Konnichiwa, hajimemashite.)', translation: 'Hello, nice to meet you.', phonetic: 'kon-nee-chee-wah ha-jee-meh-mah-shee-teh' }
      ],
      dialogue: { speakerA: 'すみません、これはいくらですか？', speakerB: 'それは千円です。', translation: 'Excuse me, how much is this? / That is 1,000 yen.' },
      travelTip: 'Bowing slightly when saying "Arigatou gozaimasu" shows appreciation.'
    },
    Moderate: {
      scenario: 'Asking for Directions at Shinjuku Station',
      phrases: [
        { original: 'JR線はどこですか？ (JR-sen wa doko desu ka?)', translation: 'Where is the JR train line?', phonetic: 'jay-ahr sen wah doh-koh dess kah' }
      ],
      dialogue: { speakerA: 'この電車は秋葉原に行きますか？', speakerB: 'はい、次の駅で乗り換えてください。', translation: 'Does this train go to Akihabara? / Yes, please transfer at the next station.' },
      travelTip: 'IC Cards like Suica or Pasmo work on trains, buses, and convenience stores.'
    },
    Expert: {
      scenario: 'Discussing Tech Innovations',
      phrases: [
        { original: '人工知能の発展は社会構造に変化をもたらします。', translation: 'The development of artificial intelligence brings changes to social structure.', phonetic: 'jin-kou chi-nou no hat-ten' }
      ],
      dialogue: { speakerA: 'ロボット工学の最新技術についてどう思いますか？', speakerB: '医療分野での活用が期待されています。', translation: 'What do you think of robotics latest tech? / Applications in medicine are highly anticipated.' },
      travelTip: 'Keigo (formal honorific speech) is expected in business and formal academic settings.'
    }
  },
  Hindi: {
    Beginner: {
      scenario: 'Friendly Greetings & Introductions',
      phrases: [
        { original: 'नमस्ते! आप कैसे हैं? (Namaste! Aap kaise hain?)', translation: 'Hello! How are you?', phonetic: 'nah-mas-TEH aape kai-SEH hain' }
      ],
      dialogue: { speakerA: 'मेरा नाम राहुल है। (Mera naam Rahul hai.)', speakerB: 'आपसे मिलकर खुशी हुई। (Aapse milkar khushi hui.)', translation: 'My name is Rahul. / Nice to meet you.' },
      travelTip: 'Joining hands together in "Namaste" is a traditional and respectful greeting.'
    },
    Moderate: {
      scenario: 'Ordering Food at an Indian Restaurant',
      phrases: [
        { original: 'क्या आपके पास शाकाहारी खाना है? (Kya aapke paas shakahari khana hai?)', translation: 'Do you have vegetarian food?', phonetic: 'kya aap-ke paas sha-ka-ha-ree kha-na hai' }
      ],
      dialogue: { speakerA: 'आज की विशेष डिश क्या है?', speakerB: 'आज ताज़ा पनीर और तंदूरी रोटी बढ़िया है।', translation: 'What is today special dish? / Fresh paneer and tandoori roti are great today.' },
      travelTip: 'In India, hospitality is paramount ("Atithi Devo Bhava" - The guest is equivalent to God).'
    },
    Expert: {
      scenario: 'Discussing Cultural Heritage & History',
      phrases: [
        { original: 'भारत की विविधता और समृद्ध संस्कृति अद्वितीय है।', translation: 'Indias diversity and rich culture are unique.', phonetic: 'bha-rat kee vi-vidh-ta' }
      ],
      dialogue: { speakerA: 'प्राचीन स्थापत्य कला के बारे में आपका क्या विचार है?', speakerB: 'यह हमारे ऐतिहासिक कौशल और कारीगरी का प्रतीक है।', translation: 'What is your view on ancient architectural art? / It represents our historical skill and craftsmanship.' },
      travelTip: 'Using formal "Aap" rather than informal "Tum" shows polite respect to elders and teachers.'
    }
  }
};

// ==========================================
// EXPANDED BOOK DATABASE (10+ BOOKS PER AGE GROUP & GENRE)
// ==========================================
interface BookItem {
  id: number;
  title: string;
  author: string;
  ageCategory: 'Ages 2–5' | 'Ages 6–8' | 'Ages 9–12' | 'Ages 13–18';
  genre: string;
  description: string;
}

const EXTENDED_BOOKS_DATABASE: BookItem[] = [
  // --- Ages 2–5 ---
  { id: 1, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', ageCategory: 'Ages 2–5', genre: "Children's Picture Book / STEM", description: 'A classic picture book about life cycles and a caterpillar eating through the week.' },
  { id: 2, title: 'Goodnight Moon', author: 'Margaret Wise Brown', ageCategory: 'Ages 2–5', genre: "Bedtime Classic", description: 'A gentle rhyming story saying goodnight to everything in the room.' },
  { id: 3, title: 'Brown Bear, Brown Bear, What Do You See?', author: 'Bill Martin Jr.', ageCategory: 'Ages 2–5', genre: "Colors & Animals / STEM", description: 'Teaches young readers colors and animal recognition through rhymes.' },
  { id: 4, title: 'The Rainbow Fish', author: 'Marcus Pfister', ageCategory: 'Ages 2–5', genre: "Fantasy & Kindness", description: 'A sweet fantasy tale about a glittering fish sharing his scales.' },
  { id: 5, title: 'Chicka Chicka Boom Boom', author: 'Bill Martin Jr.', ageCategory: 'Ages 2–5', genre: "Alphabet & Learning / STEM", description: 'An energetic early-learning alphabet rhyme as letters race up a coconut tree.' },
  { id: 6, title: 'Where Is Baby’s Belly Button?', author: 'Karen Katz', ageCategory: 'Ages 2–5', genre: "Interactive Lift-the-Flap / STEM", description: 'Fun lift-the-flap book introducing early human anatomy for toddlers.' },
  { id: 7, title: 'If You Give a Mouse a Cookie', author: 'Laura Numeroff', ageCategory: 'Ages 2–5', genre: "Humorous Story", description: 'A whimsical story showing a funny sequence of cause and effect.' },
  { id: 8, title: 'Don’t Let the Pigeon Drive the Bus!', author: 'Mo Willems', ageCategory: 'Ages 2–5', genre: "Humor & Interactive", description: 'An expressive pigeon tries to convince kids to let him drive.' },
  { id: 9, title: 'Llama Llama Red Pajama', author: 'Anna Dewdney', ageCategory: 'Ages 2–5', genre: "Emotions & Family", description: 'Helps young kids cope with bedtime separation anxiety.' },
  { id: 10, title: 'Dear Zoo', author: 'Rod Campbell', ageCategory: 'Ages 2–5', genre: "Animals & Touch / STEM", description: 'A lift-the-flap favorite exploring animals and their traits.' },
  { id: 11, title: 'Room on the Broom', author: 'Julia Donaldson', ageCategory: 'Ages 2–5', genre: "Fantasy", description: 'A friendly witch and her magical animal friends go on a sky adventure.' },
  { id: 12, title: 'Ada Twist, Scientist: Picture Book', author: 'Andrea Beaty', ageCategory: 'Ages 2–5', genre: "STEM & Science", description: 'A curious young girl asks questions and conducts fun scientific experiments.' },

  // --- Ages 6–8 ---
  { id: 13, title: 'Where the Wild Things Are', author: 'Maurice Sendak', ageCategory: 'Ages 6–8', genre: "Fantasy", description: 'Max sails to the land of wild monsters in an imaginative fantasy journey.' },
  { id: 14, title: 'The Magic Tree House: Dinosaurs Before Dark', author: 'Mary Pope Osborne', ageCategory: 'Ages 6–8', genre: "Fantasy & STEM", description: 'Jack and Annie travel through time to study prehistoric dinosaurs.' },
  { id: 15, title: 'Mercy Watson to the Rescue', author: 'Kate DiCamillo', ageCategory: 'Ages 6–8', genre: "Beginner Chapter Book", description: 'Hilarious adventures of a buttered-toast-loving pig.' },
  { id: 16, title: 'Zoey and Sassafras: Dragons and Marshmallows', author: 'Asia Citro', ageCategory: 'Ages 6–8', genre: "STEM & Fantasy", description: 'Zoey uses the scientific method to heal sick magical creatures.' },
  { id: 17, title: 'Fly Guy Series: Hi! Fly Guy', author: 'Tedd Arnold', ageCategory: 'Ages 6–8', genre: "Humor & Early Reader", description: 'A boy and his smart pet fly go on funny everyday quests.' },
  { id: 18, title: 'Frog and Toad Are Friends', author: 'Arnold Lobel', ageCategory: 'Ages 6–8', genre: "Friendship Classic", description: 'Five heartwarming stories celebrating true friendship.' },
  { id: 19, title: 'Ivy + Bean', author: 'Annie Barrows', ageCategory: 'Ages 6–8', genre: "Realistic Fiction", description: 'Two very different girls team up for wild neighborhood fun.' },
  { id: 20, title: 'The Bad Guys', author: 'Aaron Blabey', ageCategory: 'Ages 6–8', genre: "Graphic Novel & Humor", description: 'Misunderstood villainous animals try to perform heroic good deeds.' },
  { id: 21, title: 'Narwhal: Unicorn of the Sea', author: 'Ben Clanton', ageCategory: 'Ages 6–8', genre: "Graphic Novel & STEM", description: 'A happy narwhal and a cynical jellyfish explore ocean life together.' },
  { id: 22, title: 'Junie B. Jones and the Stupid Smelly Bus', author: 'Barbara Park', ageCategory: 'Ages 6–8', genre: "Humor & School Life", description: 'Junie B. shares her funny, unfiltered first-grade observations.' },
  { id: 23, title: 'Dragon Masters: Rise of the Earth Dragon', author: 'Tracey West', ageCategory: 'Ages 6–8', genre: "Fantasy", description: 'Drake is summoned to the castle to train dragons with special magic powers.' },
  { id: 24, title: 'The Most Magnificent Thing', author: 'Ashley Spires', ageCategory: 'Ages 6–8', genre: "STEM & Innovation", description: 'A young maker learns perseverance and engineering design principles.' },

  // --- Ages 9–12 ---
  { id: 25, title: "Charlotte's Web", author: 'E.B. White', ageCategory: 'Ages 9–12', genre: 'Classic / Fiction', description: 'The heartwarming tale of Wilbur the pig and a wise spider named Charlotte.' },
  { id: 26, title: 'Percy Jackson: The Lightning Thief', author: 'Rick Riordan', ageCategory: 'Ages 9–12', genre: 'Fantasy & Mythology', description: 'A modern demigod discovers his lineage and embarks on a quest.' },
  { id: 27, title: 'Wonder', author: 'R.J. Palacio', ageCategory: 'Ages 9–12', genre: 'Realistic Fiction', description: 'Auggie Pullman navigates fifth grade with courage and kindness.' },
  { id: 28, title: 'A Wrinkle in Time', author: 'Madeleine L\'Engle', ageCategory: 'Ages 9–12', genre: 'Sci-Fi Fantasy & STEM', description: 'Meg Murry travels through tesseracts and quantum space to save her scientist father.' },
  { id: 29, title: 'Hidden Figures (Young Readers Edition)', author: 'Margot Lee Shetterly', ageCategory: 'Ages 9–12', genre: 'STEM & Non-Fiction', description: 'The incredible story of female African American NASA mathematicians.' },
  { id: 30, title: 'Holes', author: 'Louis Sachar', ageCategory: 'Ages 9–12', genre: 'Mystery & Adventure', description: 'Stanley Yelnats is sent to Camp Green Lake where he uncovers old secrets.' },
  { id: 31, title: 'Keeper of the Lost Cities', author: 'Shannon Messenger', ageCategory: 'Ages 9–12', genre: 'Fantasy & Magic', description: 'Sophie learns she is a telepathic elf who belongs in a hidden world.' },
  { id: 32, title: 'The One and Only Ivan', author: 'Katherine Applegate', ageCategory: 'Ages 9–12', genre: 'Animal Fiction', description: 'A gorilla living in a shopping mall plans a daring escape.' },
  { id: 33, title: 'Front Desk', author: 'Kelly Yang', ageCategory: 'Ages 9–12', genre: 'Realistic Fiction', description: 'Mia Tang manages a motel front desk while navigating immigrant life.' },
  { id: 34, title: 'Amari and the Night Brothers', author: 'B.B. Alston', ageCategory: 'Ages 9–12', genre: 'Fantasy & Mystery', description: 'Amari discovers supernatural secret agents while searching for her brother.' },
  { id: 35, title: 'The Wild Robot', author: 'Peter Brown', ageCategory: 'Ages 9–12', genre: 'STEM & Sci-Fi Fantasy', description: 'A robot stranded on a wild island learns robotics and nature survival.' },
  { id: 36, title: 'Girls Who Code: Learn to Code and Change the World', author: 'Reshma Saujani', ageCategory: 'Ages 9–12', genre: 'STEM & Technology', description: 'An inspiring introduction to computer science, coding, and teamwork.' },

  // --- Ages 13–18 ---
  { id: 37, title: 'The Hunger Games', author: 'Suzanne Collins', ageCategory: 'Ages 13–18', genre: 'Dystopian Sci-Fi / Fantasy', description: 'Katniss Everdeen volunteers in a televised survival tournament.' },
  { id: 38, title: 'The Book Thief', author: 'Markus Zusak', ageCategory: 'Ages 13–18', genre: 'Historical Fiction / Classic', description: 'Narrated by Death, a young girl steals books to survive WWII Germany.' },
  { id: 39, title: 'To Kill a Mockingbird', author: 'Harper Lee', ageCategory: 'Ages 13–18', genre: 'Classic Literature', description: 'Scout Finch witnesses racial injustice and empathy in 1930s Alabama.' },
  { id: 40, title: 'The Hate U Give', author: 'Angie Thomas', ageCategory: 'Ages 13–18', genre: 'Contemporary Fiction', description: 'Starr Carter balances her dual life after witnessing a police shooting.' },
  { id: 41, title: 'Cinder (The Lunar Chronicles)', author: 'Marissa Meyer', ageCategory: 'Ages 13–18', genre: 'Fantasy & STEM Sci-Fi', description: 'A gifted mechanic cyborg in New Beijing becomes embroiled in an intergalactic war.' },
  { id: 42, title: 'Legend', author: 'Marie Lu', ageCategory: 'Ages 13–18', genre: 'Dystopian Sci-Fi', description: 'A prodigy military candidate and a street criminal clash in futuristic Los Angeles.' },
  { id: 43, title: 'One of Us Is Lying', author: 'Karen M. McManus', ageCategory: 'Ages 13–18', genre: 'Mystery & Thriller', description: 'Five high school students enter detention, but only four make it out alive.' },
  { id: 44, title: 'Scythe', author: 'Neal Shusterman', ageCategory: 'Ages 13–18', genre: 'Dystopian Sci-Fi & Fantasy', description: 'In a world where AI cured disease, "scythes" are chosen to control population.' },
  { id: 45, title: 'Firekeeper’s Daughter', author: 'Angeline Boulley', ageCategory: 'Ages 13–18', genre: 'STEM & Mystery Thriller', description: 'An Ojibwe teen uses chemistry knowledge to protect her Native reservation.' },
  { id: 46, title: 'Ender’s Game', author: 'Orson Scott Card', ageCategory: 'Ages 13–18', genre: 'STEM & Sci-Fi Classic', description: 'A young tactical genius is trained at Battle School using advanced tech.' },
  { id: 47, title: 'Six of Crows', author: 'Leigh Bardugo', ageCategory: 'Ages 13–18', genre: 'Fantasy', description: 'A crew of dangerous outcasts attempt an impossible heist in a magical world.' },
  { id: 48, title: 'The Martian (Classroom Edition)', author: 'Andy Weir', ageCategory: 'Ages 13–18', genre: 'STEM & Sci-Fi', description: 'An astronaut stranded on Mars uses botanical and engineering math to stay alive.' }
];

const getMonthlyRotatedBooks = (): BookItem[] => {
  const currentMonth = new Date().getMonth();
  const rotated = [...EXTENDED_BOOKS_DATABASE];
  const shift = (currentMonth * 3) % rotated.length;
  return rotated.slice(shift).concat(rotated.slice(0, shift));
};

// ==========================================
// USER INTERFACE TYPES
// ==========================================
interface UserAccount {
  username: string;
  studentName: string;
  role: 'Student' | 'Teacher';
  code: string;
  joinedBuddies: Array<{ name: string; code: string; role: string }>;
}

export default function App() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginRole, setLoginRole] = useState<'Student' | 'Teacher'>('Student');
  const [studentNameInput, setStudentNameInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  const [activeTab, setActiveTab] = useState<string>('Safe-Day Dashboard');
  const [zipCode, setZipCode] = useState<string>('93301');

  const [activeWellbeingTab, setActiveWellbeingTab] = useState<'planner' | 'water' | 'mood'>('water');
  const [waterCount, setWaterCount] = useState<number>(4);
  const [movementMins, setMovementMins] = useState<number>(30);
  const [stepCount, setStepCount] = useState<number>(5420);
  const [activities, setActivities] = useState<Array<{ id: number; title: string; time: string }>>([
    { id: 1, title: 'Afternoon Soccer Practice', time: '4:00 PM' },
    { id: 2, title: 'Math Homework Prep', time: '6:30 PM' }
  ]);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityTime, setNewActivityTime] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('Energized');

  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [inviteStatusMsg, setInviteStatusMsg] = useState<{ text: string; success: boolean } | null>(null);

  const [homeworkQuestions, setHomeworkQuestions] = useState([
    { id: 1, student: 'Pradeep Kumar', subject: 'Algebra II', question: 'How do you factor quadratic equations with leading coefficients > 1?', answers: ['Use the AC method: multiply A*C and find factors that add to B!'] },
    { id: 2, student: 'Elena Rodriguez', subject: 'Chemistry', question: 'What is the balanced equation for cellular respiration?', answers: ['C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP!'] }
  ]);
  const [newSubject, setNewSubject] = useState('Math');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [replyText, setReplyText] = useState<Record<number, string>>({});

  const [projectMilestones, setProjectMilestones] = useState([
    { id: 1, title: 'Problem Statement & Hypothesis', completed: true, mentorFeedback: 'Great scope! Ensure variable controls are clear.' },
    { id: 2, title: 'Experimental Data Logging', completed: false, mentorFeedback: 'Awaiting lab logbook entries.' },
    { id: 3, title: 'Tri-Fold Display Board Prep', completed: false, mentorFeedback: 'Follow Kern Regional Science Fair layout guidelines.' }
  ]);
  const [newFeedbackInput, setNewFeedbackInput] = useState('');

  const [selectedLang, setSelectedLang] = useState<Language>('Spanish');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('Beginner');

  const [arcadeGames, setArcadeGames] = useState([
    { id: 1, author: 'Alex Martinez', title: 'Solar System Simulator', link: 'https://scratch.mit.edu', description: 'Interactive 3D planetary motion model.' },
    { id: 2, author: 'Sarah Patel', title: 'Central Valley Water Run', link: 'https://replit.com', description: 'Python arcade game teaching water conservation.' }
  ]);
  const [gameTitle, setGameTitle] = useState('');
  const [gameLink, setGameLink] = useState('');
  const [gameDesc, setGameDesc] = useState('');

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All Ages');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [searchBookTerm, setSearchBookTerm] = useState<string>('');
  const [booksList, setBooksList] = useState<BookItem[]>([]);

  useEffect(() => {
    setBooksList(getMonthlyRotatedBooks());
  }, []);

  const currentLocation = CENTRAL_VALLEY_DATA[zipCode] || {
    ...DEFAULT_LOCATION,
    community: `VALLEY DISTRICT (${zipCode})`
  };

  // Dynamically Filter Events Based on Selected Zip Code / County
  const filteredCountyEvents = REGIONAL_STEM_EVENTS.filter(
    (evt) => evt.county.toLowerCase() === currentLocation.county.toLowerCase()
  );

  const generateSixDigitCode = () => {
    return 'CV-' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput) return;

    const storedUsersJson = localStorage.getItem('cv_portal_users');
    const usersList: Record<string, UserAccount & { password?: string }> = storedUsersJson ? JSON.parse(storedUsersJson) : {};

    if (authMode === 'signup') {
      const newCode = generateSixDigitCode();
      const displayName = studentNameInput.trim() || usernameInput.trim();
      const newAccount: UserAccount & { password?: string } = {
        username: usernameInput,
        studentName: displayName,
        role: loginRole,
        code: newCode,
        joinedBuddies: [],
        password: passwordInput
      };
      usersList[usernameInput] = newAccount;
      localStorage.setItem('cv_portal_users', JSON.stringify(usersList));
      setCurrentUser(newAccount);
      setIsLoggedIn(true);
    } else {
      const existing = usersList[usernameInput];
      if (existing) {
        if (!existing.studentName) {
          existing.studentName = existing.username;
        }
        setCurrentUser(existing);
        setIsLoggedIn(true);
      } else {
        const fallbackAccount: UserAccount = {
          username: usernameInput,
          studentName: studentNameInput.trim() || usernameInput,
          role: loginRole,
          code: generateSixDigitCode(),
          joinedBuddies: []
        };
        usersList[usernameInput] = fallbackAccount;
        localStorage.setItem('cv_portal_users', JSON.stringify(usersList));
        setCurrentUser(fallbackAccount);
        setIsLoggedIn(true);
      }
    }
  };

  // Connected Peers Handler - Displays Registered Student Name
  const handleAddCodeBuddy = () => {
    if (!inviteCodeInput || !currentUser) return;

    const cleanInput = inviteCodeInput.trim().toUpperCase();

    if (cleanInput === currentUser.code.trim().toUpperCase()) {
      setInviteStatusMsg({ text: "You cannot enter your own code!", success: false });
      return;
    }

    const storedUsersJson = localStorage.getItem('cv_portal_users');
    const usersList: Record<string, UserAccount> = storedUsersJson ? JSON.parse(storedUsersJson) : {};
    
    // Search registered account database by Code or Username
    const foundUser = Object.values(usersList).find(
      u => u.code.trim().toUpperCase() === cleanInput || u.username.trim().toUpperCase() === cleanInput
    );

    // Extract Registered Student Name
    const displayName = foundUser ? (foundUser.studentName || foundUser.username) : `Student (${cleanInput})`;
    const displayRole = foundUser ? foundUser.role : 'Peer';
    const displayCode = foundUser ? foundUser.code : cleanInput;

    const alreadyExists = currentUser.joinedBuddies.some(b => b.code.toUpperCase() === displayCode || b.name.toLowerCase() === displayName.toLowerCase());

    if (!alreadyExists) {
      const newBuddyEntry = { name: displayName, code: displayCode, role: displayRole };
      const updatedUser = {
        ...currentUser,
        joinedBuddies: [...currentUser.joinedBuddies, newBuddyEntry]
      };
      setCurrentUser(updatedUser);
      usersList[currentUser.username] = updatedUser;
      localStorage.setItem('cv_portal_users', JSON.stringify(usersList));
      setInviteStatusMsg({
        text: `Successfully connected with ${displayName} (${displayCode}) (${displayRole})!`,
        success: true
      });
    } else {
      setInviteStatusMsg({ text: `You are already connected with ${displayName}.`, success: true });
    }
    setInviteCodeInput('');
  };

  const filteredBooks = booksList.filter((book) => {
    const matchesAge = selectedAgeGroup === 'All Ages' || book.ageCategory === selectedAgeGroup;
    const matchesGenre = selectedGenre === 'All Genres' || book.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesSearch = book.title.toLowerCase().includes(searchBookTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchBookTerm.toLowerCase());
    return matchesAge && matchesGenre && matchesSearch;
  });

  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b1329] flex items-center justify-center p-4 text-white font-sans">
        <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-blue-600/20 text-blue-400 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center border border-blue-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Central Valley Student Portal</h1>
            <p className="text-xs text-slate-400">
              {authMode === 'signin' ? 'Sign in to access your district hub' : 'Create a new account to receive your 6-digit code'}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${authMode === 'signin' ? 'bg-[#2563eb] text-white' : 'text-slate-400'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${authMode === 'signup' ? 'bg-[#2563eb] text-white' : 'text-slate-400'}`}
            >
              Create Account
            </button>
          </div>

          <div className="grid grid-cols-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800/80">
            <button
              type="button"
              onClick={() => setLoginRole('Student')}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                loginRole === 'Student' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setLoginRole('Teacher')}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                loginRole === 'Teacher' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              Teacher / Mentor
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {loginRole === 'Student' ? 'Student Full Name' : 'Teacher / Mentor Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder={loginRole === 'Student' ? 'e.g. Tanvi Thallapalle' : 'e.g. Mr. Thallapalle'}
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username / ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. tanvit"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {authMode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {authMode === 'signin' ? `Sign In as ${loginRole}` : `Register New ${loginRole} Account`}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Safe-Day Dashboard', icon: Shield },
    { name: 'Invite Friends', icon: Share2 },
    { name: 'Activity & Wellbeing', icon: Heart },
    { name: 'Study Buddy', icon: Users },
    { name: 'Reading Tracker', icon: BookOpen },
    { name: 'STEM Board & Events', icon: Award },
    { name: 'Science-Fair Coach', icon: FlaskConical },
    { name: 'World Window', icon: Globe },
    { name: 'Creator Arcade', icon: Gamepad2 },
  ];

  return (
    <div className="flex h-screen bg-[#f0f4f8] text-slate-800 font-sans overflow-hidden">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-64 bg-[#0b1329] text-white flex flex-col shrink-0 justify-between py-6">
        <div className="space-y-6">
          <div className="px-6 flex items-center justify-between">
            <span className="font-bold text-sm text-blue-400 tracking-wider uppercase">Central Valley App</span>
            <span className="text-[10px] bg-blue-900 text-blue-300 px-2 py-0.5 rounded font-mono">{currentUser?.role}</span>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors text-left text-xs ${
                    isActive ? 'bg-[#2563eb] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="px-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs truncate">
            <p className="font-semibold text-white truncate">{currentUser?.studentName || currentUser?.username}</p>
            <p className="text-blue-400 font-mono text-[11px]">Code: {currentUser?.code}</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            title="Sign Out"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-[#0b1329] border-b border-slate-800 px-8 py-3 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-pink-500" />
            <span className="font-medium">Central Valley County Selector:</span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="bg-[#1e293b] border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="93301">Bakersfield (Kern) - 93301</option>
              <option value="93311">SW Bakersfield (Kern) - 93311</option>
              <option value="93721">Fresno (Fresno) - 93721</option>
              <option value="95202">Stockton (San Joaquin) - 95202</option>
              <option value="95350">Modesto (Stanislaus) - 95350</option>
            </select>

            <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full font-semibold border border-blue-500/40">
              {currentLocation.district}
            </span>
          </div>
        </header>

        <main className="p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                {currentLocation.community} ({zipCode}) • {currentLocation.county}
              </p>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome, {currentUser?.studentName || currentUser?.username}!
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400">YOUR UNIQUE CLASS CODE</span>
              <p className="text-lg font-mono font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                {currentUser?.code}
              </p>
            </div>
          </div>

          {/* ========================================================
              TAB 1: SAFE-DAY DASHBOARD
             ======================================================== */}
          {activeTab === 'Safe-Day Dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">Environmental & Safety Dashboard</h2>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${currentLocation.aqi > 100 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    <Wind className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase">Air Quality Index (AQI)</span>
                    <h3 className="text-2xl font-extrabold text-slate-800">{currentLocation.aqi} AQI</h3>
                    <p className="text-xs font-medium text-slate-500">{currentLocation.aqiStatus}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-slate-800">{currentLocation.temp}</span>
                  <p className="text-xs text-slate-400">Current Temp</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl p-6 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Glasses className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-sm">Recommended Gear & Clothing for Today</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {currentLocation.rainForecast ? (
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-blue-500/40 flex items-center gap-3">
                      <CloudRain className="w-6 h-6 text-blue-400" />
                      <div className="text-xs">
                        <p className="font-bold text-white">Carry Umbrella / Raincoat</p>
                        <p className="text-slate-400">Rain in forecast for {currentLocation.city}.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                      <Sun className="w-6 h-6 text-amber-400" />
                      <div className="text-xs">
                        <p className="font-bold text-white">Clear Weather Gear</p>
                        <p className="text-slate-400">No rain expected today.</p>
                      </div>
                    </div>
                  )}

                  {currentLocation.aqi > 100 && (
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-amber-500/40 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-amber-400" />
                      <div className="text-xs">
                        <p className="font-bold text-white">Wear Protective Mask</p>
                        <p className="text-slate-400">Elevated AQI: N95 mask recommended for outdoor recess.</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                    <Droplet className="w-6 h-6 text-blue-400" />
                    <div className="text-xs">
                      <p className="font-bold text-white">Hydration Bottle</p>
                      <p className="text-slate-400">Refillable water bottle for high temperatures.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-xl border ${currentLocation.heatAlert ? 'bg-orange-50 border-orange-200 text-orange-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                    <Sun className="w-5 h-5 text-orange-500" />
                    <span>Extreme Heat Alert</span>
                  </div>
                  <p className="text-xs">{currentLocation.heatAlert || 'No active heat warnings for this area.'}</p>
                </div>

                <div className={`p-5 rounded-xl border ${currentLocation.fogAlert ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                    <CloudFog className="w-5 h-5 text-blue-500" />
                    <span>Tule Fog Advisory</span>
                  </div>
                  <p className="text-xs">{currentLocation.fogAlert || 'Clear visibility reported.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: INVITE FRIENDS & UNIQUE 6-DIGIT CODE EXCHANGER
             ======================================================== */}
          {activeTab === 'Invite Friends' && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <Share2 className="w-10 h-10 text-blue-600 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800">Unique Class Code Exchange</h2>
                <p className="text-xs text-slate-500">Every student is assigned a unique 6-digit code upon registration.</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-blue-700">Your Code to Share:</p>
                <p className="text-2xl font-mono font-extrabold text-blue-900">{currentUser?.code}</p>
                <p className="text-[11px] text-blue-600">Registered Name: <strong>{currentUser?.studentName}</strong></p>
              </div>

              {inviteStatusMsg && (
                <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${inviteStatusMsg.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  {inviteStatusMsg.text}
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-700">Enter a Classmate or Teacher Code:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. CV-849201"
                    value={inviteCodeInput}
                    onChange={(e) => setInviteCodeInput(e.target.value)}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddCodeBuddy}
                    className="bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg"
                  >
                    Connect Code
                  </button>
                </div>
              </div>

              {/* Connected Peers Display (Renders Registered Student Name + Code) */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-700">Connected Peers ({currentUser?.joinedBuddies.length || 0})</h3>
                {currentUser?.joinedBuddies && currentUser.joinedBuddies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentUser.joinedBuddies.map((buddy, idx) => (
                      <span key={idx} className="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-bold text-slate-800">{buddy.name}</span>
                        <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-mono font-bold">{buddy.code}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No study buddies connected yet. Exchange codes above to add student names!</p>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: ACTIVITY & WELLBEING
             ======================================================== */}
          {activeTab === 'Activity & Wellbeing' && (
            <>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 w-fit">
                <button
                  onClick={() => setActiveWellbeingTab('planner')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeWellbeingTab === 'planner' ? 'bg-[#2563eb] text-white' : 'text-slate-600'}`}
                >
                  Activity Planner
                </button>
                <button
                  onClick={() => setActiveWellbeingTab('water')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeWellbeingTab === 'water' ? 'bg-[#2563eb] text-white' : 'text-slate-600'}`}
                >
                  Water, Steps & Movement
                </button>
                <button
                  onClick={() => setActiveWellbeingTab('mood')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeWellbeingTab === 'mood' ? 'bg-[#2563eb] text-white' : 'text-slate-600'}`}
                >
                  Wellbeing & Mood
                </button>
              </div>

              {activeWellbeingTab === 'water' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-between">
                    <div className="space-y-3">
                      <Droplet className="w-8 h-8 text-blue-500 mx-auto" />
                      <h2 className="text-base font-bold text-slate-800">Hydration Tracker</h2>
                      <div className="text-4xl font-extrabold text-blue-600">
                        {waterCount} <span className="text-slate-400 text-2xl font-normal">/ 8</span>
                      </div>
                      <p className="text-xs text-slate-400">Glasses consumed (8 oz each)</p>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button onClick={() => setWaterCount((c) => c + 1)} className="bg-[#2563eb] text-white text-xs px-3 py-1.5 rounded-lg">+ Add Glass</button>
                      <button onClick={() => setWaterCount((c) => Math.max(0, c - 1))} className="bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg">- Remove</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-between">
                    <div className="space-y-3">
                      <Footprints className="w-8 h-8 text-emerald-500 mx-auto" />
                      <h2 className="text-base font-bold text-slate-800">Steps Tracker</h2>
                      <div className="text-4xl font-extrabold text-emerald-600">
                        {stepCount.toLocaleString()} <span className="text-slate-400 text-2xl font-normal">/ 10k</span>
                      </div>
                      <p className="text-xs text-slate-400">Daily walking goal</p>
                    </div>
                    <button onClick={() => setStepCount((s) => s + 500)} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-semibold">+ 500 Steps</button>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-between">
                    <div className="space-y-3">
                      <Activity className="w-8 h-8 text-rose-500 mx-auto" />
                      <h2 className="text-base font-bold text-slate-800">Movement Target</h2>
                      <div className="text-4xl font-extrabold text-rose-600">
                        {movementMins} <span className="text-slate-400 text-2xl font-normal">/ 60 mins</span>
                      </div>
                      <p className="text-xs text-slate-400">Daily exercise target</p>
                    </div>
                    <button onClick={() => setMovementMins((m) => m + 10)} className="mt-6 bg-rose-600 hover:bg-rose-700 text-white text-xs px-4 py-2 rounded-lg font-semibold">+ 10 Mins Movement</button>
                  </div>
                </div>
              )}

              {activeWellbeingTab === 'planner' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Scheduled Daily Activities</h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Activity Title"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Time (e.g. 5:00 PM)"
                      value={newActivityTime}
                      onChange={(e) => setNewActivityTime(e.target.value)}
                      className="w-32 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                    <button
                      onClick={() => {
                        if (newActivityTitle) {
                          setActivities([...activities, { id: Date.now(), title: newActivityTitle, time: newActivityTime || 'Anytime' }]);
                          setNewActivityTitle('');
                          setNewActivityTime('');
                        }
                      }}
                      className="bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {activities.map((item) => (
                      <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.title}</span>
                        <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded font-mono">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWellbeingTab === 'mood' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6 text-center max-w-lg mx-auto">
                  <h2 className="text-base font-bold text-slate-800">How are you feeling today?</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {['Energized', 'Focused', 'Calm', 'Tired', 'Stressed', 'Motivated'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMood(m)}
                        className={`p-4 rounded-xl border text-xs font-bold ${selectedMood === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================
              TAB 4: STUDY BUDDY
             ======================================================== */}
          {activeTab === 'Study Buddy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Homework & Test-Prep Help Hub</h2>
                    <p className="text-xs text-slate-500">Ask questions, share test study guides, and get peer answers.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('Invite Friends')}
                    className="bg-blue-600 text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" /> Share Code ({currentUser?.code})
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-blue-600" /> Ask a Homework / Test Question
                  </h3>
                  <div className="flex gap-2">
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs bg-white"
                    >
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="English">English</option>
                    </select>
                    <input
                      type="text"
                      placeholder="e.g. Can someone explain quadratic formulas or periodic trends?"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (newQuestionText) {
                          setHomeworkQuestions([
                            ...homeworkQuestions,
                            { id: Date.now(), student: currentUser?.studentName || currentUser?.username || 'Student', subject: newSubject, question: newQuestionText, answers: [] }
                          ]);
                          setNewQuestionText('');
                        }
                      }}
                      className="bg-blue-600 text-white font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> Post Question
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {homeworkQuestions.map((q) => (
                  <div key={q.id} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">{q.subject}</span>
                      <span className="text-slate-400">Asked by: <strong>{q.student}</strong></span>
                    </div>

                    <p className="text-sm font-semibold text-slate-800">{q.question}</p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {q.answers.map((ans, idx) => (
                        <div key={idx} className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-lg text-xs flex gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ans}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Provide study tip or answer..."
                        value={replyText[q.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-1 text-xs"
                      />
                      <button
                        onClick={() => {
                          if (replyText[q.id]) {
                            setHomeworkQuestions(
                              homeworkQuestions.map(item => item.id === q.id ? { ...item, answers: [...item.answers, `${currentUser?.studentName || currentUser?.username}: ${replyText[q.id]}`] } : item)
                            );
                            setReplyText({ ...replyText, [q.id]: '' });
                          }
                        }}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1 rounded-lg font-semibold"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: READING TRACKER
             ======================================================== */}
          {activeTab === 'Reading Tracker' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-800">Reading Tracker & Book Recommendations</h2>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Library className="w-4 h-4 text-blue-600" />
                    <span>Active Libraries in {currentLocation.county}:</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentLocation.libraries.map((lib) => (
                    <span key={lib} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                      📍 {lib}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-600" /> Book Recommendation Explorer
                    </h3>
                    <p className="text-xs text-slate-500">Toggle target age and genre to explore curated books</p>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1 shrink-0">
                      <Calendar className="w-3.5 h-3.5" /> List Updated: {currentMonthName}
                    </span>
                    <div className="relative flex-1 md:w-56">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search title or author..."
                        value={searchBookTerm}
                        onChange={(e) => setSearchBookTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">1. Select Target Age Group:</label>
                  <div className="flex flex-wrap gap-2">
                    {['All Ages', 'Ages 2–5', 'Ages 6–8', 'Ages 9–12', 'Ages 13–18'].map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAgeGroup(age)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedAgeGroup === age
                            ? 'bg-[#2563eb] text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">2. Filter by Genre:</label>
                  <div className="flex flex-wrap gap-2">
                    {['All Genres', 'Fantasy', 'STEM', 'Classic', 'Fiction', 'Dystopian', 'Mystery'].map((gen) => (
                      <button
                        key={gen}
                        onClick={() => setSelectedGenre(gen)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          selectedGenre === gen
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span>Showing {filteredBooks.length} Recommendation(s)</span>
                  <span className="text-blue-600">Active Filter: {selectedAgeGroup} • {selectedGenre}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#3498db] text-white">
                        <th className="p-2.5 border border-slate-200 text-center w-10">#</th>
                        <th className="p-2.5 border border-slate-200">Book Title</th>
                        <th className="p-2.5 border border-slate-200">Author</th>
                        <th className="p-2.5 border border-slate-200 text-center w-28">Target Age</th>
                        <th className="p-2.5 border border-slate-200">Genre</th>
                        <th className="p-2.5 border border-slate-200">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, idx) => (
                          <tr key={book.id} className="even:bg-slate-50 hover:bg-slate-100 transition-colors">
                            <td className="p-2.5 border border-slate-200 text-center font-semibold text-slate-500">{idx + 1}</td>
                            <td className="p-2.5 border border-slate-200 font-bold text-slate-900">{book.title}</td>
                            <td className="p-2.5 border border-slate-200 text-slate-600">{book.author}</td>
                            <td className="p-2.5 border border-slate-200 text-center">
                              <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold border border-blue-100">
                                {book.ageCategory}
                              </span>
                            </td>
                            <td className="p-2.5 border border-slate-200 text-slate-600 font-medium">{book.genre}</td>
                            <td className="p-2.5 border border-slate-200 text-slate-500 text-[11px]">{book.description}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400">
                            No books match the selected age group or genre filter. Try selecting "All Genres" or "All Ages" above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: STEM BOARD & EVENTS (DYNAMICALLY UPDATES BY ZIP CODE & COUNTY)
             ======================================================== */}
          {activeTab === 'STEM Board & Events' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      {currentLocation.county} Student Events Board
                    </h2>
                    <p className="text-xs text-slate-500">
                      Showing academic competitions, STEM showcases, and leadership events active for Zip Code <strong>{zipCode}</strong>:
                    </p>
                  </div>
                  <a
                    href={currentLocation.eventsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Official {currentLocation.county} Event Hub
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#3498db] text-white">
                        <th className="p-2.5 border border-slate-200">Category</th>
                        <th className="p-2.5 border border-slate-200">Event Name</th>
                        <th className="p-2.5 border border-slate-200">Venue / Location</th>
                        <th className="p-2.5 border border-slate-200 text-center">County</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCountyEvents.length > 0 ? (
                        filteredCountyEvents.map((evt, idx) => (
                          <tr key={idx} className="even:bg-slate-50 hover:bg-slate-100">
                            <td className="p-2.5 border border-slate-200">
                              <span className="inline-block bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium">
                                {evt.category}
                              </span>
                            </td>
                            <td className="p-2.5 border border-slate-200 font-semibold text-slate-900">{evt.name}</td>
                            <td className="p-2.5 border border-slate-200 text-slate-600">{evt.venue}</td>
                            <td className="p-2.5 border border-slate-200 text-center font-bold text-blue-700">{evt.county}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-slate-400">
                            No registered events found for {currentLocation.county}. Check the official county portal above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SCIENCE-FAIR COACH
             ======================================================== */}
          {activeTab === 'Science-Fair Coach' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Science-Fair Progress & Mentor Hub</h2>
                    <p className="text-xs text-slate-500">
                      {currentUser?.role === 'Teacher' ? 'Teacher View: Provide feedback to students' : 'Student View: Track experiment milestones'}
                    </p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                    Role: {currentUser?.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {projectMilestones.map((m) => (
                  <div key={m.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={m.completed}
                          onChange={() => {
                            setProjectMilestones(
                              projectMilestones.map(item => item.id === m.id ? { ...item, completed: !item.completed } : item)
                            );
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <h3 className={`font-bold text-sm ${m.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{m.title}</h3>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {m.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                      <strong>Teacher Feedback:</strong> {m.mentorFeedback || 'No feedback provided yet.'}
                    </div>

                    {currentUser?.role === 'Teacher' && (
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Write feedback for student..."
                          value={newFeedbackInput}
                          onChange={(e) => setNewFeedbackInput(e.target.value)}
                          className="flex-1 border border-slate-300 rounded-lg px-3 py-1 text-xs"
                        />
                        <button
                          onClick={() => {
                            if (newFeedbackInput) {
                              setProjectMilestones(
                                projectMilestones.map(item => item.id === m.id ? { ...item, mentorFeedback: newFeedbackInput } : item)
                              );
                              setNewFeedbackInput('');
                            }
                          }}
                          className="bg-purple-700 text-white text-xs px-3 py-1 rounded-lg font-semibold"
                        >
                          Save Feedback
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: WORLD WINDOW
             ======================================================== */}
          {activeTab === 'World Window' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">World Window: Daily Language & Conversation Practice</h2>
                    <p className="text-xs text-slate-500">Updated Daily • Master conversational scenarios & travel phrases</p>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                    📅 Daily Update Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {(['Spanish', 'French', 'Arabic', 'Japanese', 'Hindi'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedLang === lang ? 'bg-[#2563eb] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {(['Beginner', 'Moderate', 'Expert'] as SkillLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedLevel === level ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {level} Level
                    </button>
                  ))}
                </div>
              </div>

              {WORLD_WINDOW_DATA[selectedLang][selectedLevel] && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedLang} • {selectedLevel}</span>
                      <h3 className="text-lg font-bold text-slate-800">{WORLD_WINDOW_DATA[selectedLang][selectedLevel].scenario}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Key Phrases & Pronunciation</h4>
                    {WORLD_WINDOW_DATA[selectedLang][selectedLevel].phrases.map((p, idx) => (
                      <div key={idx} className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-blue-900 text-sm">{p.original}</p>
                        <p className="text-slate-600">Translation: {p.translation}</p>
                        <p className="text-xs font-mono text-blue-700">Phonetic: [{p.phonetic}]</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Interactive Dialogue Scenario</h4>
                    <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                      <p><strong className="text-blue-400">Speaker A:</strong> {WORLD_WINDOW_DATA[selectedLang][selectedLevel].dialogue.speakerA}</p>
                      <p><strong className="text-emerald-400">Speaker B:</strong> {WORLD_WINDOW_DATA[selectedLang][selectedLevel].dialogue.speakerB}</p>
                      <p className="text-slate-400 text-[11px] pt-2 border-t border-slate-800">
                        Translation: {WORLD_WINDOW_DATA[selectedLang][selectedLevel].dialogue.translation}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <strong className="block font-bold">Cultural & Travel Tip:</strong>
                      {WORLD_WINDOW_DATA[selectedLang][selectedLevel].travelTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 9: CREATOR ARCADE
             ======================================================== */}
          {activeTab === 'Creator Arcade' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <h2 className="text-base font-bold text-slate-800">Student Creator Arcade & Project Showcase</h2>
                <p className="text-xs text-slate-500">Share links to your Scratch, Python, or WebGL creations with district peers.</p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-700">Showcase Your Project</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Game Title"
                      value={gameTitle}
                      onChange={(e) => setGameTitle(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                    <input
                      type="url"
                      placeholder="Project URL (Scratch/Replit link)"
                      value={gameLink}
                      onChange={(e) => setGameLink(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Short Description"
                      value={gameDesc}
                      onChange={(e) => setGameDesc(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (gameTitle && gameLink) {
                        setArcadeGames([
                          ...arcadeGames,
                          { id: Date.now(), author: currentUser?.studentName || currentUser?.username || 'Student', title: gameTitle, link: gameLink, description: gameDesc || 'Student created game.' }
                        ]);
                        setGameTitle('');
                        setGameLink('');
                        setGameDesc('');
                      }
                    }}
                    className="bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg"
                  >
                    Publish Project Link
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arcadeGames.map((game) => (
                  <div key={game.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Gamepad2 className="w-8 h-8 text-purple-600 shrink-0" />
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">{game.title}</h3>
                          <p className="text-xs text-slate-400">Created by: <strong>{game.author}</strong></p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">{game.description}</p>
                    <a
                      href={game.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Play / Launch Project <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}









