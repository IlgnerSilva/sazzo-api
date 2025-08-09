import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
	IsBoolean,
	IsOptional,
	IsString,
	IsUrl,
	ValidateNested,
} from "class-validator";
import { UserDataDto } from "@/common/dtos/userData.dto";

// DTO principal para a resposta de autenticação
export class AuthResponseDto {
	@ApiProperty({
		description: "Indica se deve fazer redirect",
		example: true,
	})
	@Expose()
	@IsBoolean()
	redirect: boolean;

	@ApiProperty({
		description: "Token de autenticação JWT",
		example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	})
	@Expose()
	@IsString()
	token: string;

	@ApiPropertyOptional({
		description: "URL para redirecionamento (se redirect for true)",
		example: "https://app.empresa.com/dashboard",
		nullable: true,
	})
	@Expose()
	@IsOptional()
	@IsUrl({}, { message: "URL deve ter um formato válido" })
	url?: string;

	@ApiProperty({
		description: "Dados do usuário autenticado",
		type: UserDataDto,
	})
	@Expose()
	@ValidateNested()
	@Type(() => UserDataDto)
	user: UserDataDto;
}
