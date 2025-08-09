import type { APIError } from "better-auth/api";
import type { AuthResponseDto } from "@/modules/auth/dtos/authResponse.dto";
import type { SigninEmailDto } from "@/modules/auth/dtos/signInEmail.dto";

export abstract class IAuthRepository {
	abstract signIn(data: SigninEmailDto): Promise<AuthResponseDto | APIError>;
}
