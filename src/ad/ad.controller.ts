import { Controller, Get, Post, Body } from "@nestjs/common";
import { AdService } from "./ad.service";
import { CreateAdDTO } from "./dtos/create-ad.dto";

@Controller("ads")
export class AdController {
  constructor(private readonly adService: AdService) {}
  // @ApiOperation({ summary: "Create article" })
  // @ApiResponse({ status: 201, description: "The article has been successfully created." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  async create(@Body() adData: CreateAdDTO) {
    return this.adService.create(adData);
  }

  @Get()
  findAll(): string {
    return "List of ads comming soon...";
  }
}
