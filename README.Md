# AI Knowledge Base

A modern **AI-powered technical knowledge platform** built using a headless WordPress CMS, Next.js, GraphQL, and a planned Python/FastAPI AI service.

The project separates content management from the frontend application. WordPress is responsible for managing technical knowledge articles, while Next.js consumes the content through GraphQL and provides the user-facing knowledge base. The AI service will later provide semantic search, embeddings, RAG, and AI-powered question answering.

---

## Project Goals

The AI Knowledge Base is designed to provide a centralized platform for storing, organizing, searching, and consuming technical knowledge.

### Core goals

- Manage technical articles through WordPress.
- Expose WordPress content through GraphQL.
- Build a modern headless frontend using Next.js.
- Organize articles using knowledge categories.
- Store structured article metadata using ACF.
- Provide difficulty-based article filtering.
- Provide article detail pages with metadata and documentation links.
- Prepare the platform for semantic search and RAG.
- Add an AI service for intelligent knowledge retrieval and question answering.

---

## Architecture

```text
                    ┌─────────────────────────┐
                    │       WordPress         │
                    │                         │
                    │ Knowledge Article CPT   │
                    │ Knowledge Categories    │
                    │ ACF Metadata            │
                    └────────────┬────────────┘
                                 │
                                 │ WPGraphQL
                                 ▼
                    ┌─────────────────────────┐
                    │        Next.js          │
                    │                         │
                    │ Articles Listing        │
                    │ Article Details         │
                    │ Difficulty Filter       │
                    │ Header / Footer / Layout│
                    └────────────┬────────────┘
                                 │
                                 │ Future AI Integration
                                 ▼
                    ┌─────────────────────────┐
                    │    Python AI Service    │
                    │        FastAPI          │
                    │                         │
                    │ Embeddings              │
                    │ Semantic Search         │
                    │ RAG                     │
                    │ AI Q&A                  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Vector Store       │
                    │                         │
                    │ Embeddings / Retrieval  │
                    └─────────────────────────┘
```

---

## Tech Stack

### Backend / CMS

- **WordPress**
- **Custom Post Type:** Knowledge Article
- **Advanced Custom Fields (ACF)**
- **WPGraphQL**
- **MySQL**
- Docker

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- Next.js App Router
- GraphQL data fetching

### Planned AI Layer

- **Python**
- **FastAPI**
- LangChain / LlamaIndex
- Hugging Face embeddings
- Vector database
- RAG
- Semantic search
- LLM integration

### Development / Infrastructure

- Docker Compose
- Git
- Feature branches
- Pull Requests
- Environment variables
- Linux development environment

---

## Project Structure

```text
ai-knowledge-base/
│
├── wordpress/
│   ├── wp-admin/
│   ├── wp-content/
│   ├── wp-includes/
│   ├── wp-config.php
│   └── ...
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── articles/
│   │       │   └── [slug]/
│   │       │       └── page.tsx
│   │       ├── globals.css
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── ai-service/
│   └── (planned FastAPI service)
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# WordPress Backend

WordPress is used as the **headless CMS**.

The frontend does not use the traditional WordPress theme rendering system. Instead, WordPress manages content and exposes it through GraphQL.

## Knowledge Article

The project uses a custom post type:

```text
Knowledge Article
```

Each article contains:

- Title
- Slug
- Content
- Excerpt
- Knowledge Category
- Difficulty
- Reading Time
- AI Summary
- Keywords
- Documentation URL
- Last Reviewed
- AI Indexed

---

## Article Metadata

ACF is used to store structured knowledge article information.

Example:

```text
Knowledge Article Details

Difficulty: Beginner
Reading Time: 5 minutes
AI Summary: ...
Keywords: python, fastapi, api, backend
Documentation URL: ...
Last Reviewed: ...
AI Indexed: false
```

### Difficulty Levels

The current difficulty values are:

```text
beginner
intermediate
advanced
```

The frontend displays them as:

```text
🟢 Beginner
🟡 Intermediate
🔴 Advanced
```

---

# GraphQL

The project uses **WPGraphQL** to expose WordPress content to Next.js.

Example query:

```graphql
query GetArticleBySlug($slug: ID!) {
  knowledgeArticle(
    id: $slug
    idType: SLUG
  ) {
    id
    databaseId
    title
    slug
    content
    excerpt

    knowledgeArticleDetails {
      difficulty
      readingTime
      aiSummary
      keywords
      documentationUrl
      lastReviewed
      aiIndexed
    }
  }
}
```

The GraphQL response for the difficulty field is currently:

```json
{
  "difficulty": [
    "beginner"
  ]
}
```

Therefore, the frontend reads the first value:

```typescript
const difficulty =
  article.knowledgeArticleDetails?.difficulty?.[0] ?? "";
```

---

# Next.js Frontend

The frontend is built with the **Next.js App Router**.

## Current Features

### 1. Shared Layout

The application includes:

- Header
- Footer
- Root layout
- Global styling

### 2. Knowledge Articles

The articles page displays technical knowledge articles retrieved from WordPress through GraphQL.

Example route:

```text
/articles
```

### 3. Article Details

Each article has a dynamic route:

```text
/articles/[slug]
```

Example:

```text
/articles/what-is-next-js
```

The article page displays:

- Article title
- Excerpt
- Difficulty
- Reading time
- Keywords
- Last reviewed date
- AI summary
- Article content
- Official documentation link

### 4. Difficulty Filter

Articles can be filtered by difficulty.

Examples:

```text
/articles
/articles?difficulty=beginner
/articles?difficulty=intermediate
/articles?difficulty=advanced
```

---

# AI Layer

The AI layer is planned as a separate Python/FastAPI service.

The purpose of this service is to turn the knowledge base into an intelligent technical assistant.

## Planned Features

### Document Indexing

When a knowledge article is created or updated:

```text
WordPress
    ↓
GraphQL
    ↓
AI Service
    ↓
Content Chunking
    ↓
Embeddings
    ↓
Vector Database
```

### Semantic Search

Instead of relying only on keyword matching:

```text
User Query
    ↓
Embedding
    ↓
Vector Search
    ↓
Relevant Articles
```

### RAG

The planned RAG workflow:

```text
User Question
      ↓
Query Processing
      ↓
Embedding
      ↓
Vector Search
      ↓
Relevant Knowledge
      ↓
Context
      ↓
LLM
      ↓
Generated Answer
```

### AI Question Answering

Example:

```text
User:
"Why would a RAG system return irrelevant documents?"

AI:
Retrieves relevant knowledge articles and generates
an answer based on the indexed knowledge base.
```

---

# Future Features

The project is intentionally designed to grow into a production-style AI knowledge platform.

Planned features include:

- Semantic search
- Hybrid search
- AI-powered Q&A
- RAG pipeline
- Document embeddings
- Vector database
- Automatic article indexing
- Article re-indexing
- AI-generated summaries
- Related article recommendations
- Search ranking
- Search analytics
- AI response evaluation
- Hallucination detection
- User feedback on AI answers
- Authentication and authorization
- Admin dashboard
- Article versioning
- Content freshness monitoring
- Observability and metrics

---

# Local Development

## Prerequisites

Install:

- Docker
- Docker Compose
- Node.js
- npm
- Git

Optional for the future AI service:

- Python 3.x
- pip / virtual environment

---

# WordPress Setup

The WordPress backend runs using Docker Compose.

Example:

```bash
docker compose up -d
```

Check containers:

```bash
docker compose ps
```

Expected services:

```text
wordpress
db
```

WordPress is exposed locally through:

```text
http://localhost:8080
```

WordPress Admin:

```text
http://localhost:8080/wp-admin
```

---

# Next.js Setup

Move into the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

---

# Environment Variables

Create:

```text
frontend/.env.local
```

Example:

```env
WORDPRESS_GRAPHQL_URL=http://localhost:8080/graphql
```

Do not commit real environment files.

The project uses:

```text
.env
.env.*
```

in `.gitignore`, while `.env.example` can be committed as a template.

---

# Git Workflow

The project follows a feature-branch workflow.

```text
main
  │
  └── develop
        │
        ├── feature/nextjs-setup
        │
        ├── feature/knowledge-article-details
        │
        ├── feature/article-difficulty-filter
        │
        └── feature/ai-search
```

Recommended workflow:

```bash
git switch develop
git pull origin develop

git switch -c feature/<feature-name>
```

After development:

```bash
git add .
git commit -m "feat: add <feature>"
git push -u origin feature/<feature-name>
```

Then create a Pull Request:

```text
feature/<feature-name>
        ↓
       PR
        ↓
     develop
```

A feature branch can contain multiple commits. Normally, you do **not** need one PR per commit.

---

# Conventional Commits

Recommended commit format:

```text
feat: add article difficulty filter
feat: implement shared header and footer
feat: add GraphQL article fetching
fix: handle missing article metadata
refactor: simplify article details rendering
docs: update project documentation
chore: configure development environment
```

---

# Example Knowledge Articles

The current knowledge base focuses on practical technical topics rather than generic educational content.

Examples:

```text
What is Headless WordPress?
What is WordPress REST API?
What is Next.js?
What is FastAPI?
What is RAG?
What are Embeddings?
What is a Vector Database?
Semantic Search vs Keyword Search
```

Future production-focused topics include:

```text
Why RAG Fails in Production
Why Vector Search Returns the Wrong Documents
RAG vs Fine-Tuning: Choosing the Right Architecture
How to Reduce LLM API Costs in Production
GraphQL Over REST in a Headless Architecture
Caching GraphQL Data in Next.js
What Happens When WordPress Goes Down in a Headless Architecture?
Idempotency: Preventing Duplicate Requests
Why Docker Containers Work Locally but Fail in Production
Metrics vs Logs vs Traces
```

---

# Development Roadmap

## Phase 1 — CMS

- [x] WordPress setup
- [x] Docker setup
- [x] MySQL setup
- [x] Knowledge Article CPT
- [x] Knowledge Categories
- [x] ACF article metadata
- [x] WPGraphQL

## Phase 2 — Next.js

- [x] Next.js setup
- [x] TypeScript
- [x] App Router
- [x] Shared layout
- [x] Header
- [x] Footer
- [x] GraphQL integration
- [x] Article listing
- [x] Article detail page
- [x] Difficulty display
- [x] Difficulty filter

## Phase 3 — Search

- [ ] Keyword search
- [ ] Search results page
- [ ] Search ranking
- [ ] Search pagination
- [ ] Search filters

## Phase 4 — AI

- [ ] FastAPI AI service
- [ ] Article ingestion
- [ ] Text chunking
- [ ] Embeddings
- [ ] Vector database
- [ ] Semantic search
- [ ] RAG pipeline
- [ ] AI Q&A

## Phase 5 — Production

- [ ] Authentication
- [ ] AI evaluation
- [ ] Monitoring
- [ ] Logging
- [ ] Metrics
- [ ] Error tracking
- [ ] CI/CD
- [ ] Docker production setup
- [ ] Cloud deployment

---

# Why Headless WordPress?

WordPress provides a mature CMS for managing technical knowledge while Next.js provides a modern frontend experience.

```text
WordPress
= Content Management

GraphQL
= Content API

Next.js
= Frontend Application

FastAPI
= AI Application Layer

Vector Database
= Semantic Retrieval
```

This separation makes it possible to change the frontend, AI service, or search infrastructure independently.

---

# Project Vision

The long-term goal is to build more than a traditional documentation website.

The final platform should allow a user to:

```text
Search technical knowledge
        ↓
Find relevant articles
        ↓
Ask an AI question
        ↓
Retrieve trusted knowledge
        ↓
Generate a grounded answer
        ↓
Link back to source articles
```

The knowledge base therefore combines **headless CMS architecture, modern web development, GraphQL, AI retrieval, and RAG** into a single practical engineering project.

---

## License

This project is intended for learning, development, and portfolio purposes.
