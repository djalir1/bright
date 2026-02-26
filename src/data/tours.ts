import tourGorilla from "@/assets/tour-gorilla.jpg";
import tourLake from "@/assets/tour-lake.jpg";
import tourNyungwe from "@/assets/tour-nyungwe.jpg";
import tourAkagera from "@/assets/tour-akagera.jpg";
import tourCulture from "@/assets/tour-culture.jpg";
import tourTwinlakes from "@/assets/tour-twinlakes.jpg";

export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  location: string;
  maxPeople: number;
  price: number;
  image: string;
  gallery: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string;
    accommodation: string;
  }[];
  included: string[];
  excluded: string[];
}

export const tours: Tour[] = [
  {
    id: "1",
    name: "Gorilla Trekking Adventure",
    slug: "gorilla-trekking",
    description: "Embark on a once-in-a-lifetime journey into the misty mountains of Volcanoes National Park. Trek through bamboo forests to encounter endangered mountain gorillas in their natural habitat. Our expert guides ensure a safe and unforgettable experience.",
    shortDescription: "Trek through misty mountains to meet mountain gorillas face-to-face.",
    duration: "3 Days",
    location: "Volcanoes National Park",
    maxPeople: 8,
    price: 1500,
    image: tourGorilla,
    gallery: [tourGorilla, tourNyungwe, tourAkagera, tourCulture, tourLake],
    itinerary: [
      { day: 1, title: "Arrival & Briefing", activities: "Airport transfer, check-in at Kinigi Guest House, evening briefing about gorilla trekking protocols.", accommodation: "Kinigi Guest House" },
      { day: 2, title: "Gorilla Trekking", activities: "Early morning departure, trek through Volcanoes National Park, 1-hour gorilla family visit, return to lodge.", accommodation: "Kinigi Guest House" },
      { day: 3, title: "Golden Monkey Trek & Departure", activities: "Morning golden monkey tracking, afternoon departure transfer to Kigali.", accommodation: "N/A" },
    ],
    included: ["Park entrance fees", "Gorilla trekking permit", "Professional guide", "All meals", "Transport", "Accommodation"],
    excluded: ["International flights", "Travel insurance", "Tips & gratuities", "Personal expenses"],
  },
  {
    id: "2",
    name: "Lake Kivu Retreat",
    slug: "lake-kivu-retreat",
    description: "Relax along the shores of one of Africa's Great Lakes. Enjoy kayaking, boat tours, and stunning sunsets over the water. A perfect blend of adventure and relaxation.",
    shortDescription: "Serene lakeside escape with kayaking, boat tours & stunning sunsets.",
    duration: "4 Days",
    location: "Lake Kivu, Gisenyi",
    maxPeople: 12,
    price: 950,
    image: tourLake,
    gallery: [tourLake, tourTwinlakes, tourCulture, tourGorilla, tourNyungwe],
    itinerary: [
      { day: 1, title: "Arrival at Lake Kivu", activities: "Drive to Gisenyi, hotel check-in, evening lakeside dinner.", accommodation: "Lake Kivu Serena Hotel" },
      { day: 2, title: "Water Activities", activities: "Morning kayaking, afternoon boat tour to Napoleon Island.", accommodation: "Lake Kivu Serena Hotel" },
      { day: 3, title: "Hot Springs & Coffee Tour", activities: "Visit nearby hot springs, afternoon coffee plantation tour.", accommodation: "Lake Kivu Serena Hotel" },
      { day: 4, title: "Departure", activities: "Morning swim, brunch, departure transfer.", accommodation: "N/A" },
    ],
    included: ["All meals", "Water activities", "Boat tours", "Transport", "Accommodation", "Coffee tour"],
    excluded: ["International flights", "Travel insurance", "Alcoholic drinks", "Personal expenses"],
  },
  {
    id: "3",
    name: "Nyungwe Forest Explorer",
    slug: "nyungwe-forest",
    description: "Walk above the canopy on Africa's only canopy walkway. Discover chimpanzees, colobus monkeys, and over 300 bird species in one of Africa's oldest rainforests.",
    shortDescription: "Canopy walkway, chimpanzee tracking & ancient rainforest discovery.",
    duration: "3 Days",
    location: "Nyungwe National Park",
    maxPeople: 10,
    price: 1200,
    image: tourNyungwe,
    gallery: [tourNyungwe, tourGorilla, tourAkagera, tourLake, tourTwinlakes],
    itinerary: [
      { day: 1, title: "Journey to Nyungwe", activities: "Drive through the beautiful countryside, check-in, evening nature walk.", accommodation: "Nyungwe Top View Hotel" },
      { day: 2, title: "Canopy Walk & Chimps", activities: "Morning canopy walkway experience, afternoon chimpanzee tracking.", accommodation: "Nyungwe Top View Hotel" },
      { day: 3, title: "Waterfall Hike & Departure", activities: "Morning waterfall trail hike, birding, departure.", accommodation: "N/A" },
    ],
    included: ["Park fees", "Chimp tracking permit", "Canopy walk", "Guide", "All meals", "Transport", "Accommodation"],
    excluded: ["International flights", "Travel insurance", "Tips", "Personal expenses"],
  },
  {
    id: "4",
    name: "Akagera Safari Experience",
    slug: "akagera-safari",
    description: "Experience the Big Five in Rwanda's only savanna park. Game drives reveal lions, elephants, giraffes, and hippos against stunning East African landscapes.",
    shortDescription: "Big Five game drives in Rwanda's spectacular savanna park.",
    duration: "2 Days",
    location: "Akagera National Park",
    maxPeople: 6,
    price: 800,
    image: tourAkagera,
    gallery: [tourAkagera, tourLake, tourGorilla, tourCulture, tourNyungwe],
    itinerary: [
      { day: 1, title: "Game Drive Day", activities: "Early departure from Kigali, full-day game drive, sunset boat safari on Lake Ihema.", accommodation: "Akagera Game Lodge" },
      { day: 2, title: "Morning Drive & Departure", activities: "Dawn game drive, brunch at lodge, return to Kigali.", accommodation: "N/A" },
    ],
    included: ["Park fees", "Game drives", "Boat safari", "Guide", "All meals", "Transport", "Accommodation"],
    excluded: ["International flights", "Travel insurance", "Tips", "Personal expenses"],
  },
  {
    id: "5",
    name: "Cultural Rwanda Tour",
    slug: "cultural-rwanda",
    description: "Immerse yourself in Rwanda's vibrant culture. Visit traditional villages, watch Intore dance performances, learn about basket weaving, and explore the Kigali Genocide Memorial.",
    shortDescription: "Discover traditional dance, crafts & Rwanda's powerful heritage.",
    duration: "5 Days",
    location: "Kigali & Northern Province",
    maxPeople: 15,
    price: 1100,
    image: tourCulture,
    gallery: [tourCulture, tourGorilla, tourLake, tourTwinlakes, tourAkagera],
    itinerary: [
      { day: 1, title: "Kigali City Tour", activities: "Genocide Memorial, Inema Arts Center, local food tasting.", accommodation: "Kigali Marriott" },
      { day: 2, title: "Craft Villages", activities: "Visit Gahaya Links basket weavers, pottery workshops.", accommodation: "Kigali Marriott" },
      { day: 3, title: "King's Palace", activities: "Drive to Nyanza, visit King's Palace Museum, Intore dance show.", accommodation: "Nyanza Guest House" },
      { day: 4, title: "Rural Experience", activities: "Community homestay experience, farming activities, cooking class.", accommodation: "Community Homestay" },
      { day: 5, title: "Departure", activities: "Morning market visit, departure.", accommodation: "N/A" },
    ],
    included: ["All entrance fees", "Cultural activities", "Guide", "All meals", "Transport", "Accommodation"],
    excluded: ["International flights", "Travel insurance", "Souvenirs", "Personal expenses"],
  },
  {
    id: "6",
    name: "Twin Lakes Discovery",
    slug: "twin-lakes",
    description: "Explore the stunning Twin Lakes of Burera and Ruhondo, nestled between volcanic peaks. Hike through terraced hillsides and enjoy breathtaking panoramic views.",
    shortDescription: "Hike volcanic landscapes and discover serene twin crater lakes.",
    duration: "2 Days",
    location: "Burera & Ruhondo",
    maxPeople: 10,
    price: 650,
    image: tourTwinlakes,
    gallery: [tourTwinlakes, tourLake, tourNyungwe, tourGorilla, tourAkagera],
    itinerary: [
      { day: 1, title: "Trek to the Lakes", activities: "Drive to Musanze, hike to Lake Burera viewpoint, canoe trip.", accommodation: "Virunga Lodge" },
      { day: 2, title: "Lake Ruhondo & Departure", activities: "Morning hike to Lake Ruhondo, community visit, return to Kigali.", accommodation: "N/A" },
    ],
    included: ["Hiking guide", "Canoe trip", "All meals", "Transport", "Accommodation"],
    excluded: ["International flights", "Travel insurance", "Tips", "Personal expenses"],
  },
];
