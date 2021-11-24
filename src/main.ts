import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { printLog } from "./shared/logger";

async function bootstrap() {
  // App bootstrap
  const app = await NestFactory.create(AppModule);

  //
  const config = app.get(ConfigService);
  const appPort = config.get("APP_PORT");
  await app.listen(appPort);

  printLog(`🚀 APP is running on port ${appPort}`);
}
bootstrap();
