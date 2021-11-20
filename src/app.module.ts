import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdModule } from "./ad/ad.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AdEntity } from "./ad/ad.entity";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot();

const dbSettings: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [AdEntity],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dbSettings), AdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
