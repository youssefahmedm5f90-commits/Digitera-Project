import type { Product } from "@/features/products/types/product.types";

export const mockProducts: Product[] = [
  {
    id: "fleur-de-lune",
    name: "Fleur de Lune",
    description:
      "A luminous floral composition of jasmine and white musk. It blooms with radiant top notes and settles into a soft, luminous skin scent that lingers through the evening.",
    notes: "Floral / Jasmine & White Musk",
    price: 195,
    images: [
      "/images/products/fleur-de-lune.png",
      "/images/products/santal-parchment.png",
      "/images/products/sol-dor.png",
    ],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    topNotes: "White Peony, Bergamot, Pink Pepper",
    heartNotes: "Egyptian Jasmine Sambac, Iris",
    baseNotes: "White Musk, Sandalwood, Ambergris",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 140, "50 ml": 165, "100 ml": 195 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
  {
    id: "santal-parchment",
    name: "Santal Parchment",
    description:
      "Santal Parchment wraps around the skin like vintage vellum paper. It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.",
    notes: "Woody / Sandalwood & Cardamom",
    price: 220,
    images: [
      "/images/products/santal-parchment.png",
      "/images/products/fleur-de-lune.png",
      "/images/products/atelier-oud.png",
    ],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "personal-use",
    topNotes: "Sicilian Bergamot, Pink Pepper",
    heartNotes: "Egyptian Jasmine Sambac, Papyrus",
    baseNotes: "West Indian Sandalwood, Cardamom, Amber",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 140, "50 ml": 180, "100 ml": 220 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
  {
    id: "noir-cocoon",
    name: "Noir Cocoon",
    description:
      "An oriental blend of tobacco and amber. Deep and enveloping, it opens with spiced notes and settles into a rich, resinous accord that commands every room.",
    notes: "Oriental / Tobacco & Amber",
    price: 240,
    images: [
      "/images/products/noir-cocoon.png",
      "/images/products/atelier-oud.png",
      "/images/products/rose-absolute.png",
    ],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    topNotes: "Black Pepper, Cardamom, Elemi",
    heartNotes: "Tobacco Absolute, Labdanum",
    baseNotes: "Amber, Patchouli, Benzoin",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 155, "50 ml": 195, "100 ml": 240 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
  {
    id: "sol-dor",
    name: "Sol d'Or",
    description:
      "A fresh coastal blend of bergamot and sea salt. It evokes a golden Mediterranean shore at dusk, where the sea breeze carries hints of aromatic herbs and warm sands.",
    notes: "Fresh / Bergamot & Sea Salt",
    price: 185,
    images: [
      "/images/products/sol-dor.png",
      "/images/products/fleur-de-lune.png",
      "/images/products/santal-parchment.png",
    ],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "personal-use",
    topNotes: "Sicilian Bergamot, Sea Salt, Grapefruit",
    heartNotes: "Jasmine, Marine Accord, Rosemary",
    baseNotes: "Driftwood, Ambergris, White Musk",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 125, "50 ml": 155, "100 ml": 185 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
  {
    id: "atelier-oud",
    name: "Atelier Oud",
    description:
      "Rich oud deepened with saffron. This rare composition bridges the ancient spice routes with modern perfumery, creating a singular presence that is impossible to ignore.",
    notes: "Woody / Rich Oud & Saffron",
    price: 310,
    images: [
      "/images/products/atelier-oud.png",
      "/images/products/noir-cocoon.png",
      "/images/products/santal-parchment.png",
    ],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "gift-sets",
    topNotes: "Saffron, Rose Absolute, Frankincense",
    heartNotes: "Oud Wood, Cypriol, Vetiver",
    baseNotes: "Ambergris, Sandalwood, Musk",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 200, "50 ml": 255, "100 ml": 310 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
  {
    id: "rose-absolute",
    name: "Rose Absolute",
    description:
      "Damask rose balanced with cedar. A timeless floral architecture that captures the full complexity of the rose — from its bright, dewy opening to its warm, woody heart.",
    notes: "Floral / Damask Rose & Cedar",
    price: 205,
    images: [
      "/images/products/rose-absolute.png",
      "/images/products/fleur-de-lune.png",
      "/images/products/sol-dor.png",
    ],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    topNotes: "Turkish Rose, Raspberry, Lychee",
    heartNotes: "Damask Rose Absolute, Violet, Geranium",
    baseNotes: "Cedar, Vetiver, White Musk",
    options: [
      {
        id: "size",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        prices: { "30 ml": 135, "50 ml": 170, "100 ml": 205 },
      },
      {
        id: "gift-wrapping",
        name: "Gift Wrapping",
        values: ["Yes", "No"],
        prices: {},
      },
    ],
  },
];
