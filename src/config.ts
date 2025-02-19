import dotenv from 'dotenv'
import { z } from 'zod' // Optional for validation

dotenv.config() // Load environment variables

// Define schema using Zod (optional but recommended)
const envSchema = z.object({
  DISCORD_CLIENT_ID: z.string().nonempty(),
  DISCORD_BOT_TOKEN: z.string().nonempty(),
  MONGO_URL: z.string().nonempty(),
  PORT: z.string().nonempty(),
})

// Validate and extract env variables
const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  process.exit(1)
}

export const config = parsedEnv.data
