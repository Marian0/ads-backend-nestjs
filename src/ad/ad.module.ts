import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdController } from "./ad.controller";
import { AdEntity } from "./ad.entity";
import { AdService } from "./ad.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  providers: [AdService],
  controllers: [AdController],
})
export class AdModule {}
