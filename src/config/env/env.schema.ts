import { z } from "zod/v4";

export const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("test"),
	PORT: z.string().transform(Number).default(3000),
	DATABASE_URL: z.url(),
});

export type EnvVars = z.infer<typeof envSchema>;
