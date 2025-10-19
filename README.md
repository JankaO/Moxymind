## Moxymind Playwright Tests

Test suite covering key Saucedemo UI flows and Reqres API endpoints. The scenarios are written in TypeScript using the Playwright test runner.

### Požiadavky
- Node.js 18 alebo novší (overíš príkazom `node -v`)
- npm (dodávané s Node.js)

### Inštalácia
1. Naklonuj repozitár (pozri časť *Publikovanie na GitHub* nižšie).
2. Nainštaluj závislosti:
   ```bash
   npm install
   ```
3. Stiahni Playwright prehliadače (nutné pri prvom spustení):
   ```bash
   npx playwright install
   ```
4. (Voliteľné) nastav API kľúč pre Reqres:
   ```bash
   export REQRES_API_KEY="tvoj-kľúč"
   ```
   alebo pridaj hodnotu do `.env` súboru v tvare `REQRES_API_KEY=...`.

### Spustenie testov
- Spusť všetky testy (UI aj API):
  ```bash
  npm test
  ```
- Beh konkrétneho testu:
  ```bash
  npx playwright test tests/tc01LoginSuccess.spec.ts
  ```
- Spustenie s viditeľným prehliadačom:
  ```bash
  npm run test:headed
  ```

Po behu UI testov nájdeš HTML report v priečinku `playwright-report`. Otvoríš ho príkazom:
```bash
npm run test:report
```

### Štruktúra projektu
- `tests/` – Playwright testy (web aj API)
- `tests/data/` – testovacie dáta
- `playwright.config.ts` – základná konfigurácia test runnera
- `.gitignore` – ignorované súbory (napr. `node_modules`, reporty)

### Publikovanie na GitHub
1. **Inicializuj git:**
   ```bash
   git init
   git add .
   git commit -m "Initial test suite"
   ```
2. **Vytvor repozitár na GitHub-e:**
   - Prihlás sa na [github.com](https://github.com) a klikni `New`.
   - Pomenuj repozitár (napr. `moxymind-playwright-tests`) a nechaj ho `Public` alebo `Private` podľa potreby.
   - Neklikaj na možnosť „Initialize with README“, aby si predišiel konfliktom.
3. **Pridaj remote a nahraj kód:**
   ```bash
   git remote add origin https://github.com/<tvoje-uzivatelske-meno>/<nazov-repa>.git
   git branch -M main
   git push -u origin main
   ```
4. **Over README a pokyny:** na GitHub stránke repozitára by mali byť zobrazené kroky pre lokálne spustenie (z tejto časti README).

### Udržiavanie projektu
- Pred commitom spusti `npm test`, aby si overil, že všetko prebehne úspešne.
- Ak pridáš nové závislosti, aktualizuj README.
- Pri významných zmenách scénarov zváž pridanie poznámok do `CHANGELOG.md` (ak ho založíš).

--- 
Ak potrebuješ asistenciu s generovaním reportu alebo CI pipeline, napíš. Rád pomôžem. 
