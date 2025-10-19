import { test, expect, request as pwRequest } from '@playwright/test';

const API_BASE = 'https://reqres.in';
const API_KEY = process.env.REQRES_API_KEY ?? '';

test('Test API GET', async () => {
  const api = await pwRequest.newContext({
    baseURL: API_BASE,
    extraHTTPHeaders: { Accept: 'application/json' },
    ignoreHTTPSErrors: true,
  });

  const params: Record<string, string | number> = { page: 2 };
  if (API_KEY) {
    params.api_key = API_KEY;
  }

  const res = await api.get('/api/users', { params });
  expect(res.status()).toBe(200);

  const body: any = await res.json();
  expect(typeof body.total).toBe('number');
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThanOrEqual(2);

  const total: number = body.total;
  const lastName1: string = body.data[0]?.last_name ?? '';
  const lastName2: string = body.data[1]?.last_name ?? '';
  console.log('RESPONSE SUMMARY ->', {
    status: res.status(),
    total,
    lastName1,
    lastName2,
  });

  const countOnThisPage = body.data.length;

  expect(total).toBeGreaterThanOrEqual(countOnThisPage);

  if (typeof body.per_page === 'number') {
    expect(countOnThisPage).toBe(body.per_page);
  }

  console.log('COUNT CHECK ->', {
    countOnThisPage,
    total,
    per_page: body.per_page,
    total_pages: body.total_pages,
  });

  const typeSummary = {
    total: typeof total,
    lastName1: typeof lastName1,
    lastName2: typeof lastName2,
    countOnThisPage: typeof countOnThisPage,
    per_page: typeof body.per_page,
    total_pages: typeof body.total_pages,
  };

  console.log('TYPE SUMMARY ->', {
    total: `${typeSummary.total} (${total})`,
    lastName1: `${typeSummary.lastName1} (${lastName1})`,
    lastName2: `${typeSummary.lastName2} (${lastName2})`,
    countOnThisPage: `${typeSummary.countOnThisPage} (${countOnThisPage})`,
    per_page: `${typeSummary.per_page} (${body.per_page})`,
    total_pages: `${typeSummary.total_pages} (${body.total_pages})`,
  });
});
