## Moxymind Playwright Tests

Táto zložka obsahuje automatické testy pre web Saucedemo a API Reqres. Testy sú v TypeScripte a spúšťajú sa cez Playwright.
Do README som spísala inštrukcie, aby vedel projekt spustiť každý.

### Čo potrebuješ
- Node.js 18+ (`node -v` ti ukáže verziu)
- npm (je súčasťou inštalácie Node.js)

### Ako projekt pripraviť
1. Naklonuj repozitár (postup nižšie v kapitole „Ako to nahrať na GitHub“).
2. Nainštaluj balíčky:
   ```bash
   npm install
   ```
3. Stiahni prehliadače, ktoré Playwright používa:
   ```bash
   npx playwright install
   ```
4. Ak používaš API kľúč pre Reqres, nastav ho:
   ```bash
   export REQRES_API_KEY="tvoj-kľúč"
   ```
   alebo pridaj riadok `REQRES_API_KEY=...` do súboru `.env`.

### Ako spustiť testy
- Všetky testy naraz:
  ```bash
  npm test
  ```
- Jeden konkrétny test:
  ```bash
  npx playwright test tests/tc01LoginSuccess.spec.ts
  ```
- Viditeľný režim (otvorí prehliadač):
  ```bash
  npm run test:headed
  ```
- HTML report po dobehnutí testov:
  ```bash
  npm run test:report
  ```

### Zložky v projekte
- `tests/` – samotné testy (web + API)
- `tests/data/` – vstupné dáta
- `playwright.config.ts` – nastavenia Playwrightu
- `.gitignore` – čo nemá ísť do gitu (napr. `node_modules`, reporty)
   
### Udržiavanie
- Pred pushom si spusti `npm test`, aby bolo jasné, že všetko prešlo.
- Pri nových knihovniciach nezabudni zaktualizovať README.
- Ak robíš väčšie zmeny testov, zaznač si ich (napr. do poznámok alebo budúceho changelogu).

