import { Module } from "@nestjs/common";
import { AdsModule } from "./ads/ads.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig, getTypeOrmConfig } from "./shared/config";

@Module({
  imports: [ConfigModule.forRoot(AppConfig), TypeOrmModule.forRoot(getTypeOrmConfig()), AdsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
