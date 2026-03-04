<div align="center">

# [🌸 Mind Bloom - Mental Wellness & Journaling App](https://lovemindbloom.vercel.app/)

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername)
[![Vercel Deploy](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://lovemindbloom.vercel.app/)

**A modern, responsive mental wellness platform for journaling, affirmations, and daily quotes**

_Designed to help users cultivate mindfulness, track their emotional journey, and find daily inspiration_

[🌐 Live Demo](https://lovemindbloom.vercel.app/) • [📚 Documentation](#-features) • [💻 Quick Start](#-getting-started) • [🚀 Deploy](#-deployment)

---

</div>

## ✨ Try it Live!

**🌐 [https://lovemindbloom.vercel.app/](https://lovemindbloom.vercel.app/)**

### Features You Can Explore

- 📝 **Journal Entries** - Write, reflect, and revisit your thoughts
- 💫 **Daily Affirmations** - Get inspired with personalized daily affirmations
- 🎯 **Motivational Quotes** - Discover curated quotes to empower your day
- 🔐 **Secure Authentication** - Safe and private journaling experience
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Lightning-Fast** - Built with Vite for optimal performance

---

## 🎯 Features

| Feature                     | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| 📝 **Smart Journaling**     | Create, edit, and organize your journal entries effortlessly |
| 💭 **Daily Affirmations**   | Curated affirmations to boost confidence and motivation      |
| 🌟 **Inspirational Quotes** | Get a fresh quote every day for daily inspiration            |
| 🎨 **Modern UI Design**     | Clean, intuitive interface with smooth animations            |
| 🔐 **Secure User Auth**     | JWT-based authentication for data privacy                    |
| 📱 **Mobile Responsive**    | Optimized for all screen sizes and devices                   |
| ⚡ **Fast & Performant**    | Built with Vite for instant HMR and fast builds              |
| 🌙 **Dark Mode Ready**      | Comfortable viewing in any lighting                          |

---

## 🏗️ Architecture

```
┌─────────────────────────┐
│   User Browser          │
│  (React + TypeScript)   │
└────────────┬────────────┘
             │ HTTP/REST
             ▼
┌─────────────────────────┐
│   Frontend Client       │
│  - Components          │
│  - State Management    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────────┐     ┌─────────────────────┐
│   Backend API               │────▶│   PostgreSQL DB     │
│  (Node.js + Express)        │◀────│  (Prisma ORM)       │
│  - Routes                   │     │                     │
│  - Authentication           │     └─────────────────────┘
└─────────────────────────────┘
```

**User Flow:**

1. User visits Mind Bloom web app
2. Authenticates with secure credentials
3. Access personalized dashboard
4. Create journal entries, view affirmations, get daily quotes
5. Real-time sync with backend database
6. Data persists securely

---

## 📊 Core Pages & Features

| Page            | Description                                              |
| --------------- | -------------------------------------------------------- |
| `Dashboard`     | Home page with daily affirmation, quote, and quick stats |
| `/journal`      | View, create, and manage journal entries                 |
| `/affirmations` | Browse daily affirmations by category                    |
| `/quotes`       | Discover inspirational quotes                            |
| `/profile`      | User settings and preference management                  |
| `/auth`         | Secure login and registration                            |

---

## 🔧 Tech Stack

| Category        | Technology                                  |
| --------------- | ------------------------------------------- |
| **Frontend**    | React 18, TypeScript, Vite, TailwindCSS     |
| **Build Tool**  | Vite 5 (< 100ms HMR)                        |
| **Styling**     | CSS3, Responsive Design                     |
| **HTTP Client** | Axios                                       |
| **State**       | Context API / React Hooks                   |
| **Linting**     | ESLint, TypeScript Strict Mode              |
| **Backend**     | Node.js, Express, Prisma ORM, PostgreSQL    |
| **Deployment**  | Vercel (Frontend), Railway/Docker (Backend) |

---

## 📈 Performance Metrics

| Metric                 | Value                        |
| ---------------------- | ---------------------------- |
| Page Load Time         | < 2 seconds                  |
| First Contentful Paint | < 1.2 seconds                |
| Lighthouse Score       | 90+ (Performance)            |
| Bundle Size            | ~120KB (gzipped)             |
| API Response Time      | < 200ms average              |
| Mobile Performance     | Optimized for 3G/4G networks |

---

## 🚀 Getting Started

### Quick Links

- 🌐 **Live App**: [https://lovemindbloom.vercel.app/](https://lovemindbloom.vercel.app/)
- 💻 **Backend Repo**: [mind-bloom-backend](../backend-mindbloom/)
- 📖 **Full Documentation**: Coming soon

### For Developers

To run locally, you'll need:

- **Node.js** 18+ and **npm** 9+
- Backend API running locally or accessible

```bash
git clone https://github.com/yourusername/mind-bloom.git
cd frontend-mindbloom && npm install
npm run dev  # Starts at http://localhost:5173
```

---

## 📚 Project Structure

```
frontend-mindbloom/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components for routing
│   ├── api/             # API client and requests
│   ├── context/         # React Context for state
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies & scripts
```

---

## 🌐 Deployment

**Currently Deployed on Vercel** ✅

- 🌐 **Live URL**: [https://lovemindbloom.vercel.app/](https://lovemindbloom.vercel.app/)
- 🔄 **Auto-deploys** on push to main branch
- 📊 **Built-in analytics** and monitoring
- ⚡ **Global CDN** for optimal performance

---

## 🔗 API Integration

The frontend communicates with the backend API for:

- User authentication & authorization
- Journal CRUD operations
- Affirmation retrieval
- Quote generation
- User profile management

**Backend Repository:** [mind-bloom-backend](https://github.com/Meghan31/Mind-Bloom-Server)

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👤 Author

**Meghasrivardhan Pulakhandam (Megha)**

- 🌐 Portfolio: [www.meghan31.me](https://www.meghan31.me/)
- 💼 LinkedIn: [linkedin.com/in/meghan31](https://www.linkedin.com/in/meghan31/)
- 🐙 GitHub: [@Meghan31](https://github.com/Meghan31)

---

<div align="center">

**Made with ❤️ by [Megha31](https://www.meghan31.me/)**

⭐ If you find Mind Bloom helpful, give it a star!

[🌐 Try Live Demo](https://lovemindbloom.vercel.app/) • [🐛 Report Bug](https://github.com/Meghan31/frontend-mindbloom/issues) • [✨ Request Feature](https://github.com/Meghan31/frontend-mindbloom/issues) • [📖 View Backend](https://github.com/Meghan31/Mind-Bloom-Server)

</div>
