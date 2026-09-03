export type Vec3 = [number, number, number]

export type DiseaseId =
  | 'chair'
  | 'turtle'
  | 'excel'
  | 'mouse'
  | 'deadline'
  | 'plague'

export type HighlightRegion =
  | 'lumbar'
  | 'cervical'
  | 'eyes'
  | 'wrist'
  | 'brain'
  | 'lungs'
  | 'system'

export type SlidePhoto = {
  src: string
  alt: string
}

export type Disease = {
  id: DiseaseId
  number: string
  emoji: string
  nickname: string
  realName: string
  realCondition: string
  region: HighlightRegion
  color: string
  anatomy: string
  anatomyDetail: string
  anatomyPhotos: SlidePhoto[]
  cause: string
  causeDetail: string
  causePhotos: SlidePhoto[]
  symptoms: string
  symptomList: string[]
  symptomPhotos: SlidePhoto[]
  prevention: string
  preventionList: string[]
  preventionPhotos: SlidePhoto[]
  diagnosis: string
  /** Orbit toward the front (+Z) or back (−Z) of the body, then zoom to the site. */
  focus: {
    facing: 'front' | 'back'
    distance: number
    /** Extra yaw in radians after facing (e.g. side angle for the wrist). */
    yaw?: number
  }
  hotspot: Vec3
}

function photos(
  id: DiseaseId,
  step: 'anatomy' | 'cause' | 'symptoms' | 'prevention',
  alts: [string, string],
  formats: [string, string] = ['png', 'png'],
): SlidePhoto[] {
  const base = import.meta.env.BASE_URL
  return [
    { src: `${base}images/${id}/${step}-1.${formats[0]}`, alt: alts[0] },
    { src: `${base}images/${id}/${step}-2.${formats[1]}`, alt: alts[1] },
  ]
}

export const OVERVIEW_CAMERA = {
  position: [1.65, 1.28, 3.55] as Vec3,
  target: [0, 0.92, 0] as Vec3,
}

export const DISEASES: Disease[] = [
  {
    id: 'chair',
    number: '01',
    emoji: '🪑',
    nickname: 'Chair Disease',
    realName: 'Low back pain',
    realCondition: 'Mechanical / nonspecific low back pain',
    region: 'lumbar',
    color: '#d06a3a',
    anatomy: 'lumbar spine + discs + facet joints + muscles',
    anatomyDetail:
      'Lumbar spine, intervertebral discs, facet joints, and the surrounding muscles and soft tissues.',
    anatomyPhotos: photos('chair', 'anatomy', [
      'Lumbar spine and lower back',
      'Soft tissues around the lower spine',
    ]),
    cause: 'prolonged sitting + poor posture + no movement',
    causeDetail:
      'Prolonged sitting, poor posture, insufficient movement, and muscle fatigue.',
    causePhotos: photos('chair', 'cause', [
      'Long hours sitting at a desk',
      'An office chair that holds too much of the day',
    ]),
    symptoms: 'aching + stiffness after sitting',
    symptomList: [
      'Lower-back aching',
      'Stiffness',
      'Pain after sitting for a long time',
    ],
    symptomPhotos: photos('chair', 'symptoms', [
      'Lower-back discomfort after sitting',
      'Cartoon: fused to the office chair',
    ]),
    prevention: 'movement + ergonomics + core strength',
    preventionList: [
      'Get up and move regularly<br>( 10 situp and scretch after 30 min of work )',
      'Adjust chair height and lumbar support',
      'Keep feet supported',
      'Strengthen core and back muscles',
      'Avoid staying in exactly the same position for hours',
    ],
    preventionPhotos: photos('chair', 'prevention', [
      'Standing and stretching during the day',
      'An ergonomic chair and desk setup',
    ]),
    diagnosis: "Your chair isn't attacking you. You're just giving it too much responsibility.",
    focus: { facing: 'back', distance: 1.28 },
    hotspot: [0.12, 1.02, -0.18],
  },
  {
    id: 'turtle',
    number: '02',
    emoji: '🐢',
    nickname: 'Turtle Neck',
    realName: 'Neck pain',
    realCondition: 'Mechanical neck pain',
    region: 'cervical',
    color: '#3ea89a',
    anatomy: 'cervical spine + neck muscles + trapezius',
    anatomyDetail:
      'Cervical spine, neck muscles, upper trapezius, and shoulders.',
    anatomyPhotos: photos('turtle', 'anatomy', [
      'Cervical spine and neck',
      'Upper trapezius and shoulders',
    ]),
    cause: 'looking down + forward-head posture',
    causeDetail:
      'Looking down at laptops and phones, forward-head posture, and a prolonged static position.',
    causePhotos: photos('turtle', 'cause', [
      'Forward-head posture at a laptop',
      'Looking down at a phone for too long',
    ]),
    symptoms: 'stiffness + shoulder tension + headache',
    symptomList: [
      'Neck stiffness',
      'Shoulder tension',
      'Headache',
      'Reduced range of motion',
    ],
    symptomPhotos: photos('turtle', 'symptoms', [
      'Neck and shoulder fatigue at the desk',
      'Cartoon: turtle neck at the laptop',
    ]),
    prevention: 'eye-level screen + alignment + breaks',
    preventionList: [
      'Raise the monitor to eye level',
      'Keep the head aligned over the shoulders',
      'Take movement breaks',
      'Stretch and strengthen neck and upper-back muscles',
    ],
    preventionPhotos: photos('turtle', 'prevention', [
      'Monitor raised to eye level',
      'A short neck-mobility break',
    ]),
    diagnosis: "Your monitor is on the desk. Your head doesn't need to join it.",
    focus: { facing: 'back', distance: 1.05 },
    hotspot: [0.08, 1.56, -0.14],
  },
  {
    id: 'excel',
    number: '03',
    emoji: '👀',
    nickname: 'Excel Eyes',
    realName: 'Digital eye strain',
    realCondition: 'Digital eye strain',
    region: 'eyes',
    color: '#6cb6e0',
    anatomy: 'eyes + tear film + extraocular muscles',
    anatomyDetail:
      'Eyes, tear film, extraocular muscles, and the visual system.',
    anatomyPhotos: photos('excel', 'anatomy', [
      'Eyes under screen light',
      'The visual system under load',
    ]),
    cause: 'screen time + less blinking + glare',
    causeDetail:
      'Prolonged screen use, reduced blinking, glare, and poor viewing distance.',
    causePhotos: photos('excel', 'cause', [
      'Long hours on bright monitors',
      'Screen glare on the desk',
    ]),
    symptoms: 'dryness + blur + headaches',
    symptomList: [
      'Dry or burning eyes',
      'Blurred vision',
      'Headaches',
      'Difficulty focusing',
    ],
    symptomPhotos: photos('excel', 'symptoms', [
      'Rubbing dry, tired eyes',
      'Cartoon: spreadsheet eyes from screen time',
    ]),
    prevention: '20-20-20 + blink + distance',
    preventionList: [
      'Follow the 20-20-20 rule<br><a href="https://www.mykidsvision.org/es-ES/knowledge-centre/all-about-the-20-20-20-rule-for-tackling-eye-strain">More information</a>',
      'Blink regularly',
      'Reduce glare',
      'Keep the monitor at a comfortable distance',
      'Adjust text size and brightness',
    ],
    preventionPhotos: photos('excel', 'prevention', [
      'Looking away from the screen for a break',
      'Comfortable monitor distance',
    ]),
    diagnosis: "If you close your eyes and still see Excel, it's time for a break.",
    focus: { facing: 'front', distance: 0.72 },
    hotspot: [0.06, 1.72, 0.16],
  },
  {
    id: 'mouse',
    number: '04',
    emoji: '🖱️',
    nickname: 'Mouse Hand',
    realName: 'Repetitive strain',
    realCondition: 'Repetitive strain injury / tendinopathy; sometimes carpal tunnel syndrome',
    region: 'wrist',
    color: '#e08a4a',
    anatomy: 'wrist + forearm tendons + median nerve',
    anatomyDetail:
      'Wrist, forearm tendons, and the median nerve as it passes through the carpal tunnel.',
    anatomyPhotos: photos('mouse', 'anatomy', [
      'Wrist and hand at rest',
      'Forearm tendons under load',
    ]),
    cause: 'repetitive clicking + awkward wrist + force',
    causeDetail:
      'Repetitive mouse and keyboard movements, awkward wrist position, and excessive force.',
    causePhotos: photos('mouse', 'cause', [
      'Tight grip on the mouse',
      'Repetitive typing with bent wrists',
    ]),
    symptoms: 'pain + numbness + tingling + weakness',
    symptomList: [
      'Wrist and hand pain',
      'Numbness',
      'Tingling',
      'Weakness',
    ],
    symptomPhotos: photos('mouse', 'symptoms', [
      'Wrist discomfort after clicking',
      'Cartoon: hand shaped like a mouse',
    ]),
    prevention: 'neutral wrist + lighter grip + shortcuts',
    preventionList: [
      'Keep the wrist in a neutral position',
      "Don't grip the mouse unnecessarily tightly",
      'Use keyboard shortcuts',
      'Change position regularly',
      'Take breaks from repetitive movements',
    ],
    preventionPhotos: photos('mouse', 'prevention', [
      'Neutral wrist with an ergonomic mouse',
      'A short hand stretch break',
    ]),
    diagnosis: 'You spend more time holding your mouse than holding your loved ones.',
    focus: { facing: 'front', distance: 0.95, yaw: 0.72 },
    hotspot: [0.46, 0.76, 0.2],
  },
  {
    id: 'deadline',
    number: '05',
    emoji: '🧠',
    nickname: 'Deadline Brain / Burnout',
    realName: 'Chronic stress & burnout',
    realCondition: 'Chronic occupational stress leading to burnout',
    region: 'system',
    color: '#8b73c7',
    anatomy: 'brain + stress systems throughout the body',
    anatomyDetail:
      'Starts in the brain and autonomic / endocrine stress systems, then spreads into whole-body psychological and physiological strain.',
    anatomyPhotos: photos('deadline', 'anatomy', [
      'The brain under workplace load',
      'Mental load written on the face',
    ]),
    cause: 'workload + low control + no recovery',
    causeDetail:
      'High workload, lack of control, constant deadlines, and prolonged unmanaged workplace stress without recovery.',
    causePhotos: photos('deadline', 'cause', [
      'Urgent messages stacking up',
      'A desk overloaded with unfinished work',
    ]),
    symptoms: 'irritability + exhaustion + cynicism + poor focus',
    symptomList: [
      'Irritability',
      'Poor concentration',
      'Headaches',
      'Fatigue / exhaustion',
      'Sleep problems',
      'Cynicism / detachment',
      'Reduced effectiveness',
    ],
    symptomPhotos: [
      {
        src: `${import.meta.env.BASE_URL}images/deadline/symptoms-1.png`,
        alt: 'Tension headache at the desk',
      },
      {
        src: `${import.meta.env.BASE_URL}images/burnout/symptoms-2.png`,
        alt: 'Cartoon: human battery at 1%',
      },
    ],
    prevention: 'real breaks + boundaries + recovery + support',
    preventionList: [
      'Take real breaks',
      'Set boundaries around work',
      'Manage workload and prioritize tasks',
      'Get adequate sleep',
      'Exercise regularly',
      'Maintain social connections',
      'Seek professional support when stress becomes difficult to manage',
    ],
    preventionPhotos: [
      {
        src: `${import.meta.env.BASE_URL}images/deadline/prevention-2.gif`,
        alt: 'Protecting sleep and recovery',
      },
      {
        src: `${import.meta.env.BASE_URL}images/deadline/prevention-1.png`,
        alt: 'A real break outdoors',
      },
    ],
    diagnosis:
      "The human brain was not designed to receive 'URGENT' messages 47 times a day — and humans don't come with a battery indicator.",
    focus: { facing: 'front', distance: 2.45 },
    hotspot: [0.12, 1.22, 0.16],
  },
  {
    id: 'plague',
    number: '06',
    emoji: '🦠',
    nickname: 'Office Plague',
    realName: 'Respiratory infection',
    realCondition: 'Common cold, influenza, COVID-19 and other respiratory infections',
    region: 'lungs',
    color: '#5aaa72',
    anatomy: 'nose + throat + airways + lungs',
    anatomyDetail:
      'Respiratory tract — nose, throat, airways, and lungs, depending on the infection.',
    anatomyPhotos: photos('plague', 'anatomy', [
      'Chest and breathing',
      'Fresh air for the respiratory tract',
    ]),
    cause: 'viruses + close contact + shared surfaces',
    causeDetail:
      'Viruses spread through respiratory particles, close contact, and contaminated hands and surfaces.',
    causePhotos: photos('plague', 'cause', [
      'Close quarters in an open office',
      'Shared desks and surfaces',
    ]),
    symptoms: 'cough + sore throat + fever + fatigue',
    symptomList: [
      'Cough',
      'Sore throat',
      'Congestion',
      'Fever',
      'Fatigue',
    ],
    symptomPhotos: photos('plague', 'symptoms', [
      'Feeling under the weather at work',
      'Cartoon: office plague spreading',
    ]),
    prevention: 'stay home + ventilation + hands',
    preventionList: [
      'Stay home when genuinely sick when possible',
      'Improve ventilation',
      'Wash hands',
      'Cover coughs and sneezes',
      'Consider vaccination where appropriate',
    ],
    preventionPhotos: photos('plague', 'prevention', [
      'Hand washing',
      'Fresh air and better ventilation',
    ]),
    diagnosis:
      "One person says, 'Don't worry, it's just a little cough.' Three days later, the entire department is coughing.",
    focus: { facing: 'front', distance: 1.15 },
    hotspot: [0.08, 1.34, 0.16],
  },
]

export type View = 'overview' | 'takeaway' | DiseaseId

export type DiseaseStep =
  | 'intro'
  | 'anatomy'
  | 'cause'
  | 'symptoms'
  | 'prevention'

export const DISEASE_STEPS: DiseaseStep[] = [
  'intro',
  'symptoms',
  'anatomy',
  'cause',
  'prevention',
]

export const DISEASE_STEP_LABELS: Record<DiseaseStep, string> = {
  intro: 'Intro',
  anatomy: 'Anatomy',
  cause: 'Cause',
  symptoms: 'Symptoms',
  prevention: 'Prevention',
}

export const LAST_DISEASE_STEP = DISEASE_STEPS.length - 1

export const TAKEAWAY_CAMERA = {
  position: [0.25, 1.22, 3.85] as Vec3,
  target: [0, 1.02, 0] as Vec3,
}

export const TAKEAWAY = {
  number: '07',
  quote: 'Stay Healthy<br>Stay Productive<br>Love the Office',
  credit:
    'Anatomical model from Z-Anatomy (CC BY-SA 4.0), packed for the browser by hpfrei.',
}

export function diseaseById(id: DiseaseId | null): Disease | undefined {
  if (!id) return undefined
  return DISEASES.find((d) => d.id === id)
}

export function isDiseaseView(view: View): view is DiseaseId {
  return view !== 'overview' && view !== 'takeaway'
}

export function nextView(view: View): View {
  if (view === 'overview') return DISEASES[0].id
  if (view === 'takeaway') return 'takeaway'
  const i = DISEASES.findIndex((d) => d.id === view)
  if (i === DISEASES.length - 1) return 'takeaway'
  return DISEASES[i + 1].id
}

export function prevView(view: View): View {
  if (view === 'overview') return 'overview'
  if (view === 'takeaway') return DISEASES[DISEASES.length - 1].id
  const i = DISEASES.findIndex((d) => d.id === view)
  if (i <= 0) return 'overview'
  return DISEASES[i - 1].id
}
