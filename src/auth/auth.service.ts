import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  singup(userSignUpDto: UserSignUpDTO): Promise<User> {
    return this.usersRepository.createUser(userSignUpDto);
  }

  async signin(userSignUpDto: UserSignUpDTO): Promise<{ accessToken: string }> {
    const { email, password } = userSignUpDto;

    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        accessToken,
      };
    }

    throw new UnauthorizedException("Please, check your login credentials");
  }
}
