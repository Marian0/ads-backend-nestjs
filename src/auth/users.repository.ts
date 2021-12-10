import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userSignUpDto: UserSignUpDTO): Promise<User> {
    const { email, password } = userSignUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      // if (error.code === "23505") { //  postgress
      if (error.code === "ER_DUP_ENTRY") {
        //mysql error = ER_DUP_ENTRY
        throw new ConflictException("Email already taken");
      }
      throw new InternalServerErrorException();
    }

    return user;
  }
}
