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
  SetMetadata,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { User } from "src/auth/entities/user.entity";
import { GetUser } from "src/auth/get-user.decorator";
import { AdsService } from "./ads.service";
import { ChangeStatusAdDTO } from "./dto/change-status-ad.dto";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { GetAdsDTO } from "./dto/get-ads.dto";
import { Ad } from "./entities/ad.entity";
import { Role } from "src/auth/entities/role.enum";

@Controller("ads")
export class AdsController {
  constructor(private readonly adsService: AdsService) {}
  // @ApiOperation({ summary: "Create article" })
  // @ApiResponse({ status: 201, description: "The article has been successfully created." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createAdDto: CreateAdDTO, @GetUser() user: User) {
    return this.adsService.create(createAdDto, user);
  }

  @Get()
  findAll(@Query() getAdsDto: GetAdsDTO): Promise<Ad[]> {
    return this.adsService.getAds(getAdsDto);
  }

  @Get("/:slug")
  findOneBySlug(@Param("slug") slug: string): Promise<Ad> {
    return this.adsService.getAdBySlug(slug);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  delete(@Param("id") id: string, @GetUser() user: User): Promise<void> {
    return this.adsService.delete(id, user);
  }

  @Patch("/:id")
  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata("roles", [Role.ADMIN])
  update(
    @Param("id") id: string,
    @Body() changeStatusAdDto: ChangeStatusAdDTO,
    @GetUser() user: User,
  ) {
    const { status } = changeStatusAdDto;
    return this.adsService.updateStatus(id, status, user);
  }
}
