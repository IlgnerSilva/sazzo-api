import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from "path";
import { AuthModule } from "@/modules/auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		I18nModule.forRoot({
			fallbackLanguage: "pt-br",
			loaderOptions: {
				path: path.join(__dirname, "/common/i18n/"),
				watch: true,
			},
			typesOutputPath: path.join(
				__dirname,
				"../src/common/i18n/types/i18n.type.ts",
			),
			resolvers: [
				{ use: QueryResolver, options: ["lang"] },
				AcceptLanguageResolver,
			],
		}),
	],
	controllers: [],
})
export class AppModule {}
