import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { AdsEntity } from "./ads.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require("slug");

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
  ) {}

  async create(adData: CreateAdDTO): Promise<AdsEntity> {
    const ad = new AdsEntity();

    ad.title = adData.title;
    ad.description = adData.description;
    ad.slug = slug(ad.title);

    return await this.adsRepository.save(ad);
  }
}
