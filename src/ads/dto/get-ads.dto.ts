import { IsOptional } from "class-validator";

export class GetAdsDTO {
  @IsOptional()
  readonly keywords: string;
}
