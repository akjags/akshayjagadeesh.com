import { recipes } from "@/lib/recipes";

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
  source?: string;
  synthesizedByGpt55?: boolean;
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
    title: "Reinforcement Learning Towards Broadly and Persistently Beneficial Models",
    authors:
      "Akshay V. Jagadeesh, Rahul K. Arora, Khaled Saab, Ali Malik, Mikhail Trofimov, Foivos Tsimpourlas, Johannes Heidecke, Karan Singhal",
    venue: "OpenAI Alignment Blog",
    year: "2026",
    href: "https://alignment.openai.com/beneficial-rl/",
    pdf: "https://cdn.openai.com/pdf/beneficial-rl.pdf",
    selected: true,
  },
  {
    title: "HealthBench Professional: Evaluating Large Language Models on Real Clinician Chats",
    authors:
      "Rebecca Soskin Hicks, Mikhail Trofimov, Dominick Lim, Rahul K. Arora, Foivos Tsimpourlas, Preston Bowman, Michael Sharman, Chi Tong, Kavin Karthik, Arnav Dugar, Akshay Jagadeesh, Khaled Saab, Johannes Heidecke, Ashley Alexander, Nate Gross, Karan Singhal",
    venue: "OpenAI",
    year: "2026",
    href: "https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf",
    pdf: "https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf",
    selected: true,
  },
  {
    title:
      "Monkey See, Model Knew: Large Language Models Accurately Predict Visual Brain Responses in Humans and Non-Human Primates",
    authors:
      "Colin Conwell, Emalie McMahon, Akshay Jagadeesh, Kasper Vinken, Saloni Sharma, Jacob S. Prince, George A. Alvarez, Talia Konkle, Margaret Livingstone, Leyla Isik",
    venue: "bioRxiv",
    year: "2025",
    href: "https://www.biorxiv.org/content/10.1101/2025.03.05.641284.abstract",
    pdf: "https://www.biorxiv.org/content/biorxiv/early/2025/04/09/2025.03.05.641284.full.pdf",
  },
  {
    title:
      "Contrast Inversion Reveals Hierarchical Asymmetries of Contrast Processing in Biological and Artificial Vision",
    authors:
      "Sohrab Najafian, Giordano Ramos-Traslosheros, Akshay Vivek Jagadeesh, Margaret Livingstone",
    venue: "NeurIPS Symmetry and Geometry Workshop",
    year: "2025",
    href: "https://openreview.net/forum?id=CSXVZD7SY4",
    pdf: "https://openreview.net/pdf?id=CSXVZD7SY4",
  },
  {
    title:
      "Parametric Control Along the Encoding Axes of IT Neurons Uncovers Hidden Differences in Model-Brain Alignment",
    authors:
      "Jacob S. Prince, Binxu Wang, Akshay V. Jagadeesh, Thomas Fel, Emily Lo, George A. Alvarez, Margaret S. Livingstone, Talia Konkle",
    venue: "CCN",
    year: "2025",
    href: "https://2025.ccneuro.org/abstract_pdf/Prince_2025_Parametric_control_along_encoding_axes_IT.pdf",
    pdf: "https://2025.ccneuro.org/abstract_pdf/Prince_2025_Parametric_control_along_encoding_axes_IT.pdf",
  },
  {
    title: "Face Cells Encode Object Parts More Than Facial Configuration of Illusory Faces",
    authors: "Saloni Sharma, Kasper Vinken, Akshay V. Jagadeesh, Margaret S. Livingstone",
    venue: "Nature Communications",
    year: "2024",
    href: "https://www.nature.com/articles/s41467-024-54323-w",
    pdf: "https://www.nature.com/articles/s41467-024-54323-w.pdf",
  },
  {
    title: "Assessing equivariance in visual neural representations",
    authors: "Akshay V. Jagadeesh, Will Xiao, Margaret S. Livingstone",
    venue: "CCN",
    year: "2024",
    href: "https://2024.ccneuro.org/pdf/575_Paper_authored_Rotation_Equivariance_in_Primate_IT_Cortex-%283%29.pdf",
    pdf: "https://2024.ccneuro.org/pdf/575_Paper_authored_Rotation_Equivariance_in_Primate_IT_Cortex-%283%29.pdf",
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
];

export { recipes };

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
