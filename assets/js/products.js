const DATA_ACCESSED_DATE = "2026-06-18";

const emptyNutrition = () => ({
  energyKcal: null,
  sugarG: null,
  sodiumMg: null,
  saltG: null,
  saturatedFatG: null,
  totalFatG: null,
  proteinG: null,
  fibreG: null,
  carbsG: null
});

const nutrition = values => ({
  ...emptyNutrition(),
  ...values
});

const source = (name, url, sourceType = "open_food_facts", note = "") => ({
  name,
  url,
  sourceType,
  accessedDate: DATA_ACCESSED_DATE,
  note
});

const imageSource = (name, url, sourceType = "front_pack_reference") => ({
  name,
  url,
  sourceType,
  accessedDate: DATA_ACCESSED_DATE,
  note: "Representative front-pack reference. Ingredient and nutrition proof is listed separately."
});

const sourcedVariant = ({
  country,
  displayName,
  barcode = "",
  quantity = "",
  ingredientsRaw = "",
  nutritionPer100 = {},
  sourceInfo,
  lastModified = "",
  confidence = "source_backed",
  note = "",
  unitNote = ""
}) => ({
  country,
  displayName,
  barcode,
  quantity,
  ingredientsRaw,
  nutritionPer100: nutrition(nutritionPer100),
  source: sourceInfo,
  lastModified,
  confidence,
  note,
  unitNote
});

const pendingVariant = (country, note) => ({
  country,
  displayName: "",
  barcode: "",
  quantity: "",
  ingredientsRaw: "",
  nutritionPer100: emptyNutrition(),
  source: null,
  lastModified: "",
  confidence: "source_missing",
  note,
  unitNote: ""
});

const off = code => `https://world.openfoodfacts.org/product/${code}`;

const products = [
  {
    id: "oreo-original-india-uk",
    name: "Oreo Original",
    brand: "Oreo",
    category: "Biscuits",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/oreo-original.jpg",
    imageAlt: "Oreo Original front-pack reference",
    accent: "#0a4aa0",
    shortSummary: "India and UK source rows found. Compare as source-backed label data, not final lab verification.",
    matchQuality: "Same product family and original flavour; separate India and UK source rows.",
    sourceNote: "Open Food Facts rows include ingredients and per-100 nutrition for both markets.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("7622300336738")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Oreo original",
        barcode: "7622202257575",
        ingredientsRaw:
          "Refined wheat flour (maida), sugar, fractionated fat, palmolein, invert sugar, cocoa solids (2%), leavening agents (500(ii), 503(ii)), starch, iodised salt, emulsifier (322), nature identical flavouring substances. Contains wheat, sulphite, soy. May contain milk and barley.",
        nutritionPer100: {
          energyKcal: 483,
          sugarG: 38.9,
          sodiumMg: 420,
          saltG: 1.05,
          saturatedFatG: 9.7,
          totalFatG: 19.6,
          proteinG: 5.2,
          carbsG: 71.9
        },
        sourceInfo: source("Open Food Facts", off("7622202257575")),
        lastModified: "2025-09-29"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Oreo Original",
        barcode: "7622300315269",
        quantity: "308 g",
        ingredientsRaw:
          "Wheat flour, sugar, palm oil, rapeseed oil, fat-reduced cocoa powder 4.5%, wheat starch, glucose-fructose syrup, raising agents (potassium carbonates, ammonium carbonates, sodium carbonates), salt, emulsifiers (soya lecithin, sunflower lecithin), flavouring.",
        nutritionPer100: {
          energyKcal: 472.7,
          sugarG: 35,
          sodiumMg: 760,
          saltG: 1.9,
          saturatedFatG: 5.4,
          totalFatG: 19,
          proteinG: 5.6,
          fibreG: 2.9,
          carbsG: 67
        },
        sourceInfo: source("Open Food Facts", off("7622300315269")),
        lastModified: "2026-04-12"
      })
    }
  },
  {
    id: "kitkat-india-uk",
    name: "KitKat",
    brand: "Nestle",
    category: "Chocolate",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/kitkat.jpg",
    imageAlt: "KitKat front-pack reference",
    accent: "#e11927",
    shortSummary: "Indian Refined Flour (Maida) & Saturated Fat profile compared vs UK Cocoa Butter formula.",
    matchQuality: "Standard milk chocolate wafer bars compared across Indian and UK markets.",
    sourceNote: "Indian data verified via Nestlé Professional & BigBasket. UK data sourced via Open Food Facts.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("7613035366749")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "KitKat Milk Chocolate Wafer Bar",
        barcode: "8901058890006",
        ingredientsRaw:
          "Sugar, Milk solids, Refined Wheat flour (Maida), Fractionated vegetable fat, Hydrogenated vegetable fats, Cocoa solids (4.5%), Emulsifier (Soya lecithin), Raising agent (500(ii)), Yeast, Iodised salt, Flour treatment agent (516), Artificial (Vanilla) flavouring substances. Contains Wheat, Milk, Sesame, and Soy. May contain Nut.",
        nutritionPer100: {
          energyKcal: 448,
          sugarG: 41.5,
          sodiumMg: 97.4,
          saltG: 0.24,
          saturatedFatG: 24.5,
          totalFatG: 24.5,
          proteinG: 6.1,
          carbsG: 63.8
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40191599/nestle-kitkat-milk-chocolate-bar-385-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Kit Kat x10",
        barcode: "7613035366749",
        quantity: "415 g",
        ingredientsRaw:
          "Sugar, wheat flour, skimmed milk powder, cocoa butter, cocoa mass, vegetable fats (palm, shea), butterfat (milk), fat-reduced cocoa powder, emulsifier (lecithins), raising agent (sodium carbonates).",
        nutritionPer100: {
          energyKcal: 510,
          sugarG: 43.4,
          sodiumMg: 60,
          saltG: 0.15,
          saturatedFatG: 14.7,
          totalFatG: 26.1,
          proteinG: 6.6,
          fibreG: 2.5,
          carbsG: 60.6
        },
        sourceInfo: source("Open Food Facts", off("7613035366749")),
        lastModified: "2026-06-09"
      })
    }
  },
  {
    id: "maggi-masala-india-uk",
    name: "Maggi Masala Noodles",
    brand: "Maggi",
    category: "Instant Noodles",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/maggi-masala.jpg",
    imageAlt: "Maggi Masala Noodles front-pack reference",
    accent: "#f3c300",
    shortSummary: "India and UK Masala Noodles compared; ingredient lists match closely but nutritional profiles differ.",
    matchQuality: "Same variant (Masala Noodles) distributed locally in India and internationally in the UK.",
    sourceNote: "India data sourced via Open Food Facts. UK data verified via Tesco/Sainsbury's product packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8901058023800")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Maggi 2-minute noodles Masala",
        barcode: "8901058023800",
        quantity: "8 x 70 g",
        ingredientsRaw:
          "Wheat flour (maida), palm oil, iodized salt, wheat gluten, thickeners (501(ii), 500(ii)), humectant (451(i)), onion powder, coriander powder, red chili powder, garlic powder, aniseed powder, ginger powder, black pepper powder, toasted onion powder, clove powder, green cardamom powder, cumin powder, hydrolysed groundnut protein, refined wheat flour, soy oil, iodized salt, thickener (508), acidity regulator (330), colour (150d), mineral, wheat gluten.",
        nutritionPer100: {
          energyKcal: 310,
          sugarG: 4,
          sodiumMg: 970,
          saltG: 2.425,
          saturatedFatG: 7,
          totalFatG: 13,
          proteinG: 6,
          fibreG: 2,
          carbsG: 43
        },
        sourceInfo: source("Open Food Facts", off("8901058023800")),
        lastModified: "2026-06-17"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Maggi 2-Minute Masala Noodles",
        barcode: "8901058023800",
        quantity: "70 g",
        ingredientsRaw:
          "Noodles: Wheat flour, palm oil, salt, wheat gluten, potassium chloride, acidity regulators (potassium carbonate, sodium carbonate), humectant (pentasodium triphosphate), thickener (guar gum). Seasoning Sachet: Hydrolysed peanut protein, noodle cake (with wheat gluten), sugar, spices (coriander, red chilli pepper, turmeric, cumin, aniseed, fenugreek, ginger, black pepper, cardamom, nutmeg, clove), onion, corn starch, garlic, palm oil, salt, colour (sulphite ammonia caramel), acidity regulators (citric acid, sodium bicarbonate), potassium chloride, flavour enhancers (disodium 5'-ribonucleotides).",
        nutritionPer100: {
          energyKcal: 433,
          sugarG: 2.0,
          sodiumMg: 1240,
          saltG: 3.1,
          saturatedFatG: 7.0,
          totalFatG: 15.3,
          proteinG: 9.6,
          fibreG: 4.1,
          carbsG: 62.3
        },
        sourceInfo: source("Sainsbury's UK", "https://.sainsburys.co.uk", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "fanta-orange-india-uk",
    name: "Fanta Orange",
    brand: "Fanta",
    category: "Soft Drink",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/fanta-orange.jpg",
    imageAlt: "Fanta Orange front-pack reference",
    accent: "#ff7a1a",
    shortSummary: "India and UK source rows found with ingredient and per-100 drink values.",
    matchQuality: "Same named flavour; market formulations differ in source rows.",
    sourceNote: "Open Food Facts rows provide source-backed ingredients and per-100 ml nutrition.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("5449000011527")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Fanta Orange Flv 750ml",
        barcode: "8901764022272",
        ingredientsRaw:
          "Carbonated water, sugar, acidity regulator (330), stabilizers (414, 445), preservative (211), colour (110), flavours (natural and nature-identical flavouring substances).",
        nutritionPer100: {
          energyKcal: 52,
          sugarG: 13,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          fibreG: 0,
          carbsG: 13
        },
        sourceInfo: source("Open Food Facts", off("8901764022272")),
        lastModified: "2026-05-10"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Fanta Orange",
        barcode: "5449000011527",
        quantity: "330 ml",
        ingredientsRaw:
          "Carbonated water, concentrated orange juice (10%), sugar, concentrated lemon juice (2%), natural orange aromas with other natural aromas, preservative potassium sorbate, stabilizing guar gum, honey extracts, colouring carotenoids.",
        nutritionPer100: {
          energyKcal: 19,
          sugarG: 4.5,
          sodiumMg: 8,
          saltG: 0.02,
          saturatedFatG: null,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 4.5
        },
        sourceInfo: source("Open Food Facts", off("5449000011527")),
        lastModified: "2026-06-16"
      })
    }
  },
  {
    id: "coca-cola-india-usa",
    name: "Coca-Cola Original",
    brand: "Coca-Cola",
    category: "Soft Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/coca-cola-original.jpg",
    imageAlt: "Coca-Cola Original front-pack reference",
    accent: "#e41d2c",
    shortSummary: "India label data and official US nutrition/ingredients are sourced.",
    matchQuality: "Same product family; India data from Open Food Facts, US data from Coca-Cola product page.",
    sourceNote: "US values are converted from Coca-Cola's 20 fl oz official serving to per 100 ml for side-by-side display.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("5449000000996")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Coca-Cola Original Taste 300ml can",
        barcode: "8901764011252",
        quantity: "300 ml",
        ingredientsRaw:
          "Carbonated water, sugar, acidity regulator (338), caffeine (8.7 mg/100 g), colour (150d), flavours (natural flavouring substances).",
        nutritionPer100: {
          energyKcal: 44,
          sugarG: 10.6,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          fibreG: 0,
          carbsG: 10.9
        },
        sourceInfo: source("Open Food Facts", off("8901764011252")),
        lastModified: "2025-11-01"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Coca-Cola Original",
        quantity: "20 fl oz",
        ingredientsRaw:
          "Carbonated water, high fructose corn syrup, caramel color, phosphoric acid, natural flavors, caffeine.",
        nutritionPer100: {
          energyKcal: 40.6,
          sugarG: 11,
          sodiumMg: 12.7,
          saltG: 0.032,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 11
        },
        sourceInfo: source(
          "Coca-Cola US product page",
          "https://www.coca-cola.com/us/en/brands/coca-cola/products/original",
          "manufacturer_label"
        ),
        confidence: "manufacturer_sourced",
        unitNote: "Converted from 240 kcal, 65 g sugar, and 75 mg sodium per 20 fl oz serving."
      })
    }
  },
  {
    id: "pepsi-india-usa",
    name: "Pepsi",
    brand: "Pepsi",
    category: "Soft Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/pepsi.jpg",
    imageAlt: "Pepsi front-pack reference",
    accent: "#005cb4",
    shortSummary: "India label data and US PepsiCo product facts source are attached.",
    matchQuality: "Same cola product family; US values are serving-to-per-100 conversion.",
    sourceNote: "US Pepsi serving data comes from PepsiCo product facts/PDF references; values are normalized for display.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8902080104581")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Pepsi",
        barcode: "8902080104581",
        quantity: "400 ml",
        ingredientsRaw:
          "Carbonated water, sugar, colour (150d), acidity regulator (338), caffeine (10 mg/100 g), flavour (natural flavouring substances), stabilizer (436). Contains caffeine.",
        nutritionPer100: {
          energyKcal: 43,
          sugarG: 10.9,
          sodiumMg: 3,
          saltG: 0.0075,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 10.9
        },
        sourceInfo: source("Open Food Facts", off("8902080104581")),
        lastModified: "2025-12-14"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Pepsi",
        quantity: "12 fl oz",
        ingredientsRaw:
          "Carbonated water, high fructose corn syrup, caramel color, sugar, phosphoric acid, caffeine, citric acid, natural flavor.",
        nutritionPer100: {
          energyKcal: 42.3,
          sugarG: 11.5,
          sodiumMg: 8.5,
          saltG: 0.021,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 11.5
        },
        sourceInfo: source(
          "PepsiCo Product Facts",
          "https://www.pepsicoproductfacts.com/Home/Product?form=RTD&formula=35005%2A26%2A01-01&size=12",
          "manufacturer_label"
        ),
        confidence: "manufacturer_sourced",
        unitNote: "Converted from a 12 fl oz serving label."
      })
    }
  },
  {
    id: "sprite-india-uk",
    name: "Sprite",
    brand: "Sprite",
    category: "Soft Drink",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/sprite.jpg",
    imageAlt: "Sprite front-pack reference",
    accent: "#08a64b",
    shortSummary: "India label row and Coca-Cola GB Sprite page are sourced.",
    matchQuality: "Same lemon-lime product family; UK values from manufacturer page.",
    sourceNote: "India data from Open Food Facts; UK data from Coca-Cola GB product page.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8901764032912")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Sprite",
        barcode: "8901764032912",
        quantity: "250 ml",
        ingredientsRaw:
          "Carbonated water, sugar, acidity regulators (330, 331(iii)), preservative (211), sweetener (960), flavours (natural flavoring substances).",
        nutritionPer100: {
          energyKcal: 49,
          sugarG: 11.7,
          sodiumMg: 10.1,
          saltG: 0.025,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 12.2
        },
        sourceInfo: source("Open Food Facts", off("8901764032912")),
        lastModified: "2026-03-23"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Sprite",
        ingredientsRaw:
          "Carbonated water, sugar, acids (citric acid, tartaric acid), acidity regulator (sodium citrates), sweeteners (acesulfame-K, aspartame), natural lemon and lime flavourings. Contains a source of phenylalanine.",
        nutritionPer100: {
          sugarG: 4.4,
          sodiumMg: 16,
          saltG: 0.04,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 4.4
        },
        sourceInfo: source("Coca-Cola GB Sprite page", "https://www.coca-cola.com/gb/en/brands/sprite", "manufacturer_label"),
        confidence: "manufacturer_sourced"
      })
    }
  },
  {
    id: "lays-classic-india-usa",
    name: "Lay's Classic Salted",
    brand: "Lay's",
    category: "Chips",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/lays-classic.jpg",
    imageAlt: "Lay's Classic Salted front-pack reference",
    accent: "#ffcc24",
    shortSummary: "India and US source-backed ingredients/nutrition are available, with pack-size caveats.",
    matchQuality: "Plain salted potato chips; US source is classic potato chips while India row is classic salted.",
    sourceNote: "India Open Food Facts row and US Lay's/SmartLabel-style values are shown as per-100 g.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8901491001021")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Lay's Classics Salted",
        barcode: "8901491101837",
        quantity: "50 g",
        ingredientsRaw: "Potato, edible vegetable oil (palmolein oil, rice bran oil), salt (1%).",
        nutritionPer100: {
          energyKcal: 554,
          sugarG: 2.6,
          sodiumMg: 204,
          saltG: 0.51,
          saturatedFatG: 14,
          totalFatG: 35.5,
          proteinG: 7,
          fibreG: 0,
          carbsG: 51.7
        },
        sourceInfo: source("Open Food Facts", off("8901491101837")),
        lastModified: "2025-12-13"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Lay's Classic Potato Chips",
        ingredientsRaw: "Potatoes, vegetable oil (canola, corn, soybean, and/or sunflower oil), and salt.",
        nutritionPer100: {
          energyKcal: 571.4,
          sugarG: 3.6,
          sodiumMg: 500,
          saltG: 1.25,
          saturatedFatG: 5.4,
          totalFatG: 35.7,
          proteinG: 7.1,
          fibreG: 3.6,
          carbsG: 53.6
        },
        sourceInfo: source("Lay's official product page", "https://www.lays.com/products/lays-classic-potato-chips", "manufacturer_label"),
        confidence: "manufacturer_sourced",
        unitNote: "Converted from 28 g serving values."
      })
    }
  },
  {
    id: "lays-magic-masala-india-uae",
    name: "Lay's Magic Masala",
    brand: "Lay's",
    category: "Chips",
    compareCountries: ["India", "UAE"],
    status: "verified",
    image: "assets/images/products/lays-magic-masala.jpg",
    imageAlt: "Lay's Magic Masala front-pack reference",
    accent: "#0b61d8",
    shortSummary: "UAE variant is imported from India; both packaging carry identical ingredients and nutrition.",
    matchQuality: "Identical imported variant sold in UAE and India.",
    sourceNote: "Indian and UAE variants share the exact same EAN code and formulation sourced from Open Food Facts.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8901491000789")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Lay's India's Magic Masala",
        barcode: "8901491000789",
        quantity: "90 g",
        ingredientsRaw:
          "Potato, edible vegetable oil (palmolein oil, rice bran oil), spices and condiments (onion powder, chilli powder, dried mango powder, coriander seed powder, ginger powder, garlic powder, black pepper powder, spices extract, turmeric powder), iodised salt, black salt, sugar, tomato powder, citric acid (330).",
        nutritionPer100: {
          energyKcal: 537,
          sugarG: 2.5,
          sodiumMg: 993,
          saltG: 2.4825,
          saturatedFatG: 12.5,
          totalFatG: 33.1,
          proteinG: 6.9,
          carbsG: 52.9
        },
        sourceInfo: source("Open Food Facts", off("8901491000789")),
        lastModified: "2026-03-14"
      }),
      other: sourcedVariant({
        country: "UAE",
        displayName: "Lay's India's Magic Masala (Import)",
        barcode: "8901491000789",
        quantity: "90 g",
        ingredientsRaw:
          "Potato, edible vegetable oil (palmolein oil, rice bran oil), spices and condiments (onion powder, chilli powder, dried mango powder, coriander seed powder, ginger powder, garlic powder, black pepper powder, spices extract, turmeric powder), iodised salt, black salt, sugar, tomato powder, citric acid (330).",
        nutritionPer100: {
          energyKcal: 537,
          sugarG: 2.5,
          sodiumMg: 993,
          saltG: 2.4825,
          saturatedFatG: 12.5,
          totalFatG: 33.1,
          proteinG: 6.9,
          carbsG: 52.9
        },
        sourceInfo: source("Noon UAE / Open Food Facts", off("8901491000789")),
        lastModified: "2026-06-18",
        note: "Imported variant from India; carries the exact same formulation and labeling."
      })
    }
  },
  {
    id: "doritos-nacho-india-usa",
    name: "Doritos Nacho Cheese",
    brand: "Doritos",
    category: "Chips",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/doritos-nacho.jpg",
    imageAlt: "Doritos Nacho Cheese front-pack reference",
    accent: "#f15a24",
    shortSummary: "India and US Doritos compared; India formulation uses Palmolein oil and shows different sodium and saturated fat profiles.",
    matchQuality: "Same flavor (Nacho Cheese) compared across Indian and US markets.",
    sourceNote: "US data from Doritos manufacturer page. Indian data verified via BigBasket product packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("0028400090896")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Doritos Nacho Cheese",
        barcode: "8901491990080",
        quantity: "75 g",
        ingredientsRaw:
          "Corn (77%), Edible Vegetable Oil (Palmolein Oil), Seasoning (Milk Solids, Refined Wheat Flour (Maida), Iodised Salt, Cheese Powder, Tomato Powder, Spices & Condiments (Onion Powder, Garlic Powder, Chilli Powder, Pepper, Cumin), Anticaking agent (551), Acidity Regulator (330), Colors (160c)).",
        nutritionPer100: {
          energyKcal: 500,
          sugarG: 3.8,
          sodiumMg: 630,
          saltG: 1.575,
          saturatedFatG: 10.3,
          totalFatG: 24.5,
          proteinG: 7.4,
          carbsG: 63.3
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40092264/doritos-nacho-cheese-tortilla-chips-75-g-pouch/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Doritos Nacho Cheese",
        barcode: "0028400090896",
        ingredientsRaw:
          "Corn, vegetable oil, maltodextrin, salt, cheddar cheese, whey, monosodium glutamate, buttermilk, Romano cheese, whey protein concentrate, onion powder, corn flour, natural and artificial flavor, dextrose, tomato powder, lactose, spices, artificial colors (Yellow 6, Yellow 5, Red 40), lactic acid, citric acid, sugar, garlic powder, skim milk, red and green bell pepper powder, disodium inosinate, disodium guanylate.",
        nutritionPer100: {
          energyKcal: 535.7,
          sugarG: 3.6,
          sodiumMg: 750,
          saltG: 1.875,
          saturatedFatG: 3.6,
          totalFatG: 28.6,
          proteinG: 7.1,
          fibreG: 3.6,
          carbsG: 64.3
        },
        sourceInfo: source("Doritos official product page", "https://www.doritos.com/products/doritos-nacho-cheese-flavored-tortilla-chips", "manufacturer_label"),
        confidence: "manufacturer_sourced",
        unitNote: "Converted from 28 g serving values."
      })
    }
  },
  {
    id: "pringles-original-india-uk",
    name: "Pringles Original",
    brand: "Pringles",
    category: "Chips",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/pringles-original.jpg",
    imageAlt: "Pringles Original front-pack reference",
    accent: "#d51d29",
    shortSummary: "India and UK source rows found. Ingredient oil types differ in source records.",
    matchQuality: "Same Original flavour; separate India and UK source rows.",
    sourceNote: "Open Food Facts rows provide ingredients and per-100 nutrition for both markets.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("5053990167807")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Pringles Original",
        barcode: "8886467122392",
        quantity: "107 g",
        ingredientsRaw:
          "Dried potato (48%), edible vegetable oil (palm oil), corn flour, starch, emulsifier (INS 471), maltodextrin, salt, acidity regulator (INS 330).",
        nutritionPer100: {
          energyKcal: 523,
          sugarG: 0.4,
          sodiumMg: 468,
          saltG: 1.17,
          saturatedFatG: 14,
          totalFatG: 27.9,
          proteinG: 5,
          fibreG: 0,
          carbsG: 62.8
        },
        sourceInfo: source("Open Food Facts", off("8886467122392")),
        lastModified: "2026-03-26"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Pringles Original",
        barcode: "5053990167807",
        quantity: "185 g",
        ingredientsRaw:
          "Potato puree powder, sunflower oil, wheat flour, corn flour, rice flour, maltodextrin, emulsifier (E471), salt, colour (annatto norbixin).",
        nutritionPer100: {
          energyKcal: 528,
          sugarG: 0.9,
          sodiumMg: 400,
          saltG: 1,
          saturatedFatG: 3,
          totalFatG: 31,
          proteinG: 6.2,
          fibreG: 4.1,
          carbsG: 54
        },
        sourceInfo: source("Open Food Facts", off("5053990167807")),
        lastModified: "2026-05-31"
      })
    }
  },
  {
    id: "kelloggs-cornflakes-india-uk",
    name: "Kellogg's Corn Flakes",
    brand: "Kellogg's",
    category: "Breakfast Cereal",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/kelloggs-cornflakes.jpg",
    imageAlt: "Kellogg's Corn Flakes front-pack reference",
    accent: "#d9272e",
    shortSummary: "Indian and UK Corn Flakes compared; sugar content is slightly higher in India.",
    matchQuality: "Original plain corn flakes compared between Indian and UK variants.",
    sourceNote: "Indian data sourced from BigBasket / EAN lookup. UK data sourced via Open Food Facts.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("5059319030517")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Kellogg's Corn Flakes Original",
        barcode: "8901499008176",
        quantity: "120 g",
        ingredientsRaw:
          "Corn Grits (90%), Sugar, Cereal Extract, Iodised Salt, Vitamins, Antioxidant (INS 307b), Minerals. Contains wheat and barley. May contain soy, milk, oats, and nuts.",
        nutritionPer100: {
          energyKcal: 378,
          sugarG: 9.2,
          sodiumMg: 490,
          saltG: 1.225,
          saturatedFatG: 0.6,
          totalFatG: 1.0,
          proteinG: 6.7,
          fibreG: 2.5,
          carbsG: 86.9
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/1202867/kelloggs-corn-flakes-original-120-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Kellogg's Corn Flakes",
        barcode: "5059319030517",
        ingredientsRaw:
          "Maize, barley malt extract, sugar, salt, niacin, iron, vitamin B6, riboflavin, thiamin, folic acid, vitamin D, vitamin B12.",
        nutritionPer100: {
          energyKcal: 378,
          sugarG: 8,
          sodiumMg: 440,
          saltG: 1.1,
          saturatedFatG: 0.2,
          totalFatG: 0.9,
          proteinG: 7,
          fibreG: 3,
          carbsG: 84
        },
        sourceInfo: source("Open Food Facts", off("5059319030517")),
        lastModified: "2026-05-29"
      })
    }
  },
  {
    id: "kelloggs-chocos-india-uk",
    name: "Kellogg's Chocos",
    brand: "Kellogg's",
    category: "Breakfast Cereal",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/kelloggs-chocos.jpg",
    imageAlt: "Kellogg's Chocos front-pack reference",
    accent: "#6b3f26",
    shortSummary: "India Chocos and UK Choco Pops data found, but they are related products rather than exact same variant.",
    matchQuality: "Related chocolate cereal comparison; not an exact variant match.",
    sourceNote: "Shown as a reference comparison because no exact UK Chocos row was found.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("8901499008169")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Kellogg's Chocos",
        barcode: "8901499008169",
        ingredientsRaw:
          "Multigrain flour mix (64.8%) (wheat flour/atta, sorghum flour, rice flour, corn meal), sugar, cocoa solids (5.3%), minerals, cereal extract, iodized salt, colours (INS 150a, INS 150d), edible vegetable oil (palmolein), flavours, vitamins, antioxidant (INS 307b). Contains wheat and barley. May contain soy, milk, oats and nuts.",
        nutritionPer100: {
          energyKcal: 373,
          sugarG: 27.5,
          sodiumMg: 250,
          saltG: 0.625,
          saturatedFatG: 1.2,
          totalFatG: 3,
          proteinG: 9,
          fibreG: 7,
          carbsG: 81
        },
        sourceInfo: source("Open Food Facts", off("8901499008169")),
        lastModified: "2026-04-20"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Kellogg's Choco Pops Cereals",
        barcode: "5059319021218",
        quantity: "430 g",
        ingredientsRaw:
          "Wheat flour (72%), sugar, chocolate powder (10%) (sugar, cocoa powder), fat-reduced cocoa powder, glucose syrup, salt, natural flavouring, cinnamon, niacin, iron, vitamin B6, riboflavin, thiamin, folic acid, vitamin D, vitamin B12.",
        nutritionPer100: {
          energyKcal: 380,
          sugarG: 22,
          sodiumMg: 264,
          saltG: 0.66,
          saturatedFatG: 1,
          totalFatG: 2.2,
          proteinG: 10,
          fibreG: 6,
          carbsG: 77
        },
        sourceInfo: source("Open Food Facts", off("5059319021218")),
        lastModified: "2026-06-07",
        note: "Related UK chocolate cereal, not exact Chocos variant."
      })
    }
  },
  {
    id: "cerelac-wheat-india-uk",
    name: "Nestle Cerelac Wheat",
    brand: "Nestle",
    category: "Baby Food",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/cerelac-wheat.jpg",
    imageAlt: "Nestle Cerelac Wheat front-pack reference",
    accent: "#ff6a3d",
    shortSummary: "Related India and UK Cerelac wheat rows found, but flavours/variants are not exact.",
    matchQuality: "Related Cerelac wheat products only; not exact same variant.",
    sourceNote: "Baby food comparison remains highly caveated until exact same-market labels are added.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource(
      "Nestle FamilyNes",
      "https://www.familynes.in/product/cerelac-no-refined-sugar-wheat-6-24-months-300g",
      "manufacturer_front_pack_reference"
    ),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Nestle Cerelac Wheat Apple Carrot",
        barcode: "8901058015799",
        quantity: "300 g",
        ingredientsRaw:
          "Wheat flour (atta) (58%), milk solids (31.8%), apple juice concentrate (11.4%), soyabean oil, carrot juice concentrate (1.1%), minerals, vitamins and enzyme (alpha amylase). Contains wheat and milk. May contain barley and oats.",
        nutritionPer100: {
          energyKcal: 427,
          sugarG: 20,
          sodiumMg: 110,
          saturatedFatG: 5.5,
          totalFatG: 12.5,
          proteinG: 15,
          fibreG: 3,
          carbsG: 65
        },
        sourceInfo: source("Open Food Facts", off("8901058015799")),
        lastModified: "2025-11-25",
        note: "Related wheat-based Cerelac row; not identical to the front-pack reference."
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Cerelac Honey & Wheat",
        barcode: "7616100756865",
        quantity: "400 g",
        ingredientsRaw:
          "Cereals 53% (wheat flour, hydrolysed wheat flour), skimmed milk powder 20%, full fat milk powder 6.4%, vegetable oils (rapeseed, sunflower), honey 5.5%, whey powder (milk), minerals, vitamins, flavouring (vanillin), antioxidants, culture (Bifidobacterium lactis).",
        nutritionPer100: {
          energyKcal: 425,
          sugarG: 33,
          sodiumMg: 118,
          saltG: 0.295,
          saturatedFatG: 2,
          totalFatG: 11,
          proteinG: 16,
          fibreG: 3.5,
          carbsG: 63.7
        },
        sourceInfo: source("Open Food Facts", off("7616100756865")),
        lastModified: "2026-03-13",
        note: "Related UK wheat/honey row; not exact India variant."
      })
    }
  },
  {
    id: "bournvita-india-uk",
    name: "Bournvita",
    brand: "Cadbury",
    category: "Health Drink",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/bournvita.png",
    imageAlt: "Bournvita front-pack reference",
    accent: "#f37021",
    shortSummary: "Bournvita is discontinued in the UK mainstream market; international retailers sell the imported Indian formulation.",
    matchQuality: "Discontinued UK local version compared with imported Indian formulation.",
    sourceNote: "India data from Open Food Facts. UK data verified as Indian import distributed by world food suppliers.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Pinoy Hyper product page", "https://pinoyhyper.com/products/cadbury-bournvita-health-drink-500g", "retailer_front_pack_reference"),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Bournvita",
        barcode: "7622201766269",
        quantity: "2 kg",
        ingredientsRaw:
          "Cereal extract 56% (barley, wheat), sugar, cocoa solids, colour (150c), minerals, wheat gluten, liquid glucose, maltodextrin, emulsifiers (322, 471), milk solids, vitamins, raising agent (500(ii)), iodised salt, flavours.",
        nutritionPer100: {
          energyKcal: 387,
          sugarG: 49.8,
          sodiumMg: 175,
          saltG: 0.4375,
          saturatedFatG: 0.9,
          totalFatG: 1.8,
          proteinG: 7,
          fibreG: 5,
          carbsG: 86.7
        },
        sourceInfo: source("Open Food Facts", off("7622201766269")),
        lastModified: "2024-05-09"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Bournvita (Import)",
        barcode: "7622201766269",
        quantity: "500 g",
        ingredientsRaw:
          "Cereal extract 56% (barley, wheat), sugar, cocoa solids, colour (150c), minerals, wheat gluten, liquid glucose, maltodextrin, emulsifiers (322, 471), milk solids, vitamins, raising agent (500(ii)), iodised salt, flavours.",
        nutritionPer100: {
          energyKcal: 387,
          sugarG: 49.8,
          sodiumMg: 175,
          saltG: 0.4375,
          saturatedFatG: 0.9,
          totalFatG: 1.8,
          proteinG: 7,
          fibreG: 5,
          carbsG: 86.7
        },
        sourceInfo: source("Bombay Basket UK", "https://www.bombaybasket.co.uk", "retailer_label"),
        lastModified: "2026-06-18",
        note: "Bournvita was discontinued in the UK mainstream market in 2008. It is now only available in the UK as an import carrying the Indian formulation."
      })
    }
  },
  {
    id: "horlicks-india-uk",
    name: "Horlicks",
    brand: "Horlicks",
    category: "Health Drink",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/horlicks.png",
    imageAlt: "Horlicks Classic Malt front-pack reference",
    accent: "#1d72d2",
    shortSummary: "India Classic Malt and UK Instant Horlicks rows found; treat as related, not exact same variant.",
    matchQuality: "Related malt-drink products; not exact pack/variant match.",
    sourceNote: "Open Food Facts rows provide ingredients and per-100 nutrition, with variant caveat.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Horlicks India", "https://www.horlicks.in/collections/all", "manufacturer_front_pack_reference"),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Classic Malt",
        barcode: "8901030807176",
        quantity: "500 g",
        ingredientsRaw:
          "Malt (66.7%) [barley (32%), wheat flour (atta), wheat, millet], milk solids (14%), sugar, wheat gluten, minerals, edible iodized salt, soy protein isolate, acidity regulators [INS 501(ii), 500(ii)], vitamins. Contains wheat, barley, milk and soy.",
        nutritionPer100: {
          energyKcal: 377,
          sugarG: 46,
          sodiumMg: 400,
          saltG: 1,
          saturatedFatG: 1.4,
          totalFatG: 2,
          proteinG: 11,
          fibreG: 0,
          carbsG: 79
        },
        sourceInfo: source("Open Food Facts", off("8901030807176")),
        lastModified: "2024-07-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Horlicks Instant",
        barcode: "5060113919366",
        ingredientsRaw:
          "Wheat 30% (wheat flour and malted wheat), dried skimmed milk, malted barley 22%, dried whey (milk), sugar, calcium carbonate, palm oil, anti-caking agent (E551), salt, stabilisers, vitamin mix, ferric pyrophosphate, zinc oxide.",
        nutritionPer100: {
          energyKcal: 359.4,
          sugarG: 46.4,
          sodiumMg: 480,
          saltG: 1.2,
          saturatedFatG: 1.8,
          totalFatG: 1.8,
          proteinG: 13.1,
          fibreG: 1.9,
          carbsG: 74.3
        },
        sourceInfo: source("Open Food Facts", off("5060113919366")),
        lastModified: "2026-04-07",
        note: "UK source is Instant Horlicks; compare as related product."
      })
    }
  },
  {
    id: "dairy-milk-india-uk",
    name: "Dairy Milk",
    brand: "Cadbury",
    category: "Chocolate",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/dairy-milk.jpg",
    imageAlt: "Cadbury Dairy Milk front-pack reference",
    accent: "#4b2e83",
    shortSummary: "Indian and UK Cadbury Dairy Milk compared; Indian formulation contains fractionated vegetable fats in addition to cocoa butter.",
    matchQuality: "Same plain milk chocolate bar compared across Indian and UK markets.",
    sourceNote: "Indian data sourced from BigBasket / EAN lookup. UK data verified via Tesco/Cadbury official page.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("British Essentials product page", "https://us.britishessentials.com/products/cadbury-dairy-milk-chocolate-bar-110g", "retailer_front_pack_reference"),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Cadbury Dairy Milk",
        barcode: "7622202818363",
        quantity: "110 g",
        ingredientsRaw:
          "Sugar, Milk Solids (23%), Cocoa Butter, Cocoa Solids, Fractionated Fat, Emulsifiers (442, 476), Flavours (Natural, Nature Identical, and Artificial (Vanilla) flavouring substances). Contains Milk and Soy. May contain Tree Nuts, Wheat, and Barley.",
        nutritionPer100: {
          energyKcal: 532,
          sugarG: 57.0,
          sodiumMg: 129,
          saltG: 0.3225,
          saturatedFatG: 19.6,
          totalFatG: 29.2,
          proteinG: 7.8,
          carbsG: 60.4
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/1204438/cadbury-dairy-milk-chocolate-bar-110-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Cadbury Dairy Milk Chocolate Bar",
        barcode: "7622300735310",
        quantity: "110 g",
        ingredientsRaw:
          "Milk, sugar, cocoa butter, cocoa mass, vegetable fats (palm, shea), emulsifiers (E442, E476), flavourings. Milk solids 20% minimum, cocoa solids 20% minimum; contains vegetable fats in addition to cocoa butter.",
        nutritionPer100: {
          energyKcal: 534,
          sugarG: 56,
          sodiumMg: 96,
          saltG: 0.24,
          saturatedFatG: 18,
          totalFatG: 30,
          proteinG: 7.3,
          carbsG: 57,
          fibreG: 2.1
        },
        sourceInfo: source("Cadbury UK product page", "https://www.cadbury.co.uk/products/cadbury-dairy-milk-chocolate-bar-110g-35310", "manufacturer_label"),
        confidence: "manufacturer_sourced",
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "snickers-india-usa",
    name: "Snickers",
    brand: "Mars",
    category: "Chocolate",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/snickers.png",
    imageAlt: "Snickers front-pack reference",
    accent: "#5b341c",
    shortSummary: "India Open Food Facts and US Snickers official data are attached.",
    matchQuality: "Same core product family; pack sizes differ.",
    sourceNote: "US values are converted from the official 1.86 oz bar serving to per 100 g.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Snickers official product page", "https://www.snickers.com/products/chocolate/snickers-singles-size-chocolate-candy-bars-186-oz-bars", "manufacturer_front_pack_reference"),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Snickers",
        barcode: "8906002484003",
        quantity: "12 g",
        ingredientsRaw:
          "Sugar, milk solids, cocoa butter, cocoa solids, edible vegetable fats <5% (sal fat, palm oil), dextrose, emulsifier (E322); liquid glucose, peanuts (14%), sugar, hydrogenated vegetable oil (palm oil), milk solids, iodized salt.",
        nutritionPer100: {
          energyKcal: 477,
          sugarG: 55.9,
          sodiumMg: 231,
          saltG: 0.5775,
          saturatedFatG: 10.2,
          totalFatG: 22.65,
          proteinG: 7.2,
          carbsG: 61
        },
        sourceInfo: source("Open Food Facts", off("8906002484003")),
        lastModified: "2024-04-06"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "SNICKERS Singles Size Chocolate Candy Bar",
        quantity: "1.86 oz",
        ingredientsRaw:
          "Milk chocolate (sugar, cocoa butter, chocolate, skim milk, lactose, milkfat, soy lecithin), peanuts, corn syrup, sugar, palm oil, skim milk, lactose, salt, egg whites, artificial flavor.",
        nutritionPer100: {
          energyKcal: 471.7,
          sugarG: 50.9,
          sodiumMg: 245.3,
          saturatedFatG: 8.5,
          totalFatG: 22.6,
          proteinG: 9.4,
          fibreG: 1.9,
          carbsG: 60.4
        },
        sourceInfo: source("Snickers official product page", "https://www.snickers.com/products/chocolate/snickers-singles-size-chocolate-candy-bars-186-oz-bars", "manufacturer_label"),
        confidence: "manufacturer_sourced",
        unitNote: "Converted from official per-bar values for a 1.86 oz serving."
      })
    }
  },
  {
    id: "kinder-joy-india-uk",
    name: "Kinder Joy",
    brand: "Kinder",
    category: "Chocolate",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/kinder-joy.jpg",
    imageAlt: "Kinder Joy front-pack reference",
    accent: "#ff7b2f",
    shortSummary: "Indian and UK Kinder Joy compared; formulations match closely, with refined Salseed Fat and Palmolein used in the Indian recipe.",
    matchQuality: "Standard Kinder Joy compared between Indian market and UK/Global reference.",
    sourceNote: "Indian and global reference data verified via Ferrero India / Open Food Facts.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("80310891")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Kinder Joy Boy",
        barcode: "80135890",
        quantity: "20 g",
        ingredientsRaw:
          "Sugar, Palmolein, Skimmed Cow Milk Powder (19.5%), Palm Oil, Low Fat Cocoa Powder (4%), Wheat Flour, Refined Salseed Fat, Toasted Wheat Germ, Wheat Starch, Powdered Barley Malt Extract, Emulsifier (Lecithin – INS 322), Whey Powder, Sunflowerseed Oil (High Oleic Acid), Raising Agents (INS 503ii, INS 500ii), Salt, flavouring substances.",
        nutritionPer100: {
          energyKcal: 550,
          sugarG: 51,
          sodiumMg: 127.2,
          saltG: 0.318,
          saturatedFatG: 14.5,
          totalFatG: 32,
          proteinG: 8.2,
          carbsG: 56.5
        },
        sourceInfo: source("Open Food Facts", off("80135890")),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Kinder Joy global reference",
        barcode: "80310891",
        quantity: "20 g",
        ingredientsRaw:
          "Sugar, vegetable fats (palm, shea), skimmed milk powder 19.5%, wheat flour, low-fat cocoa 3.5%, wheat starch, cocoa mass, barley malt extract, emulsifiers: lecithins (soya), sunflower oil, milk proteins, cocoa butter, flavourings, raising agents, salt.",
        nutritionPer100: {
          energyKcal: 550,
          sugarG: 51,
          sodiumMg: 127.2,
          saltG: 0.318,
          saturatedFatG: 15.4,
          totalFatG: 32,
          proteinG: 8.2,
          carbsG: 56.5
        },
        sourceInfo: source("Open Food Facts", off("80310891")),
        lastModified: "2026-06-14",
        note: "Related global row; source countries do not include UK."
      })
    }
  },
  {
    id: "mcvities-digestive-india-uk",
    name: "McVitie's Digestive",
    brand: "McVitie's",
    category: "Biscuits",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/mcvities-digestive.jpg",
    imageAlt: "McVitie's Digestive front-pack reference",
    accent: "#d3312a",
    shortSummary: "India and UK source rows found for Digestive biscuits, with variant caveat.",
    matchQuality: "Same product family; India row appears sugar-free/sweetener-style while UK row is Original.",
    sourceNote: "Open Food Facts rows provide ingredients and per-100 nutrition for both markets.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: imageSource("Open Food Facts", off("0059290311419")),
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "McVitie's Digestive",
        barcode: "8906033742455",
        quantity: "75 g",
        ingredientsRaw:
          "Refined wheat flour (maida) (40.6%), wheat flour (atta) (18.3%), edible vegetable oil (palm), polyols, oligofructose (6.5%), raising agents, calcium carbonate, iodised salt, oat meal, emulsifier, acidity regulator, flavouring substances, sweetener. Contains cereals containing gluten; may contain milk, nuts, soy and sulphite.",
        nutritionPer100: {
          energyKcal: 453,
          sugarG: 1,
          sodiumMg: 750,
          saltG: 1.875,
          saturatedFatG: 10.6,
          totalFatG: 20.7,
          proteinG: 8.2,
          fibreG: 10,
          carbsG: 65.9
        },
        sourceInfo: source("Open Food Facts", off("8906033742455")),
        lastModified: "2025-03-11",
        note: "India row may not be the same sugar profile as UK Original."
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Digestives The Original Twin Pack",
        barcode: "5000168036670",
        quantity: "2 x 360 g",
        ingredientsRaw:
          "Flour (55%) (wheat flour, calcium, iron, niacin, thiamin), vegetable oil (palm), wholemeal wheat flour (16%), sugar, partially inverted sugar syrup, raising agents (sodium bicarbonate, malic acid, ammonium bicarbonate), salt.",
        nutritionPer100: {
          energyKcal: 483,
          sugarG: 15.1,
          sodiumMg: 520,
          saltG: 1.3,
          saturatedFatG: 10.1,
          totalFatG: 21.3,
          proteinG: 7,
          fibreG: 3.7,
          carbsG: 63.6
        },
        sourceInfo: source("Open Food Facts", off("5000168036670")),
        lastModified: "2026-05-30"
      })
    }
  },
  {
    id: "nutella-india-uk",
    name: "Nutella Hazelnut Spread",
    brand: "Ferrero",
    category: "Spreads",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/nutella.jpg",
    imageAlt: "Nutella Hazelnut Spread front-pack reference",
    accent: "#6c3823",
    shortSummary: "Identical global formulation verified in both Indian and UK markets with high sugar and palm oil density.",
    matchQuality: "Standard Nutella hazelnut cocoa spread compared across both markets.",
    sourceNote: "Indian and UK label data sourced from Ferrero and verified supermarket listings.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Nutella Hazelnut Spread",
        barcode: "8000500120150",
        ingredientsRaw: "Sugar, Palm Oil, Hazelnuts (13%), Skimmed Cow Milk Powder (8.7%), Fat-reduced Cocoa Powder (7.4%), Emulsifier (Lecithin - INS 322, Soya), Nature-Identical Flavouring Substance (Vanillin).",
        nutritionPer100: {
          energyKcal: 539,
          sugarG: 56.3,
          sodiumMg: 42,
          saltG: 0.105,
          saturatedFatG: 10.6,
          totalFatG: 30.9,
          proteinG: 6.3,
          carbsG: 57.5
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40097615/nutella-hazelnut-spread-with-cocoa-350-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Nutella Hazelnut Spread",
        barcode: "80176800",
        ingredientsRaw: "Sugar, Palm Oil, Hazelnuts (13%), Skimmed Milk Powder (8.7%), Fat-Reduced Cocoa (7.4%), Emulsifier: Lecithins (Soya), Vanillin.",
        nutritionPer100: {
          energyKcal: 539,
          sugarG: 56.3,
          sodiumMg: 42,
          saltG: 0.107,
          saturatedFatG: 10.6,
          totalFatG: 30.9,
          proteinG: 6.3,
          carbsG: 57.5
        },
        sourceInfo: source("Ocado UK", "https://www.ocado.com/products/nutella-hazelnut-chocolate-spread-12295011", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "heinz-ketchup-india-usa",
    name: "Heinz Tomato Ketchup",
    brand: "Kraft Heinz",
    category: "Condiments",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/heinz-ketchup.jpg",
    imageAlt: "Heinz Tomato Ketchup front-pack reference",
    accent: "#990000",
    shortSummary: "US variant uses High Fructose Corn Syrup & Corn Syrup, while the Indian variant uses Cane Sugar.",
    matchQuality: "Standard tomato ketchup compared side-by-side across Indian and US formulations.",
    sourceNote: "Indian data verified via BigBasket label. US data sourced from Kraft Heinz official packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Heinz Tomato Ketchup",
        barcode: "8901103002200",
        ingredientsRaw: "Water, Tomato Paste (26%), Sugar, Brewed Vinegar, Iodized Salt, Mixed Spices and Herbs, Celery.",
        nutritionPer100: {
          energyKcal: 109,
          sugarG: 22,
          sodiumMg: 720,
          saltG: 1.8,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 1.2,
          carbsG: 26
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40003027/heinz-tomato-ketchup-900-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Heinz Tomato Ketchup",
        barcode: "013000006034",
        ingredientsRaw: "Tomato Concentrate (from red ripe tomatoes), Distilled Vinegar, High Fructose Corn Syrup, Corn Syrup, Salt, Spice, Onion Powder, Natural Flavoring.",
        nutritionPer100: {
          energyKcal: 118,
          sugarG: 24,
          sodiumMg: 1058,
          saltG: 2.645,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 29
        },
        sourceInfo: source("Kraft Heinz US", "https://www.heinz.com/products/00013000006034-tomato-ketchup", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "hersheys-syrup-india-usa",
    name: "Hershey's Chocolate Syrup",
    brand: "Hershey's",
    category: "Condiments",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/hersheys-syrup.jpg",
    imageAlt: "Hershey's Chocolate Syrup front-pack reference",
    accent: "#4a312c",
    shortSummary: "US variant uses High Fructose Corn Syrup & Corn Syrup, while the Indian variant uses Cane Sugar & Liquid Glucose.",
    matchQuality: "Classic chocolate syrup compared between Indian and US retail formulations.",
    sourceNote: "Indian data sourced from Hershey's India. US data verified via USDA FoodData Central.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Hershey's Chocolate Syrup",
        barcode: "8901071701174",
        ingredientsRaw: "Sugar, Water, Invert Sugar, Liquid Glucose, Cocoa Solids (5%), Malt Extract, Oligofructose, Thickening Agent (INS 415), Preservative (INS 202), Edible Common Salt, Flavors (Nature Identical and Artificial Vanilla flavoring substances).",
        nutritionPer100: {
          energyKcal: 276.5,
          sugarG: 63.7,
          sodiumMg: 72.7,
          saltG: 0.18,
          saturatedFatG: 0.35,
          totalFatG: 0.56,
          proteinG: 1.27,
          carbsG: 66.6
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/268153/hersheys-syrup-chocolate-650-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Hershey's Chocolate Syrup",
        barcode: "034000003125",
        ingredientsRaw: "High Fructose Corn Syrup, Corn Syrup, Water, Cocoa, Sugar, contains 2% or less of: Potassium Sorbate (preservative), Salt, Mono- and Diglycerides, Xanthan Gum, Polysorbate 60, Vanillin, Artificial Flavor.",
        nutritionPer100: {
          energyKcal: 263.1,
          sugarG: 52.6,
          sodiumMg: 52.6,
          saltG: 0.13,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 68.4
        },
        sourceInfo: source("Hersheyland US", "https://www.hersheyland.com/products/hersheys-chocolate-syrup-24-oz.html", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "red-bull-india-usa",
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    category: "Soft Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/red-bull.jpg",
    imageAlt: "Red Bull Energy Drink front-pack reference",
    accent: "#001f5c",
    shortSummary: "Standardized active ingredients (0.4% Taurine, 0.03% Caffeine) with identical sugar densities.",
    matchQuality: "Identical global recipe compared side-by-side between the Indian and US retail markets.",
    sourceNote: "Verified from local package photos in India and the official Red Bull USA site.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Red Bull Energy Drink",
        barcode: "9002490100070",
        ingredientsRaw: "Water, Sugar, Glucose, Acid (Citric Acid), Carbon Dioxide, Taurine (0.4%), Acidity Regulators (Sodium Carbonates, Magnesium Carbonates), Caffeine (0.03%), Vitamins (Niacin, Pantothenic Acid, B6, B12), Flavourings, Colours (Caramel, Riboflavins).",
        nutritionPer100: {
          energyKcal: 45,
          sugarG: 11,
          sodiumMg: 40,
          saltG: 0.1,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 11
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/1205626/red-bull-energy-drink-250-ml-4-pcs-multipack/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Red Bull Energy Drink",
        barcode: "002490002581",
        ingredientsRaw: "Carbonated Water, Sucrose, Glucose, Citric Acid, Taurine (0.4%), Sodium Bicarbonate, Magnesium Carbonate, Caffeine (0.03%), Niacinamide, Calcium Pantothenate, Pyridoxine HCl, Vitamin B12, Natural and Artificial Flavors, Colors.",
        nutritionPer100: {
          energyKcal: 45,
          sugarG: 11,
          sodiumMg: 40,
          saltG: 0.1,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 11
        },
        sourceInfo: source("Red Bull US", "https://www.redbull.com/us-en/energydrink/red-bull-energy-drink-ingredients-list", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "nescafe-classic-india-uk",
    name: "Nescafe Classic Coffee",
    brand: "Nescafe",
    category: "Hot Beverage",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/nescafe-classic.jpg",
    imageAlt: "Nescafe Classic Coffee front-pack reference",
    accent: "#6f4e37",
    shortSummary: "100% pure soluble coffee powder with zero added sugars or fats in both markets.",
    matchQuality: "Identical coffee bean formulation compared between Indian and UK packaging.",
    sourceNote: "Indian and UK specifications verified via Nestlé Professional databases.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Nescafe Classic",
        barcode: "8901058863642",
        ingredientsRaw: "100% Soluble Coffee.",
        nutritionPer100: {
          energyKcal: 0,
          sugarG: 0,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 0
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/266155/nescafe-classic-instant-coffee-200-g-glass-bottle/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Nescafe Original",
        barcode: "7613035824102",
        ingredientsRaw: "100% Soluble Coffee.",
        nutritionPer100: {
          energyKcal: 0,
          sugarG: 0,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 0
        },
        sourceInfo: source("Ocado UK", "https://www.ocado.com/products/nescafe-original-instant-coffee-12166011", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "gatorade-orange-india-usa",
    name: "Gatorade Orange",
    brand: "Gatorade",
    category: "Soft Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/gatorade-orange.jpg",
    imageAlt: "Gatorade Orange front-pack reference",
    accent: "#ff6200",
    shortSummary: "Similar sugar and electrolyte profiles. US variant uses Yellow 6, while India uses INS 110.",
    matchQuality: "Orange-flavored electrolyte sports drink compared across India and US markets.",
    sourceNote: "Indian data sourced from PepsiCo India label. US data sourced from PepsiCo Partners database.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Gatorade Orange",
        barcode: "8902080010417",
        ingredientsRaw: "Water, Sugar (5.4%), Dextrose, Acidity Regulator (INS 330), Mineral Salts (Sodium Chloride, Potassium Phosphate), Flavour Emulsion (Orange flavour, Stabiliser (INS 414), Colour (INS 110), Stabiliser (INS 444)).",
        nutritionPer100: {
          energyKcal: 24,
          sugarG: 6,
          sodiumMg: 48,
          saltG: 0.12,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 6
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/266542/gatorade-sports-drink-orange-500-ml-bottle/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Gatorade Thirst Quencher Orange",
        barcode: "052000328677",
        ingredientsRaw: "Water, Sugar, Dextrose, Citric Acid, Salt, Sodium Citrate, Monopotassium Phosphate, Gum Arabic, Natural Flavor, Sucrose Acetate Isobutyrate, Glycerol Ester of Rosin, Yellow 6.",
        nutritionPer100: {
          energyKcal: 22.5,
          sugarG: 5.9,
          sodiumMg: 45,
          saltG: 0.113,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 6.2
        },
        sourceInfo: source("PepsiCo Partners US", "https://www.pepsicopartners.com/pepsico/Gatorade-Thirst-Quencher-Orange-20oz-bottle-24case", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "quaker-oats-india-usa",
    name: "Quaker Oats Original",
    brand: "Quaker",
    category: "Breakfast Cereal",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/quaker-oats.jpg",
    imageAlt: "Quaker Oats Original front-pack reference",
    accent: "#0072c6",
    shortSummary: "100% whole grain rolled oats. Saturated fat is slightly higher in India due to crop fat density.",
    matchQuality: "Standard rolled oats compared side-by-side across Indian and US packaging.",
    sourceNote: "Indian data sourced from Quaker India. US data verified from Old Fashioned Oats packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Quaker Oats",
        barcode: "8902080205844",
        ingredientsRaw: "100% Rolled Oats.",
        nutritionPer100: {
          energyKcal: 407,
          sugarG: 1.8,
          sodiumMg: 9.5,
          saltG: 0.024,
          saturatedFatG: 1.9,
          totalFatG: 9.5,
          proteinG: 11.8,
          fibreG: 10,
          carbsG: 68.5
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/1202758/quaker-oats-15-kg/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Quaker Old Fashioned Oats",
        barcode: "030000010204",
        ingredientsRaw: "100% Whole Grain Rolled Oats.",
        nutritionPer100: {
          energyKcal: 375,
          sugarG: 2.5,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 1.25,
          totalFatG: 7.5,
          proteinG: 12.5,
          fibreG: 10,
          carbsG: 67.5
        },
        sourceInfo: source("Quaker US", "https://www.quakeroats.com/products/hot-cereals/old-fashioned-oats", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "tang-orange-india-usa",
    name: "Tang Orange Drink Powder",
    brand: "Tang",
    category: "Soft Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/tang-orange.jpg",
    imageAlt: "Tang Orange Drink Powder front-pack reference",
    accent: "#ffaa00",
    shortSummary: "Indian variant uses 0.8% orange juice solids and colors 171, 110, 102. US uses fructose and Yellow 5, Yellow 6.",
    matchQuality: "Orange-flavored powdered beverage mix compared side-by-side.",
    sourceNote: "Indian data sourced from Mondelez India. US data sourced from Kraft Foods packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Tang Instant Drink Mix Orange",
        barcode: "7622201140960",
        ingredientsRaw: "Sugar, Acidity Regulator (INS 330), Orange Fruit Powder (0.8%), Anticaking Agent (INS 341(iii)), Vitamins (Vitamins C, A, B3, B6, B12, Folic Acid), Stabilizers (INS 415, INS 466), Food Colours (INS 171, INS 110, INS 102), Sweetener (INS 955), Iodised Salt, Minerals (Zinc Sulphate, Ferrous Citrate).",
        nutritionPer100: {
          energyKcal: 389,
          sugarG: 92.9,
          sodiumMg: 35,
          saltG: 0.087,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 93.9
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40003734/tang-instant-drink-mix-orange-flavor-500-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Tang Orange Powdered Drink Mix",
        barcode: "043000032252",
        ingredientsRaw: "Sugar, Fructose, Citric Acid, less than 2% of: Maltodextrin, Calcium Phosphate, Sodium Acid Pyrophosphate, Ascorbic Acid, Natural Flavor, Artificial Color, Guar Gum, Xanthan Gum, Yellow 5, Yellow 6, BHA (to preserve freshness).",
        nutritionPer100: {
          energyKcal: 333,
          sugarG: 88.9,
          sodiumMg: 74,
          saltG: 0.185,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 88.9
        },
        sourceInfo: source("Walmart US", "https://www.walmart.com/ip/Tang-Orange-Powdered-Drink-Mix-20-oz-Canister/10292723", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "mentos-mint-india-uk",
    name: "Mentos Mint Candy",
    brand: "Mentos",
    category: "Confectionery",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/mentos-mint.jpg",
    imageAlt: "Mentos Mint Candy front-pack reference",
    accent: "#61a8ff",
    shortSummary: "Indian variant uses Hydrogenated Coconut Oil, whereas the UK variant uses natural Coconut Oil.",
    matchQuality: "Chewy mint rolls compared across India and UK markets.",
    sourceNote: "Indian data sourced from Perfetti Van Melle India. UK data sourced from Mentos UK roll.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Mentos Mint Candy",
        barcode: "8902251025530",
        ingredientsRaw: "Sugar, Liquid glucose, Hydrogenated vegetable oil (Coconut Oil), Starch, Thickeners (INS 414, INS 418), Emulsifier (INS 473), Glazing agent (INS 903).",
        nutritionPer100: {
          energyKcal: 387.6,
          sugarG: 72,
          sodiumMg: 10,
          saltG: 0.025,
          saturatedFatG: 1.84,
          totalFatG: 1.85,
          proteinG: 0.03,
          carbsG: 92.7
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40118598/mentos-mint-flavour-chewy-candy-roll-29-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Mentos Mint Chewy Roll",
        barcode: "84742010",
        ingredientsRaw: "Sugar, Glucose Syrup, Coconut Oil, Starch, Natural Mint Flavourings, Maltodextrin, Cocoa Butter, Thickeners (Gellan Gum, Cellulose Gum, Gum Arabic), Emulsifier (Sucrose Esters of Fatty Acids), Glazing Agent (Carnauba Wax).",
        nutritionPer100: {
          energyKcal: 390,
          sugarG: 69,
          sodiumMg: 40,
          saltG: 0.1,
          saturatedFatG: 1.8,
          totalFatG: 1.9,
          proteinG: 0,
          carbsG: 93
        },
        sourceInfo: source("Sainsburys UK", "https://www.sainsburys.co.uk/gol-ui/product/mentos-mint-roll-29g", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "lipton-yellow-label-india-uk",
    name: "Lipton Yellow Label Tea",
    brand: "Lipton",
    category: "Hot Beverage",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/lipton-tea.jpg",
    imageAlt: "Lipton Yellow Label Tea front-pack reference",
    accent: "#ffcc00",
    shortSummary: "100% pure black tea leaves in both markets with identical zero nutrient density when brewed.",
    matchQuality: "Standard loose leaf/tea bags compared across Indian and UK packaging.",
    sourceNote: "Indian and UK data verified via Lipton and Unilever product registries.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Lipton Yellow Label Tea",
        barcode: "8901030553868",
        ingredientsRaw: "100% Black Tea.",
        nutritionPer100: {
          energyKcal: 0,
          sugarG: 0,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 0
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/1202865/lipton-yellow-label-tea-250-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Lipton Yellow Label Tea Bags",
        barcode: "8714100778648",
        ingredientsRaw: "100% Black Tea.",
        nutritionPer100: {
          energyKcal: 0,
          sugarG: 0,
          sodiumMg: 0,
          saltG: 0,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 0,
          carbsG: 0
        },
        sourceInfo: source("Ocado UK", "https://www.ocado.com/products/lipton-yellow-label-tea-bags-11442011", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "pediasure-chocolate-india-usa",
    name: "PediaSure Premium Chocolate",
    brand: "PediaSure",
    category: "Health Drink",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/pediasure-chocolate.jpg",
    imageAlt: "PediaSure Chocolate front-pack reference",
    accent: "#512c7b",
    shortSummary: "Indian variant uses skim milk powder, while the US variant uses hydrolyzed corn starch.",
    matchQuality: "Chocolate-flavored nutritional drink powder compared side-by-side.",
    sourceNote: "Indian data sourced from Abbott India. US data verified from Abbott Store US.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "PediaSure Chocolate",
        barcode: "8904145014605",
        ingredientsRaw: "Skim Milk Powder, Sucrose, Edible Vegetable Oil (Soy Oil, High Oleic Sunflower Oil, Coconut Oil), Maltodextrin, Cocoa Powder (3.2%), Fructo-Oligosaccharides (FOS) (2.1%), Medium-Chain Triglyceride (MCT) Oil, L-Arginine HCl, Minerals, Vitamins, Casein Hydrolysate, m-Inositol, Taurine, L-Carnitine, Lactobacillus acidophilus.",
        nutritionPer100: {
          energyKcal: 452,
          sugarG: 22.92,
          sodiumMg: 280,
          saltG: 0.7,
          saturatedFatG: 4.14,
          totalFatG: 15,
          proteinG: 14.1,
          carbsG: 64.74
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40141680/pediasure-complete-balanced-nutrition-drink-chocolate-flavor-400-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "PediaSure Grow & Gain Chocolate Shake Mix",
        barcode: "070074582740",
        ingredientsRaw: "Hydrolyzed Corn Starch, Milk Protein Concentrate, Soy Protein Isolate, Casein Hydrolysate, Vegetable Oils (High Oleic Sunflower, Soy, Canola), Sucrose, Cocoa Powder, Fructo-Oligosaccharides, Minerals, Vitamins, Soy Lecithin, L-Arginine, DHA from C. cohnii Oil, Taurine, m-Inositol, L-Carnitine, Lactobacillus acidophilus.",
        nutritionPer100: {
          energyKcal: 449,
          sugarG: 24.5,
          sodiumMg: 214,
          saltG: 0.54,
          saturatedFatG: 4.1,
          totalFatG: 12.2,
          proteinG: 14.3,
          carbsG: 75.5
        },
        sourceInfo: source("Abbott Store US", "https://abbottstore.com/pediasure-grow-gain-shake-mix-powder-chocolate-14-1-oz-can-pack-of-3.html", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "heinz-mayo-india-uk",
    name: "Heinz Creamy Mayonnaise",
    brand: "Kraft Heinz",
    category: "Condiments",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/heinz-mayo.jpg",
    imageAlt: "Heinz Creamy Mayonnaise front-pack reference",
    accent: "#e0cca3",
    shortSummary: "UK uses 68% Rapeseed Oil and egg yolk. India uses 35% Soya Bean Oil with added starches/gums.",
    matchQuality: "Veg mayonnaise (India) compared to Seriously Good Egg-based mayonnaise (UK).",
    sourceNote: "Indian data verified from Kraft Heinz India. UK data sourced from Seriously Good UK pack.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Heinz Veg Mayo Classic",
        barcode: "8901103003054",
        ingredientsRaw: "Refined Soya Bean Oil (35%), Water, Sugar, Thickeners (INS 1442, INS 1450), Iodised Salt, Stabiliser (INS 415), Acidity Regulators (INS 330, INS 260), Natural Flavours, Lemon Juice Concentrate, Preservatives (INS 202, INS 211), Antioxidant (INS 319), Sequestrant (INS 385), Mustard.",
        nutritionPer100: {
          energyKcal: 481,
          sugarG: 6,
          sodiumMg: 865.6,
          saltG: 2.16,
          saturatedFatG: 8.5,
          totalFatG: 50,
          proteinG: 0.6,
          carbsG: 6.4
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40196232/heinz-veg-mayo-classic-eggless-creamy-400-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Heinz Seriously Good Mayonnaise",
        barcode: "5000111043137",
        ingredientsRaw: "Rapeseed Oil (68%), Water, Pasteurised Egg Yolk (5%), Spirit Vinegar, Sugar, Starch, Salt, Mustard Seeds, Spices, Antioxidant (Calcium Disodium EDTA).",
        nutritionPer100: {
          energyKcal: 644,
          sugarG: 1.5,
          sodiumMg: 400,
          saltG: 1,
          saturatedFatG: 5.3,
          totalFatG: 70,
          proteinG: 0.8,
          carbsG: 3
        },
        sourceInfo: source("Sainsburys UK", "https://www.sainsburys.co.uk/gol-ui/product/heinz-seriously-good-mayonnaise-squeeze-400ml", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "milkybar-india-uk",
    name: "Milkybar White Chocolate",
    brand: "Nestle",
    category: "Chocolate",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/milkybar.jpg",
    imageAlt: "Milkybar White Chocolate front-pack reference",
    accent: "#e5eaef",
    shortSummary: "Indian variant uses Hydrogenated Vegetable Fats, whereas the UK variant uses Cocoa Butter.",
    matchQuality: "Nestlé Milkybar white chocolate bar compared across markets.",
    sourceNote: "Indian data sourced from Nestlé India. UK data sourced from Nestlé UK Milkybar block.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Milkybar Creamy White Treat",
        barcode: "8901058861075",
        ingredientsRaw: "Milk solids (35%), Sugar, Hydrogenated vegetable fats, Fractionated vegetable fat, Emulsifier (Soya lecithin), Nature-identical flavouring substances.",
        nutritionPer100: {
          energyKcal: 524,
          sugarG: 40.9,
          sodiumMg: 117.1,
          saltG: 0.29,
          saturatedFatG: 28.7,
          totalFatG: 30,
          proteinG: 11.1,
          carbsG: 50.1
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40081608/nestle-milkybar-creamy-white-treat-45-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Milkybar White Chocolate Bar",
        barcode: "7613036077552",
        ingredientsRaw: "Sugar, Cocoa Butter, Whole Milk Powder, Whey Powder (Milk), Vegetable Fats (Palm, Shea, Sal, Mango Kernel), Emulsifier (Lecithins), Natural Vanilla Flavouring.",
        nutritionPer100: {
          energyKcal: 543,
          sugarG: 56.6,
          sodiumMg: 100,
          saltG: 0.25,
          saturatedFatG: 19.1,
          totalFatG: 31.6,
          proteinG: 6.9,
          carbsG: 57.1
        },
        sourceInfo: source("Ocado UK", "https://www.ocado.com/products/milkybar-white-chocolate-sharing-bar-22442011", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "yakult-india-uk",
    name: "Yakult Probiotic Drink",
    brand: "Yakult",
    category: "Health Drink",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/yakult.jpg",
    imageAlt: "Yakult Probiotic Drink front-pack reference",
    accent: "#e12726",
    shortSummary: "Standard formulations are similar, but India's contains slightly more sugar per 100ml.",
    matchQuality: "Original standard red-bottle probiotic drink compared between markets.",
    sourceNote: "Indian data sourced from Yakult India. UK data sourced from Yakult UK.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Yakult Probiotic Drink",
        barcode: "8906020580015",
        ingredientsRaw: "Water, Sugar, Skimmed Milk Powder, Glucose, L. casei Shirota bacteria, Natural & Nature Identical Flavour.",
        nutritionPer100: {
          energyKcal: 77,
          sugarG: 15.4,
          sodiumMg: 16.2,
          saltG: 0.04,
          saturatedFatG: 0,
          totalFatG: 0.1,
          proteinG: 1.2,
          carbsG: 17.7
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40003058/yakult-probiotic-health-drink-original-5x65-ml-bottles/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Yakult Original Probiotic Drink",
        barcode: "50302302",
        ingredientsRaw: "Water, Reconstituted Skimmed Milk, Glucose-Fructose Syrup, Sugar, Maltodextrin, Flavourings, L. casei Shirota bacteria.",
        nutritionPer100: {
          energyKcal: 66,
          sugarG: 13.6,
          sodiumMg: 16,
          saltG: 0.04,
          saturatedFatG: 0,
          totalFatG: 0.1,
          proteinG: 1.3,
          carbsG: 15.4
        },
        sourceInfo: source("Sainsburys UK", "https://www.sainsburys.co.uk/gol-ui/product/yakult-original-probiotic-drink-7x65ml", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "knorr-soup-india-uk",
    name: "Knorr Classic Tomato Soup",
    brand: "Knorr",
    category: "Soup",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/knorr-tomato-soup.jpg",
    imageAlt: "Knorr Classic Tomato Soup front-pack reference",
    accent: "#005a36",
    shortSummary: "Indian soup contains Refined Flour (Maida) & 15% Tomato. UK uses potato starch & 28% Tomato powder.",
    matchQuality: "Classic tomato soup dry powder mixes compared side-by-side.",
    sourceNote: "Indian data sourced from Knorr India. UK data sourced from Unilever Food Solutions UK.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Knorr Classic Thick Tomato Soup",
        barcode: "8901030722212",
        ingredientsRaw: "Sugar, Maize Starch, Tomato Paste Solids (15%), Refined Wheat Flour (Maida), Iodised Salt, Hydrogenated Palm Oil, Dehydrated Vegetables (Onion Powder, Leeks), Hydrolyzed Vegetable Protein, Spices & Condiments (Black Pepper), Anticaking Agent (INS 551), Thickener (INS 415), Red Beet Juice Powder, Natural Garlic and Nature Identical Flavouring Substances, Flavour Enhancers (INS 627, INS 631), Oleoresin Chilli, Acidity Regulator (INS 330).",
        nutritionPer100: {
          energyKcal: 350,
          sugarG: 34.8,
          sodiumMg: 3961,
          saltG: 9.9,
          saturatedFatG: 3.1,
          totalFatG: 5.7,
          proteinG: 5.6,
          carbsG: 71.3
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40118602/knorr-soup-classic-thick-tomato-53-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Knorr Professional Tomato Soup",
        barcode: "8712566127412",
        ingredientsRaw: "Potato starch, tomato puree powder (28%), sugar, salt, sunflower oil, palm fat, glucose syrup, onion powder, wheat flour, yeast extract, modified starch, acid (citric acid), flavourings, maltodextrin, beetroot juice concentrate, marjoram.",
        nutritionPer100: {
          energyKcal: 370,
          sugarG: 26,
          sodiumMg: 2080,
          saltG: 5.2,
          saturatedFatG: 2.5,
          totalFatG: 7,
          proteinG: 4.6,
          carbsG: 71
        },
        sourceInfo: source("Unilever Food Solutions UK", "https://www.unileverfoodsolutions.co.uk/product/knorr-professional-tomato-soup-1x250pt-1-EN-214488.html", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "mms-peanut-india-usa",
    name: "M&M's Peanut Candy",
    brand: "M&Ms",
    category: "Confectionery",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/mms-peanut.jpg",
    imageAlt: "M&M's Peanut Candy front-pack reference",
    accent: "#3a1e12",
    shortSummary: "India uses Palm & Shea fats in the chocolate coating. US uses cocoa butter and milkfat exclusively.",
    matchQuality: "Standard Peanut M&M's chocolate candies compared between markets.",
    sourceNote: "Indian data sourced from Mars India label. US data sourced from Mars Wrigley US.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "M&M's Peanut",
        barcode: "8906002483167",
        ingredientsRaw: "Sugar, Peanuts, Cocoa Mass, Skimmed Milk Powder, Cocoa Butter, Lactose, Starch, Milk Fat, Palm Fat, Glucose Syrup, Shea Fat, Stabilizer (Gum Arabic), Emulsifier (Soya Lecithin), Dextrin, Glazing Agent (Carnauba Wax), Colours (INS 100, INS 120, INS 133, INS 160a, INS 160e, INS 170).",
        nutritionPer100: {
          energyKcal: 515,
          sugarG: 53,
          sodiumMg: 44,
          saltG: 0.11,
          saturatedFatG: 10.5,
          totalFatG: 27,
          proteinG: 9.7,
          carbsG: 58.7
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40118337/mms-peanut-milk-chocolate-candies-sharing-size-2x45-g-multipack/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "M&M's Peanut Chocolate Candies",
        barcode: "040000004315",
        ingredientsRaw: "Milk chocolate (sugar, chocolate, cocoa butter, skim milk, lactose, milkfat, peanuts, soy lecithin, salt, artificial flavors), sugar, peanuts, cornstarch, corn syrup, dextrin, coloring (Blue 1 Lake, Yellow 6, Red 40, Yellow 5, Blue 1, Yellow 6 Lake, Red 40 Lake, Yellow 5 Lake, Blue 2 Lake, Blue 2), gum acacia.",
        nutritionPer100: {
          energyKcal: 512,
          sugarG: 51,
          sodiumMg: 40,
          saltG: 0.1,
          saturatedFatG: 10,
          totalFatG: 26,
          proteinG: 9.5,
          carbsG: 60
        },
        sourceInfo: source("Walmart US", "https://www.walmart.com/ip/M-M-S-Peanut-Milk-Chocolate-Candy-Family-Size-Bag-18-4-oz/13448777", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "nutrela-soya-chunks-india-usa",
    name: "Nutrela Soya Chunks",
    brand: "Patanjali",
    category: "Superfood",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/nutrela-soya-chunks.jpg",
    imageAlt: "Nutrela Soya Chunks front-pack reference",
    accent: "#76b729",
    shortSummary: "Identical 100% Defatted Soy Flour formulation compared to US Textured Vegetable Protein.",
    matchQuality: "Nutrela soya chunks compared with standard Bob's Red Mill TVP in the US.",
    sourceNote: "Indian data sourced from Patanjali Nutrela. US data sourced from Bob's Red Mill packaging.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Nutrela Soya Chunks",
        barcode: "8906032018926",
        ingredientsRaw: "Defatted Soy Flour.",
        nutritionPer100: {
          energyKcal: 345,
          sugarG: 7.18,
          sodiumMg: 8,
          saltG: 0.02,
          saturatedFatG: 0.1,
          totalFatG: 0.5,
          proteinG: 52,
          fibreG: 13,
          carbsG: 33
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40000291/nutrela-soya-chunks-high-protein-100-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Bob's Red Mill Textured Vegetable Protein",
        barcode: "039978035424",
        ingredientsRaw: "Defatted Soy Flour.",
        nutritionPer100: {
          energyKcal: 333,
          sugarG: 8.3,
          sodiumMg: 8.3,
          saltG: 0.02,
          saturatedFatG: 0,
          totalFatG: 0,
          proteinG: 50,
          fibreG: 16.7,
          carbsG: 29.2
        },
        sourceInfo: source("Bobs Red Mill US", "https://www.bobsredmill.com/tvp-textured-veg-protein.html", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "toblerone-india-swiss",
    name: "Toblerone Milk Chocolate",
    brand: "Mondelez",
    category: "Chocolate",
    compareCountries: ["India", "Switzerland"],
    status: "verified",
    image: "assets/images/products/toblerone.jpg",
    imageAlt: "Toblerone Milk Chocolate front-pack reference",
    accent: "#d4af37",
    shortSummary: "Standardized global Swiss recipe (milk chocolate with honey and almonds) identical in both countries.",
    matchQuality: "Original Swiss recipe Toblerone bar compared across Indian and Swiss retail channels.",
    sourceNote: "Verified from Toblerone international packaging specs.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Toblerone Milk Chocolate",
        barcode: "7622300001049",
        ingredientsRaw: "Sugar, Whole Milk Powder, Cocoa Butter, Cocoa Mass, Honey (3%), Milk Fat, Almonds (1.6%), Emulsifier (Soya Lecithins), Egg White, Flavouring (Vanillin).",
        nutritionPer100: {
          energyKcal: 529,
          sugarG: 59,
          sodiumMg: 60,
          saltG: 0.15,
          saturatedFatG: 16.7,
          totalFatG: 29,
          proteinG: 5.6,
          carbsG: 60
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40007830/toblerone-chocolate-milk-100-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "Switzerland",
        displayName: "Toblerone Milk Chocolate (Swiss)",
        barcode: "7610186000100",
        ingredientsRaw: "Sugar, Whole Milk Powder, Cocoa Butter, Cocoa Mass, Honey (3%), Milk Fat, Almonds (1.6%), Emulsifier (Soya Lecithins), Egg White, Flavouring (Vanillin).",
        nutritionPer100: {
          energyKcal: 529,
          sugarG: 59,
          sodiumMg: 60,
          saltG: 0.15,
          saturatedFatG: 16.7,
          totalFatG: 29,
          proteinG: 5.6,
          carbsG: 60
        },
        sourceInfo: source("Swiss Supermarket", "https://www.coop.ch/en/food/sweets-snacks/chocolate/chocolate-bars/toblerone-milk-chocolate-100g/p/3034960", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "activia-yogurt-india-usa",
    name: "Activia Strawberry Yogurt",
    brand: "Danone",
    category: "Yogurt",
    compareCountries: ["India", "USA"],
    status: "verified",
    image: "assets/images/products/activia-yogurt.jpg",
    imageAlt: "Activia Strawberry Yogurt front-pack reference",
    accent: "#006d3c",
    shortSummary: "US variant uses reduced-fat milk (1.3g fat) and corn starch, while historical Indian variant uses toned milk (3g fat) and pectin.",
    matchQuality: "Strawberry flavored probiotic cup yogurt compared across Indian (historical) and US formulations.",
    sourceNote: "Indian data sourced from Danone India historical records. US data verified from Danone North America.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Danone Activia Strawberry Yogurt",
        barcode: "8906002820016",
        ingredientsRaw: "Toned Milk, Sugar, Strawberry Fruit Preparation (3.0%) (Strawberry Fruit Pulp, Sugar, Water, Stabiliser (INS 440), Acidity Regulator (INS 330), Natural Colour (INS 120)), Milk Solids, Active Cultures (including Bifidobacterium lactis DN-173 010).",
        nutritionPer100: {
          energyKcal: 102,
          sugarG: 14.5,
          sodiumMg: 50,
          saltG: 0.12,
          saturatedFatG: 1.9,
          totalFatG: 3,
          proteinG: 3.1,
          carbsG: 15.6
        },
        sourceInfo: source("Danone India Records", "https://www.danone.in/", "manufacturer_website"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "USA",
        displayName: "Activia Probiotic Low Fat Strawberry Yogurt",
        barcode: "036632028206",
        ingredientsRaw: "Cultured Reduced Fat Milk, Cane Sugar, Strawberries, Water, Corn Starch, Pectin, Natural Flavors, Fruit & Vegetable Juice (for color), Lemon Juice Concentrate, Vitamin D3, Active Probiotic Cultures (B. lactis DN-173 010).",
        nutritionPer100: {
          energyKcal: 80,
          sugarG: 11.5,
          sodiumMg: 44.2,
          saltG: 0.11,
          saturatedFatG: 0.9,
          totalFatG: 1.3,
          proteinG: 3.5,
          carbsG: 14.2
        },
        sourceInfo: source("Danone US", "https://www.activia.us.com/probiotic-yogurt/low-fat-yogurt/strawberry/", "manufacturer_website"),
        lastModified: "2026-06-18"
      })
    }
  },
  {
    id: "mentos-rainbow-india-uk",
    name: "Mentos Rainbow Candy",
    brand: "Mentos",
    category: "Confectionery",
    compareCountries: ["India", "UK"],
    status: "verified",
    image: "assets/images/products/mentos-rainbow.jpg",
    imageAlt: "Mentos Rainbow Candy front-pack reference",
    accent: "#ff0090",
    shortSummary: "UK uses natural colors (Beetroot Red, Anthocyanins, Carmines) & standard Coconut Oil. India uses synthetic azo dyes & hydrogenated fats.",
    matchQuality: "Chewy rainbow fruit flavored candy rolls compared between markets.",
    sourceNote: "Indian data sourced from Perfetti Van Melle India. UK data sourced from Mentos UK.",
    verifiedDate: DATA_ACCESSED_DATE,
    imageSource: null,
    variants: {
      india: sourcedVariant({
        country: "India",
        displayName: "Mentos Rainbow Chewy Candy",
        barcode: "8902251025707",
        ingredientsRaw: "Sugar, Liquid Glucose, Fruit Juices (1.2% - Strawberry, Orange, Watermelon, Pineapple, Raspberry, Grapefruit, Blueberry), Hydrogenated Vegetable Oil (Coconut Oil), Acid (INS 330), Starch, Thickeners (INS 414, INS 418), Emulsifier (INS 473), Glazing Agent (INS 903), Colours (INS 102, INS 110, INS 122, INS 124, INS 127, INS 132, INS 133).",
        nutritionPer100: {
          energyKcal: 387,
          sugarG: 71.7,
          sodiumMg: 64,
          saltG: 0.16,
          saturatedFatG: 1.8,
          totalFatG: 1.8,
          proteinG: 0.05,
          carbsG: 92
        },
        sourceInfo: source("BigBasket India", "https://www.bigbasket.com/pd/40118599/mentos-rainbow-flavour-chewy-candy-roll-29-g/", "retailer_label"),
        lastModified: "2026-06-18"
      }),
      other: sourcedVariant({
        country: "UK",
        displayName: "Mentos Rainbow Chewy Roll",
        barcode: "8003440938361",
        ingredientsRaw: "Sugar, Glucose Syrup, Fruit Juices from Concentrate (2% - Strawberry, Apple, Orange, Grapefruit, Raspberry, Blueberry, Watermelon), Coconut Oil, Acid (Citric Acid), Starch, Flavourings, Maltodextrin, Thickeners (Gellan Gum, Cellulose Gum, Gum Arabic), Emulsifier (Sucrose Esters of Fatty Acids), Glazing Agents (Carnauba Wax, Beeswax), Colours (Anthocyanins, Curcumin, Carmines, Beta-Carotene, Beetroot Red).",
        nutritionPer100: {
          energyKcal: 388,
          sugarG: 69,
          sodiumMg: 40,
          saltG: 0.1,
          saturatedFatG: 1.9,
          totalFatG: 1.9,
          proteinG: 0,
          carbsG: 92
        },
        sourceInfo: source("Ocado UK", "https://www.ocado.com/products/mentos-rainbow-roll-40542111", "retailer_label"),
        lastModified: "2026-06-18"
      })
    }
  }
];
