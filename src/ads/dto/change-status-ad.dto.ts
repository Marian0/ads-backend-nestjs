import { IsEnum, IsNotEmpty } from "class-validator";
import { AdStatus } from "../entities/ad-status.enum";

export class ChangeStatusAdDTO {
  @IsNotEmpty()
  @IsEnum(AdStatus)
  readonly status: AdStatus;
}
