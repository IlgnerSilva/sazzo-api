import { Inject, Injectable } from "@nestjs/common";
import type { APIError } from "better-auth/api";
import type { AuthResponseDto } from "@/modules/auth/dtos/authResponse.dto";
import type { SigninEmailDto } from "@/modules/auth/dtos/signInEmail.dto";
import { IAuthRepository } from "@/modules/auth/repositories/auth.repository.interface";

@Injectable()
export class SigninService {
	constructor(
		@Inject(IAuthRepository) private authRepository: IAuthRepository,
	) {}
	async execute(data: SigninEmailDto): Promise<AuthResponseDto | APIError> {
		return await this.authRepository.signIn(data);
	}
}
