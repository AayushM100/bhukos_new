import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { authPlugin } from '@/plugins/auth';
import { healthRoute } from '@/routes/v1/health.route';
import { cardsRoutes } from '../routes';

describe('Cards Module', () => {
  let testApp: FastifyInstance;

  beforeAll(async () => {
    // Build a fresh app instance for testing
    testApp = fastify({
      logger: false,
    });

    await testApp.register(authPlugin);
    await testApp.register(healthRoute);
    await testApp.register(cardsRoutes);
    await testApp.ready();
  });

  afterAll(async () => {
    await testApp.close();
  });

  describe('GET /api/v1/cards', () => {
    it('should return 200 with paginated cards', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?page=1&limit=10',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('items');
      expect(body).toHaveProperty('total');
      expect(body).toHaveProperty('page');
      expect(body).toHaveProperty('totalPages');
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.page).toBe(1);
      expect(body.totalPages).toBeGreaterThanOrEqual(1);
    });

    it('should filter by category', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?category=SNACK&limit=10',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body.items.every((item: any) => item.category === 'SNACK')).toBe(true);
    });

    it('should filter by rarity', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?rarity=RARE&limit=10',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body.items.every((item: any) => item.rarity === 'RARE')).toBe(true);
    });

    it('should search by name or slug', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?search=chips',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      // Should find items matching 'chips'
      expect(body.total).toBeGreaterThanOrEqual(1);
    });

    it('should return empty items array when no matches', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?search=nonexistentfooditem12345',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body.items).toEqual([]);
      expect(body.total).toBe(0);
    });

    it('should paginate correctly', async () => {
      // Get page 1 with limit 3
      const response1 = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?page=1&limit=3',
      });

      expect(response1.statusCode).toBe(200);
      const body1 = JSON.parse(response1.body);
      expect(body1.items.length).toBeLessThanOrEqual(3);

      // Get page 2
      const response2 = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards?page=2&limit=3',
      });

      expect(response2.statusCode).toBe(200);
      const body2 = JSON.parse(response2.body);
      // Items should be different from page 1
      if (body1.items.length > 0 && body2.items.length > 0) {
        expect(body2.items[0].id).not.toBe(body1.items[0].id);
      }
    });
  });

  describe('GET /api/v1/cards/:slug', () => {
    it('should return 200 with card details for valid slug', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards/classic-potato-chips',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      // Response is the card itself (not wrapped) per API contract: FoodCardDetailDTO
      expect(body.slug).toBe('classic-potato-chips');
      expect(body.name).toBe('Classic Potato Chips');
      expect(body.category).toBe('SNACK');
      expect(body.rarity).toBe('COMMON');
      expect(body).toHaveProperty('avgRating');
      expect(body).toHaveProperty('ratingCount');
      expect(body).toHaveProperty('flavors');
      expect(body).toHaveProperty('funQuote');
    });

    it('should return 404 for unknown slug', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards/unknown-nonexistent-slug',
      });

      expect(response.statusCode).toBe(404);

      const body = JSON.parse(response.body);
      expect(body.error.code).toBe('CARD_NOT_FOUND');
      expect(body.error.message).toContain('unknown-nonexistent-slug');
    });

    it('should return card with correct data types', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/cards/truffle-peanut-butter',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      // Response is the card itself (not wrapped) per API contract
      const card = body;

      // avgRating should be a number (serialized from Decimal)
      expect(typeof card.avgRating).toBe('number');
      expect(card.avgRating).toBeGreaterThanOrEqual(0);
      expect(card.avgRating).toBeLessThanOrEqual(5);

      // ratingCount should be a number
      expect(typeof card.ratingCount).toBe('number');
      expect(card.ratingCount).toBeGreaterThanOrEqual(0);

      // flavors should be an array
      expect(Array.isArray(card.flavors)).toBe(true);
    });
  });
});