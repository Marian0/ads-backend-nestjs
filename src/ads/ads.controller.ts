import { Controller, Get, Post, Body } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { CreateAdDTO } from "./dto/create-ad.dto";

@Controller("ads")
export class AdsController {
  constructor(private readonly adsService: AdsService) {}
  // @ApiOperation({ summary: "Create article" })
  // @ApiResponse({ status: 201, description: "The article has been successfully created." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  async create(@Body() adData: CreateAdDTO) {
    return this.adsService.create(adData);
  }

  @Get()
  findAll(): string {
    return "List of ads comming soon...";
  }
}
