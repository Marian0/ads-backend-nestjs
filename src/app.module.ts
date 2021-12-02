import { Module } from "@nestjs/common";
import { AdsModule } from "./ads/ads.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig, getTypeOrmConfig } from "./shared/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AdsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
