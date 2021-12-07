import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
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

  create(createAdDto: CreateAdDTO, user: User) {
    return this.adsRepository.createAd(createAdDto, user);
  }

  async getAdById(id: string): Promise<null | Ad> {
    const ad = await this.adsRepository.findOne({ id });

    if (!ad) {
      throw new NotFoundException();
    }

    return ad;
  }

  async getAds(getAdsDto: GetAdsDTO, user: User | undefined = null): Promise<Ad[]> {
    return this.adsRepository.getAds(getAdsDto, user);
  }

  async delete(id: string, user: User | undefined = null): Promise<void> {
    const ad = await this.getAdById(id);

    if (user && user !== ad.user) {
      throw new UnauthorizedException();
    }

    await this.adsRepository.delete(id);
  }

  async updateStatus(id: string, status: AdStatus, user: User | null = null) {
    const ad = await this.getAdById(id);

    if (user && user !== ad.user) {
      throw new UnauthorizedException();
    }

    ad.status = status;

    await this.adsRepository.save(ad);

    return ad;
  }
}
