import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig } from "src/shared/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt.strategy";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig),
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env["JWT_SECRET"],
      signOptions: {
        expiresIn: parseInt(process.env["JWT_LIFETIME_SECONDS"]),
      },
    }),
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  // Allow any module that imports this `auth module` to use defined authorization mechanisms
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
