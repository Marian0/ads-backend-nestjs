import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdsRepository } from "./ads.repository";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";
import * as slug from "slug";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adsRepository: AdsRepository,
  ) {}

  // Checks in db and returs a consecutive indexed slug to be used
  private async getUniqueSlug(title: string): Promise<string> {
    let index = 0;
    while (true) {
      const slugTemp = slug(title) + (index > 0 ? `-${index}` : "");
      const found = await this.adsRepository.findOne({ slug: slugTemp });
      if (!found) {
        return slugTemp;
      }
      index++;
    }
  }

  async create(createAdDto: CreateAdDTO) {
    // calculate unique slug
    const slug: string = await this.getUniqueSlug(createAdDto.title);

    const ad = new Ad();
    ad.title = createAdDto.title;
    ad.description = createAdDto.description;
    ad.slug = slug;

    return await this.adsRepository.save(ad);
  }

  async getAdById(id: string): Promise<null | Ad> {
    const ad = await this.adsRepository.findOne(id);

    if (!ad) {
      throw new NotFoundException();
    }

    return ad;
  }
}
