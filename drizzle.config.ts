import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})