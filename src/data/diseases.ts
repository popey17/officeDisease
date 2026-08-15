export type Vec3 = [number, number, number]

export type DiseaseId =
  | 'chair'
  | 'turtle'
  | 'excel'
  | 'mouse'
  | 'deadline'
  | 'burnout'
  | 'plague'
  | 'coffee'

export type HighlightRegion =
  | 'lumbar'
  | 'cervical'
  | 'eyes'
  | 'wrist'
  | 'brain'
  | 'lungs'
  | 'system'
  | 'cns'

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
  cause: string
  causeDetail: string
  symptoms: string
  symptomList: string[]
  prevention: string
  preventionList: string[]
  diagnosis: string
  camera: {
    position: Vec3
    target: Vec3
  }
  hotspot: Vec3
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
    cause: 'prolonged sitting + poor posture + no movement',
    causeDetail:
      'Prolonged sitting, poor posture, insufficient movement, and muscle fatigue.',
    symptoms: 'aching + stiffness after sitting',
    symptomList: [
      'Lower-back aching',
      'Stiffness',
      'Pain after sitting for a long time',
    ],
    prevention: 'movement + ergonomics + core strength',
    preventionList: [
      'Get up and move regularly',
      'Adjust chair height and lumbar support',
      'Keep feet supported',
      'Strengthen core and back muscles',
      'Avoid staying in exactly the same position for hours',
    ],
    diagnosis: "Your chair isn't attacking you. You're just giving it too much responsibility.",
    camera: {
      position: [0.55, 1.08, 1.55],
      target: [0, 1.02, 0],
    },
    hotspot: [0.22, 1.02, 0.16],
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
    cause: 'looking down + forward-head posture',
    causeDetail:
      'Looking down at laptops and phones, forward-head posture, and a prolonged static position.',
    symptoms: 'stiffness + shoulder tension + headache',
    symptomList: [
      'Neck stiffness',
      'Shoulder tension',
      'Headache',
      'Reduced range of motion',
    ],
    prevention: 'eye-level screen + alignment + breaks',
    preventionList: [
      'Raise the monitor to eye level',
      'Keep the head aligned over the shoulders',
      'Take movement breaks',
      'Stretch and strengthen neck and upper-back muscles',
    ],
    diagnosis: "Your monitor is on the desk. Your head doesn't need to join it.",
    camera: {
      position: [0.42, 1.62, 1.22],
      target: [0, 1.56, 0.02],
    },
    hotspot: [0.16, 1.56, 0.14],
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
    cause: 'screen time + less blinking + glare',
    causeDetail:
      'Prolonged screen use, reduced blinking, glare, and poor viewing distance.',
    symptoms: 'dryness + blur + headaches',
    symptomList: [
      'Dry or burning eyes',
      'Blurred vision',
      'Headaches',
      'Difficulty focusing',
    ],
    prevention: '20-20-20 + blink + distance',
    preventionList: [
      'Follow the 20-20-20 rule',
      'Blink regularly',
      'Reduce glare',
      'Keep the monitor at a comfortable distance',
      'Adjust text size and brightness',
    ],
    diagnosis: "If you close your eyes and still see Excel, it's time for a break.",
    camera: {
      position: [0.22, 1.74, 0.92],
      target: [0, 1.71, 0.12],
    },
    hotspot: [0.12, 1.72, 0.16],
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
    cause: 'repetitive clicking + awkward wrist + force',
    causeDetail:
      'Repetitive mouse and keyboard movements, awkward wrist position, and excessive force.',
    symptoms: 'pain + numbness + tingling + weakness',
    symptomList: [
      'Wrist and hand pain',
      'Numbness',
      'Tingling',
      'Weakness',
    ],
    prevention: 'neutral wrist + lighter grip + shortcuts',
    preventionList: [
      'Keep the wrist in a neutral position',
      "Don't grip the mouse unnecessarily tightly",
      'Use keyboard shortcuts',
      'Change position regularly',
      'Take breaks from repetitive movements',
    ],
    diagnosis: 'You spend more time holding your mouse than holding your loved ones.',
    camera: {
      position: [0.95, 0.92, 1.2],
      target: [0.4, 0.78, 0.14],
    },
    hotspot: [0.46, 0.76, 0.2],
  },
  {
    id: 'deadline',
    number: '05',
    emoji: '🧠',
    nickname: 'Deadline Brain',
    realName: 'Chronic stress',
    realCondition: 'Chronic occupational stress',
    region: 'brain',
    color: '#8b73c7',
    anatomy: 'brain + autonomic / endocrine stress systems',
    anatomyDetail:
      'Brain and the autonomic and endocrine stress systems.',
    cause: 'workload + low control + no recovery',
    causeDetail:
      'High workload, lack of control, constant deadlines, and insufficient recovery.',
    symptoms: 'irritability + poor focus + fatigue',
    symptomList: [
      'Irritability',
      'Poor concentration',
      'Headaches',
      'Fatigue',
      'Sleep problems',
    ],
    prevention: 'real breaks + boundaries + sleep',
    preventionList: [
      'Take real breaks',
      'Set boundaries around work',
      'Prioritize tasks',
      'Get adequate sleep',
      'Exercise regularly',
      'Talk to someone when stress becomes difficult to manage',
    ],
    diagnosis:
      "The human brain was not designed to receive 'URGENT' messages 47 times a day.",
    camera: {
      position: [0.38, 1.88, 1.08],
      target: [0, 1.72, 0.02],
    },
    hotspot: [0.14, 1.86, 0.08],
  },
  {
    id: 'burnout',
    number: '06',
    emoji: '🔥',
    nickname: 'Battery 1% Syndrome',
    realName: 'Burnout',
    realCondition: 'Occupational burnout',
    region: 'system',
    color: '#c44b3a',
    anatomy: 'not one organ — stress systems throughout',
    anatomyDetail:
      'Not a single anatomical disease. It involves psychological and physiological stress systems across the whole body.',
    cause: 'prolonged unmanaged workplace stress',
    causeDetail: 'Prolonged unmanaged workplace stress.',
    symptoms: 'exhaustion + cynicism + reduced effectiveness',
    symptomList: [
      'Exhaustion',
      'Cynicism / detachment',
      'Reduced effectiveness',
    ],
    prevention: 'workload + recovery + support',
    preventionList: [
      'Manage workload',
      'Take recovery time',
      'Maintain boundaries',
      'Get enough sleep',
      'Maintain social connections',
      'Seek professional support when needed',
    ],
    diagnosis: "Your laptop has a battery indicator. Unfortunately, humans don't.",
    camera: {
      position: [0.15, 1.15, 3.15],
      target: [0, 1.05, 0],
    },
    hotspot: [0.28, 1.28, 0.18],
  },
  {
    id: 'plague',
    number: '07',
    emoji: '🦠',
    nickname: 'Office Plague',
    realName: 'Respiratory infection',
    realCondition: 'Common cold, influenza, COVID-19 and other respiratory infections',
    region: 'lungs',
    color: '#5aaa72',
    anatomy: 'nose + throat + airways + lungs',
    anatomyDetail:
      'Respiratory tract — nose, throat, airways, and lungs, depending on the infection.',
    cause: 'viruses + close contact + shared surfaces',
    causeDetail:
      'Viruses spread through respiratory particles, close contact, and contaminated hands and surfaces.',
    symptoms: 'cough + sore throat + fever + fatigue',
    symptomList: [
      'Cough',
      'Sore throat',
      'Congestion',
      'Fever',
      'Fatigue',
    ],
    prevention: 'stay home + ventilation + hands',
    preventionList: [
      'Stay home when genuinely sick when possible',
      'Improve ventilation',
      'Wash hands',
      'Cover coughs and sneezes',
      'Consider vaccination where appropriate',
    ],
    diagnosis:
      "One person says, 'Don't worry, it's just a little cough.' Three days later, the entire department is coughing.",
    camera: {
      position: [0.58, 1.36, 1.42],
      target: [0, 1.32, 0],
    },
    hotspot: [-0.2, 1.34, 0.16],
  },
  {
    id: 'coffee',
    number: '08',
    emoji: '☕',
    nickname: 'Coffee Dependency',
    realName: 'Caffeine dependence',
    realCondition: 'Caffeine dependence / tolerance',
    region: 'cns',
    color: '#b8895a',
    anatomy: 'central nervous system + adenosine signaling',
    anatomyDetail:
      'Central nervous system, especially adenosine signaling in the brain.',
    cause: 'regular high caffeine intake',
    causeDetail: 'Regular high caffeine intake.',
    symptoms: 'headache + fatigue + irritability without it',
    symptomList: [
      'Headache without caffeine',
      'Fatigue',
      'Irritability',
      'Difficulty concentrating',
    ],
    prevention: 'moderate intake + sleep, not coffee',
    preventionList: [
      'Keep caffeine intake moderate',
      'Avoid relying on caffeine to compensate for chronic sleep deprivation',
      'Avoid excessive caffeine late in the day',
      "Reduce gradually if you're consuming a lot",
    ],
    diagnosis:
      "Coffee doesn't give you energy. Sometimes it just temporarily negotiates with your tiredness.",
    camera: {
      position: [-0.48, 1.78, 1.12],
      target: [0, 1.7, 0],
    },
    hotspot: [-0.16, 1.78, 0.12],
  },
]

export function diseaseById(id: DiseaseId | null): Disease | undefined {
  if (!id) return undefined
  return DISEASES.find((d) => d.id === id)
}

export function nextDisease(id: DiseaseId | null): DiseaseId {
  if (!id) return DISEASES[0].id
  const i = DISEASES.findIndex((d) => d.id === id)
  return DISEASES[(i + 1) % DISEASES.length].id
}

export function prevDisease(id: DiseaseId | null): DiseaseId | null {
  if (!id) return DISEASES[DISEASES.length - 1].id
  const i = DISEASES.findIndex((d) => d.id === id)
  if (i <= 0) return null
  return DISEASES[i - 1].id
}
