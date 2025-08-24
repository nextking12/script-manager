# Script Manager

Full-stack application with Next.js frontend and Spring Boot backend.

## Getting Started

**Clone the repository:**

```bash
git clone https://github.com/yourusername/script-manager.git
cd script-manager
```

## Quick Start (Docker - Recommended)

**Requirements:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

**One command to run everything:**

```bash
docker-compose up --build
```

**Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432

**Stop the application:**

```bash
docker-compose down
```

## Development Setup

### Frontend Only

**Requirements:** Node.js 20+, pnpm

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
echo "SKIP_ENV_VALIDATION=1" >> .env

# Start development server
pnpm dev
```

### Backend Only

**Requirements:** Java 24+, PostgreSQL

```bash
# Navigate to backend
cd script_manager_back

# Run with Gradle
./gradlew bootRun
```

**Database setup:** Ensure PostgreSQL is running on localhost:5432 with database `script_db`, user `user`, password `password`.

## Scripts

- `pnpm dev` — start frontend development server
- `pnpm build` — build frontend for production
- `./gradlew bootRun` — start backend server
- `docker-compose up --build` — run full stack with Docker

## License

MIT License - see [LICENSE](LICENSE) file for details.
