# Pork Backend

Backend REST API built with NestJS and Prisma.

## Environment variables

- `DATABASE_URL` MySQL connection string
- `PORT` Port for the HTTP server (default: `3000`)

## Setup

Install dependencies and generate the Prisma client:

```bash
npm install
```

Run database migrations:

```bash
npm run migrate
```

Start the development server:

```bash
npm run start:dev
```

## Docker

```bash
docker build -t pork-backend .
docker run -p 3000:3000 -e DATABASE_URL=... pork-backend
```

### Creating migrations

```
npx prisma migrate dev --name init
```

### Deploy migrations

```
npm run migrate
```

## Endpoints

### Question definitions

- `POST /question-definitions`
- `GET /question-definitions`
- `GET /question-definitions/:id`
- `PUT /question-definitions/:id`
- `DELETE /question-definitions/:id`

### Form submissions

- `POST /submissions`
- `GET /submissions`
- `GET /submissions/:id`
- `PUT /submissions/:id`
- `DELETE /submissions/:id`

### Form types

- `POST /form-types`
- `GET /form-types`
- `GET /form-types/:id`
- `PUT /form-types/:id`
- `DELETE /form-types/:id`

## Curl examples

```bash
# Create question definition
curl -X POST http://localhost:3000/question-definitions \
  -H 'Content-Type: application/json' \
  -d '{"label":"Name","type":"text"}'

# List question definitions
curl http://localhost:3000/question-definitions

# Get one question definition
curl http://localhost:3000/question-definitions/<id>

# Update a question definition
curl -X PUT http://localhost:3000/question-definitions/<id> \
  -H 'Content-Type: application/json' \
  -d '{"label":"Updated"}'

# Delete a question definition
curl -X DELETE http://localhost:3000/question-definitions/<id>

# Create form submission (using formTypeKey)
curl -X POST http://localhost:3000/submissions \
  -H 'Content-Type: application/json' \
  -d '{"formTypeKey":"porcicultura","responses":[{"questionId":"<id>","value":"Answer"}]}'

# List submissions filtered by type
curl "http://localhost:3000/submissions?formTypeKey=porcicultura"

# Get submission
curl http://localhost:3000/submissions/<id>

# Update submission
curl -X PUT http://localhost:3000/submissions/<id> \
  -H 'Content-Type: application/json' \
  -d '{"responses":[{"questionId":"<id>","value":"Changed"}]}'

# Delete submission
curl -X DELETE http://localhost:3000/submissions/<id>

# Create form type
curl -X POST http://localhost:3000/form-types \
  -H 'Content-Type: application/json' \
  -d '{"key":"porcicultura","label":"Form. Porcicultura"}'

# List form types
curl http://localhost:3000/form-types

# Get one form type
curl http://localhost:3000/form-types/1

# Update form type
curl -X PUT http://localhost:3000/form-types/1 \
  -H 'Content-Type: application/json' \
  -d '{"label":"Updated"}'

# Delete form type
curl -X DELETE http://localhost:3000/form-types/1
```
