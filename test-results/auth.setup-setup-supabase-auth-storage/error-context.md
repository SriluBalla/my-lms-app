# Test info

- Name: setup supabase auth storage
- Location: /Users/sriluballa/Documents/REPOS/prod-owner-test/my-lms-app/src/tests/auth.setup.spec.ts:4:1

# Error details

```
Error: Error reading storage state from tests/storageState.json:
ENOENT: no such file or directory, open 'tests/storageState.json'
```

# Test source

```ts
   1 | import { test as setup, expect } from '@playwright/test';
   2 | import fs from 'fs';
   3 |
>  4 | setup('setup supabase auth storage', async ({ page }) => {
     | ^ Error: Error reading storage state from tests/storageState.json:
   5 |   // 1. Go to sign-in page
   6 |   await page.goto('http://localhost:5173/#/login');
   7 |
   8 |   // 2. Fill in credentials
   9 |   await page.getByTestId('email').fill('sriluballa+auto@gmail.com');
  10 |   await page.getByTestId('password').fill('Test1234!!');
  11 |
  12 |   // 3. Submit login
  13 |   await page.getByTestId('btn-Login').click();
  14 |
  15 |   // 4. Wait for redirect to a protected page
  16 |   await page.waitForURL('**/profile');
  17 |
  18 |   // 5. ✅ Save auth state
  19 |   await page.context().storageState({ path: 'tests/storageState.json' });
  20 |
  21 |   // Optional: Confirm file saved
  22 |   console.log('✅ storageState.json saved!');
  23 | });
  24 |
```