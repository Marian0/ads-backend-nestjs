import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdsService } from "./ads.service";
import { ChangeStatusAdDTO } from "./dto/change-status-ad.dto";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { GetAdsDTO } from "./dto/get-ads.dto";
import { Ad } from "./entities/ad.entity";

@Controller("ads")
@UseGuards(AuthGuard())
export class AdsController {
  constructor(private readonly adsService: AdsService) {}
  // @ApiOperation({ summary: "Create article" })
  // @ApiResponse({ status: 201, description: "The article has been successfully created." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  create(@Body() createAdDto: CreateAdDTO) {
    return this.adsService.create(createAdDto);
  }

  @Get()
  findAll(@Query() getAdsDto: GetAdsDTO): Promise<Ad[]> {
    return this.adsService.getAds(getAdsDto);
  }

  @Get("/:id")
  findOne(@Param("id") id: string): Promise<Ad> {
    return this.adsService.getAdById(id);
  }

  @Delete("/:id")
  delete(@Param("id") id: string): Promise<void> {
    return this.adsService.delete(id);
  }

  @Patch("/:id")
  update(@Param("id") id: string, @Body() changeStatusAdDto: ChangeStatusAdDTO) {
    const { status } = changeStatusAdDto;
    return this.adsService.updateStatus(id, status);
  }
}
