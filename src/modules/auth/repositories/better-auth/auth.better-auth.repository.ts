import { Inject } from "@nestjs/common";
import { AuthService } from "@thallesp/nestjs-better-auth";
import { APIError } from "better-auth/api";
import { I18nService } from "nestjs-i18n";
import type { I18nTranslations } from "@/common/i18n/types/i18n.type";
import type { auth } from "@/infra/providers/better-auth/auth";
import type { AuthResponseDto } from "@/modules/auth/dtos/authResponse.dto";
import type { SigninEmailDto } from "@/modules/auth/dtos/signInEmail.dto";
import type { IAuthRepository } from "@/modules/auth/repositories/auth.repository.interface";

export class AuthBetterAuthRepository implements IAuthRepository {
	constructor(
		@Inject(AuthService) private authService: AuthService<typeof auth>,
		@Inject(I18nService)
		private readonly i18nService: I18nService,
	) {}
	async signIn(data: SigninEmailDto): Promise<AuthResponseDto> {
		try {
			return await this.authService.api.signInEmail({
				body: data,
			});
		} catch (err) {
			if (err instanceof APIError) {
				throw new APIError(err.status, {
					code: err.body.code,
					message: this.i18nService.t(
						("messages_status." + err.body.code) as keyof I18nTranslations,
					),
				});
			}
		}
	}
}
