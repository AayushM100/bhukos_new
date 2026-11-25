import { prisma } from '../../repositories/prisma';
import { DateTime } from 'luxon';

interface WikipediaSummaryResponse {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  }
  content_urls?: {
    desktop: {
      page: string;
    };
  };
}

const FOOD_TOPICS = [
  'History_of_food',
  'History_of_cuisine',
  'List_of_dish_names',
  'Beverages',
  'History_of_beverages',
  'Culinary_arts',
  'Food_history',
  'Gastronomy',
];

export async function fetchWikipediaSummary(topic: string): Promise<WikipediaSummaryResponse | null> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Bhukos/1.0 (contact: admin@bhukos.app)',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as WikipediaSummaryResponse;

    return {
      title: data.title,
      extract: data.extract,
      thumbnail: data.thumbnail,
      content_urls: data.content_urls,
    };
  } catch (error) {
    console.error('Failed to fetch Wikipedia summary:', error);
    return null;
  }
}

export async function syncTodaysFact(): Promise<void> {
  const today = DateTime.utc().startOf('day').toJSDate();

  // Check if today's fact already exists
  const existingFact = await prisma.dailyFunFact.findUnique({
    where: {
      factDate: today,
    },
  });

  if (existingFact) {
    return;
  }

  // Try to fetch from Wikipedia
  let factData: WikipediaSummaryResponse | null = null;

  // Try random topic first, then fallback topics
  for (const topic of [...FOOD_TOPICS, ...FOOD_TOPICS.reverse()]) {
    factData = await fetchWikipediaSummary(topic);
    if (factData) break;
  }

  if (!factData) {
    // Create a placeholder fact if Wikipedia is unavailable
    factData = {
      title: 'Food History Fact',
      extract: 'Unable to fetch today\'s Wikipedia fact due to network issues. Please try again later!',
      content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Food_history' } },
    };
  }

  const imageUrl = factData.thumbnail?.source ?? null;
  const wikipediaUrl = factData.content_urls?.desktop?.page ?? 'https://en.wikipedia.org/wiki/Food_history';

  await prisma.dailyFunFact.create({
    data: {
      factDate: today,
      title: factData.title,
      summary: factData.extract,
      wikipediaUrl,
      imageUrl,
    },
  });
}

export async function getTodaysFact(): Promise<{
  id: string;
  factDate: string;
  title: string;
  summary: string;
  wikipediaUrl: string;
  imageUrl: string | null;
} | null> {
  const today = DateTime.utc().startOf('day').toJSDate();

  const fact = await prisma.dailyFunFact.findUnique({
    where: {
      factDate: today,
    },
  });

  if (!fact) {
    // Try to sync if missing
    await syncTodaysFact();
    return getTodaysFact();
  }

  // Use type assertion on the result
  const result = {
    id: fact.id,
    factDate: DateTime.fromJSDate(fact.factDate).toISODate() as string,
    title: fact.title,
    summary: fact.summary,
    wikipediaUrl: fact.wikipediaUrl,
    imageUrl: fact.imageUrl,
  };

  return result;
}