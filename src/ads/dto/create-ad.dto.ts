import { IsNotEmpty, Validate } from "class-validator";
import { SafeWords } from "../validators/safe-words.validator";

export class CreateAdDTO {
  @IsNotEmpty()
  @Validate(SafeWords)
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
}
