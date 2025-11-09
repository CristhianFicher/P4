RedCar Backend (NestJS + TypeORM + Postgres)

Overview
- NestJS API for the RedCar app with 5 CRUDs (parts, revisions, team, clients, suppliers) and a dashboard summary endpoint.
- TypeORM with migrations and seed data.
- Validation via class-validator and business-rule error codes returned as HttpExceptions.

Requirements
- Node 18+
- Docker (optional, for Postgres)

Environment
- Copy `.env.example` to `.env` and adjust if needed.
  - `PORT=3001`
  - `DATABASE_URL=postgres://postgres:postgres@localhost:5432/redcar`

Run Postgres (Docker)
```bash
docker compose up -d
```

Install & Run
```bash
cd backend
npm install
npm run typeorm:migration:run
npm run start:dev
```

Endpoints
- `GET /dashboard` summary: lowStock, stockValue, revision status counts, total clients
- CRUDs: `/parts`, `/revisions`, `/team`, `/clients`, `/suppliers`

Business Rules (examples)
- Parts: PART_CODE_ALREADY_EXISTS, NEGATIVE_STOCK_NOT_ALLOWED, UNIT_COST_MUST_BE_POSITIVE, MIN_STOCK_OVER_LIMIT, CANNOT_DELETE_STOCKED_PART, PART_NOT_FOUND
- Revisions: SCHEDULE_IN_PAST, INVALID_LICENSE_PLATE, FINISH_REQUIRES_NOTES, CANNOT_REOPEN_FINISHED, CANNOT_DELETE_PAST_REVISION, REVISION_NOT_FOUND
- Team: EMAIL_ALREADY_USED, CERT_EXPIRED, HIRE_DATE_IN_FUTURE, CANNOT_DELETE_ACTIVE_MEMBER, TEAM_MEMBER_NOT_FOUND
- Clients: EMAIL_ALREADY_USED, LAST_VISIT_IN_FUTURE, INVALID_LICENSE_PLATE, CANNOT_DELETE_ACTIVE_CLIENT, CLIENT_NOT_FOUND
- Suppliers: EMAIL_ALREADY_USED, INVALID_RATING, LEAD_TIME_TOO_HIGH, SUPPLIER_NOT_FOUND

Migrations
- `src/migrations/1710000000000-InitSchema.ts`: creates tables
- `src/migrations/1710000001000-SeedData.ts`: inserts starter data

Postman
- Import `postman/RedCar.postman_collection.json` and set `{{baseUrl}}` to `http://localhost:3001`.

Notes
- The initial migration enables `pgcrypto` for UUID generation (`gen_random_uuid()`). If your Postgres lacks this, run: `CREATE EXTENSION IF NOT EXISTS pgcrypto;`.
- CORS and global validation are enabled in `src/main.ts`.

