import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	// Habilita validação global de DTOs
	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		whitelist: true, // Remove propriedades não definidas no DTO
	// 		forbidNonWhitelisted: true, // Rejeita propriedades extras
	// 		transform: true, // Transforma automaticamente os tipos
	// 		transformOptions: {
	// 			enableImplicitConversion: true, // Conversão automática de tipos
	// 		},
	// 	}),
	// );

	const config = new DocumentBuilder()
		.setTitle("Sazzo API")
		.setDescription("The Sazzo API description")
		.setVersion("1.0")
		.build();
	const documentFactory = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, documentFactory);
	await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
