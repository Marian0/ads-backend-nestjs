import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsController } from "./ads.controller";
import { AdsService } from "./ads.service";
import { Ad } from "./entities/ad.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ad])],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
