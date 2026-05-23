# auth-demo

Minimal Next.js Google OAuth demo using Auth.js.

After a successful login, the app redirects to a protected page with:

- a simple navbar
- the signed-in user avatar and name
- a `Sign out` button in the page body

## Requirements

- Node.js 20+ or Bun for local development
- Docker and Docker Compose for the containerized flow
- A Google OAuth client ID and client secret

## Environment Setup

1. Copy the env template:

```bash
cp .env.example .env
```

2. Fill in `.env`:

```env
PORT=3000
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

3. Generate `AUTH_SECRET` if needed:

```bash
openssl rand -base64 32
```

## Google OAuth Setup

In Google Cloud Console:

1. Create or reuse an OAuth client
2. Make sure the client type is `Web application`
3. Add this authorized redirect URI:

```text
http://localhost:{{PORT}}/api/auth/callback/google
```

4. If your app is in testing mode, add your Google account as a test user
5. If you see organization-only access errors, make sure the app audience is not restricted to internal organization users

Important:
- Keep the redirect URI exactly as shown above
- Replace `{{PORT}}` with the port your app is exposed on
- The same redirect URI is used for both local runs and Docker Compose runs because the app is exposed on `localhost:{{PORT}}`
- Set `PORT` in `.env` to the exact port you want to use

## Local Development

Install dependencies with Bun:

```bash
bun install
```

or with npm:

```bash
npm install
```

Start the development server with Bun:

```bash
bun run dev
```

or with npm:

```bash
npm run dev
```

Open `http://localhost:{{PORT}}`.

## Docker Compose

This project includes a production-style Docker Compose setup:

- one `app` service
- a multi-stage Docker build
- a standalone Next.js production runtime
- all runtime config loaded from `.env`
- no hardcoded port fallback in Compose

### Build and start

```bash
docker compose up --build
```

Open `http://localhost:{{PORT}}`.

OAuth still completes in your browser against the host URL above, not an internal container hostname, so your Google redirect URI remains:

```text
http://localhost:{{PORT}}/api/auth/callback/google
```

### Run in the background

```bash
docker compose up -d --build
```

### Stop the container

```bash
docker compose down
```

### Rebuild after code changes

```bash
docker compose up --build
```

## Usage

1. Open `http://localhost:{{PORT}}`
2. Click the Google sign-in button
3. Complete the Google OAuth flow
4. After successful authentication, you will land on the protected app page
5. Use the `Sign out` button to end the session

## Available Scripts

Using Bun:

```bash
bun run dev
bun run build
bun run start
```

Using npm:

```bash
npm run dev
npm run build
npm run start
```

## Troubleshooting

- If Google shows `Access blocked`, verify the OAuth client type is `Web application`
- If Google says the request is invalid, recheck the exact redirect URI
- If login works locally but not in Docker, confirm the app is still being accessed through `http://localhost:{{PORT}}`
- If you change `.env`, restart the local server or rerun `docker compose up --build`
