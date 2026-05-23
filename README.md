# Auth Demo

Minimal Google OAuth demo built with Next.js and Auth.js.

It signs in with Google, protects a page, shows the authenticated user's profile in the navbar, and includes a Docker Compose setup for running the app locally as a production-style container.

## Requirements

- Node.js 20+ or Bun
- Docker and Docker Compose
- Google OAuth client ID and client secret

## Setup

Copy the env template:

```bash
cp .env.example .env
```

Fill in `.env`:

```env
PORT=3000
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## Google OAuth

Create a Google OAuth client and set the application type to `Web application`.

Add this authorized redirect URI:

```text
http://localhost:{{PORT}}/api/auth/callback/google
```

Replace `{{PORT}}` with the `PORT` value from `.env`.

If the app is in testing mode, add your Google account as a test user.

## Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:{{PORT}}
```

You can also use Bun:

```bash
bun install
bun run dev
```

## Docker

Build and start the app:

```bash
docker compose up --build
```

Run it in the background:

```bash
docker compose up -d --build
```

Stop it:

```bash
docker compose down
```

The Docker app uses the same `.env` file and exposes the app at:

```text
http://localhost:{{PORT}}
```

## Usage

Open the app, sign in with Google, and you will be redirected to the protected page. The navbar shows `Test app` on the left and your Google profile on the right. Use `Sign out` to end the session.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## FAQ

#### Why does the redirect URI use `{{PORT}}`?

It is a placeholder for the `PORT` value in `.env`.

#### Google says the request is invalid

Check that your Google OAuth client is a `Web application` and that the redirect URI exactly matches:

```text
http://localhost:{{PORT}}/api/auth/callback/google
```

#### Google says access is blocked

If your OAuth consent screen is in testing mode, add your Google account as a test user. If the app is restricted to an organization, use an account from that organization or configure the app for external users.

## License

MIT
