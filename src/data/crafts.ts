export interface Craft {
  id: string;
  name: string;
  region: "Rajasthan" | "Madhya Pradesh";
  origin: string;
  age: string;
  description: string;
  image: string;
  endangered: boolean;
  artisanCount: number;
  category: string;
}

export const crafts: Craft[] = [
  {
    id: "blue-pottery",
    name: "Blue Pottery",
    region: "Rajasthan",
    origin: "Jaipur",
    age: "17th Century",
    description: "A distinctive craft of Jaipur, blue pottery uses quartz stone powder, glass, and multani mitti instead of clay. Known for Persian-inspired cobalt blue motifs on a white base.",
    image: "pottery",
    endangered: true,
    artisanCount: 32,
    category: "Ceramics",
  },
  {
    id: "phad-painting",
    name: "Phad Painting",
    region: "Rajasthan",
    origin: "Bhilwara",
    age: "14th Century",
    description: "Scroll paintings narrating tales of folk deities Pabuji and Devnarayanji. Painted on handloom cloth using vegetable dyes, these scrolls were traditionally used by traveling bards.",
    image: "phad",
    endangered: true,
    artisanCount: 18,
    category: "Painting",
  },
  {
    id: "bandhani",
    name: "Bandhani",
    region: "Rajasthan",
    origin: "Jodhpur",
    age: "12th Century",
    description: "Ancient tie-dye technique where fabric is pinched and tied with thread at thousands of points to create intricate patterns when dyed. A symbol of matrimony in Rajasthan.",
    image: "bandhani",
    endangered: false,
    artisanCount: 120,
    category: "Textile",
  },
  {
    id: "gond-art",
    name: "Gond Art",
    region: "Madhya Pradesh",
    origin: "Dindori",
    age: "Ancient",
    description: "Tribal art form of the Gond people featuring intricate patterns of dots and dashes forming animals, trees, and mythological beings. Rooted in animistic beliefs.",
    image: "gond",
    endangered: true,
    artisanCount: 45,
    category: "Painting",
  },
  {
    id: "chanderi-weaving",
    name: "Chanderi Weaving",
    region: "Madhya Pradesh",
    origin: "Chanderi",
    age: "13th Century",
    description: "Ultra-fine handloom weaving combining silk and cotton with gold zari. Known for its sheer texture and iconic coin, peacock, and floral butis motifs.",
    image: "chanderi",
    endangered: true,
    artisanCount: 28,
    category: "Textile",
  },
  {
    id: "bagh-print",
    name: "Bagh Print",
    region: "Madhya Pradesh",
    origin: "Dhar",
    age: "16th Century",
    description: "Hand block printing using natural dyes and carved teak blocks. Named after the Bagh river, this GI-tagged craft features geometric and floral motifs in red and black.",
    image: "bagh",
    endangered: true,
    artisanCount: 22,
    category: "Textile",
  },
];

export const archiveArticles = [
  {
    id: "1",
    title: "The Dying Art of Phad Scrolls",
    category: "Research",
    excerpt: "How a 700-year-old narrative tradition faces extinction as the last master painters age without apprentices.",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "Blue Pottery: From Persia to Jaipur",
    category: "History",
    excerpt: "Tracing the Silk Road journey of quartz-based ceramics and their transformation in Rajasthani workshops.",
    readTime: "12 min",
  },
  {
    id: "3",
    title: "Gond Art & the Sacred Forest",
    category: "Culture",
    excerpt: "Understanding how tribal cosmology shapes every dot and line in this ancient art form from central India.",
    readTime: "6 min",
  },
  {
    id: "4",
    title: "The Chanderi Weaver's Loom",
    category: "Documentary",
    excerpt: "A day in the life of weavers who create fabrics so fine they can pass through a finger ring.",
    readTime: "10 min",
  },
  {
    id: "5",
    title: "Bagh Print: Colors from the River",
    category: "Technique",
    excerpt: "The painstaking 16-step natural dyeing process that gives Bagh textiles their distinctive red and black hues.",
    readTime: "7 min",
  },
  {
    id: "6",
    title: "Bandhani: Knots of Celebration",
    category: "Tradition",
    excerpt: "Why the number and pattern of tie-dye dots carry deep social meaning in Rajasthani marriage customs.",
    readTime: "5 min",
  },
];
