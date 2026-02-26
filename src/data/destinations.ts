import tourGorilla from "@/assets/tour-gorilla.jpg";
import tourLake from "@/assets/tour-lake.jpg";
import tourNyungwe from "@/assets/tour-nyungwe.jpg";
import tourAkagera from "@/assets/tour-akagera.jpg";
import tourCulture from "@/assets/tour-culture.jpg";
import tourTwinlakes from "@/assets/tour-twinlakes.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  location: string;
  culturalSignificance: string;
}

export interface DestinationCategory {
  id: string;
  category: string;
  destinations: Destination[];
}

export const destinationCategories: DestinationCategory[] = [
  {
    id: "cat-1",
    category: "National Parks & Wildlife",
    destinations: [
      {
        id: "1",
        name: "Volcanoes National Park",
        slug: "volcanoes-national-park",
        image: tourGorilla,
        images: [tourGorilla, hero3, hero1],
        shortDescription: "Home of the endangered mountain gorillas in the Virunga Mountains.",
        description: "Volcanoes National Park is Rwanda's premier wildlife destination, nestled in the Virunga Mountains. It shelters over a third of the world's remaining mountain gorillas, along with golden monkeys and diverse birdlife.",
        location: "Musanze, Northern Province",
        culturalSignificance: "Made famous by primatologist Dian Fossey, who dedicated her life to gorilla conservation here.",
      },
      {
        id: "2",
        name: "Akagera National Park",
        slug: "akagera-national-park",
        image: tourAkagera,
        images: [tourAkagera, hero1, hero2],
        shortDescription: "Rwanda's only savanna park — home to the Big Five.",
        description: "Akagera National Park is Rwanda's largest protected wetland and the last remaining refuge for savanna-adapted species. Reintroduction programs have brought back lions, rhinos, and elephants.",
        location: "Eastern Province",
        culturalSignificance: "Named after the Akagera River, the park is a conservation success story with community-based tourism programs.",
      },
      {
        id: "4",
        name: "Nyungwe Forest National Park",
        slug: "nyungwe-forest",
        image: tourNyungwe,
        images: [tourNyungwe, hero4, hero3],
        shortDescription: "One of Africa's oldest rainforests — canopy walkway & chimpanzee tracking.",
        description: "Nyungwe Forest is one of the oldest and most biodiverse montane rainforests in Africa. It features the continent's only canopy walkway, 13 primate species including chimpanzees, and over 300 bird species.",
        location: "Southern Province",
        culturalSignificance: "The forest has spiritual significance for local communities and plays a crucial role as a watershed for the Nile and Congo river basins.",
      },
    ],
  },
  {
    id: "cat-2",
    category: "Lakes & Waterways",
    destinations: [
      {
        id: "3",
        name: "Lake Kivu",
        slug: "lake-kivu",
        image: tourLake,
        images: [tourLake, hero2, tourTwinlakes],
        shortDescription: "One of Africa's Great Lakes — beaches, islands, and breathtaking sunsets.",
        description: "Lake Kivu stretches along Rwanda's western border, offering pristine beaches, warm waters, and island excursions. The lakeside towns of Gisenyi, Kibuye, and Cyangugu provide relaxation and cultural encounters.",
        location: "Western Province",
        culturalSignificance: "Lake Kivu has long been central to local livelihoods, with traditional fishing methods passed down through generations.",
      },
      {
        id: "6",
        name: "Twin Lakes Burera & Ruhondo",
        slug: "twin-lakes",
        image: tourTwinlakes,
        images: [tourTwinlakes, tourLake, hero1],
        shortDescription: "Serene crater lakes nestled between volcanic peaks.",
        description: "The Twin Lakes of Burera and Ruhondo sit at the foot of the Virunga volcanoes, surrounded by terraced hillsides and rural communities. Hiking, canoeing, and birdwatching are the main attractions.",
        location: "Burera District, Northern Province",
        culturalSignificance: "The lakes are sacred to local communities and have inspired numerous legends.",
      },
    ],
  },
  {
    id: "cat-3",
    category: "Culture & Cities",
    destinations: [
      {
        id: "5",
        name: "Kigali City",
        slug: "kigali-city",
        image: tourCulture,
        images: [tourCulture, hero4, hero2],
        shortDescription: "Africa's cleanest city — vibrant arts, cuisine, and powerful history.",
        description: "Kigali is Rwanda's dynamic capital, known as one of the cleanest and safest cities in Africa. From the Kigali Genocide Memorial to the Inema Arts Center, colorful markets, and thriving food scene.",
        location: "Central Rwanda",
        culturalSignificance: "Kigali embodies Rwanda's remarkable transformation and resilience.",
      },
    ],
  },
];

// Flat list for backward compatibility
export const destinations: Destination[] = destinationCategories.flatMap(c => c.destinations);
