# 🎓 ICTBoost — AI-Powered Learning Platform

> 🚀 A full-stack Agentic AI application that helps students master **HTML** and **C Programming** through expert-created lessons, interactive quizzes, and a personalized AI tutor.

---

## 🔗 Live Links

| Resource | Link |
|----------|------|
| 🌐 Frontend | [ictboost-client.vercel.app](https://ictboost-client.vercel.app) |
| ⚙️ Backend API | [ict-boost-server.vercel.app](https://ict-boost-server.vercel.app) |
| 💻 GitHub (Frontend) | [github.com/Nazmul-vs-code/ICTBoost-client](https://github.com/Nazmul-vs-code/ICTBoost-client) |
| 💻 GitHub (Backend) | [github.com/Nazmul-vs-code/ICTBoost-backend](https://github.com/Nazmul-vs-code/ICTBoost-backend) |

---

## 📸 Screenshots

### 🏠 Home Page
![Home](https://img.shields.io/badge/Home-Page-orange?style=for-the-badge)

> Hero section with animated floating elements, latest lessons, most liked radar chart, and importance sections.

### 🤖 AI Tutor
![AI Tutor](https://img.shields.io/badge/AI-Tutor-blue?style=for-the-badge)

> 4 AI modes: Explain Concept, Debug Code, Generate Quiz, Practice Problems — powered by Gemini AI.

### 📊 Teacher Dashboard
![Dashboard](https://img.shields.io/badge/Dashboard-green?style=for-the-badge)

> Analytics charts, lesson management, search & filter, CRUD operations with real-time data.

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| ⚛️ Next.js 16 | React framework with App Router |
| 🟦 TypeScript | Type-safe development |
| 🎨 Tailwind CSS | Utility-first styling |
| 🌼 DaisyUI | UI component library |
| 📊 Recharts | Radar & bar chart analytics |
| 🔷 React Icons | Icon library |
| 🔔 React Hot Toast | Toast notifications |
| 🔐 Better Auth | Authentication system |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 Node.js | Runtime environment |
| 🚂 Express.js | REST API framework |
| 🟦 TypeScript | Type-safe development |
| 🍃 MongoDB | NoSQL database |
| 🔐 Better Auth | Auth with MongoDB adapter |

### AI Integration
| Technology | Purpose |
|------------|---------|
| 🧠 Gemini AI (3.5 Flash) | LLM for chat tutor, quizzes, debugging |

---

## ✨ Core Features

### 🏫 Learning Platform
- 📖 **25+ structured lessons** across HTML and C Programming
- 🎥 **YouTube video embeds** for each lesson
- 🔗 **Reference links** (W3Schools for HTML, Programiz for C)
- ❤️ **Like system** — users can like/unlike lessons
- ♾️ **Infinite scroll** on explore pages
- 🔍 **Search & filter** by title and difficulty

### 🤖 AI Tutor (`/agent`)
- 💬 **Explain Concept** — beginner-friendly explanations
- 🐞 **Debug Code** — find errors and provide fixes
- 📝 **Generate Quiz** — 5 MCQs with answers
- 💡 **Practice Problems** — exercises without solutions
- 💾 **Chat history** — saved per user in MongoDB

### 📊 Teacher Dashboard
- 📈 **Analytics charts** (bar chart + radar chart)
- 📋 **Lesson management** — create, view, delete
- 🔍 **Search & filter** on dashboard tables
- 📊 **Separate HTML/C sections** with color coding
- 📱 **Fully responsive** layout

### 🎨 UI/UX
- 🌗 **Dark/Light theme toggle** (DaisyUI synthwave theme)
- ✨ **Smooth animations** — float, slide-up, staggered reveals
- 🎯 **7+ home page sections** — Hero, Latest Lessons, Most Liked, Importance of HTML, Importance of C, About, Footer
- 📱 **Mobile-first** responsive design

### 🔐 Authentication
- 📧 Email & password login/registration
- 👤 Role-based access (teacher, student, admin)
- 🛡️ **Route protection** via Next.js proxy.ts
- 🔒 Protected dashboard routes

---

## 📦 Dependencies

```json
{
  "next": "16.2.10",
  "react": "19.2.4",
  "typescript": "^5",
  "tailwindcss": "^4",
  "daisyui": "^5.6.18",
  "recharts": "^3.9.2",
  "react-icons": "^5.7.0",
  "react-hot-toast": "^2.6.0",
  "better-auth": "^1.6.23",
  "@google/genai": "^2.12.0",
  "mongodb": "^7.5.0",
  "express": "^5.1.0"
}
```

---

## 🚀 How to Run Locally

### Prerequisites
- 📦 Node.js 18+ installed
- 🍃 MongoDB Atlas account (or local MongoDB)
- 🔑 Google AI Studio API key (for Gemini)

### 1️⃣ Clone the repositories

```bash
# Frontend
git clone https://github.com/Nazmul-vs-code/ICTBoost-client.git
cd ICTBoost-client

# Backend (in a separate terminal)
git clone https://github.com/Nazmul-vs-code/ICTBoost-backend.git
cd ICTBoost-backend
```

### 2️⃣ Install dependencies

```bash
# Frontend
npm install

# Backend
npm install
```

### 3️⃣ Set up environment variables

**Frontend `.env`:**
```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4️⃣ Start the development servers

```bash
# Frontend (port 3000)
npm run dev

# Backend (port 5000)
npm run dev
```

### 5️⃣ Open in browser

🌐 Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ICTBoost/
├── 📁 ictboost-client/          # Frontend (Next.js)
│   ├── 📁 src/
│   │   ├── 📁 app/              # App Router pages
│   │   │   ├── 📁 api/chat/     # Gemini AI API route
│   │   │   ├── 📁 auth/         # Login & Register
│   │   │   ├── 📁 dashboard/    # Teacher dashboard
│   │   │   ├── 📁 html/         # HTML lessons (public)
│   │   │   ├── 📁 c/            # C lessons (public)
│   │   │   ├── 📁 agent/        # AI Tutor
│   │   │   └── 📁 about/        # About page
│   │   ├── 📁 components/       # Reusable components
│   │   ├── 📁 lib/              # Auth, API, actions
│   │   └── proxy.ts             # Route protection (Next.js proxy)
│   └── package.json
│
├── 📁 ICTBoost-backend/         # Backend (Express.js)
│   ├── 📁 src/
│   │   └── server.ts            # All API endpoints
│   └── package.json
│
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lesson/html` | Get all HTML lessons |
| `POST` | `/lesson/html` | Create HTML lesson |
| `DELETE` | `/lesson/html/:id` | Delete HTML lesson |
| `POST` | `/lesson/html/like` | Toggle like on HTML lesson |
| `GET` | `/lesson/html/like/:id` | Get like count |
| `GET` | `/lesson/html/analytics` | HTML analytics with likes |
| `GET` | `/lesson/c` | Get all C lessons |
| `POST` | `/lesson/c` | Create C lesson |
| `DELETE` | `/lesson/c/:id` | Delete C lesson |
| `POST` | `/lesson/c/like` | Toggle like on C lesson |
| `GET` | `/lesson/c/like/:id` | Get like count |
| `GET` | `/lesson/c/analytics` | C analytics with likes |
| `GET` | `/most-liked` | Top 5 most liked lessons |
| `POST` | `/chat/save` | Save chat message |
| `GET` | `/chat/history` | Get chat history |
| `DELETE` | `/chat/clear` | Clear chat history |

---

## 👨‍💻 Author

**Nazmul Huda**
- GitHub: [@Nazmul-vs-code](https://github.com/Nazmul-vs-code)

---

## 📄 License

This project is for educational purposes — SCIC Assignment 5 (Agentic AI Project).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Nazmul-vs-code">Nazmul Huda</a> | Powered by <a href="https://ai.google.dev/">Gemini AI</a>
</p>
