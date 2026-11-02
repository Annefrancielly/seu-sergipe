type DishTextEn = {
  name?: string;
  description?: string;
  note?: string;
  items?: readonly string[];
  photoAlt?: string;
};

type CategoryTextEn = {
  name: string;
  description: string;
  notes?: readonly string[];
};

const INGREDIENT_NOTICE =
  "The menu and some elements of the dishes may change according to the chef's inspiration and the availability of local ingredients.";

export const categoriesEn: Record<string, CategoryTextEn> = {
  "menu-degustacao": {
    name: "Tasting Menus",
    description: "A journey through the flavors of Sergipe, course by course, guided by the chef.",
    notes: [INGREDIENT_NOTICE],
  },
  entradas: {
    name: "Starters & Snacks",
    description: "To whet your appetite and get the conversation going.",
    notes: [INGREDIENT_NOTICE],
  },
  "pratos-principais": {
    name: "Main Courses",
    description: "Signature cuisine and heritage cuisine, side by side.",
    notes: [
      "Vegan or vegetarian? We can reinvent the dishes from our signature cuisine. Let the possibilities surprise you.",
      INGREDIENT_NOTICE,
    ],
  },
  moquecas: {
    name: "Moquecas",
    description: "Simmered in coconut milk and served with pirão, vinaigrette and farofa.",
    notes: [INGREDIENT_NOTICE],
  },
  "pratos-infantis": {
    name: "Kids' Menu",
    description: "Made for our youngest travelers.",
    notes: [INGREDIENT_NOTICE],
  },
  hamburgueres: {
    name: "Burgers",
    description: "Sergipe traditions between two slices of bread.",
    notes: [
      "All burgers are served on a butter-toasted bun with torched queijo coalho, cilantro emulsion, maxixe pickles and cashew-apple vinaigrette.",
      INGREDIENT_NOTICE,
    ],
  },
  drinks: {
    name: "Drinks",
    description: "Local fruits, Sergipe-made gin and cachaça from Capela.",
    notes: ["Any drink can be made alcohol-free. Just ask your server."],
  },
  bebidas: {
    name: "Beverages",
    description: "Beers, spirits, wine, juices and coffee.",
    notes: [
      "We are always looking for new wines: ask our servers or visit our wine cellar to discover exclusive labels.",
    ],
  },
  sobremesas: {
    name: "Desserts",
    description: "The classics meet the typical flavors of Sergipe.",
    notes: [INGREDIENT_NOTICE],
  },
};

export const groupsEn: Record<string, string> = {
  "Cozinha Autoral": "Signature Cuisine",
  "Cozinha de Origem": "Heritage Cuisine",
  Cervejas: "Beers",
  Doses: "Spirits",
  Vinhos: "Wine",
  "Sucos e refrescos": "Juices & Refreshments",
  "Refrigerantes e águas": "Sodas & Water",
  "Cafés e chás": "Coffee & Tea",
};

export const priceLabelsEn: Record<string, string> = {
  "Sem harmonização": "Without pairing",
  "Harmonizado com drinks": "With cocktail pairing",
  "Harmonizado com vinho": "With wine pairing",
  Individual: "Single",
  Casal: "For two",
};

export const dishesEn: Record<string, DishTextEn> = {
  "menu-sensacoes": {
    description:
      "Chef Seichele Barboza creates this menu exclusively for you. The experience unfolds over 10 courses, with cocktail pairings, in a private space at Seu Sergipe.",
    photoAlt: "A tasting menu course served in a handmade ceramic bowl.",
  },
  "experiencia-do-cabrunco": {
    description:
      "Chef Seichele Barboza takes you on a journey through the bold flavors of our land, drawing inspiration from Sergipe's traditions.",
    items: ["Couvert", "Amuse-bouche", "Snack", "Starters", "Main courses", "Intermezzo", "Dessert"],
    photoAlt: "Crispy quiabada with a blue flower in a white bowl.",
  },
  "origem-sergipana": {
    description: "Starter, amuse-bouche, main course and dessert. You choose your main course from the menu.",
    note: "Excludes dishes with octopus, oxtail, moquecas and lamb.",
    photoAlt: "A pot of octopus, shrimp and bell peppers, finished with cilantro.",
  },
  "chamego-bom": {
    description: "Sweet potato chips with smoked paprika and cilantro emulsion.",
  },
  "quiabada-crocante": {
    description:
      "A new take on Sergipe's traditional quiabada, inspired by bolinho de capitão. Maxixe pickles and tamarind coulis bring acidity and character to the dish.",
    note: "4 pieces",
    photoAlt:
      "A golden breaded fritter topped with cheese shavings and a blue flower, on a green emulsion in a white bowl.",
  },
  "moquequinha-de-aratu": {
    description:
      "Oven-baked moquecas wrapped in banana leaves are a classic Sergipe preparation. Inspired by them, the chef reimagines the dish with extra-crispy picked aratu crab and umbu-cajá aioli.",
    note: "4 pieces",
  },
  "coxinha-de-arraia": {
    description:
      "Stingray seared in manteiga de garrafa and shredded; the dough is made with moqueca and cassava flour, and it is finished with dendê aioli.",
    note: "4 pieces",
  },
  "a-polvorosa": {
    description:
      "Octopus cubes grilled in brown butter, teriyaki sauce made with cachaça from Capela, crispy maxixe and boiled peanut pickles.",
    note: "6 pieces",
  },
  "couvert-da-chef": {
    description: "Toast in manteiga de garrafa with a shower of parmesan, cilantro emulsion and tomato confit.",
  },
  "ceviche-bonito-e-cheiroso": {
    description:
      "A mix of Sergipe fish soaked in cashew-nut leche de tigre, citrus juice, cashew nuts and fresh cashew apple, finished with cilantro oil.",
  },
  tartar: {
    description:
      "House-cured filet mignon seasoned with the Seu Sergipe herb mix, uricuri pickles, basil emulsion, a crudo of cau and Dijon, and the crunch of the day.",
  },
  "mariscada-sem-vergonha": {
    description: "Our mariscada is made with homemade coconut milk, shrimp, sururu, oysters, aratu and crab.",
  },
  "tripinha-croc-croc": {
    description:
      "Tripe that is poached, roasted and deep-fried, served with farofa d'água, cashew-apple vinaigrette and cilantro emulsion.",
  },
  "figado-mestre-do-sabor-entrada": {
    description:
      "Liver marinated in the Seu Sergipe black sauce, grilled with onions and bell peppers Sergipe-style, finished in brown butter, with cashew-apple vinaigrette and tangy farofa d'água.",
  },
  "risoto-bonito-e-cheiroso": {
    description:
      "Shrimp two ways, grilled and crispy, with an arroz de praia risotto on a moqueca base, cashew-apple vinaigrette and smoked saburica farofa.",
  },
  marminino: {
    description:
      "Sweet potato gnocchi with grilled shrimp and a sauce of local parmesan and queijo coalho, finished with tomato confit and a shower of parmesan.",
  },
  "arroz-de-camarao": {
    description:
      "Creamy rice with grilled shrimp, sautéed with tomato, bell peppers, garlic and pimenta de cheiro in the chef's special seasoning, served in a clay pot with a shower of parmesan.",
  },
  "polvo-a-sergipana": {
    description:
      "Octopus grilled with the Seu Sergipe herb mix, moqueca velouté, garlic and fresh herb tagliatelle, tomato confit, finished with shavings of local parmesan.",
  },
  "risoto-de-polvo": {
    description: "Grilled octopus served with risotto, local parmesan, cilantro oil and cashew-apple vinaigrette.",
  },
  "ze-peixe": {
    description:
      "Spice-aged weakfish, dendê aligot, grilled okra or maxixe, green salad with boiled peanuts, queijo coalho and requeijão, and cumin and cilantro farofa.",
  },
  xoco: {
    description:
      "Lightly marinated tilapia grilled with the Seu Sergipe herb mix, salad of the day and creamy majongome rice.",
  },
  "voce-e-o-chef": {
    description:
      "You're the chef: choose your favorite protein, filet mignon, shrimp or fish. On the side, our salad with mango, cashew nuts, majongome, lettuce, arugula, cilantro, tomato confit, queijo coalho and a nut-milk dressing.",
  },
  "sertao-sergipano": {
    description:
      "Spice-cured filet mignon, seared in olive oil and finished in brown butter, a mix of beans and fava beans, milk pirão, cumin seed and cilantro farofa, and a small maxixe and boiled peanut salad.",
  },
  veio: {
    description:
      "Spice-cured filet mignon, tagliatelle in brown butter and basil with a sauce of local cheeses, tomato confit and truffle oil.",
  },
  "nhoque-da-terra-veg": {
    description:
      "Sweet potato gnocchi, a sauce of queijo coalho and parmesan, tomato confit, parmesan shavings and brown butter.",
  },
  "figado-mestre-do-sabor": {
    description:
      "Liver marinated in the Seu Sergipe black sauce, grilled with onions and bell peppers Sergipe-style, finished in brown butter, with spicy cashew-apple vinaigrette and farofa d'água.",
  },
  "baiao-de-tres": {
    description:
      "Fresh cowpeas with rice sautéed with bacon, charque, paio, onion, garlic, bell peppers, pimenta de cheiro and tomatoes, finished with torched queijo coalho.",
  },
  "carneiro-de-dona-cida": {
    description:
      "Lamb slow-cooked by the chef's mom in a rich broth, served with our delicious pirão, sticky rice, farofa d'água and vinaigrette.",
  },
  "rabada-de-mainha": {
    description: "Fall-apart tender oxtail, creamy pirão, cashew-nut rice, farofa d'água and vinaigrette.",
  },
  "moqueca-du-cabrunco": {
    description:
      "Fish and shrimp in moqueca sauce with coconut milk, sliced tomato, onion, bell pepper and pimenta de cheiro, a hint of ginger, pirão, vinaigrette, smoked saburica farofa and cashew-nut rice.",
  },
  "moqueca-encontro-das-aguas": {
    description:
      "Fish, octopus and shrimp in coconut milk sauce, with pirão, tomato, onion, bell pepper, pimenta de cheiro and a hint of ginger. Served with vinaigrette, smoked saburica farofa and cashew-nut rice.",
    photoAlt:
      "A dark pot of octopus, shrimp and colorful bell peppers finished with cilantro, next to a pot of shrimp with lime.",
  },
  "moqueca-de-banana-da-terra": {
    description:
      "Plantain in coconut milk sauce, pirão, sliced tomato, onion, bell pepper and pimenta de cheiro, a hint of ginger, maxixe pickles, cashew-apple vinaigrette, coriander seed farofa and cashew-nut rice.",
  },
  sergipinho: {
    description: "Filet mignon escalope, sticky rice, sautéed potatoes or fries, and farofa.",
  },
  "meu-dengo": {
    description: "Filet mignon escalope, buttered tagliatelle, cheese sauce and a shower of parmesan.",
    note: "Can also be served with tomato sauce.",
  },
  "hamburguer-de-aratu": {
    description:
      "The chef brings Sergipe tradition to a crispy aratu moquequinha patty made with cassava flour.",
  },
  "hamburguer-de-polvo": {
    description: "Grilled octopus tentacles with the Seu Sergipe herb mix, tomato confit and grated parmesan.",
  },
  "sao-goncalo": {
    description:
      "Chef Seichele plays with your palate, serving crispy shrimp in a cheese sauce with uricuri and bacon, a true explosion of flavors.",
  },
  caboclinho: {
    description:
      "130 g cured beef patty, torched queijo coalho, cilantro emulsion, pickled red onion and cashew-apple vinaigrette.",
  },
  "lambe-sujo": {
    description:
      "180 g patty with caramelized onion, bacon, cilantro emulsion, cashew-apple vinaigrette and maxixe pickles.",
  },
  "hamburguer-de-quiabada": {
    description:
      "Crispy quiabada patty, caramelized onion, maxixe pickles, cilantro emulsion and cashew-apple vinaigrette.",
  },
  "tamarindo-ao-extremo": {
    description:
      "Tamarind coulis, tonic, The Legend gin from Sergipe, rosemary, pink peppercorn and torched cinnamon.",
  },
  "caju-amigo": {
    description:
      "Cashew-apple confit, fresh cashew apple, cachaça, lime, star anise, pink peppercorn and pimenta de cheiro.",
  },
  "moranguinho-nordeste": {
    description:
      "Strawberry reduction, fresh strawberries, tonic, lime, ginger syrup, The Legend gin from Sergipe and a toasted coconut rim.",
  },
  "por-do-sol-na-cinelandia": {
    description: "Spiced hibiscus and passion fruit reduction, ginger syrup, tonic and vodka, with a light touch of lime.",
  },
  "aperol-spritz": {
    description: "Aperol, navel orange, sparkling wine and soda water.",
  },
  aracajito: {
    description: "A mojito reimagined with a touch of ginger, Persian lime, rum, mint and soda water.",
  },
  "sao-joao": {
    description: "Vodka, paçoca, peanuts, condensed milk and joy.",
  },
  "caipirinha-a-beira-mar": {
    description: "Persian lime, Braba cachaça, sugar, basil and lime zest.",
  },
  "dry-martini": {
    description: "The Legend gin, dry vermouth, ice and olive.",
  },
  "negroni-de-lampiao": {
    description: "Campari, The Legend gin and rosso vermouth.",
  },
  "gin-tonica-a-sergipana": {
    description: "The Legend gin, tonic and seasonal Sergipe fruits.",
    note: "Ask the bartender about today's fruits.",
  },
  "mangaba-e-agua-de-coco": {
    description: "Mangaba reduction and coconut water.",
  },
  "mangaba-city": {
    description: "Mangaba reduction, lime, orange, basil, and tonic or soda water.",
  },
  "sodas-seu-sergipe": {
    description:
      "The Soda Sergipana combines a spiced passion fruit and hibiscus reduction, lime, ginger syrup, basil, pink peppercorn, and tonic or soda water. Flavors: mangaba, tamarind, cashew apple, passion fruit and strawberry.",
  },
  "chivas-12": { name: "Chivas 12-year whisky" },
  "jack-daniels": { name: "Jack Daniel's whiskey" },
  "old-parr": { name: "Old Parr whisky" },
  "vinho-taca": { name: "Glass of wine", description: "Red, white or sparkling." },
  "taxa-de-rolha": { name: "Corkage fee" },
  "sucos-especiais": {
    name: "Specialty juices",
    items: [
      "Strawberry, lime and ginger",
      "Strawberry and lime",
      "Acerola, lime and rosemary",
      "Acerola and orange",
      "Pineapple and mint",
    ],
  },
  "milk-shake-de-mangaba": { name: "Mangaba milkshake", description: "With tamarind syrup." },
  sucos: {
    name: "Juices",
    items: ["Mango", "Passion fruit", "Mangaba", "Cashew apple", "Acerola", "Tamarind", "Pineapple", "Lime", "Orange", "Strawberry"],
    note: "Ask about seasonal fruit availability.",
  },
  refrigerantes: { name: "Sodas" },
  tonica: { name: "Antarctica tonic water" },
  "tonica-zero": { name: "Antarctica Zero tonic water" },
  "agua-de-coco": { name: "Coconut water (glass)" },
  "agua-minalba": { name: "Minalba still water" },
  "agua-minalba-gas": { name: "Minalba sparkling water" },
  "agua-cristal": { name: "Cristal still water" },
  "agua-cristal-gas": { name: "Cristal sparkling water" },
  "cha-de-ervas": { name: "Fresh herbal tea" },
  "cafe-coado": { name: "Drip coffee" },
  "cafe-expresso": { name: "Lavazza espresso" },
  "creme-brulee-de-mangaba": {
    description: "The tartness of mangaba, the chill of the custard and the crunch of torched caramel.",
  },
  "ne-banana-nao": {
    description:
      "Spiced cashew-apple paste, slices of torched queijo coalho, grated cashew praline and ambrosia bites.",
  },
  amorosa: {
    description: "Coriander seed sponge cake, boiled peanut brigadeiro, lime cream and salted caramel toffee.",
    photoAlt: "A dessert with torched meringue, berries, yellow cream and red sauce on a blue ceramic plate.",
  },
  "pudim-de-coco-verde": {
    description: "Pudding made with young coconut meat, port wine reduction and ginger crisps.",
  },
  "bolinho-de-chuva-da-dada": {
    description: "Fluffy fried dough bites served with coffee brigadeiro and dulce de leche sauce.",
  },
  "jardim-da-seichele": {
    description:
      "A dessert served in a lovely flower pot, with cocoa cake, semisweet chocolate ganache and crunchy crumble.",
  },
};

export const ingredientGlossaryEn: readonly { term: string; meaning: string }[] = [
  { term: "aratu", meaning: "a small mangrove crab" },
  { term: "brigadeiro", meaning: "a soft Brazilian fudge sweet" },
  { term: "cachaça", meaning: "Brazilian sugarcane spirit" },
  { term: "caju", meaning: "the cashew apple, fruit of the cashew tree" },
  { term: "charque · paio", meaning: "salt-dried beef · smoked pork sausage" },
  { term: "dendê", meaning: "red palm oil" },
  { term: "farofa", meaning: "toasted cassava flour; farofa d'água is moistened and seasoned" },
  { term: "mangaba", meaning: "a tart native fruit, the symbol of Sergipe" },
  { term: "manteiga de garrafa", meaning: "clarified butter from Brazil's Northeast" },
  { term: "maxixe", meaning: "West Indian gherkin, a small spiny cucumber" },
  { term: "moqueca", meaning: "a fish or seafood stew with coconut milk" },
  { term: "paçoca", meaning: "a ground peanut candy" },
  { term: "pimenta de cheiro", meaning: "a mild, aromatic pepper" },
  { term: "pirão", meaning: "a thick gravy made with broth and cassava flour" },
  { term: "queijo coalho", meaning: "a firm grilling cheese" },
  { term: "quiabada", meaning: "an okra stew" },
  { term: "requeijão", meaning: "a creamy Brazilian cheese spread" },
  { term: "sururu", meaning: "small local mussels" },
  { term: "umbu-cajá", meaning: "a tart native fruit" },
  { term: "uricuri", meaning: "the nut of the licuri palm" },
];
