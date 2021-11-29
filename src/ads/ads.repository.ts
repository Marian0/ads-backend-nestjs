import { EntityRepository, Repository } from "typeorm";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";
import * as slug from "slug";
import { GetAdsDTO } from "./dto/get-ads.dto";

@EntityRepository(Ad)
export class AdsRepository extends Repository<Ad> {
  // Checks in db and returs a consecutive indexed slug to be used
  private async getUniqueSlug(title: string): Promise<string> {
    let index = 0;
    while (true) {
      const slugTemp = slug(title) + (index > 0 ? `-${index}` : "");
      const found = await this.findOne({ slug: slugTemp });
      if (!found) {
        return slugTemp;
      }
      index++;
    }
  }
  async createAd(createAdDto: CreateAdDTO): Promise<Ad> {
    // calculate unique slug
    const slug: string = await this.getUniqueSlug(createAdDto.title);

    const ad = new Ad();
    ad.title = createAdDto.title;
    ad.description = createAdDto.description;
    ad.slug = slug;

    return await this.save(ad);
  }

  async getAds(getAdsDto: GetAdsDTO): Promise<Ad[]> {
    const query = this.createQueryBuilder("ad");

    //@todo: add filtering to query

    const ads = await query.getMany();

    return ads;
  }
}
