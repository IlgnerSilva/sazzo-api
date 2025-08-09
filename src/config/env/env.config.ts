import { config } from "dotenv";
import { type EnvVars, envSchema } from "./env.schema";

// Carrega as variáveis do .env
config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		"❌ Erro na validação das variáveis de ambiente:",
		parsedEnv.error.format(),
	);
	process.exit(1);
}

export const env: EnvVars = parsedEnv.data;
