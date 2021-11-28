import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

// Sample bad word list
const blackListWords = ["fuck", "asshole", "dick head", "badwords...."];

@ValidatorConstraint({ name: "customText", async: false })
export class SafeWords implements ValidatorConstraintInterface {
  private badWord = "";

  validate(text: string, args: ValidationArguments) {
    for (let index = 0; index < blackListWords.length; index++) {
      this.badWord = blackListWords[index];
      const isBadWord = text && text.toLowerCase().indexOf(this.badWord) >= 0;

      if (isBadWord) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `You can't use the bad word '${this.badWord}'.`;
  }
}
