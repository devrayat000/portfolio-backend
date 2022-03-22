// 3000 is standard for node apps

import { env } from "./utils/env";

// Once deployed, Heroku will supply this var to your app
export const PORT = env.int("PORT", 8000);

// Postgres DB URL
// The default value here will work if you've installed Postgres on MacOS using brew
// One the app is deployed to Heroku, this var will be supplied by the Postgres addon
export const DATABASE_URL = env(
  "DATABASE_URL",
  `postgres://postgres:ppooii12@localhost/portfolio`
);

// Default to 30 days
export const SESSION_MAX_AGE = env.int("SESSION_MAX_AGE", 60 * 60 * 24 * 30);

// If the environment doesn't supply a value, default the secret to a secure random string
// This will cause all cookies to be invalidated with each app restart (annoying but better than having a hardcoded default)
// A secure value will be set in your Heroku deploy if you use the "Deploy to Heroku" button or follow the instructions in the README
export const SESSION_SECRET = env(
  "SESSION_SECRET",
  "-- DEV COOKIE SECRET; CHANGE ME --"
);
