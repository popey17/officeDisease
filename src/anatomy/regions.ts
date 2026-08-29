import { type DiseaseId, type HighlightRegion } from '../data/diseases'

export const ANATOMY_MODEL_URL = `${import.meta.env.BASE_URL}models/body.glb`
export const DRACO_PATH = `${import.meta.env.BASE_URL}draco/`

const REGION_TO_DISEASE: Record<Exclude<HighlightRegion, 'system'>, DiseaseId> = {
  lumbar: 'chair',
  cervical: 'turtle',
  eyes: 'excel',
  wrist: 'mouse',
  brain: 'deadline',
  lungs: 'plague',
  cns: 'coffee',
}

const CLICK_ORDER: Array<Exclude<HighlightRegion, 'system'>> = [
  'eyes',
  'wrist',
  'lumbar',
  'cervical',
  'lungs',
  'brain',
  'cns',
]

type Rule = {
  include: string[]
  exclude?: string[]
}

const RULES: Record<Exclude<HighlightRegion, 'system'>, Rule> = {
  lumbar: {
    include: [
      'lumbar',
      'quadratus lumborum',
      'erector spinae',
      'multifidus',
      'iliocostalis',
    ],
    exclude: ['cervical', 'capitis', 'cervicis', 'thoracis'],
  },
  cervical: {
    include: [
      'cervical',
      'trapezius',
      'sternocleidomastoid',
      'splenius',
      'levator scapulae',
      'semispinalis capitis',
    ],
    exclude: ['lumbar', 'thoracic vertebra'],
  },
  eyes: {
    include: ['extraocular', 'orbit', 'orbital', 'eyeball', 'optic canal'],
    exclude: ['infraorbital nerve'],
  },
  wrist: {
    include: [
      'carpal',
      'metacarp',
      'radius',
      'ulna',
      'flexor carpi',
      'extensor carpi',
      'flexor digitorum superficialis',
      'flexor digitorum profundus',
      'flexor pollicis',
      'extensor pollicis',
      'extensor digitorum',
      'pronator',
      'supinator',
      'palmaris',
      'digit of hand',
      'phalanx of hand',
      'bones of the hand',
      'bones of hand',
    ],
    exclude: ['hallucis', 'tarsal', 'femoris', 'fibular', 'tibial'],
  },
  brain: {
    include: [
      'cranium',
      'cranial',
      'frontal bone',
      'parietal',
      'occipital',
      'temporal bone',
      'sphenoid',
      'ethmoid',
      'skull',
      'calvaria',
    ],
    exclude: ['thoracic'],
  },
  lungs: {
    include: [
      'rib',
      'costal',
      'sternum',
      'manubrium',
      'xiphoid',
      'intercostal',
      'pectoralis',
      'thoracic vertebra',
    ],
    exclude: ['cervical', 'lumbar', 'false rib cartilage of neck'],
  },
  cns: {
    include: [
      'cranium',
      'cranial',
      'frontal bone',
      'parietal',
      'occipital',
      'temporal bone',
      'sphenoid',
      'skull',
      'vertebra',
      'vertebral',
      'sacrum',
      'coccyx',
    ],
  },
}

export function meshLabel(object: {
  name?: string
  userData?: Record<string, unknown>
}): string {
  const data = object.userData ?? {}
  return [object.name, data.name, data.nameDetail]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ')
    .toLowerCase()
}

function matchesRule(label: string, rule: Rule): boolean {
  if (rule.exclude?.some((term) => label.includes(term))) return false
  return rule.include.some((term) => label.includes(term))
}

export function matchesRegion(label: string, region: HighlightRegion): boolean {
  if (region === 'system') return true
  return matchesRule(label, RULES[region])
}

export function diseaseFromLabel(label: string): DiseaseId | null {
  for (const region of CLICK_ORDER) {
    if (matchesRegion(label, region)) return REGION_TO_DISEASE[region]
  }
  return null
}
