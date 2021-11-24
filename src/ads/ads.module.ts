import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsController } from "./ads.controller";
import { AdsEntity } from "./ads.entity";
import { AdsService } from "./ads.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdsEntity])],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
