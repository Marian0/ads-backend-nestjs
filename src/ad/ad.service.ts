import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdDTO } from "./dtos/create-ad.dto";
import { AdEntity } from "./ad.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require("slug");

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>,
  ) {}

  async create(adData: CreateAdDTO): Promise<AdEntity> {
    const ad = new AdEntity();

    ad.title = adData.title;
    ad.description = adData.description;
    ad.slug = slug(ad.title);

    return await this.adRepository.save(ad);
  }
}
