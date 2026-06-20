export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  href?: string;
  pdf?: string;
  selected?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  tags: string[];
  body: string[];
};

export type Recipe = {
  slug: string;
  title: string;
  dek: string;
  cuisine: string;
  time: string;
  servings: string;
  image: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export type EventPage = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  tools: { title: string; description: string; cta: string }[];
};

export const publications: Publication[] = [
  {
    title: "Assessing equivariance in visual neural representations",
    authors: "Akshay V. Jagadeesh, Will Xiao, Margaret S. Livingstone",
    venue: "CCN",
    year: "2024",
    href: "https://2024.ccneuro.org/view_paper.php?PaperNum=1236",
    selected: true,
  },
  {
    title: "Texture bias in primate ventral visual cortex and deep neural network models of vision",
    authors: "Akshay V. Jagadeesh, Margaret S. Livingstone",
    venue: "ICLR ReAlign",
    year: "2024",
    href: "https://openreview.net/forum?id=lhf9f8wE4t",
    selected: true,
  },
  {
    title: "Texture-like representation of objects in human visual cortex",
    authors: "Akshay V. Jagadeesh, Justin L. Gardner",
    venue: "PNAS",
    year: "2022",
    href: "https://www.pnas.org/doi/10.1073/pnas.2115302119",
    selected: true,
  },
  {
    title: "Attention enhances category representations across the brain with strengthened residual correlations to ventral temporal cortex",
    authors: "Arielle S. Keller, Akshay V. Jagadeesh, Lior Bugatus, Leanne M. Williams, Kalanit Grill-Spector",
    venue: "NeuroImage",
    year: "2021",
    href: "https://www.sciencedirect.com/science/article/pii/S1053811921008634",
  },
  {
    title: "V1 and IT representations are directly accessible to human visual perception",
    authors: "Akshay V. Jagadeesh, Justin L. Gardner",
    venue: "NeurIPS SVRHM",
    year: "2021",
    href: "https://openreview.net/forum?id=2M4ysOjaLx8",
  },
  {
    title: "Setting and changing feature priorities in visual short-term memory",
    authors: "Zampeta Kalogeropoulou, Akshay V. Jagadeesh, Sven Ohl, Martin Rolfs",
    venue: "Psychonomic Bulletin & Review",
    year: "2016",
    href: "https://link.springer.com/article/10.3758/s13423-016-1104-9",
  },
];

export const posts: Post[] = [
  {
    slug: "why-this-site",
    title: "Why this site exists",
    date: "2026-06-20",
    dek: "A small place for research notes, half-formed reflections, recipes, and temporary experiments.",
    tags: ["meta", "notes"],
    body: [
      "I wanted this site to feel less like a frozen CV and more like a living notebook: public enough for work and writing, but flexible enough to hold small private tools and family recipes.",
      "The public parts will stay spare and readable. The hidden parts can be more practical: searchable recipes, event pages, forms, and little web games that only need a link.",
    ],
  },
  {
    slug: "vision-and-models",
    title: "Vision, models, and useful mismatches",
    date: "2026-06-19",
    dek: "A placeholder note on why failures of computer vision models can still teach us something about perception.",
    tags: ["vision", "models"],
    body: [
      "Some of the most interesting comparisons between humans and neural networks come from mismatches rather than agreements.",
      "When models solve things that humans find hard, or miss things that humans find obvious, those gaps can become experimental tools rather than mere benchmarks.",
    ],
  },
];

export const recipes: Recipe[] = [
  {
    slug: "onion-jalapeno-pakora",
    title: "Onion and Jalapeno Pakora",
    dek: "Crispy fritters with onions, jalapenos, spinach, and chickpea flour.",
    cuisine: "Indian",
    time: "20 min",
    servings: "3-4",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    tags: ["vegetarian", "fried", "snack"],
    ingredients: [
      "2 medium red onions, thinly sliced",
      "4 jalapenos, thinly sliced",
      "1 cup spinach, chopped",
      "1 cup besan",
      "2 tbsp pakora masala",
      "Water, added gradually",
      "Oil for frying",
    ],
    steps: [
      "Slice the onions, jalapenos, and spinach, then add them to a large bowl.",
      "Add besan and masala. Add water gradually until the mixture forms a loose batter.",
      "Scoop battered vegetables into hot oil in small clumps.",
      "Fry until golden brown, then drain on a towel.",
    ],
  },
  {
    slug: "aoys-som-tum-thai",
    title: "Aoy's Som Tum Thai",
    dek: "Green papaya salad with garlic, Thai chilis, lime, and roasted peanuts.",
    cuisine: "Thai",
    time: "25 min",
    servings: "3-4",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=1200&q=80",
    tags: ["vegetarian", "raw", "summer"],
    ingredients: [
      "1 medium green papaya, shredded",
      "3 garlic cloves",
      "Thai chilis, to taste",
      "2 tbsp brown sugar",
      "3 tbsp lime juice",
      "1 tbsp soy sauce",
      "Long beans, cherry tomatoes, roasted peanuts",
    ],
    steps: [
      "Shred the papaya into long strands.",
      "Pound chilis, garlic, sugar, and peanuts in a mortar and pestle.",
      "Add beans, papaya, and tomato. Pound lightly or toss.",
      "Season with soy sauce and lime juice.",
    ],
  },
  {
    slug: "vegan-pozole-rojo",
    title: "Vegan Pozole Rojo",
    dek: "A hominy, mushroom, and chile broth stew for a slow winter meal.",
    cuisine: "Mexican",
    time: "1.5 hr",
    servings: "6-8",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=1200&q=80",
    tags: ["vegan", "soup", "winter"],
    ingredients: [
      "Hominy, drained and rinsed",
      "Vegetable broth",
      "Mushrooms and calabacitas",
      "Onion and garlic",
      "Guajillo, ancho, and chiles de arbol",
      "Oregano, cumin, black pepper",
    ],
    steps: [
      "Simmer hominy with broth, onion, garlic, bay leaves, and spices.",
      "Soften dried chiles, then blend with roasted onion and garlic.",
      "Strain the chile sauce and add it to the pot.",
      "Saute mushrooms and calabacitas, add them back, and simmer until deep and rich.",
    ],
  },
];

export const events: EventPage[] = [
  {
    slug: "weekend-party",
    title: "Weekend Party",
    date: "This weekend",
    dek: "A private landing page for party links, tiny games, and lightweight forms.",
    tools: [
      {
        title: "RSVP check-in",
        description: "A simple form pattern for names, plus-ones, and notes.",
        cta: "Open form",
      },
      {
        title: "Song queue",
        description: "A quick prompt for guests to suggest one song.",
        cta: "Add song",
      },
      {
        title: "Table quiz",
        description: "A starter tile for a small browser game or trivia round.",
        cta: "Play",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
