import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsController } from "./ads.controller";
import { AdsRepository } from "./ads.repository";
import { AdsService } from "./ads.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdsRepository])],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
