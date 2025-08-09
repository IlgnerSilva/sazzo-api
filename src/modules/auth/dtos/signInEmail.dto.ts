import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SigninEmailDto {
	@ApiProperty({
		description: "Email do usuário",
		example: "john.catron@example-pet-store.com",
		required: true,
		type: String,
		format: "emai",
		minLength: 5,
		maxLength: 255,
	})
	@IsEmail({}, { message: "Email inválido" })
	email: string;

	@ApiProperty({
		description: "Senha do usuário",
		example: "123456",
		required: true,
		type: String,
		format: "password",
	})
	@IsString()
	password: string;
}
