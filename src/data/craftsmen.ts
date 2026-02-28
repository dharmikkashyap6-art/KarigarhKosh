export interface Craftsman {
  id: string;
  name: string;
  craft: string;
  region: "Rajasthan" | "Madhya Pradesh";
  location: string;
  experience: string;
  image: string;
  story: string;
  materials: string[];
  endangered: boolean;
  pricePerHour: number;
  rating: number;
  specialties: string[];
}

export const craftsmen: Craftsman[] = [
  {
    id: "1",
    name: "Mohan Lal Kumhar",
    craft: "Blue Pottery",
    region: "Rajasthan",
    location: "Jaipur",
    experience: "42 years",
    image: "pottery",
    story: "Born into a family of potters in the narrow lanes of Jaipur's old city, Mohan Lal learned the art of blue pottery from his grandfather. His pieces are displayed in galleries across Europe and Asia. He is one of the last masters who still uses the traditional quartz-based technique passed down through seven generations.",
    materials: ["Quartz Stone", "Raw Glaze", "Cobalt Oxide", "Multani Mitti"],
    endangered: true,
    pricePerHour: 2500,
    rating: 4.9,
    specialties: ["Persian Motifs", "Floral Patterns", "Geometric Art"],
  },
  {
    id: "2",
    name: "Shanti Devi Joshi",
    craft: "Phad Painting",
    region: "Rajasthan",
    location: "Bhilwara",
    experience: "35 years",
    image: "phad",
    story: "Shanti Devi broke the tradition of Phad painting being a male-only art form. Her scrolls depicting the stories of Pabuji and Devnarayanji have been exhibited at the National Gallery. She uses only natural dyes extracted from flowers, minerals, and bark.",
    materials: ["Handloom Cloth", "Natural Dyes", "Bamboo Brushes", "Gum Arabic"],
    endangered: true,
    pricePerHour: 2000,
    rating: 4.8,
    specialties: ["Narrative Scrolls", "Deity Panels", "Folk Epics"],
  },
  {
    id: "3",
    name: "Fatima Begum",
    craft: "Bandhani",
    region: "Rajasthan",
    location: "Jodhpur",
    experience: "28 years",
    image: "bandhani",
    story: "With fingers that move faster than the eye can follow, Fatima creates thousands of tiny knots on fabric to produce the intricate patterns of Bandhani. Her work has adorned brides across Rajasthan for nearly three decades.",
    materials: ["Pure Silk", "Cotton Fabric", "Natural Dyes", "Cotton Thread"],
    endangered: false,
    pricePerHour: 1800,
    rating: 4.7,
    specialties: ["Bridal Odhni", "Leheriya", "Mothda Pattern"],
  },
  {
    id: "4",
    name: "Jangarh Singh Shyam",
    craft: "Gond Art",
    region: "Madhya Pradesh",
    location: "Dindori",
    experience: "30 years",
    image: "gond",
    story: "A torchbearer of the Pardhan Gond tradition, Jangarh's intricate dot-and-line patterns transform ordinary surfaces into mythological landscapes. His work bridges the ancient tribal worldview with contemporary art sensibilities.",
    materials: ["Handmade Paper", "Natural Pigments", "Nib Pens", "Acrylic Colors"],
    endangered: true,
    pricePerHour: 2200,
    rating: 4.9,
    specialties: ["Tree of Life", "Animal Spirits", "Creation Myths"],
  },
  {
    id: "5",
    name: "Rekha Verma",
    craft: "Chanderi Weaving",
    region: "Madhya Pradesh",
    location: "Chanderi",
    experience: "25 years",
    image: "chanderi",
    story: "Rekha's handloom produces the legendary Chanderi fabric — so fine it can pass through a ring. Working on her grandmother's 200-year-old loom, she weaves gold zari into translucent silk, creating textiles that have clothed royalty for centuries.",
    materials: ["Mulberry Silk", "Gold Zari", "Cotton Yarn", "Wooden Loom"],
    endangered: true,
    pricePerHour: 3000,
    rating: 5.0,
    specialties: ["Zari Brocade", "Butis Pattern", "Tissue Weave"],
  },
  {
    id: "6",
    name: "Abdul Rashid Khan",
    craft: "Bagh Print",
    region: "Madhya Pradesh",
    location: "Dhar",
    experience: "38 years",
    image: "bagh",
    story: "Abdul Rashid's family has practiced the art of Bagh printing for over 400 years. Using hand-carved teak blocks and natural dyes from the river Bagh, he creates textiles that carry the geometric precision of Mughal gardens.",
    materials: ["Teak Wood Blocks", "Alizarin", "Iron Rust", "River Water"],
    endangered: true,
    pricePerHour: 1500,
    rating: 4.6,
    specialties: ["Geometric Motifs", "Floral Blocks", "Panel Prints"],
  },
];
