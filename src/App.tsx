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
  Calendar,
  AlertTriangle,
  Flag,
  Lock,
  Clock,
  Volume2,
  Check,
  Bell,
  CheckSquare,
  Info
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
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
  aqiSource: string;
  aqiUpdatedAt: string;
  trafficAlert: string | null;
}

interface KernOpportunity {
  id: number;
  name: string;
  category: string;
  eventDate: string;
  deadline: string;
  eligibleGrades: string;
  location: string;
  officialSourceUrl: string;
  verifiedOn: string;
}

interface UserAccount {
  username: string;
  studentName: string;
  role: 'Student' | 'Teacher';
  code: string;
  joinedBuddies: Array<{ name: string; code: string; role: string }>;
  isVerifiedTeacher?: boolean;
}

interface ForumQuestion {
  id: number;
  student: string;
  subject: string;
  question: string;
  answers: string[];
  status: 'Approved' | 'Pending Review' | 'Flagged';
}

interface ScienceProject {
  id: number;
  title: string;
  hypothesis: string;
  independentVariable: string;
  dependentVariable: string;
  controlGroup: string;
  dataPoints: Array<{ trial: number; value: string }>;
  milestones: Array<{ id: number; title: string; completed: boolean; mentorFeedback: string }>;
}

interface ArcadeGame {
  id: number;
  author: string;
  title: string;
  link: string;
  description: string;
  status: 'Approved' | 'Pending Review' | 'Rejected';
  feedback: string[];
}

// ==========================================
// APPROVED CREATOR ARCADE DOMAINS
// ==========================================
const APPROVED_DOMAINS = ['scratch.mit.edu', 'github.com', 'replit.com'];

const isUrlApproved = (url: string): boolean => {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return APPROVED_DOMAINS.some(domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
};

// ==========================================
// PROFANITY & PII SAFETY FILTER
// ==========================================
const BLOCKED_WORDS = ['badword', 'stupid', 'hate', 'dumb', 'fool'];
const PII_REGEX = /(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/g;

const sanitizeContent = (text: string): { cleanText: string; isSafe: boolean; warning: string | null } => {
  let isSafe = true;
  let warning: string | null = null;
  let cleanText = text;

  if (PII_REGEX.test(text)) {
    isSafe = false;
    warning = 'Personal information (phone numbers or emails) is strictly prohibited.';
    cleanText = cleanText.replace(PII_REGEX, '[REDACTED PII]');
  }

  BLOCKED_WORDS.forEach(word => {
    const reg = new RegExp(`\\b${word}\\b`, 'gi');
    if (reg.test(cleanText)) {
      isSafe = false;
      warning = 'Contains prohibited or inappropriate language.';
      cleanText = cleanText.replace(reg, '****');
    }
  });

  return { cleanText, isSafe, warning };
};

const formatFirstAndLastInitial = (fullName: string): string => {
  const parts = fullName.trim().split(' ');
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
};

// ==========================================
// LOCATION & DISTRICT DATA
// ==========================================
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
    eventsUrl: 'https://kern.org/student-events/',
    aqiSource: 'San Joaquin Valley Air Pollution Control District Feeds',
    aqiUpdatedAt: 'Today, 1:15 PM PDT',
    trafficAlert: 'Caltrans Advisory: Minor construction delays on CA-99 near SR-58.'
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
    eventsUrl: 'https://kern.org/student-events/',
    aqiSource: 'San Joaquin Valley Air Pollution Control District Feeds',
    aqiUpdatedAt: 'Today, 1:10 PM PDT',
    trafficAlert: 'Flowing smoothly on Stockdale Hwy & Westside Pkwy.'
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
    eventsUrl: 'https://www.fcoe.org/',
    aqiSource: 'Fresno Unified Air Feeds',
    aqiUpdatedAt: 'Today, 1:00 PM PDT',
    trafficAlert: 'Heavy congestion reported on CA-41 North.'
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
    eventsUrl: 'https://www.sjcoe.org/services-and-support/studentevents',
    aqiSource: 'San Joaquin Air District Feeds',
    aqiUpdatedAt: 'Today, 1:12 PM PDT',
    trafficAlert: 'Patchy fog advisory on I-5 South.'
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
    eventsUrl: 'https://www.stancoe.org/',
    aqiSource: 'Stanislaus County Environmental API',
    aqiUpdatedAt: 'Today, 1:05 PM PDT',
    trafficAlert: 'Normal traffic flow on Hwy 99.'
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
  eventsUrl: 'https://kern.org/student-events/',
  aqiSource: 'Official Valley Weather Feed',
  aqiUpdatedAt: 'Today, 1:00 PM PDT',
  trafficAlert: 'Normal road traffic conditions.'
};

// ==========================================
// KERN COUNTY OPPORTUNITIES (ACTIONABLE DATA)
// ==========================================
const KERN_OPPORTUNITIES: KernOpportunity[] = [
  {
    id: 1,
    name: 'Kern County Regional Science Fair',
    category: 'Science & Engineering',
    eventDate: 'March 18, 2027',
    deadline: 'February 15, 2027',
    eligibleGrades: 'Grades 4–12',
    location: 'Mechanics Bank Convention Center, Bakersfield',
    officialSourceUrl: 'https://kern.org/student-events/science-fair/',
    verifiedOn: 'October 1, 2026'
  },
  {
    id: 2,
    name: 'Kern Codes: Skoolcade Game Development',
    category: 'Coding & Tech',
    eventDate: 'April 24, 2027',
    deadline: 'March 30, 2027',
    eligibleGrades: 'Grades 6–12',
    location: 'Kern County Superintendent of Schools (KCSOS)',
    officialSourceUrl: 'https://kern.org/student-events/skoolcade/',
    verifiedOn: 'October 2, 2026'
  },
  {
    id: 3,
    name: 'Kern STEAM Olympiad Competition',
    category: 'STEAM',
    eventDate: 'May 8, 2027',
    deadline: 'April 10, 2027',
    eligibleGrades: 'Grades 6–8',
    location: 'Liberty High School, Bakersfield',
    officialSourceUrl: 'https://kern.org/student-events/steam-olympiad/',
    verifiedOn: 'October 4, 2026'
  },
  {
    id: 4,
    name: 'Bank of America Speech & Essay Contest',
    category: 'Language Arts',
    eventDate: 'February 12, 2027',
    deadline: 'January 15, 2027',
    eligibleGrades: 'Grades 7–12',
    location: 'Kern County Museum, Bakersfield',
    officialSourceUrl: 'https://kern.org/student-events/essay-contest/',
    verifiedOn: 'September 28, 2026'
  }
];

// ==========================================
// WORLD WINDOW PRACTICE DATA
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
      scenario: 'Ordering Food at a Local Cafe in Bakersfield',
      phrases: [
        { original: 'Hola, ¿puedo pedir un café?', translation: 'Hello, can I order a coffee?', phonetic: 'OH-lah, pway-doo peh-DEER oon kah-FEH' },
        { original: 'Por favor y gracias.', translation: 'Please and thank you.', phonetic: 'por fah-VOR ee GRAH-syahs' }
      ],
      dialogue: { speakerA: '¡Buenos días! ¿Qué desea ordenar?', speakerB: 'Un jugo de naranja, por favor.', translation: 'Good morning! What would you like to order? / An orange juice, please.' },
      travelTip: 'In the Central Valley, greeting standardly with "Buenos días" reflects local community respect.'
    },
    Moderate: {
      scenario: 'Asking for Directions in the Central Valley',
      phrases: [
        { original: 'Disculpe, ¿dónde está la biblioteca más cercana?', translation: 'Excuse me, where is the nearest library?', phonetic: 'dees-KOOL-peh, DON-deh ehs-TAH' }
      ],
      dialogue: { speakerA: '¿Sabe a qué hora abre la biblioteca?', speakerB: 'Abre a las nueve de la mañana.', translation: 'Do you know what time the library opens? / It opens at nine in the morning.' },
      travelTip: 'When traveling between Valley cities, ask for landmarks like public parks or transit hubs.'
    },
    Expert: {
      scenario: 'Debating Environmental Topics in Agriculture',
      phrases: [
        { original: 'Es fundamental reducir las emisiones y conservar el agua en el Valle.', translation: 'It is essential to reduce emissions and conserve water in the Valley.', phonetic: 'ehs foon-dah-men-TAL' }
      ],
      dialogue: { speakerA: '¿Cuál es la solución para la calidad del aire?', speakerB: 'Invertir en energías renovables y transporte limpio.', translation: 'What is the solution for air quality? / Invest in renewable energy and clean transport.' },
      travelTip: 'Academic Spanish uses subjunctive structures to debate agricultural policy.'
    }
  },
  French: {
    Beginner: {
      scenario: 'Greeting Peers in Class',
      phrases: [
        { original: 'Bonjour, comment allez-vous?', translation: 'Hello, how are you?', phonetic: 'bon-ZHOOR, koh-mohn tah-lay VOO' }
      ],
      dialogue: { speakerA: 'Bonjour! Je m’appelle Pierre.', speakerB: 'Enchanté Pierre, je suis Marie.', translation: 'Hello! My name is Pierre. / Nice to meet you Pierre, I am Marie.' },
      travelTip: 'Always say "Bonjour" when entering any room or shop.'
    },
    Moderate: {
      scenario: 'Visiting a Science Museum',
      phrases: [
        { original: 'Où se trouve la billetterie, s’il vous plaît?', translation: 'Where is the ticket office, please?', phonetic: 'oo suh TROO-vuh lah bee-yeh-TREE' }
      ],
      dialogue: { speakerA: 'Avez-vous des tarifs étudiants?', speakerB: 'Oui, sur présentation de la carte.', translation: 'Do you have student rates? / Yes, upon showing your student card.' },
      travelTip: 'Many science centers offer student discounts with valid school ID.'
    },
    Expert: {
      scenario: 'Discussing Technological Innovation',
      phrases: [
        { original: 'Les technologies vertes transforment notre avenir.', translation: 'Green technologies are transforming our future.', phonetic: 'lay teck-noh-loh-ZHEE' }
      ],
      dialogue: { speakerA: 'Que pensez-vous du développement durable?', speakerB: 'C’est une priorité absolue pour les villes modernisées.', translation: 'What do you think of sustainable development? / It is an absolute priority for modernized cities.' },
      travelTip: 'Formal discussions in French emphasize precise technical terminology.'
    }
  },
  Arabic: {
    Beginner: {
      scenario: 'Simple Daily Greetings',
      phrases: [
        { original: 'مرحباً، كيف حالك؟ (Marhaban, kayfa halak?)', translation: 'Hello, how are you?', phonetic: 'mar-ha-ban kay-fa ha-lak' }
      ],
      dialogue: { speakerA: 'أهلاً وسهلاً! (Ahlan wa sahlan!)', speakerB: 'شكراً جزيلاً! (Shukran jazeelan!)', translation: 'Welcome! / Thank you very much!' },
      travelTip: 'Placing your hand over your heart after greeting is a sign of warmth.'
    },
    Moderate: {
      scenario: 'Asking About School Schedules',
      phrases: [
        { original: 'متى تبدأ الحصة القادمة؟ (Mata tabda al-hissa?)', translation: 'When does the next class start?', phonetic: 'ma-ta tab-da' }
      ],
      dialogue: { speakerA: 'الحصة تبدأ في الساعة العاشرة.', speakerB: 'ممتاز، شكراً لك.', translation: 'Class starts at ten oclock. / Excellent, thank you.' },
      travelTip: 'Using polite forms with teachers and mentors is standard in Arabic-speaking communities.'
    },
    Expert: {
      scenario: 'Academic Exchange on History and Science',
      phrases: [
        { original: 'تعتبر العلوم أساس التطور الحضاري. (Tu’tabar al-uloom asas...)', translation: 'Sciences are considered the foundation of civilization progress.', phonetic: 'tu-ta-bar al-u-loom' }
      ],
      dialogue: { speakerA: 'كيف أثرت التكنولوجيا الحديثة؟', speakerB: 'لقد ساهمت في تسهيل الوصول للمعلومات.', translation: 'How did modern tech affect us? / It contributed to simplifying access to information.' },
      travelTip: 'Formal Arabic (Fusha) is widely understood across all regions.'
    }
  },
  Japanese: {
    Beginner: {
      scenario: 'Polite Expressions in Class',
      phrases: [
        { original: 'こんにちは、はじめまして。 (Konnichiwa, hajimemashite.)', translation: 'Hello, nice to meet you.', phonetic: 'kon-nee-chee-wah ha-jee-meh-mah-shee-teh' }
      ],
      dialogue: { speakerA: 'すみません、質問があります。', speakerB: 'はい、なんですか？', translation: 'Excuse me, I have a question. / Yes, what is it?' },
      travelTip: 'Bowing slightly when expressing gratitude shows respectful etiquette.'
    },
    Moderate: {
      scenario: 'Navigating Campus Activities',
      phrases: [
        { original: '図書室はどこですか？ (Toshoshitsu wa doko desu ka?)', translation: 'Where is the library room?', phonetic: 'toh-shoh-shee-tsu wah doh-koh' }
      ],
      dialogue: { speakerA: '科学部は何時に始まりますか？', speakerB: '午後四時に始まります。', translation: 'What time does science club start? / It starts at 4 PM.' },
      travelTip: 'Punctuality is essential for group study meetings.'
    },
    Expert: {
      scenario: 'Discussing Robotics and Engineering',
      phrases: [
        { original: 'ロボット工学の未来について議論しましょう。', translation: 'Let us discuss the future of robotics engineering.', phonetic: 'ro-bot-to kou-ga-ku' }
      ],
      dialogue: { speakerA: 'AI技術の利点は何ですか？', speakerB: '効率性と正確性の向上です。', translation: 'What is the advantage of AI tech? / Improvement in efficiency and accuracy.' },
      travelTip: 'Keigo (formal speech) is preferred when talking to instructors or judges.'
    }
  },
  Hindi: {
    Beginner: {
      scenario: 'Friendly Greetings',
      phrases: [
        { original: 'नमस्ते! आप कैसे हैं? (Namaste! Aap kaise hain?)', translation: 'Hello! How are you?', phonetic: 'nah-mas-TEH aape kai-SEH hain' }
      ],
      dialogue: { speakerA: 'मेरा नाम राहुल है। (Mera naam Rahul hai.)', speakerB: 'आपसे मिलकर खुशी हुई। (Aapse milkar khushi hui.)', translation: 'My name is Rahul. / Nice to meet you.' },
      travelTip: 'Joining hands in "Namaste" is a traditional greeting.'
    },
    Moderate: {
      scenario: 'Ordering Healthy Meals',
      phrases: [
        { original: 'क्या आपके पास शाकाहारी खाना है? (Kya aapke paas shakahari khana hai?)', translation: 'Do you have vegetarian food?', phonetic: 'kya aap-ke paas sha-ka-ha-ree' }
      ],
      dialogue: { speakerA: 'आज का विशेष भोजन क्या है?', speakerB: 'आज ताज़ा फल और दाल बढ़िया हैं।', translation: 'What is special today? / Fresh fruits and lentils are great today.' },
      travelTip: 'Central Valley has many rich cultural restaurants offering authentic vegetarian options.'
    },
    Expert: {
      scenario: 'Discussing Environmental Conservation',
      phrases: [
        { original: 'पर्यावरण संरक्षण हमारी मुख्य जिम्मेदारी है।', translation: 'Environmental protection is our main responsibility.', phonetic: 'par-ya-va-ran sa-rak-shan' }
      ],
      dialogue: { speakerA: 'जल संरक्षण क्यों आवश्यक है?', speakerB: 'क्योंकि कृषि और जीवन इसके बिना असंभव हैं।', translation: 'Why is water conservation necessary? / Because farming and life are impossible without it.' },
      travelTip: 'Use formal terms like "Aap" when addressing teachers or community leaders.'
    }
  }
};

// ==========================================
// EXTENDED BOOK DATABASE
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
  { id: 1, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', ageCategory: 'Ages 2–5', genre: "Children's Picture Book / STEM", description: 'A classic picture book about life cycles and a caterpillar eating through the week.' },
  { id: 2, title: 'Goodnight Moon', author: 'Margaret Wise Brown', ageCategory: 'Ages 2–5', genre: "Bedtime Classic", description: 'A gentle rhyming story saying goodnight to everything in the room.' },
  { id: 3, title: 'Ada Twist, Scientist', author: 'Andrea Beaty', ageCategory: 'Ages 2–5', genre: "STEM & Science", description: 'A curious young girl asks questions and conducts fun scientific experiments.' },
  { id: 14, title: 'Dinosaurs Before Dark', author: 'Mary Pope Osborne', ageCategory: 'Ages 6–8', genre: "Fantasy & STEM", description: 'Jack and Annie travel through time to study prehistoric dinosaurs.' },
  { id: 16, title: 'Dragons and Marshmallows', author: 'Asia Citro', ageCategory: 'Ages 6–8', genre: "STEM & Fantasy", description: 'Zoey uses the scientific method to heal sick magical creatures.' },
  { id: 24, title: 'The Most Magnificent Thing', author: 'Ashley Spires', ageCategory: 'Ages 6–8', genre: "STEM & Innovation", description: 'A young maker learns perseverance and engineering design principles.' },
  { id: 28, title: 'A Wrinkle in Time', author: 'Madeleine L\'Engle', ageCategory: 'Ages 9–12', genre: 'Sci-Fi Fantasy & STEM', description: 'Meg Murry travels through quantum space to save her scientist father.' },
  { id: 29, title: 'Hidden Figures (Young Readers)', author: 'Margot Lee Shetterly', ageCategory: 'Ages 9–12', genre: 'STEM & Non-Fiction', description: 'The incredible story of female African American NASA mathematicians.' },
  { id: 35, title: 'The Wild Robot', author: 'Peter Brown', ageCategory: 'Ages 9–12', genre: 'STEM & Sci-Fi Fantasy', description: 'A robot stranded on a wild island learns robotics and nature survival.' },
  { id: 41, title: 'Cinder (The Lunar Chronicles)', author: 'Marissa Meyer', ageCategory: 'Ages 13–18', genre: 'Fantasy & STEM Sci-Fi', description: 'A gifted mechanic cyborg in New Beijing becomes embroiled in an intergalactic war.' },
  { id: 45, title: 'Firekeeper’s Daughter', author: 'Angeline Boulley', ageCategory: 'Ages 13–18', genre: 'STEM & Mystery Thriller', description: 'An Ojibwe teen uses chemistry knowledge to protect her Native reservation.' },
  { id: 48, title: 'The Martian (Classroom Edition)', author: 'Andy Weir', ageCategory: 'Ages 13–18', genre: 'STEM & Sci-Fi', description: 'An astronaut stranded on Mars uses botanical and engineering math to stay alive.' }
];

export default function App() {
  // Auth & User State
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginRole, setLoginRole] = useState<'Student' | 'Teacher'>('Student');
  const [studentNameInput, setStudentNameInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // App Navigation
  const [activeTab, setActiveTab] = useState<string>('Safe-Day Dashboard');
  const [zipCode, setZipCode] = useState<string>('93301');
  const [safetyNotice, setSafetyNotice] = useState<string | null>(null);

  // Wellbeing State
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

  // Study Group State
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [inviteStatusMsg, setInviteStatusMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Study Buddy Moderated Questions State
  const [homeworkQuestions, setHomeworkQuestions] = useState<ForumQuestion[]>([
    { id: 1, student: 'Pradeep T.', subject: 'Algebra II', question: 'How do you factor quadratic equations with leading coefficients greater than 1?', answers: ['Use the AC method: multiply A*C and find factors that add to B!'], status: 'Approved' },
    { id: 2, student: 'Elena R.', subject: 'Chemistry', question: 'What is the balanced equation for cellular respiration?', answers: ['C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP!'], status: 'Approved' }
  ]);
  const [newSubject, setNewSubject] = useState('Math');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [replyText, setReplyText] = useState<Record<number, string>>({});

  // Science-Fair Coach State
  const [scienceProject, setScienceProject] = useState<ScienceProject>({
    id: 101,
    title: 'Central Valley Soil Salinity Impact on Seed Germination',
    hypothesis: 'Higher salt concentrations in soil will decrease lettuce seed germination rate by over 40%.',
    independentVariable: 'Soil Salinity Level (0%, 1%, 3%, 5% Salt Solution)',
    dependentVariable: 'Germination Rate (% of seeds sprouted after 7 days)',
    controlGroup: 'Pot treated with pure distilled water (0% salt)',
    dataPoints: [
      { trial: 1, value: '0% Salt: 10/10 Sprouted (100%)' },
      { trial: 2, value: '1% Salt: 8/10 Sprouted (80%)' },
      { trial: 3, value: '3% Salt: 4/10 Sprouted (40%)' },
      { trial: 4, value: '5% Salt: 1/10 Sprouted (10%)' }
    ],
    milestones: [
      { id: 1, title: 'Problem Statement & Hypothesis', completed: true, mentorFeedback: 'Excellent hypothesis. Variables are clearly defined.' },
      { id: 2, title: 'Experimental Controls & Data Table Verification', completed: true, mentorFeedback: 'Control group looks correct. Ensure sample sizes remain consistent.' },
      { id: 3, title: 'Tri-Fold Display Board Layout Prep', completed: false, mentorFeedback: 'Follow Kern Regional Science Fair layout guidelines.' }
    ]
  });
  const [newFeedbackInput, setNewFeedbackInput] = useState('');
  const [newDataValue, setNewDataValue] = useState('');

  // Reading Tracker State
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All Ages');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [searchBookTerm, setSearchBookTerm] = useState<string>('');
  const [booksReadCount, setBooksReadCount] = useState<number>(3);
  const [readingMinutes, setReadingMinutes] = useState<number>(145);
  const [readingGoalMins, setReadingGoalMins] = useState<number>(200);

  // STEM Board Reminders State
  const [reminders, setReminders] = useState<number[]>([]);

  // World Window State
  const [selectedLang, setSelectedLang] = useState<Language>('Spanish');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('Beginner');

  // Creator Arcade State
  const [arcadeGames, setArcadeGames] = useState<ArcadeGame[]>([
    { id: 1, author: 'Alex M.', title: 'Solar System Simulator', link: 'https://scratch.mit.edu', description: 'Interactive 3D planetary motion model.', status: 'Approved', feedback: ['Great physics simulation!'] },
    { id: 2, author: 'Sarah P.', title: 'Central Valley Water Run', link: 'https://replit.com', description: 'Python arcade game teaching water conservation.', status: 'Approved', feedback: ['Very creative gameplay.'] }
  ]);
  const [gameTitle, setGameTitle] = useState('');
  const [gameLink, setGameLink] = useState('');
  const [gameDesc, setGameDesc] = useState('');
  const [peerFeedbackText, setPeerFeedbackText] = useState<Record<number, string>>({});

  const currentLocation = CENTRAL_VALLEY_DATA[zipCode] || DEFAULT_LOCATION;

  // Judge Demo Trigger
  const handleTriggerJudgeDemo = () => {
    const demoUser: UserAccount = {
      username: 'judge_demo',
      studentName: 'Judge Evaluator',
      role: 'Teacher',
      code: 'CV-999000',
      joinedBuddies: [{ name: 'Alex M.', code: 'CV-102938', role: 'Student' }],
      isVerifiedTeacher: true
    };
    setCurrentUser(demoUser);
    setIsLoggedIn(true);
    setSafetyNotice('Logged in under One-Click Judge Demo mode. Full teacher privileges & sample data active.');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput) return;

    const formattedName = studentNameInput ? formatFirstAndLastInitial(studentNameInput) : usernameInput;
    const newAccount: UserAccount = {
      username: usernameInput,
      studentName: formattedName,
      role: loginRole,
      code: 'CV-' + Math.floor(100000 + Math.random() * 900000).toString(),
      joinedBuddies: [],
      isVerifiedTeacher: loginRole === 'Teacher'
    };

    setCurrentUser(newAccount);
    setIsLoggedIn(true);
  };

  const handleAddCodeBuddy = () => {
    if (!inviteCodeInput || !currentUser) return;
    const cleanInput = inviteCodeInput.trim().toUpperCase();

    if (cleanInput === currentUser.code) {
      setInviteStatusMsg({ text: 'You cannot enter your own class code!', success: false });
      return;
    }

    const newBuddy = { name: `Student (${cleanInput})`, code: cleanInput, role: 'Peer' };
    setCurrentUser({
      ...currentUser,
      joinedBuddies: [...currentUser.joinedBuddies, newBuddy]
    });
    setInviteStatusMsg({ text: `Joined group with code ${cleanInput}!`, success: true });
    setInviteCodeInput('');
  };

  const handlePostQuestion = () => {
    if (!newQuestionText) return;
    const check = sanitizeContent(newQuestionText);

    if (!check.isSafe) {
      setSafetyNotice(`Content Filter Triggered: ${check.warning}`);
      return;
    }

    const newQ: ForumQuestion = {
      id: Date.now(),
      student: currentUser?.studentName || 'Student',
      subject: newSubject,
      question: check.cleanText,
      answers: [],
      status: 'Pending Review'
    };

    setHomeworkQuestions([newQ, ...homeworkQuestions]);
    setNewQuestionText('');
    setSafetyNotice('Question submitted! Sent to Teacher Review Queue for moderation.');
  };

  const handlePublishArcadeProject = () => {
    if (!gameTitle || !gameLink) return;

    if (!isUrlApproved(gameLink)) {
      setSafetyNotice('Security Control: Link rejected! Creator Arcade permits only Scratch (scratch.mit.edu), GitHub (github.com), or Replit (replit.com) URLs.');
      return;
    }

    const check = sanitizeContent(gameTitle + ' ' + gameDesc);
    if (!check.isSafe) {
      setSafetyNotice(`Safety Filter Block: ${check.warning}`);
      return;
    }

    const newGame: ArcadeGame = {
      id: Date.now(),
      author: currentUser?.studentName || 'Student',
      title: gameTitle,
      link: gameLink,
      description: gameDesc,
      status: 'Pending Review',
      feedback: []
    };

    setArcadeGames([newGame, ...arcadeGames]);
    setGameTitle('');
    setGameLink('');
    setGameDesc('');
    setSafetyNotice('Project submitted for Teacher Review before publication.');
  };

  const toggleReminder = (id: number) => {
    if (reminders.includes(id)) {
      setReminders(reminders.filter(r => r !== id));
    } else {
      setReminders([...reminders, id]);
    }
  };

  const filteredBooks = EXTENDED_BOOKS_DATABASE.filter((book) => {
    const matchesAge = selectedAgeGroup === 'All Ages' || book.ageCategory === selectedAgeGroup;
    const matchesGenre = selectedGenre === 'All Genres' || book.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesSearch = book.title.toLowerCase().includes(searchBookTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchBookTerm.toLowerCase());
    return matchesAge && matchesGenre && matchesSearch;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b1329] flex items-center justify-center p-4 text-white font-sans">
        <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-blue-600/20 text-blue-400 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center border border-blue-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ValleyQuest Hub</h1>
            <p className="text-xs text-slate-400">
              A safety & opportunity companion for Central Valley students
            </p>
          </div>

          <div className="bg-blue-900/40 border border-blue-500/50 p-4 rounded-xl text-center space-y-2">
            <p className="text-xs text-blue-200 font-semibold">Judging or Reviewing?</p>
            <button
              onClick={handleTriggerJudgeDemo}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" /> Try Judge Demo — No Account Required
            </button>
            <p className="text-[10px] text-slate-400">Preloaded with weather feeds, science project, goals & events</p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[11px] font-semibold uppercase">Or Sign In</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="grid grid-cols-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${authMode === 'signin' ? 'bg-[#2563eb] text-white' : 'text-slate-400'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${authMode === 'signup' ? 'bg-[#2563eb] text-white' : 'text-slate-400'}`}
              >
                Create Account
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {authMode === 'signup' ? 'Full Name (Auto-formatted to First & Last Initial)' : 'Username'}
              </label>
              <input
                type="text"
                placeholder={authMode === 'signup' ? 'e.g. Maria Garcia' : 'e.g. mgarcia'}
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Role Selection</label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Student">Student (Protected Minor Mode)</option>
                <option value="Teacher">Teacher / Mentor (Requires Verification)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In to Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Safe-Day Dashboard', icon: Shield },
    { name: 'Join Class or Study Group', icon: Users },
    { name: 'Activity & Wellbeing', icon: Heart },
    { name: 'Study Buddy', icon: MessageSquare },
    { name: 'Reading Tracker', icon: BookOpen },
    { name: 'STEM Opportunities Board', icon: Award },
    { name: 'Science-Fair Coach', icon: FlaskConical },
    { name: 'World Window', icon: Globe },
    { name: 'Creator Arcade', icon: Gamepad2 },
    { name: 'Safety & Parent Info', icon: Lock }
  ];

  return (
    <div className="flex h-screen bg-[#f0f4f8] text-slate-800 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b1329] text-white flex flex-col shrink-0 justify-between py-6">
        <div className="space-y-6">
          <div className="px-6 flex items-center justify-between">
            <span className="font-bold text-sm text-blue-400 tracking-wider uppercase">ValleyQuest</span>
            <span className="text-[10px] bg-blue-900 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
              {currentUser?.role}
            </span>
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
            <p className="font-semibold text-white truncate">{currentUser?.studentName}</p>
            <p className="text-blue-400 font-mono text-[11px]">Class Code: {currentUser?.code}</p>
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

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-[#0b1329] border-b border-slate-800 px-8 py-3 flex items-center justify-between gap-4 text-xs text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-500" />
            <span className="font-medium text-slate-300">Central Valley Zip Selector:</span>
            <select
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="bg-[#1e293b] border border-slate-700 text-white rounded-lg px-3 py-1 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="93301">Bakersfield (Kern) - 93301</option>
              <option value="93311">SW Bakersfield (Kern) - 93311</option>
              <option value="93721">Fresno (Fresno) - 93721</option>
              <option value="95202">Stockton (San Joaquin) - 95202</option>
              <option value="95350">Modesto (Stanislaus) - 95350</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Child Safety Shield Active
            </span>
            <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full font-semibold border border-blue-500/40">
              {currentLocation.district}
            </span>
          </div>
        </header>

        {safetyNotice && (
          <div className="bg-amber-500 text-white text-xs px-6 py-2.5 flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{safetyNotice}</span>
            </div>
            <button onClick={() => setSafetyNotice(null)} className="underline text-amber-100 hover:text-white">Dismiss</button>
          </div>
        )}

        <main className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Core App Purpose Banner */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                {currentLocation.community} ({zipCode}) • {currentLocation.county}
              </p>
              <h1 className="text-xl font-bold text-slate-900">
                ValleyQuest: Student Safety & Opportunity Companion
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Helping Central Valley students decide how to prepare for the day, stay healthy, and discover local learning opportunities.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400">CLASS GROUP CODE</span>
              <p className="text-lg font-mono font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                {currentUser?.code}
              </p>
            </div>
          </div>

          {/* ========================================================
              MODULE 1: SAFE-DAY DASHBOARD
             ======================================================== */}
          {activeTab === 'Safe-Day Dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">Safe-Day Real-Time Environmental Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Real-time AQI & Weather Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${currentLocation.aqi > 100 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        <Wind className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase">Air Quality Index</span>
                        <h3 className="text-2xl font-extrabold text-slate-800">{currentLocation.aqi} AQI</h3>
                        <p className="text-xs font-medium text-slate-500">{currentLocation.aqiStatus}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-slate-800">{currentLocation.temp}</span>
                      <p className="text-[11px] text-slate-400">Current Temp</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 space-y-1">
                    <p><strong>Source Feed:</strong> {currentLocation.aqiSource}</p>
                    <p className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> <strong>Updated at:</strong> {currentLocation.aqiUpdatedAt}</p>
                    <p><strong>Current Location:</strong> {currentLocation.city}, {currentLocation.county}</p>
                    <a href={currentLocation.eventsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline pt-1">
                      Official Air Quality & Alert Feeds <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Local Traffic Alerts */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span>Caltrans Traffic & Commute Advisory</span>
                  </div>
                  <p className="text-xs text-slate-600 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    {currentLocation.trafficAlert}
                  </p>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <strong>Source:</strong> Caltrans District 6 Road Conditions • <strong>Updated:</strong> Today, 1:10 PM PDT
                  </div>
                </div>
              </div>

              {/* Personalized Advice Based on Outdoor Gear */}
              <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl p-6 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Glasses className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-sm">Personalized Daily Guidance & Outdoor Gear Advice</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                    <Sun className="w-6 h-6 text-amber-400 shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-white">Heat & Sun Protection</p>
                      <p className="text-slate-300">High temperatures expected. Limit continuous outdoor exposure during afternoon recess.</p>
                    </div>
                  </div>

                  {currentLocation.aqi > 100 && (
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-amber-500/40 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-amber-400 shrink-0" />
                      <div className="text-xs">
                        <p className="font-bold text-white">Outdoor Recess Mask</p>
                        <p className="text-slate-300">Elevated AQI level: N95 or indoor gym activities recommended.</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                    <Droplet className="w-6 h-6 text-blue-400 shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-white">Hydration Reminder</p>
                      <p className="text-slate-300">Bring a refillable water bottle to school today.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-xl border ${currentLocation.heatAlert ? 'bg-orange-50 border-orange-200 text-orange-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                    <Sun className="w-5 h-5 text-orange-500" />
                    <span>Official Excessive Heat Warning</span>
                  </div>
                  <p className="text-xs">{currentLocation.heatAlert || 'No active heat alerts for this zip code.'}</p>
                </div>

                <div className={`p-5 rounded-xl border ${currentLocation.fogAlert ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                    <CloudFog className="w-5 h-5 text-blue-500" />
                    <span>Dense Tule Fog Advisory</span>
                  </div>
                  <p className="text-xs">{currentLocation.fogAlert || 'Clear visibility reported on roadways.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 2: JOIN CLASS OR STUDY GROUP (RENAMED & RESTRICTED)
             ======================================================== */}
          {activeTab === 'Join Class or Study Group' && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <Users className="w-10 h-10 text-blue-600 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800">Join Class or Teacher Study Group</h2>
                <p className="text-xs text-slate-500">Unrestricted adult and peer connections are disabled. Join structured teacher-created groups using expiring class codes.</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-blue-700">Your Class Group Code:</p>
                <p className="text-2xl font-mono font-extrabold text-blue-900">{currentUser?.code}</p>
                <p className="text-[11px] text-blue-600">Rate-limited code (Expires automatically after 48 hours for student protection)</p>
              </div>

              {inviteStatusMsg && (
                <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${inviteStatusMsg.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  {inviteStatusMsg.text}
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-700">Enter Teacher Class Code or Group Code:</label>
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
                    Join Study Group
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-700">Joined Class Groups & Peers ({currentUser?.joinedBuddies.length || 0})</h3>
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
                  <p className="text-xs text-slate-400">No class groups joined yet. Enter a code above to join your teacher's study circle.</p>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 3: ACTIVITY & WELLBEING (PROTECTED MENTAL HEALTH RESOURCES)
             ======================================================== */}
          {activeTab === 'Activity & Wellbeing' && (
            <div className="space-y-6">
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
                  Water & Hydration
                </button>
                <button
                  onClick={() => setActiveWellbeingTab('mood')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeWellbeingTab === 'mood' ? 'bg-[#2563eb] text-white' : 'text-slate-600'}`}
                >
                  Private Reflection & Support
                </button>
              </div>

              {activeWellbeingTab === 'water' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-between">
                    <div className="space-y-3">
                      <Droplet className="w-8 h-8 text-blue-500 mx-auto" />
                      <h2 className="text-base font-bold text-slate-800">Valley Hydration Tracker</h2>
                      <div className="text-4xl font-extrabold text-blue-600">
                        {waterCount} <span className="text-slate-400 text-2xl font-normal">/ 8</span>
                      </div>
                      <p className="text-xs text-slate-400">Glasses of water (8 oz each)</p>
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
                      <p className="text-xs text-slate-400">Daily physical steps target</p>
                    </div>
                    <button onClick={() => setStepCount((s) => s + 500)} className="mt-6 bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-semibold">+ 500 Steps</button>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-between">
                    <div className="space-y-3">
                      <Activity className="w-8 h-8 text-rose-500 mx-auto" />
                      <h2 className="text-base font-bold text-slate-800">Movement Target</h2>
                      <div className="text-4xl font-extrabold text-rose-600">
                        {movementMins} <span className="text-slate-400 text-2xl font-normal">/ 60 mins</span>
                      </div>
                      <p className="text-xs text-slate-400">Outdoor exercise mins</p>
                    </div>
                    <button onClick={() => setMovementMins((m) => m + 10)} className="mt-6 bg-rose-600 text-white text-xs px-4 py-2 rounded-lg font-semibold">+ 10 Mins</button>
                  </div>
                </div>
              )}

              {activeWellbeingTab === 'planner' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Scheduled Daily Outdoor Activities</h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Activity Title (e.g. Track practice)"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Time (e.g. 4:30 PM)"
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
                      Add Activity
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
                <div className="space-y-6">
                  {/* Crisis & Professional Health Notice */}
                  <div className="bg-red-50 border border-red-300 text-red-900 p-5 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>Crisis Support & Mental Health Resources</span>
                    </div>
                    <p className="text-xs">
                      If you or a classmate are experiencing distress, support is available 24/7. Call or text <strong>988</strong> to reach the Suicide & Crisis Lifeline.
                    </p>
                    <p className="text-[11px] text-red-700 font-semibold italic border-t border-red-200 pt-2">
                      Disclaimer: ValleyQuest is an educational companion app and is not a replacement for professional mental-health care.
                    </p>
                  </div>

                  {/* Private Self-Reflection Card */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center max-w-xl mx-auto space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <h2 className="text-base font-bold text-slate-800">Private Reflection Journal</h2>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Strictly Private
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Public mood sharing is strictly prohibited on ValleyQuest to protect student privacy.</p>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {['Energized', 'Focused', 'Calm', 'Tired', 'Stressed', 'Motivated'].map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMood(m)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                            selectedMood === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODULE 4: STUDY BUDDY (MODERATED QUESTION HUB)
             ======================================================== */}
          {activeTab === 'Study Buddy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Study Buddy: Homework Help Hub</h2>
                    <p className="text-xs text-slate-500">Ask homework questions in a moderated student space. Direct private messaging is disabled for safety.</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> No Direct Messages Allowed
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-blue-600" /> Post Question to Teacher Review Queue
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
                      placeholder="Ask an academic question..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <button
                      onClick={handlePostQuestion}
                      className="bg-[#2563eb] text-white font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Questions Stream */}
              <div className="space-y-4">
                {homeworkQuestions.map((q) => (
                  <div key={q.id} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">{q.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {q.status}
                        </span>
                        <span className="text-slate-400">Asked by: <strong>{q.student}</strong></span>
                      </div>
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
                        placeholder="Write a helpful answer..."
                        value={replyText[q.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-1 text-xs"
                      />
                      <button
                        onClick={() => {
                          if (replyText[q.id]) {
                            const check = sanitizeContent(replyText[q.id]);
                            if (!check.isSafe) {
                              setSafetyNotice(`Reply blocked: ${check.warning}`);
                              return;
                            }
                            setHomeworkQuestions(
                              homeworkQuestions.map(item => item.id === q.id ? { ...item, answers: [...item.answers, `${currentUser?.studentName}: ${check.cleanText}`] } : item)
                            );
                            setReplyText({ ...replyText, [q.id]: '' });
                          }
                        }}
                        className="bg-slate-800 text-white text-xs px-3 py-1 rounded-lg font-semibold"
                      >
                        Answer
                      </button>
                      <button
                        onClick={() => setSafetyNotice(`Post #${q.id} flagged and reported to school safety administrator.`)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Report Inappropriate Post"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 5: READING TRACKER (PAGES, STREAKS & GOALS)
             ======================================================== */}
          {activeTab === 'Reading Tracker' && (
            <div className="space-y-6">
              {/* Reading Progress Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Books Completed</span>
                    <h3 className="text-2xl font-extrabold text-slate-800">{booksReadCount} Books</h3>
                  </div>
                  <button onClick={() => setBooksReadCount(c => c + 1)} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-bold border border-blue-200">+ Log Book</button>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Monthly Reading Goal</span>
                    <h3 className="text-2xl font-extrabold text-blue-600">{readingMinutes} / {readingGoalMins} mins</h3>
                  </div>
                  <button onClick={() => setReadingMinutes(m => m + 15)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">+ 15 Mins</button>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Reading Streak</span>
                    <h3 className="text-2xl font-extrabold text-amber-500">🔥 6 Days</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">Keep it up!</span>
                </div>
              </div>

              {/* Book Recommendation Filter */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="text-base font-bold text-slate-800">Curated Reading Recommendations</h2>
                  <div className="flex gap-2">
                    <select
                      value={selectedAgeGroup}
                      onChange={(e) => setSelectedAgeGroup(e.target.value)}
                      className="border border-slate-300 rounded-lg px-2 py-1 text-xs bg-white"
                    >
                      <option value="All Ages">All Ages</option>
                      <option value="Ages 2–5">Ages 2–5</option>
                      <option value="Ages 6–8">Ages 6–8</option>
                      <option value="Ages 9–12">Ages 9–12</option>
                      <option value="Ages 13–18">Ages 13–18</option>
                    </select>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="border border-slate-300 rounded-lg px-2 py-1 text-xs bg-white"
                    >
                      <option value="All Genres">All Genres</option>
                      <option value="STEM">STEM</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Classic">Classic</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="p-2.5 border border-slate-700">Title</th>
                        <th className="p-2.5 border border-slate-700">Author</th>
                        <th className="p-2.5 border border-slate-700">Target Age</th>
                        <th className="p-2.5 border border-slate-700">Genre</th>
                        <th className="p-2.5 border border-slate-700">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBooks.map((book) => (
                        <tr key={book.id} className="even:bg-slate-50 hover:bg-slate-100">
                          <td className="p-2.5 border border-slate-200 font-bold text-slate-900">{book.title}</td>
                          <td className="p-2.5 border border-slate-200 text-slate-600">{book.author}</td>
                          <td className="p-2.5 border border-slate-200">{book.ageCategory}</td>
                          <td className="p-2.5 border border-slate-200 text-slate-600 font-medium">{book.genre}</td>
                          <td className="p-2.5 border border-slate-200 text-slate-500 text-[11px]">{book.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 6: KERN COUNTY STEM OPPORTUNITIES BOARD (ACTIONABLE)
             ======================================================== */}
          {activeTab === 'STEM Opportunities Board' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-3">
                <h2 className="text-base font-bold text-slate-800">Kern County & Regional Student Opportunities Board</h2>
                <p className="text-xs text-slate-500">
                  Comprehensive local competitions with grade eligibility, deadlines, locations, and direct verified official links.
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#2563eb] text-white">
                      <th className="p-3 border border-blue-600">Event Name</th>
                      <th className="p-3 border border-blue-600">Category</th>
                      <th className="p-3 border border-blue-600">Application Deadline</th>
                      <th className="p-3 border border-blue-600">Event Date</th>
                      <th className="p-3 border border-blue-600">Eligible Grades</th>
                      <th className="p-3 border border-blue-600">Location</th>
                      <th className="p-3 border border-blue-600 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KERN_OPPORTUNITIES.map((opp) => (
                      <tr key={opp.id} className="even:bg-slate-50 hover:bg-slate-100 transition-colors">
                        <td className="p-3 border border-slate-200 font-bold text-slate-900">{opp.name}</td>
                        <td className="p-3 border border-slate-200">
                          <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold">{opp.category}</span>
                        </td>
                        <td className="p-3 border border-slate-200 font-bold text-red-600">{opp.deadline}</td>
                        <td className="p-3 border border-slate-200 font-semibold text-slate-700">{opp.eventDate}</td>
                        <td className="p-3 border border-slate-200 font-medium text-slate-600">{opp.eligibleGrades}</td>
                        <td className="p-3 border border-slate-200 text-slate-600">{opp.location}</td>
                        <td className="p-3 border border-slate-200 text-center space-y-1">
                          <a
                            href={opp.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-[11px] font-bold"
                          >
                            Source Link <ExternalLink className="w-3 h-3" />
                          </a>
                          <div>
                            <button
                              onClick={() => toggleReminder(opp.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                                reminders.includes(opp.id) ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-600'
                              }`}
                            >
                              {reminders.includes(opp.id) ? '✓ Reminder Set' : '+ Add Reminder'}
                            </button>
                          </div>
                          <p className="text-[9px] text-slate-400">Verified on {opp.verifiedOn}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 7: SCIENCE-FAIR COACH (FULL PROJECT HUB)
             ======================================================== */}
          {activeTab === 'Science-Fair Coach' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-slate-800">Science-Fair Project & Hypothesis Coach</h2>
                  <p className="text-xs text-slate-500">Formulate hypotheses, perform variable checks, maintain data tables, and receive mentor feedback.</p>
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                  Kern Regional Science Fair Ready
                </span>
              </div>

              {/* Project Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">{scienceProject.title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="block text-slate-700 mb-1">Independent Variable:</strong>
                    <span className="text-slate-600">{scienceProject.independentVariable}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="block text-slate-700 mb-1">Dependent Variable:</strong>
                    <span className="text-slate-600">{scienceProject.dependentVariable}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <strong className="block text-emerald-800 mb-1">Control Group Check:</strong>
                    <span className="text-emerald-700">{scienceProject.controlGroup}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                  <strong className="text-blue-900 block mb-1">Hypothesis Guidance Statement:</strong>
                  <p className="text-blue-800">{scienceProject.hypothesis}</p>
                </div>
              </div>

              {/* Data Table Logging */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-800">Experimental Data Table Logging</h3>
                <div className="space-y-2">
                  {scienceProject.dataPoints.map((dp, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Trial #{dp.trial}</span>
                      <span className="font-mono text-slate-800">{dp.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Enter trial result (e.g. 2% Salt: 6/10 Sprouted)..."
                    value={newDataValue}
                    onChange={(e) => setNewDataValue(e.target.value)}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <button
                    onClick={() => {
                      if (newDataValue) {
                        setScienceProject({
                          ...scienceProject,
                          dataPoints: [...scienceProject.dataPoints, { trial: scienceProject.dataPoints.length + 1, value: newDataValue }]
                        });
                        setNewDataValue('');
                      }
                    }}
                    className="bg-blue-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg"
                  >
                    + Add Data Point
                  </button>
                </div>
              </div>

              {/* Milestones & Teacher Feedback */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800">Milestones & Teacher Review Queue</h3>
                {scienceProject.milestones.map((m) => (
                  <div key={m.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{m.title}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {m.completed ? 'Verified' : 'In Review'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                      <strong>Teacher Feedback:</strong> {m.mentorFeedback}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 8: WORLD WINDOW (CENTRAL VALLEY LANGUAGE PRACTICE)
             ======================================================== */}
          {activeTab === 'World Window' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">World Window: Central Valley Languages & Cultural Practice</h2>
                    <p className="text-xs text-slate-500">Practice conversational scenarios connected to Central Valley cultures.</p>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    <Volume2 className="w-4 h-4" /> Recorded Pronunciation Active
                  </div>
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
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-blue-600 uppercase">{selectedLang} • {selectedLevel}</span>
                    <h3 className="text-lg font-bold text-slate-800">{WORLD_WINDOW_DATA[selectedLang][selectedLevel].scenario}</h3>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Key Phrases & Audio Guide</h4>
                    {WORLD_WINDOW_DATA[selectedLang][selectedLevel].phrases.map((p, idx) => (
                      <div key={idx} className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-blue-900 text-sm">{p.original}</p>
                          <button
                            onClick={() => {
                              const utterance = new SpeechSynthesisUtterance(p.original);
                              window.speechSynthesis.speak(utterance);
                            }}
                            className="bg-blue-600 text-white p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1"
                          >
                            <Volume2 className="w-3 h-3" /> Play Audio
                          </button>
                        </div>
                        <p className="text-slate-600">Translation: {p.translation}</p>
                        <p className="text-xs font-mono text-blue-700">Phonetic: [{p.phonetic}]</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <strong className="block font-bold">Central Valley Cultural Connection:</strong>
                      {WORLD_WINDOW_DATA[selectedLang][selectedLevel].travelTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODULE 9: CREATOR ARCADE (APPROVED DOMAINS ONLY)
             ======================================================== */}
          {activeTab === 'Creator Arcade' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Creator Arcade & Project Showcase</h2>
                    <p className="text-xs text-slate-500">
                      Submit Scratch, GitHub, or carefully reviewed Replit links for teacher moderation prior to publication.
                    </p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs px-3 py-1 rounded-full font-bold">
                    Approved Domains: Scratch • GitHub • Replit
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-700">Submit Project for Teacher Review</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={gameTitle}
                      onChange={(e) => setGameTitle(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                    <input
                      type="url"
                      placeholder="URL (scratch.mit.edu, github.com, replit.com)"
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
                    onClick={handlePublishArcadeProject}
                    className="bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg"
                  >
                    Submit Project
                  </button>
                </div>
              </div>

              {/* Showcase Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arcadeGames.map((game) => (
                  <div key={game.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{game.title}</h3>
                        <p className="text-xs text-slate-400">Author: <strong>{game.author}</strong></p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${game.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {game.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{game.description}</p>

                    <a
                      href={game.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Open Verified Project <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* Peer Feedback Prompt */}
                    <div className="border-t border-slate-100 pt-2 space-y-2">
                      <strong className="text-[11px] text-slate-700 block">Structured Peer Feedback:</strong>
                      {game.feedback.map((fb, idx) => (
                        <p key={idx} className="text-[11px] bg-slate-50 p-2 rounded text-slate-600">{fb}</p>
                      ))}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. What I liked most about your code was..."
                          value={peerFeedbackText[game.id] || ''}
                          onChange={(e) => setPeerFeedbackText({ ...peerFeedbackText, [game.id]: e.target.value })}
                          className="flex-1 border border-slate-200 rounded px-2 py-1 text-xs"
                        />
                        <button
                          onClick={() => {
                            if (peerFeedbackText[game.id]) {
                              const check = sanitizeContent(peerFeedbackText[game.id]);
                              if (!check.isSafe) {
                                setSafetyNotice(`Feedback blocked: ${check.warning}`);
                                return;
                              }
                              setArcadeGames(arcadeGames.map(g => g.id === game.id ? { ...g, feedback: [...g.feedback, `${currentUser?.studentName}: ${check.cleanText}`] } : g));
                              setPeerFeedbackText({ ...peerFeedbackText, [game.id]: '' });
                            }
                          }}
                          className="bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded font-bold"
                        >
                          Send Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 10: SAFETY, PRIVACY & PARENT INFORMATION
             ======================================================== */}
          {activeTab === 'Safety & Parent Info' && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 space-y-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">ValleyQuest Safety & Child Protection Architecture</h2>
                  <p className="text-xs text-slate-500">Engineered specifically for Central Valley students, schools, and parents.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Report, Block & Controls
                  </h3>
                  <p className="text-slate-600">Students and mentors can report posts or questions immediately. Automated filters block profane or PII content instantly.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Teacher Review Queue
                  </h3>
                  <p className="text-slate-600">Questions and external project submissions pass through a teacher moderation queue before public site display.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> First Name & Last Initial Formatting
                  </h3>
                  <p className="text-slate-600">Student full names are automatically truncated (e.g. Maria G.) to preserve individual privacy.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Private Direct Messages
                  </h3>
                  <p className="text-slate-600">Unmonitored 1-on-1 private messaging between students or unverified adults is prohibited.</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs">
                <h3 className="font-bold text-blue-900">Parent Data & Deletion Policy</h3>
                <p className="text-blue-800">
                  Parents have full rights to request data deletion, view connected class groups, or manage their child's account settings by contacting their school district administrator.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}











