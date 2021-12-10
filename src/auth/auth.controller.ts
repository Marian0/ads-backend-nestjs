import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { User } from "./entities/user.entity";
import { GetUser } from "./get-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body() userSignUpDto: UserSignUpDTO) {
    const { password, ...userClean } = await this.authService.singup(userSignUpDto);
    return userClean;
  }

  @Post("/signin")
  signIn(@Body() userSignUpDto: UserSignUpDTO): Promise<{ accessToken: string }> {
    return this.authService.signin(userSignUpDto);
  }

  // Refresh token endpoint should be implemented
  // @Post("/refresh")
  // @UseGuards(AuthGuard())
  // refresh(): Promise<{ accessToken: string }> {
  //   return this.authService.signin(userSignUpDto);
  // }

  @Get("/me")
  @UseGuards(AuthGuard())
  me(@GetUser() user: User) {
    // remove password from response
    const { password, ...userClean } = user;

    return userClean;
  }
}
