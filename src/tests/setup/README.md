# ✅ Vitest Unit Testing Setup for My LMS App

This project uses [**Vitest**](https://vitest.dev/) for fast and modern unit testing with full TypeScript and Vite support.

---

## 📁 Folder Structure

```
my-lms-app/
├── src/
│   ├── components/
│   └── ...
├── tests/
│   ├── unit/              # Unit tests live here
│   ├── setup/             # Global test setup files
│   └── e2e/               # (Optional) Playwright tests for E2E
├── vitest.setup.js        # Global test setup (DOM matchers, etc.)
├── vitest.config.js       # Vitest configuration
```

---

## 🛠 Setup Instructions

### 1. Install Dependencies

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

### 2. Configure Vitest

In `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup/vitest.setup.js',
    include: ['src/**/*.test.{js,jsx,ts,tsx}', 'tests/**/*.test.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
```

---

## 🚀 Running Tests

### Run all tests:

```bash
npm run test
```

### Watch mode:

```bash
npx vitest --watch
```

### Run with coverage:

```bash
npx vitest run --coverage
```

Open coverage report:

```bash
open coverage/index.html
```

---

## 💡 Tips

* Keep your test files named like `ComponentName.test.jsx`.
* Use `.test.js`, `.test.tsx`, etc., to match glob.
* You can co-locate small tests next to components, or keep everything in `/tests/unit` for consistency.

---

## 🧪 Example Test (React Component)

```jsx
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

test('renders greeting', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello, LMS!')).toBeInTheDocument();
});
```

---

## 📦 Optional Enhancements

* `@vitest/ui`: A GUI test runner for Vitest.
* `msw`: Mock Service Worker for API mocking.
* `happy-dom`: Faster alternative to jsdom (use with caution).

---

## ❤️ Maintained by

Srilu Balla
✨ [Product Owner in Test](https://sriluballa.github.io/product-owner-in-test/) — empowering quality through product understanding.

---

> For end-to-end testing, see [Playwright setup](../e2e) (coming soon!)
