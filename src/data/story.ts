export type PortraitId = 'me' | 'daniel' | 'bull'

export type TextSegment =
  | { text: string }
  | { portrait: PortraitId; alt?: string }

export type NarrativePage = {
  id: string
  speaker?: PortraitId
  lines: TextSegment[][]
  variant?: 'quote' | 'memory' | 'default'
}

export type QuizQuestion = {
  id: string
  prompt: TextSegment[]
  options: string[]
  answerIndex: number
}

export const meSrc = '/characters/me.png'
export const danielSrc = '/characters/daniel.png'
export const danielCutoutSrc = '/characters/daniel-cutout.png'
export const bullSrc = '/characters/bull-funny.png'

export const portraitSrc: Record<PortraitId, string> = {
  me: meSrc,
  daniel: danielSrc,
  bull: bullSrc,
}

export const stage1Pages: NarrativePage[] = [
  {
    id: 's1-meet',
    speaker: 'me',
    lines: [
      [
        { text: 'I met ' },
        { portrait: 'daniel' },
        { text: ' through a mutual friend at parkrun.' },
      ],
      [{ text: 'Chill Guy at First Sight?' }],
      [{ text: 'Hell Nah...' }],
      [
        {
          text: "Well, I guess it doesn't have anything to do with him. It's because I learned about 5+ red flags from the mutual friend in less than 2 minutes after he was introduced to me.",
        },
      ],
    ],
  },
  {
    id: 's1-flags',
    speaker: 'me',
    variant: 'quote',
    lines: [
      [
        {
          text: 'All the red flags were introduced upon the formula: [Daniel + hates + blah]. As the mutual friend was telling me:',
        },
      ],
      [{ text: '"Daniel hates photos."' }],
      [{ text: '"Daniel hates body contacts."' }],
      [{ text: '"Daniel hates plastic bottles."' }],
      [{ text: '"Daniel hates unscheduled tasks."' }],
      [{ text: '"Daniel hates relationships..."' }],
      [{ text: '…' }],
    ],
  },
  {
    id: 's1-hurdles',
    speaker: 'me',
    lines: [
      [
        {
          text: 'Do I have to learn how to hurdle through all the red lines if I want to be friends with this guy?',
        },
      ],
      [
        { text: 'If the ' },
        { portrait: 'daniel' },
        { text: " I know now is a COW, back then he's gotta be a bull " },
        { portrait: 'bull' },
        { text: '.' },
      ],
    ],
  },
]

export const stage3Pages: NarrativePage[] = [
  {
    id: 's3-barks',
    speaker: 'me',
    lines: [
      [
        { text: 'Because of all the pre-defined "rules" of getting along with ' },
        { portrait: 'daniel' },
        {
          text: ", I couldn't tell apart the jokes and the reals. But for a sequence of events, I gradually realized that ",
        },
        { portrait: 'daniel' },
        { text: "'s barks are worse than " },
        { portrait: 'daniel' },
        { text: "'s bites. He is actually a very nice person." },
      ],
    ],
  },
  {
    id: 's3-memories',
    speaker: 'me',
    variant: 'memory',
    lines: [
      [{ text: '[image not available]' }, { text: 'having me taking his guest room for parkrun' }],
      [
        { text: '[image not available]' },
        { text: "allowing me to stay for 2 days when there's a gun threat on campus" },
      ],
      [
        { text: '[image not available]' },
        { text: 'picking me up at 7 a.m. for several months' },
      ],
      [
        { text: '[image not available]' },
        { text: 'taking care of all my belongings during summer' },
      ],
      [
        { text: '[image not available]' },
        {
          text: 'driving me to Sacramento to raft; giving the bed to me and slept on floor',
        },
      ],
      [
        {
          text: 'Because of a data erase that happened to my iPhone in August 2026, I lost all the pictures. 30,000+ photos gone in a snap. I said to myself that maybe something was destined to be forgotten. Yet, something else was not — and my brain might even be more nonvolatile than RAM lol.',
        },
      ],
    ],
  },
  {
    id: 's3-chill',
    speaker: 'me',
    lines: [
      [
        { text: 'As time goes, I unpacked the rumors of those so-called "boundaries" of ' },
        { portrait: 'daniel' },
        { text: '. The more we talk and interact, my mood went from tense to chill when being with ' },
        { portrait: 'daniel' },
        { text: '. And those rumors were actually fun to gossip lol.' },
      ],
    ],
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: [
      { text: 'What is the drink that ' },
      { portrait: 'daniel' },
      { text: " was accused of drinking at mutual friend's bday party?" },
    ],
    options: ['Dutch Bros', 'Cranberry Juice', 'Buzzball', 'Vodka'],
    answerIndex: 3,
  },
  {
    id: 'q2',
    prompt: [
      { text: 'What is the name of the wrap that both ' },
      { portrait: 'me' },
      { text: ' and ' },
      { portrait: 'daniel' },
      { text: ' liked at the Indian Restaurant: Chaat Cafe?' },
    ],
    options: ['Boti', 'Asada', 'Al Pastor', 'Sweet Corn'],
    answerIndex: 0,
  },
  {
    id: 'q3',
    prompt: [
      { text: 'How many 💀 bodies were hidden in ' },
      { portrait: 'daniel' },
      { text: "'s backyard?" },
    ],
    options: ['15', '17', '20', '30'],
    answerIndex: 2,
  },
]

export const stage5Pages: NarrativePage[] = [
  {
    id: 's5-closing',
    speaker: 'me',
    lines: [
      [
        {
          text: "Time processes and memory stack grows. From Cali Wet Burrito to Clam Chowder in SF. From Riverside's dying bike to Sacramento river raft. Earlier or later I don't want to say — I might have just met my best friend for life.",
        },
      ],
    ],
  },
]
