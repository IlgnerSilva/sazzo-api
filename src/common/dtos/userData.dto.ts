import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

// DTO para o objeto user aninhado
export class UserDataDto {
	@ApiProperty({
		description: "ID único do usuário",
		example: "clm8k1234567890abcdef",
	})
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({
		description: "Email do usuário",
		example: "usuario@empresa.com",
	})
	@Expose()
	@IsString()
	email: string;

	@ApiProperty({
		description: "Nome completo do usuário",
		example: "João Silva Santos",
	})
	@Expose()
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "URL da imagem de perfil do usuário",
		example: "https://avatars.githubusercontent.com/u/12345?v=4",
		nullable: true,
	})
	@Expose()
	@IsOptional()
	@IsString()
	image?: string | null;

	@ApiProperty({
		description: "Indica se o email foi verificado",
		example: true,
	})
	@Expose()
	@IsBoolean()
	emailVerified: boolean;

	@ApiProperty({
		description: "Data de criação da conta",
		example: "2023-01-15T10:30:00Z",
	})
	@Expose()
	@Transform(({ value }) =>
		value instanceof Date ? value.toISOString() : value,
	)
	createdAt: Date;

	@ApiProperty({
		description: "Data da última atualização",
		example: "2023-01-20T14:45:00Z",
	})
	@Expose()
	@Transform(({ value }) =>
		value instanceof Date ? value.toISOString() : value,
	)
	updatedAt: Date;
}
