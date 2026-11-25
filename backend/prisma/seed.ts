import { prisma } from '../src/repositories/prisma';
import { Category, Rarity } from '@prisma/client';

interface SeedFoodCard {
  name: string;
  slug: string;
  category: Category;
  flavors: string[];
  artworkUrl: string;
  funQuote: string;
  rarity: Rarity;
  avgRating: number;
  ratingCount: number;
}

const seedData: SeedFoodCard[] = [
  // COMMON - Packaged Snacks (Entry level collectibles)
  {
    name: "Lay's Classic Salted",
    slug: 'layds-classic-salted',
    category: 'SNACK',
    flavors: ['SALTY'],
    artworkUrl: '/cards/layds-classic-salted.svg',
    funQuote: 'The perfect balance of salt and crisp - America\'s chip classic since 1952.',
    rarity: 'COMMON',
    avgRating: 4.1,
    ratingCount: 3421,
  },
  {
    name: 'Paper Boat Aamras',
    slug: 'paper-boat-aamras',
    category: 'DRINK',
    flavors: ['SWEET', 'FRUIT', 'MANGO'],
    artworkUrl: '/cards/paper-boat-aamras.svg',
    funQuote: 'Pure mango goodness cubed - the raw, unstoppable taste of summer.',
    rarity: 'COMMON',
    avgRating: 4.3,
    ratingCount: 2156,
  },
  // UNCOMMON - Packaged Snacks (Regional favorites, unique flavors)
  {
    name: "Lay's India's Magic Masala",
    slug: 'lays-magic-masala',
    category: 'SNACK',
    flavors: ['SPICY', 'SALTY', 'UMAMI'],
    artworkUrl: '/cards/lays-magic-masala.svg',
    funQuote: 'A tangy, spicy thrill from India\'s favorite chip brand - the magic in every bag.',
    rarity: 'UNCOMMON',
    avgRating: 4.3,
    ratingCount: 1874,
  },
  {
    name: 'Kurkure Masala Munch',
    slug: 'kurkure-masala-munch',
    category: 'SNACK',
    flavors: ['SPICY', 'SALTY', 'CRUNCHY'],
    artworkUrl: '/cards/kurkure-masala-munch.svg',
    funQuote: 'Crunchy corn squares with that irresistible masala kick - India\'s beloved crunchy snack.',
    rarity: 'UNCOMMON',
    avgRating: 4.2,
    ratingCount: 1543,
  },
  {
    name: 'Monster Energy Ultra Zero White',
    slug: 'monster-ultra-white',
    category: 'DRINK',
    flavors: ['CITRUS', 'ZERO_SUGAR'],
    artworkUrl: '/cards/monster-ultra-white.svg',
    funQuote: 'Zero sugar, full flavor - the clean energy booster with a crisp citrus finish.',
    rarity: 'UNCOMMON',
    avgRating: 3.8,
    ratingCount: 982,
  },
  // RARE - Packaged Snacks (Premium, specialty items)
  {
    name: 'Pringles Sour Cream & Onion',
    slug: 'pringles-sc-and-onion',
    category: 'SNACK',
    flavors: ['CREAMY', 'ONIONY'],
    artworkUrl: '/cards/pringles-sc-and-onion.svg',
    funQuote: 'The iconic stack - perfectly seasoned with tangy goodness since 1971.',
    rarity: 'RARE',
    avgRating: 4.4,
    ratingCount: 892,
  },
  {
    name: 'Cadbury Dairy Milk Silk Roast Almond',
    slug: 'cadbury-dairy-milk-silk-roast-almond',
    category: 'SNACK',
    flavors: ['SWEET', 'NUTTY'],
    artworkUrl: '/cards/cadbury-dairy-milk-silk-roast-almond.svg',
    funQuote: 'Premium milk chocolate with toasted almond decadence - the silky indulgence.',
    rarity: 'RARE',
    avgRating: 4.5,
    ratingCount: 654,
  },
  {
    name: 'Red Bull Energy Drink',
    slug: 'red-bull-original',
    category: 'DRINK',
    flavors: ['CAFÉINATED', 'ELECTRIC'],
    artworkUrl: '/cards/red-bull-original.svg',
    funQuote: 'Gives you wings - the original energy staple that wakes up the world.',
    rarity: 'RARE',
    avgRating: 4.2,
    ratingCount: 421,
  },
  {
    name: 'Amul Kool Kesar',
    slug: 'amul-kool-kesar',
    category: 'DRINK',
    flavors: ['SWEET', 'CINNAMON', 'CARDAMOM'],
    artworkUrl: '/cards/amul-kool-kesar.svg',
    funQuote: 'Vanilla cardamom ice cream that\'s all the cool in one cup - India\'s chilled favorite.',
    rarity: 'RARE',
    avgRating: 4.1,
    ratingCount: 523,
  },
  // EPIC - Packaged Snacks (Limited editions, cult favorites)
  {
    name: 'Amul Dark Chocolate 55%',
    slug: 'amul-dark-chocolate-55',
    category: 'SNACK',
    flavors: ['SWEET', 'BITTER'],
    artworkUrl: '/cards/amul-dark-chocolate-55.svg',
    funQuote: 'The introvert\'s choice - bold cocoa without compromise, straight from India.',
    rarity: 'EPIC',
    avgRating: 4.0,
    ratingCount: 312,
  },
  {
    name: 'Oreo Choco Creme',
    slug: 'oreo-choco-creme',
    category: 'SNACK',
    flavors: ['SWEET', 'CREAMY'],
    artworkUrl: '/cards/oreo-choco-creme.svg',
    funQuote: 'Twice the cookie, twice the creamy chocolate bliss - the classic duo in perfect harmony.',
    rarity: 'EPIC',
    avgRating: 4.6,
    ratingCount: 278,
  },
  // LEGENDARY - Packaged Snacks (Iconic, cult status)
  {
    name: "Haldiram's Aloo Bhujia",
    slug: 'haldirams-aloo-bhujia',
    category: 'SNACK',
    flavors: ['SPICY', 'SAVORY'],
    artworkUrl: '/cards/haldirams-aloo-bhujia.svg',
    funQuote: 'Crisp, golden savory noodles that define Indian street snack excellence - the original bhujia.',
    rarity: 'LEGENDARY',
    avgRating: 4.7,
    ratingCount: 189,
  },
];

async function main() {
  console.log('Starting seed...');

  for (const card of seedData) {
    await prisma.foodCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card,
    });
    console.log(`Seeded: ${card.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });