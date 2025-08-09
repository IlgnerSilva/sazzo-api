import { Body, Controller, Inject, Post } from "@nestjs/common";
import type { SigninEmailDto } from "@/modules/auth/dtos/signInEmail.dto";
import { SigninService } from "./services/sign-in.service";

@Controller("auth")
export class AuthController {
	constructor(
		@Inject(SigninService) private readonly signinService: SigninService,
	) {}

	@Post("signin")
	async signIn(@Body() data: SigninEmailDto) {
		return await this.signinService.execute(data);
	}
}
