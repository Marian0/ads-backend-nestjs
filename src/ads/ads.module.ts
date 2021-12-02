import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AdsController } from "./ads.controller";
import { AdsRepository } from "./ads.repository";
import { AdsService } from "./ads.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdsRepository]), AuthModule],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
