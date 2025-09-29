// src/data/traditionalPreservatives.ts
export const traditionalPreservatives = {
  cloves: {
    name: "Cloves",
    crops: ["fish", "meat", "maize", "beans", "rice", "cassava"],
    effectiveness: 0.75, // 75% reduction in spoilage
    application: "5-10 cloves per 50kg bag",
    benefits: ["Antifungal", "Insect repellent", "Natural"],
    limitations: ["Strong flavor", "May affect taste"],
    scientificBasis: "Eugenol content provides antimicrobial properties"
  },
  ginger: {
    name: "Ginger",
    crops: ["rice", "beans", "cassava", "fish", "meat"],
    effectiveness: 0.65,
    application: "100g powdered ginger per 50kg",
    benefits: ["Antimicrobial", "Antioxidant"],
    limitations: ["Moisture absorption"],
    scientificBasis: "Gingerol compounds inhibit fungal growth"
  },
  neem: {
    name: "Neem Leaves",
    crops: ["maize", "rice", "wheat", "beans", "fish", "meat"],
    effectiveness: 0.80,
    application: "Handful of dried leaves per storage container",
    benefits: ["Pest control", "Antifungal", "Eco-friendly"],
    limitations: ["Bitter taste", "Requires drying"],
    scientificBasis: "Azadirachtin disrupts insect life cycles"
  },
  garlic: {
    name: "Garlic",
    crops: ["grains", "legumes", "fish", "meat"],
    effectiveness: 0.60,
    application: "5-10 cloves per storage unit",
    benefits: ["Antimicrobial", "Insect deterrent"],
    limitations: ["Odor transfer", "Short-term effectiveness"],
    scientificBasis: "Allicin provides antimicrobial activity"
  },
  turmeric: {
    name: "Turmeric",
    crops: ["rice", "beans", "grains", "fish", "meat"],
    effectiveness: 0.55,
    application: "50g powder per 50kg storage",
    benefits: ["Antioxidant", "Antimicrobial", "Natural coloring"],
    limitations: ["Stains", "Color transfer"],
    scientificBasis: "Curcumin has antifungal properties"
  },
  salt: {
    name: "Salt",
    crops: ["grains", "dried vegetables", "fish", "meat"],
    effectiveness: 0.70,
    application: "2-5% of product weight",
    benefits: ["Moisture absorption", "Preservative"],
    limitations: ["Affects taste", "Requires dry conditions"],
    scientificBasis: "Reduces water activity to inhibit microbial growth"
  }
};

// Crop-specific compatibility
export const cropPreservativeCompatibility = {
  maize: ["Cloves", "Neem", "Garlic", "salt"],
  rice: ["Cloves", "Ginger", "turmeric", "Neem", "salt"],
  beans: ["Cloves", "Ginger", "Neem", "Garlic"],
  cassava: ["Cloves", "Ginger", "Neem"],
  wheat: ["neem", "Cloves", "salt"],
  potatoes: ["garlic", "Neem"],
  tomatoes: ["garlic", "Ginger", "turmeric"],
  fish: ["Cloves", "Ginger", "turmeric", "Neem", "salt", "Garlic"],
  meat: ["Cloves", "Ginger", "turmeric", "Neem", "salt", "Garlic"],
};