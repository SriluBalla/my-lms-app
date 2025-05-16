![Build](https://github.com/SriluBalla/my-lms-app/actions/workflows/deploy.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Deployed](https://img.shields.io/badge/GitHub-Pages-brightgreen)

[![Live Site](https://img.shields.io/badge/View%20Live-🟢%20my--lms--app-blue?logo=github)](https://sriluballa.github.io/my-lms-app/)

# 🧠 Product Owner in Test

A lightweight, modular Learning Management System (LMS) with blogging and CRM features.  
Built with React + Vite, using traditional CSS for full design control.

---

## ✅ Frequently Used Git & Deploy Commands

| Purpose                   | Command                          | Notes                                          |
| ------------------------- | -------------------------------- | ---------------------------------------------- |
| Stage all changes         | `git add .`                      | Adds everything you've changed to staging      |
| Commit staged changes     | `git commit -m "your message"`   | Use a clear message like `"Add Register page"` |
| Push to GitHub            | `git push origin main`           | Pushes code to the `main` branch               |
| Build for deployment      | `npm run build`                  | Compiles your app into a `dist/` folder        |
| Deploy to GitHub Pages    | `npm run deploy`                 | Deploys the `dist/` folder to GitHub Pages     |
| Start local dev server    | `npm run dev`                    | Opens `localhost:5173` for previewing changes  |
| Install a new package     | `npm install package-name`       | Like `npm install @supabase/supabase-js`       |
| Clean install (if errors) | `npm install --legacy-peer-deps` | Bypass version conflicts during install        |

---

## 📦 Tech Stack

- **React** (v19)
- **Vite** (build tool)
- **Traditional CSS**
- **React Router DOM**
- **GitHub Pages** for hosting

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. **Clone the repository**

```bash
git clone https://github.com/SriluBalla/my-lms-app.git
cd my-lms-app
```

### 2. **Install dependencies**

> Ensure you're using **Node 20 or later**

```bash
npm install --legacy-peer-deps
```

### 3. **Start the development server**

```bash
npm run dev
```

Open `http://localhost:5173/my-lms-app/` in your browser.

---

## 🌐 Deployed Version

View the live site:  
📎 [https://sriluballa.github.io/my-lms-app/](https://sriluballa.github.io/my-lms-app/)

---

## 🧩 Project Structure

```
my-lms-app/
│
├── public/                     # Static assets (favicon, images)
│   └── images/
│       └── global/
│       └── 404/
│
├── src/
│   ├── assets/                 # Logos, icons, other visual assets (optional)
│   ├── components/             # Reusable UI components (Header, Footer, etc.)
│   ├── pages/                  # Top-level views (Index, Courses, Blog, 404)
│   ├── styles/                 # Global + component CSS files
│   ├── App.jsx                 # Main app entry with routing
│   └── main.jsx                # Vite + React entry
│
├── .github/workflows/         # GitHub Actions for deployment
├── index.html
├── package.json
└── README.md
```

---

## 🔗 Key Features

- Responsive layout using custom CSS
- SEO-ready meta structure
- Modular pages and components
- GitHub Pages-friendly routing and 404 fallback
-- Randomized 404 images for fun & user engagement

---

## 🛠 Dependencies

| Package              | Purpose                         |
|----------------------|---------------------------------|
| `react`              | UI framework                    |
| `react-dom`          | React rendering engine          |
| `react-router-dom`   | SPA routing                     |
| `vite`               | Lightning-fast build tool       |
| `gh-pages`           | Deploys the `dist/` to GitHub   |

---

## 💡 Contribution Guide

- Keep component names **PascalCased**
- Use **semantic HTML** and clean markup
- Place all page-level components inside `src/pages/`
- Add global styles or overrides to `src/styles/`
- All images should go in `public/images/[section]/`

---

## 📸 Screenshots

### 🏠 Homepage
<img src="./public/images/read-me/home.png" alt="Homepage" width="600" />

### 🔍 404 Page
<img src="./public/images/read-me/404.png" alt="404 Page" width="600" />

### 📚 Courses Page
<img src="./public/images/read-me/courses.png" alt="Courses Page" width="600" />


---

## 👩‍💻 Maintainer

Built with care by [Sridevi “Srilu” Balla](https://github.com/SriluBalla)  
🇺🇸 *Proud American in a Saree. Loves America and Sarees*

---

## 📜 License

MIT – Free to use, customize, and contribute