import { Quest, Setting, Difficulty } from '../types/quest';

export const BUILT_IN_QUESTS: Quest[] = [
  // Garden Quests
  {
    id: 'garden-5-easy-1',
    title: 'The Green Spectrum',
    description: 'Notice the subtle gradations of green in a small garden plot.',
    duration: 5,
    setting: 'garden',
    difficulty: 'Easy',
    steps: [
      'Stand still near a garden patch or flowerbed for 30 seconds to adjust your eyes.',
      'Locate at least four distinct shades of green (e.g., lime, olive, jade, emerald).',
      'Observe whether the difference comes from leaf thickness, sunlight angle, or species.',
    ],
    tip: 'Look closely without picking or tearing any live leaves.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'garden-10-easy-1',
    title: 'Garden Texture Safari',
    description: 'Explore the varied surfaces created by garden flora and soil.',
    duration: 10,
    setting: 'garden',
    difficulty: 'Easy',
    steps: [
      'Gently observe the surface of a fallen twig or garden mulch.',
      'Visually contrast smooth waxy foliage with fuzzy or ribbed leaves.',
      'Find one natural shadow cast by overlapping stems and note how it shifts.',
    ],
    tip: 'Always observe from a stable standing or seated position to avoid trampling soil.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'garden-15-easy-1',
    title: 'Leaf Explorer',
    description: 'Discover the diversity of leaves and natural forms around you.',
    duration: 15,
    setting: 'garden',
    difficulty: 'Easy',
    steps: [
      'Find three fallen leaves with different silhouettes or edge patterns.',
      'Compare their vein architectures (parallel lines vs. branching networks).',
      'Place them gently back onto the soil bed to nourish the ecosystem.',
    ],
    tip: 'Collect only leaves that have already fallen naturally on the ground.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'garden-20-medium-1',
    title: 'Pollinator Highway Watch',
    description: 'Observe the busy airspace of flying garden visitors from a quiet distance.',
    duration: 20,
    setting: 'garden',
    difficulty: 'Medium',
    steps: [
      'Select a flowering bush or patch with active blossoms.',
      'Take three steps back to maintain a respectful buffer for resting insects.',
      'Count how many visiting pollinators visit within five minutes.',
      'Notice which flower colors or shapes appear to attract the most interest.',
    ],
    tip: 'Keep a calm posture. Never attempt to touch, catch, or trap bees or insects.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'garden-30-medium-1',
    title: 'Soil & Sprout Micro-Map',
    description: 'Sketch a mental or paper blueprint of life at ground level.',
    duration: 30,
    setting: 'garden',
    difficulty: 'Medium',
    steps: [
      'Demarcate an imaginary one-foot square on garden mulch or open soil.',
      'Count how many distinct plant species, sprouts, and mosses occupy this square.',
      'Notice any tiny earth patterns: moisture gradients, tiny pebbles, or worm castings.',
      'Reflect on how this micro-zone supports the taller plants above it.',
    ],
    tip: 'Do not dig or disturb root systems or burrowing earth creatures.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'garden-60-medium-1',
    title: 'Seasonal Canopy Journal',
    description: 'A deep observation session tracking garden light, shade, and growth.',
    duration: 60,
    setting: 'garden',
    difficulty: 'Medium',
    steps: [
      'Choose a comfortable bench or patch of dry ground with a broad view of the garden.',
      'Document five quiet changes that occur as the sun moves across tree limbs.',
      'Identify two deciduous plants and two evergreen plants by their canopy foliage.',
      'Listen for three different bird calls from the tree branches overhead.',
      'Spend the final 10 minutes taking deep breaths of fresh garden air.',
    ],
    tip: 'Stay hydrated and seek shade during peak sunlight hours.',
    source: 'Built-in Curated Quest (Offline)',
  },

  // Park Quests
  {
    id: 'park-5-easy-1',
    title: 'Breeze & Branch Resonance',
    description: 'Feel the movement of wind traveling through tall park trees.',
    duration: 5,
    setting: 'park',
    difficulty: 'Easy',
    steps: [
      'Pause near a grove of trees along a paved park path.',
      'Close your eyes for 30 seconds and focus purely on the rustle of foliage.',
      'Open your eyes and pinpoint which tree crown was moving most vigorously.',
    ],
    tip: 'Remain on clearly designated walking paths to protect meadow grasses.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'park-10-easy-1',
    title: 'Park Bark Architecture',
    description: 'Investigate the rugged textures and protective bark of mature park trees.',
    duration: 10,
    setting: 'park',
    difficulty: 'Easy',
    steps: [
      'Locate two different mature trees standing near the walkway.',
      'Examine their trunk patterns without stripping or peeling the bark.',
      'Look for harmless lichens or moss colonies flourishing on the shadier side.',
    ],
    tip: 'Never carve, scratch, or peel natural tree bark.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'park-15-easy-1',
    title: 'Shadow Geometry Walk',
    description: 'Track how sunlight and tall trunks project elongated silhouettes.',
    duration: 15,
    setting: 'park',
    difficulty: 'Easy',
    steps: [
      'Walk at a gentle, unhurried pace along a tree-lined lane.',
      'Observe the intricate latticework of shadows cast upon the grass or pathway.',
      'Find the longest shadow currently cast by a natural landmark.',
    ],
    tip: 'Be courteous to cyclists, runners, and dog walkers sharing the trail.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'park-20-medium-1',
    title: 'Park Bird Sentinel Watch',
    description: 'Quietly observe park birds feeding and perching in their natural habitat.',
    duration: 20,
    setting: 'park',
    difficulty: 'Medium',
    steps: [
      'Sit quietly on a park bench facing an open lawn or pond perimeter.',
      'Scan the ground and lower branches without making sudden hand movements.',
      'Count three distinct bird behaviors (e.g., ground foraging, preening, perching).',
      'Notice how birds communicate warning chirps when another creature approaches.',
    ],
    tip: 'Do not feed bread or processed human food to wild waterfowl or park birds.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'park-30-medium-1',
    title: 'The Great Park Tree Census',
    description: 'Catalog tree variety and branching forms across a scenic park perimeter.',
    duration: 30,
    setting: 'park',
    difficulty: 'Medium',
    steps: [
      'Stroll along the perimeter path and identify 5 trees with distinct shapes.',
      'Compare columnar crowns (tall & narrow) with spreading round canopies.',
      'Find a tree with seed cones, acorns, or winged samaras (helicopter seeds) on the path.',
      'Observe how birds or squirrels use tree forks as natural rest stops.',
    ],
    tip: 'Never climb fragile limbs or disturb nesting sites in tree forks.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'park-60-medium-1',
    title: 'The Park Biome Immersion',
    description: 'An extended mindful walk engaging all five senses in an expansive park.',
    duration: 60,
    setting: 'park',
    difficulty: 'Medium',
    steps: [
      'Embark on an expansive, unhurried loop around the park grounds.',
      'Stop at three distinct ecological micro-zones: lawn, wooded edge, and water border.',
      'Record mental notes of how temperature and moisture change between zones.',
      'Take 10 minutes to sit peacefully on a grassy knoll watching cloud formations.',
      'Conclude by expressing quiet gratitude for public green sanctuaries.',
    ],
    tip: 'Carry out all trash you generate and follow "Leave No Trace" principles.',
    source: 'Built-in Curated Quest (Offline)',
  },

  // Balcony Quests
  {
    id: 'balcony-5-easy-1',
    title: 'Balcony Airflow & Horizon Breathe',
    description: 'Refresh your senses right outside your door or window balcony.',
    duration: 5,
    setting: 'balcony',
    difficulty: 'Easy',
    steps: [
      'Step out onto your balcony or open a sunny exterior window wide.',
      'Inhale deeply three times, sensing the temperature and outdoor scent.',
      'Pick out the highest visible point on the horizon (cloud, hilltop, or rooftop).',
    ],
    tip: 'Keep both feet firmly on the deck; never lean over or climb balcony railings.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'balcony-10-easy-1',
    title: 'Container Plant Vitality Check',
    description: 'Give caring attention to your potted plants or windowsill herbs.',
    duration: 10,
    setting: 'balcony',
    difficulty: 'Easy',
    steps: [
      'Examine the moisture level and color of the topsoil in one container.',
      'Check underneath three leaves for healthy green coloring.',
      'Gently rotate the pot 45 degrees so shaded foliage receives ambient light.',
    ],
    tip: 'Water only if soil feels dry two inches beneath the surface.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'balcony-15-easy-1',
    title: 'Cloud Velocity Observation',
    description: 'Track the flow of atmospheric vapor across the urban sky.',
    duration: 15,
    setting: 'balcony',
    difficulty: 'Easy',
    steps: [
      'Pick a fixed architectural anchor (like a chimney or light pole) in view.',
      'Watch a specific cloud edge glide past that fixed reference point.',
      'Determine the wind direction at cloud altitude versus street level.',
    ],
    tip: 'Never look directly at the midday sun; wear sunglasses if glare is intense.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'balcony-20-medium-1',
    title: 'Balcony Microclimate Tracker',
    description: 'Map temperature, light, and breeze pockets across your outdoor perch.',
    duration: 20,
    setting: 'balcony',
    difficulty: 'Medium',
    steps: [
      'Notice where the sunlight currently strikes the floor and walls.',
      'Compare the warm illuminated surface with the coolest shaded corner.',
      'Observe whether potted foliage leans toward the open sky.',
      'Listen for the ambient outdoor soundscape (birds, wind, distant rustle).',
    ],
    tip: 'Secure lightweight pots or garden stakes against sudden gusts of wind.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'balcony-30-medium-1',
    title: 'Urban Sky Watch & Bird Flyway',
    description: 'Observe urban wildlife navigating the aerial space above streets.',
    duration: 30,
    setting: 'balcony',
    difficulty: 'Medium',
    steps: [
      'Position a comfortable chair overlooking the open airspace.',
      'Watch for soaring birds (swifts, pigeons, hawks) utilizing thermal updrafts.',
      'Observe how breezes form eddies against building walls and rooflines.',
      'Sketch or mentally trace the flight paths taken over 15 minutes.',
    ],
    tip: 'Never toss food scraps or objects over the railing.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'balcony-60-medium-1',
    title: 'Sunset & Dusk Transition',
    description: 'Witness the serene shift from daylight into dusk from your balcony.',
    duration: 60,
    setting: 'balcony',
    difficulty: 'Medium',
    steps: [
      'Begin your vigil 30 minutes before sunset with a warm jacket if needed.',
      'Observe how sky color evolves from cyan to amber, rose, and indigo.',
      'Watch street and garden shadows lengthen and soften into twilight.',
      'Notice the change in ambient sound as diurnal birds return to their roosts.',
      'Enjoy the appearance of the first evening star or planet.',
    ],
    tip: 'Keep outdoor lighting off during your watch to preserve night vision.',
    source: 'Built-in Curated Quest (Offline)',
  },

  // Neighborhood Quests
  {
    id: 'neighbor-5-easy-1',
    title: 'Sidewalk Sprout Pioneer',
    description: 'Acknowledge the resilient greenery persisting through pavement cracks.',
    duration: 5,
    setting: 'neighborhood',
    difficulty: 'Easy',
    steps: [
      'Walk a short distance down your residential block.',
      'Spot one tiny dandelion, clover, or moss tuft growing in a sidewalk seam.',
      'Marvel at the seed persistence that enabled it to take root in concrete.',
    ],
    tip: 'Always stay alert for cyclists and cars when crossing street aprons.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'neighbor-10-easy-1',
    title: 'Street Canopy Walk',
    description: 'Look up to appreciate the street trees shading your neighborhood.',
    duration: 10,
    setting: 'neighborhood',
    difficulty: 'Easy',
    steps: [
      'Walk down your block while looking at the overhead canopy of street trees.',
      'Count how many tree wells or curbside strips you pass.',
      'Notice how the air feels noticeably cooler beneath the foliage shade.',
    ],
    tip: 'Watch your step on uneven sidewalks while gazing upward.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'neighbor-15-easy-1',
    title: 'Neighborhood Color Scavenger',
    description: 'Spot natural pigments nestled within suburban or urban architecture.',
    duration: 15,
    setting: 'neighborhood',
    difficulty: 'Easy',
    steps: [
      'Find five natural colors on your street: earth brown, bark gray, leaf green, sky blue, flower yellow.',
      'Observe how cultivated front-yard flowers contrast with native weeds.',
      'Notice any fallen stones or gravel pebbles exhibiting mineral sparkles.',
    ],
    tip: 'Respect private property boundaries; observe solely from public sidewalks.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'neighbor-20-medium-1',
    title: 'Urban Ecology Walk',
    description: 'Examine how wildlife and vegetation adapt to human neighborhoods.',
    duration: 20,
    setting: 'neighborhood',
    difficulty: 'Medium',
    steps: [
      'Walk an unhurried four-block square loop around your neighborhood.',
      'Identify two distinct bird nesting spots (drainage pipes, ivy vines, dense hedge).',
      'Look for pollinator gardens or native plant patches planted by neighbors.',
      'Count the variety of decorative stone types used in landscaping.',
    ],
    tip: 'Cross only at designated crosswalks and keep headphone volume low.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'neighbor-30-medium-1',
    title: 'The Green Corridor Map',
    description: 'Follow the continuous trail of vegetation connecting yards and alleys.',
    duration: 30,
    setting: 'neighborhood',
    difficulty: 'Medium',
    steps: [
      'Trace a green pathway by walking between tree-shaded sidewalks.',
      'Look down alleyways or easements to spot wild hedgerows and climbing vines.',
      'Notice how squirrels or urban songbirds use fence lines as transit corridors.',
      'Find the oldest, thickest trunk tree in your neighborhood perimeter.',
    ],
    tip: 'Never trespass on private properties or disturb gated enclosures.',
    source: 'Built-in Curated Quest (Offline)',
  },
  {
    id: 'neighbor-60-medium-1',
    title: 'The Neighborhood Naturalist Expedition',
    description: 'A comprehensive, mindful hour cataloging suburban nature.',
    duration: 60,
    setting: 'neighborhood',
    difficulty: 'Medium',
    steps: [
      'Plan a 1-hour circular walking route through residential green streets.',
      'Catalog at least six different tree species by their leaf and bark traits.',
      'Pause for 5 minutes at three quiet corners to close your eyes and listen.',
      'Observe the flight trajectories of local birds heading toward parks or waterways.',
      'Arrive back feeling grounded, relaxed, and connected with your outdoor community.',
    ],
    tip: 'Wear comfortable walking shoes and stay visible to motor vehicle traffic.',
    source: 'Built-in Curated Quest (Offline)',
  },
];

export function findBuiltInQuest(setting: Setting, duration: number, difficulty: Difficulty): Quest {
  // Try exact match on setting, duration, difficulty
  const exact = BUILT_IN_QUESTS.find(
    (q) => q.setting === setting && q.duration === duration && q.difficulty === difficulty
  );
  if (exact) return exact;

  // Try match on setting and duration
  const matchSettingDuration = BUILT_IN_QUESTS.find(
    (q) => q.setting === setting && q.duration === duration
  );
  if (matchSettingDuration) return matchSettingDuration;

  // Try match on setting
  const matchSetting = BUILT_IN_QUESTS.filter((q) => q.setting === setting);
  if (matchSetting.length > 0) {
    // pick the closest duration
    const sorted = [...matchSetting].sort(
      (a, b) => Math.abs(a.duration - duration) - Math.abs(b.duration - duration)
    );
    return sorted[0];
  }

  // Fallback to first available quest
  return BUILT_IN_QUESTS[0];
}
