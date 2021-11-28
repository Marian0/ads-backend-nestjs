import { Controller, Get, Post, Body, Res, Param } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";

@Controller("ads")
export class AdsController {
  constructor(private readonly adsService: AdsService) {}
  // @ApiOperation({ summary: "Create article" })
  // @ApiResponse({ status: 201, description: "The article has been successfully created." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  async create(@Body() createAdDto: CreateAdDTO) {
    return this.adsService.create(createAdDto);
  }

  // @Get()
  // findAll(@Res() res): string {
  //   sample responding a custom http status
  //   return res.status(222).send("TEST");
  // }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Ad> {
    return this.adsService.getAdById(id);
  }
}
