import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const entities = [__dirname + "/../../**/*.entity{.ts,.js}"];
  // const migrations = [__dirname + "/../../database/migrations/*{.ts,.js}"];

  const isProduction = process.env["NODE_ENV"] === "production";

  return {
    type: "mysql",
    host: process.env["MYSQL_HOST"],
    port: Number(process.env["MYSQL_PORT"]),
    username: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DATABASE"],
    synchronize: !isProduction,
    // debug: !isProduction,
    entities,
    // migrations,
  };
};
