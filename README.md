# 🚀 Nexora AI

> **An AI-powered SaaS workspace with Multi-LLM Chat, RAG, File Intelligence, Image Generation, Web Search, Analytics, and Premium Features.**

Nexora AI is a modern AI platform built with **Next.js 16**, **TypeScript**, **Prisma**, **PostgreSQL**, and the **Vercel AI SDK**. It provides users with a ChatGPT-like experience while supporting multiple AI providers, document understanding through Retrieval-Augmented Generation (RAG), AI image generation, web search, analytics, subscriptions, and much more.

---

# ✨ Features

## 🤖 AI Chat

- Streaming AI responses
- Multiple AI providers
- Multiple LLM selection
- Conversation history
- Markdown rendering
- Syntax highlighted code blocks
- Copy response
- Regenerate response
- Stop generation
- Chat title generation
- Image responses
- Typing animation

---

## 🧠 Multi Model Support

Supports multiple AI providers.

### Google

- Gemini 2.5 Flash

### Groq

- Llama 3.3 70B
- GPT OSS 120B

### Cohere

- Command A

### DeepSeek

- DeepSeek Chat

---

## 📁 File Intelligence

Supports intelligent document processing.

Supported formats:

- PDF
- DOCX
- TXT
- Markdown
- Images

Features:

- File upload
- Preview
- Cloud storage
- AI document understanding
- File attachment in chat
- Recent documents
- Upload progress
- Document parser

---

## 📚 RAG (Retrieval Augmented Generation)

- Automatic document chunking
- Google Embeddings
- Chroma Vector Database
- Semantic Search
- Context Retrieval
- AI answers grounded on uploaded files

---

## 🌐 AI Web Search

- Live web search
- Tavily integration
- AI summarized results
- Search prompt detection

---

## 🎨 AI Image Generation

- Gemini Image Generation
- HuggingFace fallback
- Automatic image prompt detection
- Image preview
- Image modal

---

## 📊 Analytics Dashboard

- Activity analytics
- AI model usage
- File usage
- Charts
- User statistics
- Recent activity

---

## 👤 Authentication

- Google OAuth
- GitHub OAuth
- Credentials Login
- Registration
- JWT Sessions
- Protected Routes
- Middleware Authentication

---

## ⚙️ User Settings

- Username
- Avatar Upload
- Profile Management
- Cloudinary Integration

---

## 💳 Premium Features

- Razorpay Integration
- Subscription Plans
- Premium Feature Gate
- Feature Restrictions

---

## ☁️ Cloud Storage

- Cloudinary
- Secure uploads
- File previews

---

# 🏗️ Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form
- Zod
- Sonner

---

## Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Neon)
- Auth.js
- Vercel AI SDK

---

## AI

- Google Gemini
- Groq
- Cohere
- DeepSeek
- Tavily Search
- Google Embeddings

---

## Vector Database

- ChromaDB

---

## Storage

- Cloudinary

---

## Payments

- Razorpay

---

# 📂 Project Structure

```
app/
 ├── (auth)
 ├── (dashboard)
 │    ├── analytics
 │    ├── chat
 │    ├── dashboard
 │    ├── files
 │    ├── pricing
 │    └── settings
 └── api

components/
hooks/
lib/
prisma/
services/
types/
```

---

# 🗄️ Database

Built using **Prisma ORM** with **PostgreSQL**.

Main models:

- User
- Chat
- Message
- File
- Subscription

---

# 🔄 AI Flow

```text
User
   │
   ▼
Chat Input
   │
   ▼
API Route
   │
   ▼
Chat Service
   │
   ▼
Prompt Builder
   │
   ▼
Selected AI Provider
   │
   ▼
Streaming Response
   │
   ▼
Database
```

---

# 📁 RAG Flow

```text
Upload File
      │
      ▼
Document Parser
      │
      ▼
Chunking
      │
      ▼
Google Embeddings
      │
      ▼
Chroma Vector DB
      │
      ▼
Semantic Search
      │
      ▼
Context Retrieval
      │
      ▼
AI Response
```

---

# 🖼️ Image Generation Flow

```text
Prompt
   │
   ▼
Image Prompt Detection
   │
   ▼
Gemini Image API
   │
   ▼
Fallback (HuggingFace)
   │
   ▼
Generated Image
```

---

# 🌐 Web Search Flow

```text
Prompt
   │
   ▼
Search Detection
   │
   ▼
Tavily API
   │
   ▼
Search Results
   │
   ▼
AI Summary
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/nexora-ai.git
```

Install dependencies

```bash
npm install
```

Configure environment variables

```env
DATABASE_URL=
AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_GENERATIVE_AI_API_KEY=
GROQ_API_KEY=
COHERE_API_KEY=
DEEPSEEK_API_KEY=
TAVILY_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Run Prisma

```bash
npx prisma generate

npx prisma migrate dev
```

Start ChromaDB

```bash
docker compose up -d
```

Run the development server

```bash
npm run dev
```

---

# 📦 Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# 🚀 Future Roadmap

- Voice Chat
- AI Agents
- Team Workspace
- Shared Chats
- Chat Export
- Memory
- OCR Improvements
- More AI Providers
- Mobile App
- Usage Limits
- Admin Dashboard

---

# 👨‍💻 Author

**Sohail Khan**

Backend • AI • Full Stack Developer

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ If you like this project

Give the repository a ⭐ on GitHub.

## Deploy on Vercel



Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
