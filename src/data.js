import { BrainCircuit, Leaf, Orbit } from 'lucide-react';

export const missions = [
  {
    id: 'human',
    number: '01',
    name: 'Human, amplified.',
    category: 'ARTIFICIAL INTELLIGENCE',
    color: '#ff764d',
    Icon: BrainCircuit,
    tagline: 'Give human potential an unfair advantage.',
    brief:
      'Build technology that gives people time, access, or understanding. Start with a human need. Make intelligence useful, explainable, and accessible.',
    prompt: 'What if every student could learn a difficult idea in their own language?',
    tags: ['APPLIED AI', 'ACCESSIBILITY', 'EDUCATION'],
    signal: 'HUMAN POTENTIAL',
    difficulty: 'Curiosity required',
  },
  {
    id: 'earth',
    number: '02',
    name: 'A better blue dot.',
    category: 'CLIMATE & SUSTAINABILITY',
    color: '#91d7ba',
    Icon: Leaf,
    tagline: 'Small changes. Planet-sized possibilities.',
    brief:
      'Make sustainable choices easier. Prototype a practical solution to waste, energy use, or the everyday decisions that shape our shared future.',
    prompt: 'What if surplus campus meals reached another student instead of a bin?',
    tags: ['CLIMATE TECH', 'CIRCULARITY', 'COMMUNITY'],
    signal: 'PLANET POSITIVE',
    difficulty: 'Impact first',
  },
  {
    id: 'open',
    number: '03',
    name: 'Off the map.',
    category: 'OPEN INNOVATION',
    color: '#b9a3ff',
    Icon: Orbit,
    tagline: 'The next frontier doesn’t come with instructions.',
    brief:
      'Bring a problem no one assigned you. Question an everyday frustration, connect unexpected ideas, and make a prototype that opens a new possibility.',
    prompt: 'What if navigating an unfamiliar campus felt like being guided by a friend?',
    tags: ['YOUR PROBLEM', 'YOUR APPROACH', 'NO LIMITS'],
    signal: 'UNEXPLORED SPACE',
    difficulty: 'Think differently',
  },
];

export const schedule = [
  {
    date: '18',
    label: 'ASSEMBLE',
    title: 'Find your people.',
    items: [
      {
        time: '18:00',
        title: 'Mission briefing',
        description: 'Get the challenge briefs, meet the community, and find your direction.',
        tag: 'OPENING',
      },
      {
        time: '18:45',
        title: 'Crew formation',
        description: 'Meet complementary minds. Form your crew of two to four.',
        tag: 'CONNECT',
      },
      {
        time: '19:30',
        title: 'Idea ignition',
        description: 'Pick your problem. Sketch a first hypothesis. Prepare for launch.',
        tag: 'IDEATE',
      },
    ],
  },
  {
    date: '19',
    label: 'BUILD',
    title: 'Enter the flow state.',
    items: [
      {
        time: '08:00',
        title: 'The clock starts',
        description: 'Your 36-hour build window begins. Go from a blank canvas to a first experiment.',
        tag: 'LIFTOFF',
      },
      {
        time: '14:00',
        title: 'First systems check',
        description: 'Test your assumptions with your crew. Keep what works. Rethink what doesn’t.',
        tag: 'ITERATE',
      },
      {
        time: '22:00',
        title: 'After-hours orbit',
        description: 'Find your rhythm. Take breaks, share progress, and keep building together.',
        tag: 'BUILD',
      },
    ],
  },
  {
    date: '20',
    label: 'LAUNCH',
    title: 'Make your idea real.',
    items: [
      {
        time: '09:00',
        title: 'Prototype checkpoint',
        description: 'Connect the pieces. Focus your scope and make the core experience work.',
        tag: 'REFINE',
      },
      {
        time: '20:00',
        title: 'Ship it. Show it.',
        description: 'The build ends. Demo your prototype and tell the story behind the solution.',
        tag: 'SHOWCASE',
      },
      {
        time: '21:30',
        title: 'A new trajectory',
        description: 'Celebrate what you made and the people who helped you get there.',
        tag: 'CELEBRATE',
      },
    ],
  },
];

export const faqs = [
  [
    'Is this for experienced developers only?',
    'Not at all. The proposed format welcomes first-time builders, developers, designers, and people who see problems differently. Curiosity and a willingness to collaborate matter more than your tech stack.',
  ],
  [
    'Can I arrive without a team?',
    'Yes. Select “Find me a crew” in the demo application. The fictional opening session includes team formation, with crews of two to four people.',
  ],
  [
    'What can we build?',
    'A new working prototype for one of the three tracks. Web, mobile, hardware concepts, creative tools — choose the format that best solves your problem. Build the core idea well instead of an unfinished feature list.',
  ],
  [
    'How would projects be evaluated?',
    'The concept rubric is problem relevance (30%), originality (25%), execution (25%), and presentation (20%). Show the problem, your approach, a working demo, and what you learned.',
  ],
  [
    'What does it cost to participate?',
    'The proposed ORBIT event is free for students. This is a fictional concept; no payment, reservation, or real application is processed on this site.',
  ],
  [
    'Is ORBIT ’26 an actual event?',
    'No. This is an original fictional hackathon for the IEEE Computer Society UCSC Web Team Recruitment Task. All dates and logistics are illustrative. The application creates a local demo boarding pass and sends nothing to an organizer.',
  ],
];

export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
