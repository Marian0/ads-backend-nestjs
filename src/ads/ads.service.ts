import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm";
import { AdsRepository } from "./ads.repository";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { GetAdsDTO } from "./dto/get-ads.dto";
import { AdStatus } from "./entities/ad-status.enum";
import { Ad } from "./entities/ad.entity";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsRepository)
    private readonly adsRepository: AdsRepository,
  ) {}

  create(createAdDto: CreateAdDTO) {
    return this.adsRepository.createAd(createAdDto);
  }

  async getAdById(id: string): Promise<null | Ad> {
    const ad = await this.adsRepository.findOne(id);

    if (!ad) {
      throw new NotFoundException();
    }

    return ad;
  }

  async getAds(getAdsDto: GetAdsDTO): Promise<Ad[]> {
    return this.adsRepository.getAds(getAdsDto);
  }

  async delete(id: string) {
    const result: DeleteResult = await this.adsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateStatus(id: string, status: AdStatus) {
    const ad = await this.getAdById(id);

    ad.status = status;

    await this.adsRepository.save(ad);

    return ad;
  }
}
