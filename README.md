# ST Template

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-directory>

# Install dependencies
npm install

# Generate database
npx prisma db push
```

### 2. Create .env
```
DATABASE_URL="file:./<database name>.db"
SESSION_SECRET="<just put anything here>"
```

### 3. Run
```bash
npm run dev
```