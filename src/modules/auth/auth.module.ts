import { Module } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@/infra/providers/better-auth/auth";
import { AuthController } from "./auth.controller";
import { IAuthRepository } from "./repositories/auth.repository.interface";
import { AuthBetterAuthRepository } from "./repositories/better-auth/auth.better-auth.repository";
import { SigninService } from "./services/sign-in.service";

@Module({
	imports: [BetterAuthModule.forRoot(auth)],
	providers: [
		SigninService,
		{
			provide: IAuthRepository,
			useClass: AuthBetterAuthRepository,
		},
	],
	controllers: [AuthController],
	exports: [SigninService],
})
export class AuthModule {}
