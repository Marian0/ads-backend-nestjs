import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/user.entity";
import { JWTPayload } from "./jwt-payload.interface";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: process.env["JWT_SECRET"],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    //know the token is valid
    const { email } = payload;
    const user: User = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    // users exists => Passport will inject this into the request object
    return user;
  }
}
