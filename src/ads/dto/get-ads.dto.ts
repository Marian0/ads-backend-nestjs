import { IsEnum, IsOptional } from "class-validator";
import { AdStatus } from "../entities/ad-status.enum";

export class GetAdsDTO {
  @IsOptional()
  readonly keywords?: string;

  @IsOptional()
  @IsEnum(AdStatus)
  readonly status?: AdStatus;
}
