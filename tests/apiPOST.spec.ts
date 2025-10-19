import { test, expect, request as pwRequest } from '@playwright/test';
import { createUsers } from './data/createUsers';

const API_BASE = 'https://reqres.in';
const API_KEY = process.env.REQRES_API_KEY ?? '';
const RESPONSE_TIME_LIMIT_MS = 100;

test.describe('POST /api/users', () => {
  for (const payload of createUsers) {
    test(`creates user ${payload.name}`, async () => {
      const api = await pwRequest.newContext({
        baseURL: API_BASE,
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
        ignoreHTTPSErrors: true,
      });

      const params: Record<string, string | number> = {};
      if (API_KEY) {
        params.api_key = API_KEY;
      }

      const start = Date.now();
      const res = await api.post('/api/users', {
        data: payload,
        params,
      });
      const durationMs = Date.now() - start;

      expect(res.status()).toBe(201);

      let responseTimeMessage: string | null = null;
      try {
        expect(durationMs).toBeLessThan(RESPONSE_TIME_LIMIT_MS);
      } catch (error) {
        responseTimeMessage = `Response time ${durationMs}ms prekročil limit ${RESPONSE_TIME_LIMIT_MS}ms.`;
        //console.error(`AssertionError: ${responseTimeMessage}`);
      }

      const body: any = await res.json();

      expect(body.name).toBe(payload.name);
      expect(body.job).toBe(payload.job);

      expect(typeof body.id).toBe('string');
      expect(body.id.trim().length).toBeGreaterThan(0);

      expect(typeof body.createdAt).toBe('string');
      const createdAtTimestamp = Date.parse(body.createdAt);
      expect(Number.isNaN(createdAtTimestamp)).toBeFalsy();

      // Optional bonus: jednoduchá kontrola schémy odpovede
      expect(body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          job: expect.any(String),
          id: expect.any(String),
          createdAt: expect.any(String),
        }),
      );

      console.log('POST SUMMARY ->', {
        name: body.name,
        job: body.job,
        id: body.id,
        createdAt: body.createdAt,
        durationMs,
        responseTimeError: responseTimeMessage,
      });

      await api.dispose();
    });
  }
});
